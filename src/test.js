/**
 * Created by Administrator on 2017/7/26.
 */
let obj = {
  aa:'123',
  bb:'321',
  cc:{
    a:'1',
    b:'2',
    c:{
      a:'q',
      b:'w'
    }
  },
  dd:{
    a:'A',
    b:'B'
  }
},str = ''

function test(obj , num){

  let space = ' ' , endSpace = '  ' , x
  num ? x = num : x = 0

  if(num){
    console.log(num)
  }

  str += '{\n'

  space+='  '

  for(var i in obj){
    if(typeof obj[i] == 'object' && !(obj[i] instanceof Array)){

      str += space+'"'+i+':"'
      test(obj[i],x++)
      str += ',\n'
    }else if(typeof i == 'string' ){
      str += space+'"'+i+'": "'+obj[i]+'", \n'
    }
  }
  str += '}'
  endSpace += ' '
  return str
}

str = test(obj)

console.log(str)
