/**
 * Created by Administrator on 2017/8/3.
 */
let arr = [
  {name:'阿斯顿',con:'12312321321',id:'1'},
  {name:'打断点',con:'5554545',id:'2'},
  {name:'阿斯顿',con:'阿大声道是',id:'1'},
  {name:'费大幅度',con:'ffffff',id:'3'},
  {name:'费大幅度',con:'ffffff',id:'3'}
]

let arr2 = arr

for(var i in arr){
  for(var j in arr){
    if(arr[i].id == arr[j].id && i != j){
      arr2[i].con+=','+arr[j].con
      arr2.splice(j,1)
    }
  }
}
console.log(arr2)

console.log(decodeURI('%E4%BD%93%E8%B4%A8%E6%A3%80%E6%B5%8B%E6%A8%A1%E7%89%88'))
