package com.longtran.commonservice.configurations;

import com.longtran.commons.configuration.properties.MinioProperties;
import com.longtran.commons.integration.minio.MinioChanel;

import io.minio.MinioClient;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
@EnableConfigurationProperties(MinioProperties.class) // Kích hoạt MinioProperties
public class FileConfig {
    private final MinioProperties minioProperties;

    @Bean
    public MinioChanel minioChanel(){
        return new MinioChanel(MinioClient.builder()
                .endpoint(minioProperties.getUrl())
                .credentials(minioProperties.getAccessKey(), minioProperties.getSecretKey())
                .build());
    }

}
