import { createJSONStorage, type PersistOptions } from './index'

declare namespace WechatMiniprogram {
    interface Wx {
        getStorageSync<T = any>(
            /** 本地缓存中指定的 key */
            key: string
        ): T
        setStorageSync<T = any>(
            /** 本地缓存中指定的 key */
            key: string,
            /** 需要存储的内容。只支持原生类型、Date、及能够通过`JSON.stringify`序列化的对象。 */
            data: T
        ): void
        removeStorageSync(
            /** 本地缓存中指定的 key */
            key: string
        ): void
    }
}
declare const wx: WechatMiniprogram.Wx

/** 通过 wx api 映射持久化工具 */
export const createMpStorage = <S>(
    name: string,
    options?: Partial<PersistOptions<S>> & { pick?: Array<keyof S> }
): PersistOptions<S> => {
    const opts: PersistOptions<S> = {
        name,
        storage: createJSONStorage(() => ({
            getItem: (name) => {
                return wx.getStorageSync(name)
            },
            setItem: (name, value) => {
                wx.setStorageSync(name, value)
            },
            removeItem: (name) => {
                wx.removeStorageSync(name)
            }
        })),
        ...options
    }
    // > 可选的持久化字段.
    if (options?.pick) {
        opts.partialize = (state) => {
            const serialization: Partial<S> = {}
            for (const key of options.pick ?? []) {
                serialization[key] = state[key]
            }
            return serialization as S
        }
        opts.migrate = (persistedState: unknown, version: number) => {
            if (version !== opts.version) {
                return {} as S
            }
            return persistedState as S
        }
    }
    return opts
}
