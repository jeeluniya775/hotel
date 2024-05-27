// const jsonstring = '{"name":"jeel", "age":21 , "city": "sardhar"}';
// const jsonobject = JSON.parse(jsonstring);
// console.log(jsonobject.age);

const object=
{
    name:"jeel",
    age:21,
    city:"sardhar"
};
const json=JSON.stringify(object); 
console.log(json);
console.log(typeof json);