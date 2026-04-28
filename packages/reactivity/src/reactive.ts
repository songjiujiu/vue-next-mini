import { mutableHandlers } from "./baseHandlers"
// 👉 导入 Proxy 的“拦截逻辑”（get / set 等都在这里定义）

export const reactiveMap = new WeakMap<object, any>()
// 👉 缓存表：
// key   = 原始对象
// value = 代理后的 Proxy 对象
// 作用：避免重复 reactive 同一个对象，同时防止内存泄漏

export function reactive(target: object)  {
    // 👉 响应式入口函数
    // 用户调用 reactive(obj) 就走这里

    return createReactiveObject(target, mutableHandlers, reactiveMap)
    // 👉 实际交给 createReactiveObject 去创建 Proxy
}

function createReactiveObject(
    target: object,
    baseHandlers: ProxyHandler<any>,
    proxyMap: WeakMap<object, any>
) {
    // 👉 真正创建响应式对象的核心函数

    const existingProxy = proxyMap.get(target)
    // 👉 先去缓存里查这个对象有没有被代理
    if (existingProxy) {
        // 👉 如果已经有 Proxy 了，直接返回（避免重复创建）
        return existingProxy
    }

    const proxy = new Proxy(target, baseHandlers)
    // 👉 创建 Proxy 对象
    // baseHandlers = 拦截器（get/set/deleteProperty 等）

    proxyMap.set(target, proxy)
    // 👉 存入缓存：
    // 原始对象 → Proxy
    // 保证同一个对象只会被代理一次 

    return proxy
    // 👉 返回响应式对象（Proxy）
}