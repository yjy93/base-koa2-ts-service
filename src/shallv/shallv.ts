/*
 * 帮助我们去查找指定目录下的 ts 文件类, 并把通过 Get,Post 等
 * 装饰器装饰的方法或类注册到路由中.
 * */
import * as koa from 'koa'
import * as glob from 'glob' // 能够读取指定目录下的所有文件
import * as KoaRouter from 'koa-router'
import 'reflect-metadata'

interface IOption {
    app: koa,
    controllers: string,
    basePath:string
}

export default class Shallv {
    router = new KoaRouter()

    constructor(
        public  options: IOption
    ) {
        this.loadControllers()
    }

    loadControllers() {
        let files = glob.sync(this.options.controllers)
        console.log(files);
        /*
         * 加载所有读取到的 files 文件
         * */
        files.forEach((file) => {
            // 可以通过 require 方法来加载文件,
            // require 加载的default属性是 export default 导出的对象
            let ControllerClass = require(file).default

            let prefix = Reflect.getMetadata('prefix',ControllerClass)
            if (prefix === undefined){
                return
            }

            // 装饰器是在类被创建的时候就会执行的,
            // 当我们实例化controller 类的时候, 其实该类已经被各种装饰器装饰完成了
            let controller = new ControllerClass()

            /*
             *  自动分析类的特征
             *      - 帮助分析需要注册到路由的方法有哪些
             *      - 对应的请求方式是什么?
             *      - 对应的 url 又是什么?
             * */
            // this.router.get('/', controller.main)
            // this.router.get('/list', controller.list)

            // console.log(123123123, controller.routers);
            /**
             *  controller.routers = [
             *  {
             *      method:"get",
             *      url:"/"
             *      key:"main"
             *  },
             *  {
             *      method:"get",
             *      url:"list",
             *      key:"list"
             *  }
             *  ]
             */
            let routers = Reflect.getMetadata('routers',controller)
            routers.forEach((router)=>{
                this.router[router.method](
                    this.options.basePath + prefix + router.url,
                    controller[router.key]
                )
            })
        })

        // 当所有的控制器注册到路由以后, 把路由注册到app中
        this.options.app.use(this.router.routes())
        // 启动app
        this.options.app.listen("4000", () => {
            console.log("http://localhost:4000/");
        })
    }
}