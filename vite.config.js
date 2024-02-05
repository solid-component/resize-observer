import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import path from 'path'
import dts from 'vite-plugin-dts'


export default defineConfig({
  build: {
    outDir: "lib",
    rollupOptions: {
      external: ['solid-js'],
    },
    lib: {
      entry: path.resolve(__dirname, "./src/index.tsx"),
      name: "index",
      // fileName: "index"
      fileName: (format) => `index.${format}.js`
    }
  },
  plugins: [dts(), solid()],
})
