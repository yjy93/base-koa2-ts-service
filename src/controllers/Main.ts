import {Get} from '../shallv/Decorator'

// @Controller('')
export default class MainController {
    @Get('/')
    main(
        ctx
    ) {
        ctx.body = 'hello, ts koa'
    }

    @Get('/list')
    list(
        ctx
    ) {
        ctx.body = 'Hello,Gene!'
    }
}