var window = self
self.importScripts("register.js")
self.importScripts("es6-promise.min.js")
self.importScripts("forge.bundle.js")
self.importScripts("asmcrypto.lib.js")
self.importScripts("NativeCrypto.js")
self.importScripts("ForgeCrypto.js")
self.importScripts("ASMCrypto.js")
self.importScripts("execute.js")

var seed = []
for(var i=0; i<256; i++) {
  seed.push(Math.floor(Math.random()*100))
}

asmCrypto.getRandomValues.seed( new Uint8Array(seed) )

register(function (message) {
  var librarie = message.librarie
  var algo     = message.algo
  var number   = message.number

  return execute(librarie, algo, number)
});
