# Tapable


Tapable 是 webpack 构建系统的核心。webpack 具备高扩展性的原因就是源于 Tapable 这个库。他本身很简单，源代码只有200来行，那么 Tapable 为什么会有如此强大的作用呢？不如我们首先来看看这个库的使用方法。


## Tapable 简单使用规则


Tapable 的使用方法也很简单，有两种基本形式：

1. 创建一个类，并继承他，
2. 将 Tapable 混入到类的原型中。


两种方式任选一种即可，完成后，我们类的实例就具备了一个 _plugins: {} 属性和一整套操作他的函数，非常赞。


向 _plugins 中添加插件的方式也很简单，调用 Tapable.plugin() 即可。他需要一个插件的名字和对应要执行的函数，像下面这样：



这样会在 _plugins: { name: [] } 中添加一个函数进去，方便之后调用。


## Tapable 执行插件的方式


Tapable 的强大之处就在于他执行插件的方式。总的来说，Tabaple 执行插件有两种形式，基于触发时间，基于返回值。


### 基于触发时间


基于触发时间表示为，对应 name 中的插件有三种执行顺序：


* 同步顺序执行（Sync） 同步顺序执行在某个函数返回后接着触发下一个函数。
* 异步顺序执行（Async） 异步触发会给函数传入一个回调函数 callback，作为最后一个参数，当回调函数触发时会接着调用下一个函数。
* 并行执行（Parallel） 会同时执行集合中所有的函数


### 基于返回值


根据函数返回值的不同，Tapable 也有下面几种机制：


* 返回值无关
* 瀑布形式（waterfall）
*
* 


tapable 用于给类添加插件，并提供了一套强大的插件执行系统。


There are two types of plugin interfaces.

    Timing based
        sync (default): As seen above. Use return.
        async: Last parameter is a callback. Signature: function(err, result)
        parallel: The handlers are invoked parallel (async).

    Return value
        not bailing (default): No return value.
        bailing: The handlers are invoked in order until one handler returns something.
        parallel bailing: The handlers are invoked in parallel (async). The first returned value (by order) is significant.
        waterfall: Each handler gets the result value of the last handler as an argument.
