package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

import com.controller.TestController;

//에러를 막기 위해 exclude 설정(DB를 추가할 경우 exclude이하 구문 삭제 필요)
@SpringBootApplication(exclude={DataSourceAutoConfiguration.class})
@ComponentScan(basePackageClasses = TestController.class)
public class BrownyApplication {

	public static void main(String[] args) {
		SpringApplication.run(BrownyApplication.class, args);
	}

}
