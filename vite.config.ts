import { defineConfig, LibraryFormats } from 'vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import fs from 'fs'

export default defineConfig(() => {
    return {
        build: {
            lib: {
                entry: 'src/index.ts',
                formats: ['cjs'] as Array<LibraryFormats>,
                fileName(_, entryName) {
                    return `${entryName}.js`
                }
            },
            outDir: 'miniprogram',
            minify: false,
            sourcemap: true,
            emptyOutDir: true,

            rollupOptions: {
                input: {
                    index: resolve(__dirname, 'src/index.ts'),
                    middleware: resolve(__dirname, 'src/middleware.ts'),
                    shallow: resolve(__dirname, 'src/shallow.ts'),
                    vanilla: resolve(__dirname, 'src/vanilla.ts')
                }
            }
        },
        plugins: [
            dts({
                entryRoot: 'src',
                outDir: 'miniprogram',
                insertTypesEntry: true,
                tsconfigPath: './tsconfig.json'
            })
        ]
    }
})
