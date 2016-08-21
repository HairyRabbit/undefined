### rabbit custom output comments

stylus 中的注释简单来说分为两种，单行注释和多行注释。就像 JavaScript 那样单行注释以`//`开始，而多行注释包裹在`/**/`中。

在 stylus 的注释中，有些情况需要说明。单行注释不会输出，因为并不是 css 的规则，而多行注释的话是会输出的。当然了，如果开启 stylus 的`compress`选项的话来启用压缩，那多行注释也不会输出的，**除非写在了`/*! */`中**，这样就会无视压缩选项：

```stylus
/*!
 * This comments will output.
 */
 
foo()
```

#### rabbit 专用输出注释

这里的注释定义了用于输出满足条件下的样式：

```stylus
///> environment: development

foo()

///>
```

这样`foo()`只在`environment === "development"`时输出，其他情况下会被替换成普通多行注释：

```stylus
/* environment: development
 
foo()

*/
```

如上所示，`environment`对象会在初始化 render 时传入。


#### rabbit stylus define 路径匹配规则

查找时，先在`config.styles.global`中查找对应的 key，如果没有找到，会在`config`下进行查找，此时没找到对象时，结果为`false`。
