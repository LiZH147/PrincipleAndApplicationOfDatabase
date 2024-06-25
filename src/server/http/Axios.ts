import {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig
} from 'axios';
import { AxiosOptions, RequstInterceptors } from './type';
import axios from 'axios';
import AbortAxios from './AbortAxios';

class MyAxios {
    private axiosInstance: AxiosInstance;
    // 传入的配置
    private options: AxiosOptions;
    // 拦截器
    private interceptors: RequstInterceptors | undefined;
    constructor(options: AxiosOptions) {
        // 通过axios.create创建Axios实例
        this.axiosInstance = axios.create(options);
        this.options = options;
        this.interceptors = options.interceptors;
        // 对拦截器进行初始化注册
        this.setInterceptors();
    }

    /**
     * 统一请求方法
     */
    request<T = any>(config: AxiosRequestConfig): Promise<T> {
        return new Promise((resolve, rejects) => {
            this.axiosInstance
                .request<any, AxiosResponse<Response>>(config)
                .then((res) => {
                    return resolve(res as unknown as Promise<T>);
                })
                .catch((err) => {
                    return rejects(err);
                });
        });
    }

    get<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'GET' });
    }

    post<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.request<T>({ ...config, headers:{ 'Access-Control-Allow-Origin': '*' }, method: 'POST' });
    }

    put<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'PUT' });
    }

    delete<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'DELETE' });
    }
    /**
     * 注册拦截器方法
     * 添加取消重复请求的功能
     */
    setInterceptors() {
        // 如果配置中没有传入拦截器，则直接返回
        if (!this.interceptors) return;

        // 解构不同拦截器
        const {
            requestInterceptors,
            requestInterceptorsCatch,
            responseInterceptor,
            responseInterceptorsCatch
        } = this.interceptors;

        // 创建取消请求的实例
        const abortAxios = new AbortAxios();
        // 挂载请求拦截器
        this.axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
            // 是否清除重复请求 ？？？？？
            // ?? 标识符类似于|| 但更严谨，当值为0时直接返回0而不看其他
            const abortRepetitiveRequest =
                (config as unknown as any)?.abortRepetitiveRequest ??
                this.options.abortRepetitiveRequest;
            if (abortRepetitiveRequest) {
                // 存储请求标识
                abortAxios.addPending(config);
            }
            if (requestInterceptors) {
                // 如果存在请求拦截器，则将 config 先交给 requestInterceptors 做对应的配置。
                config = requestInterceptors(config);
            }
            return config;
        }, requestInterceptorsCatch ?? undefined);

        // 挂载响应拦截器
        this.axiosInstance.interceptors.response.use(
            (res: AxiosResponse) => {
                // 取消请求
                res && abortAxios.removePending(res.config);

                if (responseInterceptor) {
                    // 如果存在响应拦截器，就先交给拦截器做处理
                    res = responseInterceptor(res);
                }
                // 如果配置了directlyGetData，就提早处理一下，直接返回data
                if (this.options.directlyGetData) {
                    res = res.data;
                }
                return res;
            },
            (err: AxiosError) => {
                if (responseInterceptorsCatch) {
                    // 如果存在相应错误拦截器，就先处理在返回
                    return responseInterceptorsCatch(this.axiosInstance, err);
                }
                return err;
            }
        );
    }
}

export default MyAxios;