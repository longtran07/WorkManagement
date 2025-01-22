package com.longtran.commonservice.configurations;


import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(
        info = @Info(
                title = "E-commerce api in Java Spring boot",
                version = "1.0.0",
                description = "Ứng dụng ShopApp để training"
        ),
        servers = {
                @Server(url = "http://localhost:8801/common/", description = "Local Development Server"),
        }
)
@Configuration
public class OpenApiConfig {

}
