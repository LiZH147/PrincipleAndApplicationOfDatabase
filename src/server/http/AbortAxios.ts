import { AxiosRequestConfig } from 'axios';

/**
 * 前端短时间内发送多个http请求，如何确保获取最后发送请求的响应
 * 在一个同样的请求在没有返回结果之前其它重复发起的请求都需要等待或者取消。
 */
// 用于存储控制器
const pendingMap = new Map<string, AbortController>();

// 创建请求的唯一标识，返回值类似:'/api:get'，后续作为pendingMap的key
const getUrl = (config: AxiosRequestConfig) => {
    return [config.url, config.method].join(':');
};

class AbortAxios {
    // 添加控制器
    addPending(config: AxiosRequestConfig) {
        this.removePending(config);
        const url = getUrl(config);
        // 创建控制器实例
        const abortController = new AbortController();
        // 定义对应signal标识
        config.signal = abortController.signal;
        if (!pendingMap.has(url)) {
            pendingMap.set(url, abortController);
        }
    }
    // 清除重复请求
    removePending(config: AxiosRequestConfig) {
        const url = getUrl(config);
        if (pendingMap.has(url)) {
            // 获取对应请求的控制器实例
            const abortController = pendingMap.get(url);
            // 取消请求
            abortController?.abort();
            // 将已经取消的请求清除出pendingMap
            pendingMap.delete(url);
        }
    }
}

export default AbortAxios