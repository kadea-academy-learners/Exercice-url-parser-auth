import app from '@adonisjs/core/services/app';
import { ExceptionHandler } from '@adonisjs/core/http';
export default class HttpExceptionHandler extends ExceptionHandler {
    debug = !app.inProduction;
    renderStatusPages = app.inProduction;
    statusPages = {
        '404': (error, { view }) => {
            return view.render('pages/errors/not_found', { error });
        },
        '500..599': (error, { view }) => {
            return view.render('pages/errors/server_error', { error });
        },
    };
    async handle(error, ctx) {
        if (process.env.NODE_ENV === 'production') {
            console.error('Error:', error);
            return ctx.response.status(error.status || 500).send({
                message: error.message,
                stack: error.stack,
                code: error.code,
            });
        }
        return super.handle(error, ctx);
    }
    async report(error, ctx) {
        console.error('Reported Error:', error);
        return super.report(error, ctx);
    }
}
//# sourceMappingURL=handler.js.map