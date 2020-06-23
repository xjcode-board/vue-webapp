import axios from 'axios'
import qs from 'qs'
import {
    Toast
} from 'vant'
import store from '../store'
// 环境切换 
axios.defaults.baseURL = process.env.VUE_APP_API 

// 超时
axios.defaults.timeout = 10000

// 请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'


// 请求拦截器
axios.interceptors.request.use(config => {
        if(config.url.indexOf('index.do') === -1) {
            Toast.loading({
                message: '加载中...',
                forbidClick: true,
                loadingType: 'spinner',
            });
        }
        return config
    },
    error => {
        return Promise.error(error)
    })

// 响应拦截

axios.interceptors.response.use(
    response => {
        Toast.clear();
        if (response.status === 200) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    },
    error => {
        Toast.clear();
        const { response } = error;
        if (response) {
            if (response.status) {
                switch (response.status) {
                    case 403:
                        Toast.fail('内网访问');
                        break
                    case 502:
                        Toast.fail('服务器异常');
                        break
                    default:
                        Toast.fail(`网络繁忙(${response.status})`);
                }
            }
            return Promise.reject(response);
        } else {
            return Promise.reject(error);
        }  
    }
)

/**
 * get
 */

export function get(url, params) {
    params = Object.assign({}, store.state.baseParams, params)
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params
        }).then(res => {
            if (res.data.error_code === 0) {
                resolve(res.data)
            } else {
                Toast(res.data.error_msg)
                reject(res.data)
            }
        }).catch(err => {
            reject(err.data)
        })
    })
}

/**
 * post
 */

export function post(url, params) {
    params = Object.assign({}, store.state.baseParams, params)
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(params)).then(res => {
            if (res.data.error_code === 0) {
                resolve(res.data)
            } else {
                Toast(res.data.error_msg)
                reject(res.data)
            }
        }).catch(err => {
            reject(err.data)
        })
    })
}