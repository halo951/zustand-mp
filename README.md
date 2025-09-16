# zustand-mp

> 他或许什么都没有改, 只是让 `zustand` 可以在原生小程序中运行.
>
> !!! 注意: API 相比于原版并未做任何修改. 只删除了一些东西



## Refs
- [origin](https://www.npmjs.com/package/zustand)
- [doc](https://zustand.docs.pmnd.rs/)


## 改动内容描述

1. 移除对react的引用
2. 增加 `miniprogram` 导出.
3. 移除了 `redux`, `devtool`, `immer` 中间件.
4. 注: 引入方式发生了改变.
5. 新增了 `createStorage` 方法, 用来创建 storage 缓存


## Using

1. `yarn add zustand-mp`
2. 小程序开发者工具 build NPM
3. code example

```ts
import { createStore, persist, createStorage } from 'zustand-mp'

interface State {}
interface Actions {}

const useUserStore = createStore<State & Actions>()(
    persist((set) {
        return {}
    }, createStorage('user'))
)
```