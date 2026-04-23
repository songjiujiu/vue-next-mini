const get = createGetter()
function createGetter() {
    return function get (target: object, key: string | symbol, receiver: object) {
        const res = Reflect.get(target,key,receiver)
        return res
    }
}
const set = createSetter()
function createSetter() {
    return function set ( target: Record<string | symbol, unknown>,key: string | symbol,value: unknown,receiver: object) {

    }
}
export const mutableHandlers: ProxyHandler<object> = {
    get,
    set
} //用于监听get 和 set
