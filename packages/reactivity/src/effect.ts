import { isArray } from "@vue/shared"
import { createDep, Dep } from "./dep"

type KeyToDepMap = Map<any, Dep> //ReactiveEffect 应该是个数组
const targetMap = new WeakMap<any, KeyToDepMap>()
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
        console.log("函数hi下了")
        return this.fn()
    }
}
/**
 * 收集依赖
 * @param target 
 * @param key 
 */
export function track(target: object, key: unknown) {
    console.log(key, "收集依赖")
    if (!activeEffect) return
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        depsMap = new Map()
        targetMap.set(target, depsMap)
    }
    let dep = depsMap.get(key)
    if (!dep) {
        depsMap.set(key, (dep = createDep()))
    }
    trackEffects(dep)
}
/**
 * 利用 dep 依次跟踪指定 key 的所有 effect
 */
export function trackEffects(dep: Dep) {
    dep.add(activeEffect!)
}
/**
 * 触发依赖
 * @param target 
 * @param key 
 * @param newValue 
 */
export function trigger(target: object, key: unknown, newValue: unknown) {
    console.log("触发依赖")
    const depsMap = targetMap.get(target)
    if (!depsMap) {
        return
    }
    const dep: Dep | undefined = depsMap.get(key)
    if (!dep) {
        return
    }
    console.log("=++++++++++++++++++++++++++++++++++++=")
    triggerEffects(dep)
}
/**
 * 依次触发 dep 中 保存的依赖
 * @param dep 
 */
export function triggerEffects(dep: Dep) {
    const effects = isArray(dep) ? dep : [...dep]
    //  依次触发依赖
    for(const effect of effects) {
        console.log(effect,"________-----------------")
        triggerEffect(effect)
    }
}
/**
 * 触发指定依赖
 * @param effect 
 */
export function triggerEffect(effect: ReactiveEffect) {
    console.log("+++++++++++++++++++++++++++++++++++++=================")
    effect.run()
}