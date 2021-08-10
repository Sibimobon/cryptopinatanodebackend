/*const BitcoinGateway = require('bitcoin-receive-payments')
const gateway = new BitcoinGateway(pub_key, openexchangerates_key)




var unique_ID = 5554555 // get this from your database
 
gateway.createAddress(unique_ID)
.then(function(address) {
 
    console.log('got new address', address.address, 'and it has', address.seconds_left / 60, 'minutes left before it expires.')
    
    var amount = 3.99
    
    console.log('ask user to pay ', amount, 'USD in it as', gateway.USDtoBIT(amount) + ' bits, using HTML, preferably as a QR code')
    
}).catch(function() {
    console.log('limit reached! cant get a new address :(')
})

*/