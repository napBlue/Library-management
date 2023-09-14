package com.example.springboot.common;

import lombok.Data;

@Data
public class Result {          //返回类的包装
    private static final String SUCCESS_CODE = "200";//默认成功code为200，失败为-1
    private static final String ERROR_CODE = "-1";

    private String code;
    private Object data;
    private String msg;   //message存放错误的信息

    public static Result success() {
        Result result = new Result();
        result.setCode(SUCCESS_CODE);
        return result;
    }//返回成功的信息

    public static Result success(Object data) {
        Result result = new Result();
        result.setCode(SUCCESS_CODE);
        result.setData(data);
        return result;
    }//同名有参，重载

    public static Result error(String msg) {
        Result result = new Result();
        result.setCode(ERROR_CODE);
        result.setMsg(msg);
        return result;
    }//返回成功的信息

    public static Result error(String code,String msg) {
        Result result = new Result();
        result.setCode(code);
        result.setMsg(msg);
        return result;
    }
}
