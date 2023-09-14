package com.example.springboot.controller.dto;


import lombok.Data;

@Data
public class LoginDTO {          //封装要返回的一些基本数据信息
    private Integer id;
    private String username;
    private String phone;
    private String email;
    private String token;  //登录成功后需要返回一个token，否则前端永远无法访问后台

}
