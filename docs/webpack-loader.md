## webpack loader

* preloader
* loader
* postloader


* sync loader

```js
module.exports = function(content) {
  return someSyncOperation(content)
}
```

* async loader

```js
module.exports = function(content) {
  var callback = this.async();
  if(!callback) return someSyncOperation(content);
  someAsyncOperation(content, function(err, result) {
    if(err) return callback(err);
    callback(null, result);
  });
};
```

* raw loader

```js
module.exports = function(content) {
  var callback = this.async();
  if(!callback) return someSyncOperation(content);
  someAsyncOperation(content, function(err, result) {
    if(err) return callback(err);
    callback(null, result);
  });
};
```

* pitching loader

```js
module.exports = function(content) {
    return someSyncOperation(content, this.data.value);
};
module.exports.pitch = function(remainingRequest, precedingRequest, data) {
    if(someCondition()) {
        // fast exit
        return "module.exports = require(" + JSON.stringify("-!" + remainingRequest) + ");";
    }
    data.value = 42;
};
```



