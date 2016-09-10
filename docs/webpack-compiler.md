Compiler
Compilation
MainTemplate
Parser
NormalModuleFactory nmf
ContextModuleFactory cmf


### 入口函数 

compiler.run()

### 插件顺序

* content-module-factory



* compiler
* this-compiltion
* factory
* resolver
* parsed-resolve
* new-resolve
* resolve
* make
* run
* before-run


### emit 写入输出到文件

emit -> done

* emitAssets
* emitFiles
* afterEmit
* emitRecords


### Compiler.compile 开始编译

Plugins:: make -> after-compile

compilation.assets
parentCompilation.assets
parentCompilation.children

#### make <- compilation

Parallel: make(

  compilation.finish(
    P: finish-modules
  )
  
  
  compilation.seal(
    PA: after-compile
  )
)

#### after-compile <- compilation

callback(compilation)


### InputFileSystem && OutputFileSystem


### Records

Store/Load compiler state from/to a json file. This will result in persistent ids of modules and chunks.

This is required, when using Hot Code Replacement between multiple calls to the compiler.

```json
{
  "modules": {
    "byIdentifier": {
      "node_modules\\babel-loader\\index.js?{\"presets\":[[\"es2015\",{\"modules\":false}]]}!lib\\WebpackSimple1.js": 0,
      "node_modules\\babel-loader\\index.js?{\"presets\":[[\"es2015\",{\"modules\":false}]]}!lib\\WebpackSimple.js": 1
    },
    "usedIds": {
      "0": 0,
      "1": 1
    }
  },
  "chunks": {
    "byName": {
      "main": 0
    },
    "byBlocks": {},
    "usedIds": {
      "0": 0
    }
  }
}
```


### Compilation Module

addModule
getModule
findModule
buildModule
processModuleDependencies
addModuleDependencies
prefetch
rebuildModule
finish

applyModuleIds


### DependenciesBlock

DependenciesBlockVariable

addBlock
addVariable
addDependency
updateHash
disconnect
unseal
hasDependencies
sortItems


### Module


### NormalModule

request
userRequest
rawRequest
loaders
resource
parser

NormalModule.doBuild() 开始编译
NormalModuleFactory

### NormalModuleFactory

构造

1. context <- options.context || ''
根目录，绝对路径，用来解析entry, output.pathinfo，默认 process.cwd()

2. resolver <- resolvers
```js
  this.resolvers = {
		normal: new Resolver(null),
		loader: new Resolver(null),
		context: new Resolver(null)
	};
```

parser <- new Parser()
options.loaders
options.preLoaders
options.postLoaders

loadersList { list: [{ test: '\.js', loaders: [] }] }

#### NormalModuleFactory.create()

参数

{
  context: 'F:\\atlantis\\lib',
  dependencies: [
    CommonJsRequireDependency {
      module: null,
      request: './WebpackSimple1.js',
      userRequest: './WebpackSimple1.js',
      range: [110, 131]
      loc: { 
        start: { line: 7, column: 21 },
        end: { line: 7, column: 51 }
      },
      optional: false
    }
  ]
}

插件

factory -> resolver


### Compiler


Compiler.createNormalModuleFactory() 创建NormalModule




### loader-runner

EMFILE

``` js
import { runLoaders } from "loader-runner";

runLoaders({
	resource: "/abs/path/to/file.txt?query",
	// String: Absolute path to the resource (optionally including query string)

	loaders: ["/abs/path/to/loader.js?query"],
	// String[]: Absolute paths to the loaders (optionally including query string)

	context: { minimize: true },
	// Additional loader context which is used as base context

	readResource: fs.readFile.bind(fs)
	// A function to read the resource
	// Must have signature function(path, function(err, buffer))

}, function(err, result) {
	// err: Error?

	// result.result: Buffer | String
	// The result

	// result.resourceBuffer: Buffer
	// The raw resource as Buffer (useful for SourceMaps)

	// result.cacheable: Bool
	// Is the result cacheable or do it require reexecution?

	// result.fileDependencies: String[]
	// An array of paths (files) on which the result depends on

	// result.contextDependencies: String[]
	// An array of paths (directories) on which the result depends on
})
```
