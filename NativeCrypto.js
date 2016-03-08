function NativeCrypto(algo) {
  this.generateKey = function() {
    var cryptoObj = window.crypto || window.msCrypto; // pour IE 11
    return cryptoObj.subtle.generateKey(
      {
        name: algo,
        length: 256
      },
      false,
      ['encrypt', 'decrypt']
    )
  }

  this.encrypt = function(data, key) {
    var cryptoObj = window.crypto || window.msCrypto; // pour IE 11
    return new Promise(function(resolve, reject) {
      this.toArrayBuffer(data).then(function(value){
        var iv = cryptoObj.getRandomValues(new Uint8Array(16))

        cryptoObj.subtle.encrypt(
          {
            name: algo,
            iv: iv,
          },
          key,
          value
        ).then(function(result){
          resolve({
            iv: iv,
            data: result,
          })
        }).catch(reject)
      }).catch(reject)
    }.bind(this))
  }

  this.decrypt = function(encrypted, key) {
    var cryptoObj = window.crypto || window.msCrypto; // pour IE 11
    return new Promise(function(resolve, reject) {
      window.crypto.subtle.decrypt(
        {
          name: algo,
          iv: encrypted.iv
        },
        key,
        encrypted.data
      ).then(function(result){
        this.toString(result).then(resolve).catch(reject)
      }.bind(this)).catch(reject)
    }.bind(this))
  }

  this.toArrayBuffer = function(value) {
    return new Promise(function(resolve){
      var b = new Blob([value])
      var f = new FileReader()
      f.onload = function(e) {
        resolve(e.target.result)
      }
      f.readAsArrayBuffer(b)
    })
  }

  this.toString = function(value) {
    return new Promise(function(resolve){
      var b = new Blob([value])
      var f = new FileReader()
      f.onload = function(e) {
        resolve(e.target.result)
      }
      f.readAsText(b)
    })
  }
}

