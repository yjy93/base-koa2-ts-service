/**
 *  工厂函数, 生成装饰器
 */
import 'reflect-metadata';

export function Get(path: string) {
    return function (
        target: any,
        key: string,
        descriptor: PropertyDescriptor
    ) {
        console.log(target, key, descriptor);
        /**
         *  target 是
         *      new 以后的实例对象.
         */

        /**
         *  Get 装饰器并不是立即绑定路由
         *  它的作用只是用来收集要注册的信息的.
         */
            // target.routers = Array.isArray(target.routers) ? target.routers : []
            // target.routers.push({
            //     method: 'get',
            //     url: path,
            //     key: key
            // })

        let routers = Reflect.getMetadata('routers', target)
        // Reflect.defineMetadata('routers',[],target)
        routers = Array.isArray(routers) ? routers : []
        routers.push({
            method: 'get',
            url: path,
            key: key
        })
        Reflect.defineMetadata('routers', routers, target)
    }
}

export function Controller(prefix: string) {
    return function (
        target: any
    ) {
        Reflect.defineMetadata('prefix', prefix, target)
    }

}
