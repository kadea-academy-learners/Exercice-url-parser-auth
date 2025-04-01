import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import type { StatusPageRange, StatusPageRenderer } from '@adonisjs/core/types/http'

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * Status pages are used to display custom HTML pages for certain error
   * codes. You might want to enable them in production only, but feel
   * free to enable them in development as well.
   */
  protected renderStatusPages = app.inProduction

  /**
   * Status pages is a collection of error code range and a callback
   * to return the HTML contents to send as a response.
   */
  protected statusPages: Record<StatusPageRange, StatusPageRenderer> = {
    '404': (error, { view }) => {
      return view.render('pages/errors/not_found', { error })
    },
    '500..599': (error, { view }) => {
      return view.render('pages/errors/server_error', { error })
    },
  }

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: any, ctx: HttpContext) {
    if (process.env.NODE_ENV === 'production') {
      // Log the error for debugging
      console.error('Error:', error)

      // Show detailed error message in production (temporary debugging)
      return ctx.response.status(error.status || 500).send({
        message: error.message,
        stack: error.stack,
        code: error.code,
      })
    }

    // Default behavior for non-production environments
    return super.handle(error, ctx)
  }

  /**
   * The method is used to report errors to a logging service or
   * a third-party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: any, ctx: HttpContext) {
    // Log the error for debugging or send it to a third-party service
    console.error('Reported Error:', error)

    // Call the parent report method for default behavior
    return super.report(error, ctx)
  }
}
