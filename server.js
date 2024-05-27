function callback()
{
    console.log('i am jeel');

}
const add = function(a,b,callback)
{
    var sum= a+b;
    console.log('answer'+sum);
    callback();
}
var age=21;
const addnumber = function(a,b)
{
    return a+b ;
}
module.exports=
{
    age,
    addnumber
} 


add(5,5,callback); 