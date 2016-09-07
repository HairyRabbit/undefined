# DashArray Magic

在SVG中，有一个叫做stroke-dasharray的属性。从名字可以看出来，这个东东是用于轮廓，因为附加了stroke前缀。具体来说呢，他表示点线边框，就像css中的 1px dashed #000中的dash和dotted那样。这个值由一列数字组成，数字表示线的长度和空隙的长度。比如说：

```svg
<link style="stroke-dasharray=10,5;" />
```

则表示10像素的实线，5像素的空隙。理论来说，这里的数字应该为偶数个，不过写成奇数个也是没问题的，这样svg会把这些数重复一遍，总之不管怎么样，最后都会成为偶数个：

```svg
<link style="stroke-dasharray=1,2,3;" />
```

实质上最后的结果应该是1,2,3,1,2,3。

数字之间可以用逗号或者空格分隔。这个属性的默认值为 none

嗯，所以说，这就是这个属性的功能。但这个属性的魔力远不止这些。

line animation，类似于帧的动画，我们只要魔法般设置一下这个属性的值，就可以做出类似签名一样的酷炫动画。

不如先看一些demo吧。


## 参考

* stroke-dasharray属性 《SVG精髓》 p36 p46 p254
* getTotalLength方法 《SVG精髓》 p205
