function ASMCrypto(algo) {
  algo = algo.replace('-', '_')

  this.generateKey = function() {
    return new Promise(function(resolve){
      resolve(asmCrypto.getRandomValues(new Uint8Array(32)))
    })
  }

  this.encrypt = function(data, key) {
    return new Promise(function(resolve, reject) {
      if(algo === 'AES_GCM') {
        this.generateKey().then(function(nonce){
          resolve({
            d: asmCrypto[algo].encrypt(data, key, nonce),
            n: nonce,
          })
        })
      } else {
        resolve(asmCrypto[algo].encrypt(data, key))
      }
    }.bind(this))
  }

  this.decrypt = function(encrypted, key) {
    return new Promise(function(resolve, reject) {
      var result
      if(algo === 'AES_GCM') {
        result = asmCrypto[algo].decrypt(encrypted.d, key, encrypted.n)
      } else {
        result = asmCrypto[algo].decrypt(encrypted, key)
      }
      this.toString(result)
        .then(resolve)
        .catch(reject)
    }.bind(this))
  }

  this.toString = function(value) {
    return new Promise(function(resolve){
      resolve(String.fromCharCode.apply(null, value))
    })
  }
}

