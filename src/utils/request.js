import axios from "axios"
import router from "@/router";
import Cookies from "js-cookie"

//request实际是一个axios对象
//前后端同时用api做保护
const request = axios.create({
    baseURL: 'http://localhost:9090/api',
    timeout: 5000
})

//request拦截器
//对请求做处理
request.interceptors.request.use(config => {
    config.headers['Content-Type'] ='application/json;charset=utf-8';

    const adminJson = Cookies.get('admin')
    if (adminJson) {
        // 设置请求头
        config.headers['token'] = JSON.parse(adminJson).token
    }
    return config
}, error => {
    return Promise.reject(error)
});

//response拦截器
//接口响应后做处理
request.interceptors.response.use(
    //res为后端定义的data里的code、msg、token信息
    response => {
        let res = response.data;
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        if (res.code === '401') {
            router.push('/login')
        }
        return res;
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)

export default request