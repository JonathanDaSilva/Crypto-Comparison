function ForgeCrypto(algo) {

  this.generateKey = function(){
    return Promise.resolve(forge.random.getBytesSync(32))
  }

  this.encrypt = function(data, key){
    return new Promise(function(resolve){
      var iv     = forge.random.getBytesSync(32)
      var cipher = forge.cipher.createCipher(algo, key)
      cipher.start({iv: iv})
      cipher.update(forge.util.createBuffer(data))
      cipher.finish()
      var out = {
        d: cipher.output.getBytes(),
        i: iv,
      }

      if(algo === 'AES-GCM') {
        out['tag'] = cipher.mode.tag
      }

      resolve(out)
    })
  }

  this.decrypt = function(crypted, key){
    return new Promise(function(resolve, reject){
      var decipher = forge.cipher.createDecipher(algo, key)
      decipher.start({
        iv: crypted.i,
        tag: crypted.tag,
      })
      decipher.update(forge.util.createBuffer(crypted.d))
      decipher.finish()
      resolve(decipher.output.data)
    })
  }
}
