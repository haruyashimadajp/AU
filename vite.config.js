import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// `npm run build` で dist/index.html 1ファイルにまとめる
export default defineConfig({
  plugins: [viteSingleFile()],
});
