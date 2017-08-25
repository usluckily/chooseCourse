/**
 * Created by Administrator on 2017/6/16.
 */
import $ from 'jquery'
import T from '@/assets/js/transcoding'


function isInArr(c,p){
  let state = false , len = p.length;
  for(var i = 0;i<len;i++){
    c == p[i] ? state = true : '';
  }
  return state;
}

function transDataFunc(Info,transData){
  if(transData){//transData用数组传进来
    for(var i in transData){
      var Str = T.toUtf16( Info[ transData[i] ] );
      Info[ transData[i] ] = Str;
    }
    return Info;
  }
}

function transd(trans,d){
  let res = d;
  console.log(res instanceof Array);
  if(trans){
    if(res instanceof Array){
      for(var i in res){
        res[i] = transDataFunc(res[i],trans);
      }
    }else{
      for(var i in res){
        if(res[i] instanceof Array){
          for(var j in res[i]){
            res[i][j] = transDataFunc(res[i][j],trans);
          }
        }
        else if(typeof res[i] == 'string' && isInArr(i,trans)){
          res[i] = T.toUtf16( res[i] );
        }
      }

    }
    return res
  }
}

export default{
  get(url,data,cb,trans){
    $.ajax({
      type:'GET',
      data:data,
      url:url,
      async:true,
      success(d){
        let res
        // transd(JSON.parse(d))
        if(typeof d == 'string'){
          try{
            res = JSON.parse(d)
          }catch(e){ throw e }
        }
        if(trans){
          res = transd(trans,res)
        }
        cb(res)
      }
    })
  },
  post(url,data,cb,trans){
    // alert(JSON.stringify(data))
    $.ajax({
      type:'POST',
      data:data,
      url:url,
      async:true,
      timeout:10000,
      success(d){
        // alert(d)
        let res

        // console.log(d.replace(/\s/g, ""))
        // console.log(d);

        if(typeof d == 'string'){
          try{
            res = JSON.parse(d)
          }catch(e){ throw e }
        }
        if(trans){
          res = transd(trans,res)
        }

        cb(res)
      },
      error(e){
        // alert(JSON.stringify(e))
      }
    })
  },
  jsonp(url,data,cb,trans){
    $.ajax({
      type:'GET',
      data:data,
      dataType:'jsonp',
      url:url,
      async:true,
      success(d){
        // transd(JSON.parse(d))
        cb(d)
      }
    })
  },
}
