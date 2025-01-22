package com.longtran.commonlibrary.integration.minio;

import com.longtran.commonlibrary.exceptions.BusinessException;
import com.longtran.commonlibrary.utils.ConverterUtils;
import io.minio.*;
import io.minio.errors.MinioException;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.Objects;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class MinioChanel {


    private static final String BUCKET="resources";
    private final MinioClient minioClient;


    @PostConstruct
    private void init() {
        createBucket(BUCKET);
    }

    @SneakyThrows
    private void createBucket(final String bucketName) {
        final var found=minioClient.bucketExists(
                BucketExistsArgs
                        .builder()
                        .bucket(bucketName)
                        .build()
            );
                if(!found) {
                    minioClient.makeBucket(
                            MakeBucketArgs.builder()
                                    .bucket(bucketName).build()
                    );
                    // Thiết lập bucket là public bằng cách set policy
                    final var policy = """
                            {
                              "Version": "2012-10-17",
                              "Statement": [
                               {
                                  "Effect": "Allow",
                                  "Principal": "*",
                                  "Action": "s3:GetObject",
                                  "Resource": "arn:aws:s3:::%s/*"
                                }
                              ]
                            }
                        """.formatted(bucketName);
                    minioClient.setBucketPolicy(
                            SetBucketPolicyArgs.builder().bucket(bucketName).config(policy).build()
                    );
                }
                else {
                    log.info("Bucket {} already exists", bucketName);
                }
            }

            @SneakyThrows
            public String upload(@NonNull final MultipartFile file) {
                log.info("Bucket: {}, file size: {}", BUCKET, file.getSize());
                String cleanFilename = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
                final var  fileName = UUID.randomUUID().toString() + "_" + cleanFilename;
                try {
                    minioClient.putObject(
                            PutObjectArgs.builder()
                                    .bucket(BUCKET)
                                    .object(fileName)
                                    .contentType(Objects.isNull(file.getContentType()) ? "image/png; image/jpg;" : file.getContentType())
                                    .stream(file.getInputStream(), file.getSize(), -1)
                                    .build()
                    );
                } catch (Exception ex) {
                    log.error("Error saving image \n {} ", ex.getMessage());
                    throw new BusinessException("400", "Unable to upload file", ex);
                }
                return minioClient.getPresignedObjectUrl(
                        io.minio.GetPresignedObjectUrlArgs.builder()
                                .method(io.minio.http.Method.GET)
                                .bucket(BUCKET)
                                .object(fileName)
                                .build()
                );
            }

            public byte[] download(String bucket, String name) {
                try (GetObjectResponse inputStream = minioClient.getObject(GetObjectArgs.builder()
                        .bucket(bucket)
                        .object(name)
                        .build())) {
                    String contentLength = inputStream.headers().get(HttpHeaders.CONTENT_LENGTH);
                    int size = StringUtils.isEmpty(contentLength) ? 0 : Integer.parseInt(contentLength);
                    return ConverterUtils.readBytesFromInputStream(inputStream, size);
                } catch (Exception e) {
                    throw new BusinessException("400", "Unable to download file", e);
                }
            }
            public Resource downloadFile(String fileName) throws Exception {
                try {
                    // Get the file from Minio
                    InputStream inputStream = minioClient.getObject(
                            GetObjectArgs.builder()
                                    .bucket(BUCKET)
                                    .object(fileName)
                                    .build()
                    );

                    // Create a resource from the input stream
                    return new InputStreamResource(inputStream);
                } catch (MinioException e) {
                    e.printStackTrace();
                    throw new Exception("Error occurred while downloading file from Minio", e);
                }
    }

}

