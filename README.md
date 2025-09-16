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


## Using

- app.json
```json
{
  "usingComponents": {
    "zustand": "zustand/index"
  }
}
```

- app.ts

```ts
import { create } from 'zustand'

// export const useStore = create(...) 

```

- use middleware

```json
{
  "usingComponents": {
    "zustand/middleware": "zustand/middleware"
  }
}  
```


- app.ts

```ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// export const useStore = create()(persist((set) => {}, {}))  

```
