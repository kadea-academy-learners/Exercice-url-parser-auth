import { defineConfig } from 'vite';
import adonisjs from '@adonisjs/vite/client';
export default defineConfig({
    build: {
        outDir: 'build/public',
        assetsDir: 'assets',
        emptyOutDir: true
    },
    plugins: [
        adonisjs({
            entrypoints: ['resources/css/app.css', 'resources/js/app.js', 'resources/js/urls.js'],
            reload: ['resources/views/**/*.edge'],
        }),
    ],
});
//# sourceMappingURL=vite.config.js.map