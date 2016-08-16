# Happy Hacking

[![Built with Spacemacs](https://cdn.rawgit.com/syl20bnr/spacemacs/442d025779da2f62fc86c2082703697714db6514/assets/spacemacs-badge.svg)](http://github.com/syl20bnr/spacemacs)

## Rabbit 专用不科学实验性超级智能超绝super超wonderful超excellent华丽但不实用的打包工具

那么首先，什么是专用的？

专用的就是说只有兔可以用，其他人都不可以。

好的，下面还是来说打包的事情，这会分别谈及5个方面的打包过程，他们分别是：

- JS
- CSS
- HTML
- Image
- Font

是的，没看错也没在开玩笑，目的也就是为了增强打包的能力。因为兔的职业就是4号位高阶前端附加能力大祭祀。

## Happypack loader 辅助 webpack2 急速 rebuild

是什么让webpack打包如此的慢？

除了常规的优化策略，这里用到了`Happypack`。`Happypack`的目的是为了让打包任务多线程并列运行。如果将缓存开到最大，打包速度就是飞起。在前置缓存之后打包速度的提升更是非常明显的。

`Happypack`的配置使用很简单，只需要将普通的`webpack loader`改为`happypack loader`就好：

```js
{
  test: /\.jsx?$/,
  loader: 'happypack/loader?id=js'
}

new HappyPack({
  id: 'js',
  threads: 2,
  loaders: ['babel?cacheDirectory=true'],
  verbose: false
})
```

`Happypack`有线程池，多个loader时可以用这个来代替设置`threads`：

```js
const pool = HappyPack.ThreadPool({ size: 6 })

new HappyPack({
  id: 'js',
  threadPool: pool,
  loaders: ['babel?cacheDirectory=true'],
  verbose: false
})
```

下面我们就来比较一下速度提升，首先是没有用到`Happypack`时的build和rebuild情况：

接下来是使用了Happypack，可以看到前边在启动`Happypack`时要稍微废些时间，但是build和rebuild的时间都有显著减少。

再让我们来试试有缓存之后的打包速度：



## dll 的打包策略

前置`dll`的目的同样也是为了增速。

## 自动将 dependencies 打包到 dll

策略是，监听`package.json`文件`dependencies`部分的变化，变化时重新将所有dependencies中申明的依赖全部打包。因为有Happypack前置缓存的原因，所以这个watch打包也是非常快的。

但这里有个问题，有些依赖并不能直接打包，比如`monaco-editor`，这样打包会报错。解决办法有两个：

1. 安装这些依赖时不要使用`-S`，使用`-D`是可以的，比如`npm i -D monaco-editor`，这样依赖会安装到`devDependencies`而不是`dependencies`
2. 将依赖的名称加入到`dll`的黑名单中，如此打包会自动忽略同名的依赖，当然这个需要写在`.rabbit`中

当然，报错了也不要紧，兔builder 会将报错的家伙扔到黑名单中，然后放弃打包或是重新打包。

## 用 webpack 来打包 elm app

* 很多情况下会写 port 与 Js 交互，若是写 Js 用了到 es ts 或其他 toJs，就有打包的需求，那么，webpack you need
* elm reactor 用来调试很强大，但同样的事情 webpack 也可以做到，并提供了其他的便利功能，比如 api mock server
* 生产模式下，项目上线也可以用 webpack 直接打包成产品

## 工具自动重启

监听builder文件夹，发生变化后会自动重启兔builder


## CSS Live

Stylus / Postcss

* stylus and css naming
* stylus modules import and export
* stylus mixins and functions
* postcss propery and value alias
* css layout and views


### stylus and css naming

这里约定了 stylus/css 中的命名惯例。

在 stylus 的 utils 中， naming 约定为：

```
[_]<Namespace>-<ClassName>[-<ChildClassName>][--<Modifier>]
```

其中，以`_`开头的表示为私有，不应该被导出，也不应该被使用。

目前只规定了两种`Namespace`：

* c - Components. e.g `.c-btn`
* u - Utilities.  e.g `.u-fill`

在`lib/`中只能找到**u**开头的工具，组件的话因为拆出去了，需要单独加载。


### stylus modules import and export

#### stylus 中的导入规则

stylus 中有两个关键字用来导入，分别是`@import`和`@require`。他们的区别是，**@require**只导入一次，而**@import**相当于载入脚本，可以导入多次。

需要注意的地方是，如果使用**@import**来导入**css**文件：

```stylus
@import "index.css"
```

他会原样转义出来，而不是将css文件导入，可能是因为@import也是css的关键字吧：

```css
@import "index.css"
```

不过用来导入styl文件的话就不会了。stylus 的路径规则有两个，和 node 类似。首先 stylus 有一个类似的 path 变量，他会在 path 变量给定的数组中搜索，这里的 path 需要提前配置：

```js
function stylusOption() {
  return {
    include: env.paths,
  }
}
```

然后是搜索规则，比如下面的导入：

```stylus
@import "module"
```

这样 stylus 会搜索如下两个路劲：

* `module.styl`
* `module/index.styl`


stylus 的导入也可以嵌套进选择器中，这样对于**@media**会很有利：

```stylus
@media mobile
  @import "mobile"
```

值得一提的是，stylus的路劲规则支持**glob**，这就是说可以使用`*`来导入文件夹下的全部 styl 文件：

```stylus
@import "component/*"
```


#### Rabbit 专用导入规则

每个工具因为都是mixin，所以都有一个导出函数用来导出工具类，例如`u-grid`就会有对应的`u-grid-export`：

```stylus

u-grid-export(
  $gutter = 1.5rem,
  $bRow   = "row",
  $bGrid  = "grid",
  $isFlex = true,
  $isMixinWidth = false,
  $isExportRow  = true,
  $isExportGrid = true,
  $isExportGridOffset = false,
  $isExportGridPull = false,
  $isExportGridPush = false,
  $isExportGridLast = true,
  $isLastMixinWidth = false,
  $mGridLast = "last"
)

  // Export Row basic.
  if $isExportRow
    .{$bRow}
      u-row $gutter $isFlex

      
  // Export Grid basic.
  if $isExportGrid
    .{$bGrid}
      u-grid $gutter $isExportGridLast $isFlex

      
  // Export Grid from right.
  if $isExportGridLast
    .{$bGrid}-{$mGridLast}
      u-grid $gutter $isExportGridLast
      
```

所以对应的导入会有几种情况：

**默认引入**

```stylus
@require "u:grid"
```

默认行为，不会导出任何样式。


**自动导出**

```stylus
@require "u:grid[]"
```

加了`[]`后，会自动执行`u-<namespace>-export`函数。当然，方括号中可以写传递给导出函数的参数：

```stylus
@require "u:grid[$isFlex:true,$isExportGridLast:false]"
```

注意这里的参数是 **1:1** 传递给函数的，如果格式不对，或有特殊符号，会报错的说。

**从配置文件读取合并**

```stylus
//@Todos
```

这样会从`rabbit.json`中读取配置，并作为参数传递给导出函数。


### postcss propery and value alias


### stylus mixins and functions


### css layout and views


### css media and breakpoint


### spacemacs and stylus mode plugins
