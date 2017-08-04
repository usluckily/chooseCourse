/**
 * Created by Administrator on 2017/7/14.
 */
import $ from 'jquery'

export default{
  DateDiff:function(d1,d2){
    var day = 24 * 60 * 60 *1000;
    try{
      var dateArr = d1.split("-");
      var checkDate = new Date();
      checkDate.setFullYear(dateArr[0], dateArr[1]-1, dateArr[2]);
      var checkTime = checkDate.getTime();

      var dateArr2 = d2.split("-");
      var checkDate2 = new Date();
      checkDate2.setFullYear(dateArr2[0], dateArr2[1]-1, dateArr2[2]);
      var checkTime2 = checkDate2.getTime();

      var cha = (checkTime - checkTime2)/day;
      return cha;
    }catch(e){
      return false;
    }
  },
  rootFontSize : function(){
    var base = 500;
    var w = document.body.clientWidth;
    if( w<=800 ){
      var result = 20 + (w - base) / 30;
      result >= 10 ? $('html').css({'fontSize':result + 'px'}) : $('html').css({'fontSize':10 + 'px'});
    }
  },
  cardH: function(){
    var htmlH = $('.all').height();
    var headH = $('.head').height();
    $('.card_box').height(htmlH - headH);
    console.log("all:"+htmlH+",head:"+headH);
  },
}
