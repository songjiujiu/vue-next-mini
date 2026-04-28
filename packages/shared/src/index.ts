/**
 * 判断一个 是否是一个数字
 */

export const isArray = Array.isArray

export const isObject = (val: unknown) => val !== null && typeof val === 'object'