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
            outDir: 'dist',
            minify: false,
            sourcemap: true,
            emptyOutDir: true
        },
        plugins: [
            dts({
                entryRoot: 'src',
                outDir: 'types',
                insertTypesEntry: true,
                tsconfigPath: './tsconfig.json'
            })
        ]
    }
})
