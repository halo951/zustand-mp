import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import fs from 'fs'

export default defineConfig(() => {
    return {
        build: {
            lib: {
                entry: 'src/index.ts',
                formats: ['cjs', 'es'] as any,
                fileName(_, entryName) {
                    return `${entryName}.js`
                }
            },
            outDir: 'dist',
            minify: false,
            sourcemap: true,
            emptyOutDir: true
        },
        plugins: [
            dts({
                entryRoot: 'src',
                outDir: 'dist/types',
                insertTypesEntry: true // 自动生成 `index.d.ts`
            })
        ]
    }
})
