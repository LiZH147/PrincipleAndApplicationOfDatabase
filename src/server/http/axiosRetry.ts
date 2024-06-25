/**
 * 实现请求超时报错重发
 */
import { AxiosError, AxiosInstance } from 'axios';

export function retry(instance: AxiosInstance, err: AxiosError) {
    const config: any = err.config;
    // 获取配置项内容
    const { waitTime, count } = config.retryConfig ?? {};
    // 当前重复请求的次数
    config.currentCount = config.currentCount ?? 0;
    console.log(`第${config.currentCount}次重连`);

    // 如果当前重连次数大于规定次数，则返回Promise
    if (config.currentCount >= count) {
        return Promise.reject(err);
    }
    config.currentCount++;

    // 等待间隔时间结束后在重传
    return wait(waitTime).then(() => instance(config));
}

function wait(waitTime: number) {
    return new Promise((resolve) => setTimeout(resolve, waitTime));
}
