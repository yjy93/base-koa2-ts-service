import * as Koa from 'koa'
import * as KoaRouter from 'koa-router'

import Shallv from './shallv/shallv'

const app = new Koa()
// const router = new KoaRouter()
//
// router.get('/', async (ctx) => {
//     ctx.body = 'hello, koa'
// })
//
// app.use(router.routes())
//` // app.listen(4000,()=>{
//     console.log("服务器启动起来了 http://localhost:4000/");
// })

new Shallv({
    app,
    controllers: __dirname + "/controllers/**/*.ts",
    basePath:'/api'
})