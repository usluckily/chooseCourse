/**
 * Created by Administrator on 2017/8/21.
 */
// var a = '0xFFD74F25' , b = ''

var a = {
  valueOf:function(){
    console.log('x:'+a.a)
    if(a.a){
      return 4;
    }
    a.a=1;
    return 6;
  }
}


// a.valueOf()

console.log(a)

// console.log(a.__proto__)
// console.log(a<5)
// console.log(a>5)

a < 5 && a > 5 ? console.log(true) : console.log(false);


// console.log(0xFFD74F25)

// var a = [ '1','2','3' ] ,b = a
//
// b[2] = 100
//
// console.log(a)
// console.log(b)
