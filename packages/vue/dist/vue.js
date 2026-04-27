var Vue = (function (exports) {
    'use strict';

    function effect(fn) {
        var _effect = new ReactiveEffect(fn);
        _effect.run();
        return _effect;
    }
    var ReactiveEffect = /** @class */ (function () {
        function ReactiveEffect(fn) {
            this.fn = fn;
        }
        ReactiveEffect.prototype.run = function () {
            return this.fn();
        };
        return ReactiveEffect;
    }());
    /**
     * 收集依赖
     * @param target
     * @param key
     */
    function track(target, key) {
        console.log("收集依赖");
    }
    /**
     * 触发依赖
     * @param target
     * @param key
     * @param newValue
     */
    function trigger(target, key, newValue) {
        console.log("触发依赖");
        console.log("watch");
    }

    var get = createGetter();
    function createGetter() {
        return function get(target, key, receiver) {
            var res = Reflect.get(target, key, receiver);
            track(); //收集依赖
            return res;
        };
    }
    var set = createSetter();
    function createSetter() {
        return function set(target, key, value, receiver) {
            var res = Reflect.get(target, key, receiver);
            trigger(); //触发依赖
            return res;
        };
    }
    var mutableHandlers = {
        get: get,
        set: set
    }; //用于监听get 和 set

    // 👉 导入 Proxy 的“拦截逻辑”（get / set 等都在这里定义）
    var reactiveMap = new WeakMap();
    // 👉 缓存表：
    // key   = 原始对象
    // value = 代理后的 Proxy 对象
    // 作用：避免重复 reactive 同一个对象，同时防止内存泄漏
    function reactive(target) {
        // 👉 响应式入口函数
        // 用户调用 reactive(obj) 就走这里
        return createReactiveObject(target, mutableHandlers, reactiveMap);
        // 👉 实际交给 createReactiveObject 去创建 Proxy
    }
    function createReactiveObject(target, baseHandlers, proxyMap) {
        // 👉 真正创建响应式对象的核心函数
        var existingProxy = proxyMap.get(target);
        // 👉 先去缓存里查这个对象有没有被代理过
        console.log(existingProxy, "existingProxyexistingProxy");
        if (existingProxy) {
            // 👉 如果已经有 Proxy 了，直接返回（避免重复创建）
            return existingProxy;
        }
        var proxy = new Proxy(target, baseHandlers);
        // 👉 创建 Proxy 对象
        // baseHandlers = 拦截器（get/set/deleteProperty 等）
        proxyMap.set(target, proxy);
        // 👉 存入缓存：
        // 原始对象 → Proxy
        // 保证同一个对象只会被代理一次 
        return proxy;
        // 👉 返回响应式对象（Proxy）
    }

    exports.effect = effect;
    exports.reactive = reactive;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
//# sourceMappingURL=vue.js.map
