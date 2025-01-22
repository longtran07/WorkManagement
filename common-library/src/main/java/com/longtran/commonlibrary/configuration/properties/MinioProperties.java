package com.longtran.commonlibrary.configuration.properties;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@ConfigurationProperties(
        prefix = "integration.minio",
        ignoreUnknownFields = false
)
@Configuration

public class MinioProperties {
    String accessKey;
    String secretKey;
    String url;
}
