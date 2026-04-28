import { createDep, Dep } from "./dep"
import { activeEffect, track, trackEffects } from "./effect"
import { toReactive } from "./reactive"
export interface Ref<T = any> {
    value: T
}
export function ref(value?: unknown) {
    return createRef(value, false)
}

function createRef(rewValue: unknown, shallow: boolean) {
    if (isRef(rewValue)) {
        return rewValue
    }
    
    return new RefImpl(rewValue, shallow)
}

class RefImpl<T> {
    private _value: T
    public dep?: Dep = undefined
    public readonly __v_isRef = true
    constructor(value: T, public readonly __v_isShallow: boolean) {
        this._value = __v_isShallow ? value : toReactive(value)
    }

    get value() {
        // 依赖收集
        trackRefValue(this)
        return this._value
    }
    set value(newVal) {

    }
}
export function trackRefValue(ref) {
    if (activeEffect) {
        trackEffects(ref.dep || (ref.dep = createDep()))
    }
}
/**
 * 是否为 ref
 * @param 
 * @returns 
 */
export function isRef(r: any): r is Ref {
    return !!(r && r.__v_isRef === true)
}