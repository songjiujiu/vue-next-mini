import { track, trigger } from "./effect"
const get = createGetter()
function createGetter() {
    return function get(target: object, key: string | symbol, receiver: object) {
        const res = Reflect.get(target, key, receiver)
        track(target, key)//收集依赖
        return res
    }
}
const set = createSetter()
function createSetter() {
    return function set(target: object, key: string | symbol, value: unknown, receiver: object) {
        const res = Reflect.set(target, key, value, receiver)
        console.log("==========================================")
        trigger(target, key, value )//触发依赖
        return res
    }
}
export const mutableHandlers: ProxyHandler<object> = {
    get,
    set
} //用于监听get 和 set
