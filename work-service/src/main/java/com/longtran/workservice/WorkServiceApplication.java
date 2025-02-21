package com.longtran.workservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableDiscoveryClient
@ComponentScan(basePackages = {"com.longtran.commons.exceptions", "com.longtran.workservice"})
public class WorkServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(WorkServiceApplication.class, args);
    }

}
