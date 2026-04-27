type KeyToDepMap = Map<any,ReactiveEffect>
const targetMap = new WeakMap<any,KeyToDepMap>()
export function effect<T = any>(fn: () => T) {
    const _effect = new ReactiveEffect(fn)
    _effect.run()
    return _effect
}
export let activeEffect: ReactiveEffect | undefined
export class ReactiveEffect<T = any> {
    constructor(public fn: () => T) { }
    run(): T {
        activeEffect = this
        return this.fn()
    }
}
/**
 * 收集依赖
 * @param target 
 * @param key 
 */
export function track(target: object, key: unknown) {
    console.log(key,"收集依赖")
    if(!activeEffect) return
    let depsMap = targetMap.get(target)
    if(!depsMap) {
        depsMap = new Map()
        targetMap.set(target,depsMap)
    }
    depsMap.set(key,activeEffect)
    console.log(targetMap,"targettargettargettarget")
}
/**
 * 触发依赖
 * @param target 
 * @param key 
 * @param newValue 
 */
export function trigger(target: object, key: unknown, newValue: unknown) {
    console.log("触发依赖")
    console.log("watch")
}