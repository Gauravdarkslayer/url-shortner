const crypto = require("crypto");




exports.createRandomString = ()=>{
 return crypto.randomBytes(10).toString('hex');
}
