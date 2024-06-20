package com.example.demo.apiResponse;

import java.io.Serializable;

//custom class that wraps message and code to send to client
public class ApiResponse<T> implements Serializable {

    private T data;
    private int code;

    public ApiResponse(T data, int code) {
        this.data = data;
        this.code = code;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }
}
