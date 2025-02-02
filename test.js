function outer(callBack) {
   callBack();
}
function inner() {
   console.log(this);
}
outer(inner);     // window object

//- ××××××××××××××××××××××××××××××××××××××××××××××××××××××

function outer2(callBack, obj) {
   callBack.call(obj);
}
function inner2() {
   console.log(this);
}
outer2(inner, { name: 'hassan' });     // hassan object

const arr = [];
console.log(arr);
