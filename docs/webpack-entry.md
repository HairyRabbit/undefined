### Dependency

this.module = null

getReference -> null | { module, importedNames }

updateHash -> hash.update

disconnect -> module = null

compareLocations target.loc


### ModuleDependency

this.request = request
this.userRequest = request

isEqualResource 判断两个 request 是否相等


### SingleEntryDependency

this.type = 'signal entry'


### SignleEntryPlugin

context - [path=process.cwd()]
entry - path
name - "main"

p: compilation ->
  compilation.dependencyFactories.set(signleEntryDep, normalModuleFactory)
  
p: make -> 
  dep: SignleEntryPlugin(entry)
  compilation.addEntry(context, dep, name, cb)
