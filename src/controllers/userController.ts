import {Get,Controller} from '../shallv/Decorator'

@Controller('/user')
export default class UserController {

    @Get('/register')
    register(ctx){
        ctx.body = "注册用户"
    }

    @Get('/login')
    login(ctx){
        ctx.body = "用户登录"
    }
}