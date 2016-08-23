### rabbit stylus renderer instance inject

stylus 中有个 renderer 实例，这个实例就是程序的入口，每个css文件都对应一个 renderer 实例。

#### stylus entry

stylus 入口有两种方式，区别是 render 方法的调用时机。首先是直接调用 render 方法：

```js
stylus.render(str, opts, (err, css) => console.log(css))
```

还可以稍后调用：

```js
stylus(str, opts).render((err, css) => console.log(css))
```

其实都是调用了 renderer 实例的 render 方法：

```js
new Renderer(str, opts).render(fn)
```

@TODO stylus-loader gulp-stylus


#### Renderer instance

Renderer 实例是由三部分组成的，`options`，`str`和`events`，其中`str`是文件源码内容，`events`是一个`EventEmitter`实例。

options内容比较多，其中有几个重要对象：

* `options.filename` 是要编译的文件名称，默认值为`stylus`
* `options.globals` 里面定义了全局的变量
* `options.functions` 这里是自定义的函数
* `options.use` use里面是 stylus 插件列表
* `options.import` 用于前置导入一些文件
* `options.paths` stylus 的 path 变量，模块会在这里搜索

首先，可以用`renderer.get`与`renderer.set`方法来设置和读取options中的值；`renderer.include`用来把路径添加到`paths`中；而`renderer.use`用于添加插件列表；`renderer.define`方法可以设置全局变量，也能设置自定义函数，如果传入的是值，会添加到`renderer.globals`中，函数会添加到`renderer.functions`里面。


#### Rabbit custom injection

