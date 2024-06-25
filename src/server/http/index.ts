import { AxiosError } from 'axios';
import { RequstInterceptors } from './type';
import axios from 'axios';
import { checkErrorStatus } from './checkErrorStatus';
import { retry } from './axiosRetry';
import MyAxios from './Axios';
import staticAxiosConfig from './config';

// 继承了我们在最开始实现的抽象类RequstInterceptors，主要关心responseInterceptorsCatch内容
const _RequstInterceptors: RequstInterceptors = {
    requestInterceptors(config) {
        return config;
    },
    requestInterceptorsCatch(err) {
        return err;
    },
    responseInterceptor(res) {
        return res;
    },
    responseInterceptorsCatch(axiosInstance, err: AxiosError) {
        let message = err.code === 'ECONNABORTED' ? '请求超时' : undefined;
        // 判断本次请求是否被取消
        if (axios.isCancel(err)) {
            return Promise.reject(err);
        }
        // 检查响应状态码
        checkErrorStatus((err as AxiosError).response?.status, message, (message) =>
            console.log(message)
        );

        // 响应错误实现重连功能
        return retry(axiosInstance, err as AxiosError);
    }
};

const useRequest = new MyAxios({
    directlyGetData: true,
    baseURL: staticAxiosConfig.baseUrl,
    timeout: 3000,
    interceptors: _RequstInterceptors,
    abortRepetitiveRequest: true,
    retryConfig: {
        count: 5,
        waitTime: 500
    }
});

export default useRequest;
