function execute(librarie, algo, number) {
  return new Promise(function(resolve, reject) {
    var crypto
    if(librarie === 'native') {
      crypto = new NativeCrypto(algo)
    } else if( librarie === 'forge' ) {
      crypto = new ForgeCrypto(algo)
    } else if( librarie === 'asm' ) {
      crypto = new ASMCrypto(algo)
    }

    crypto.generateKey().then(function(key){
      var promises = []

      for(var i=0; i<parseInt(number); i++) {
        promises.push(crypto.encrypt('ntsauintresuaeinrtnaut nrauite', key))
      }

      Promise.all(promises).then(function(results){
        var promises = []

        for(var i in results) {
          var result = results[i]
          promises.push(crypto.decrypt(result, key))
        }

        Promise.all(promises).then(resolve).catch(reject)
      }).catch(reject)
    }).catch(reject)
  })
}
