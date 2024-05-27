
var fs=require('fs');
var os=require('os');

var user= os.userInfo();
console.log(user);

fs.appendFile('review.txt','hello i am ' +user.username+'!\n',()=>{console.log('file is created')});
console.log(os);