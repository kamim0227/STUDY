var M = {
  v:'v',
  f : function(){
    console.log(this.v);
  }

};


//이러한 함수들의 묶음(객체)들이 많아지면
//정리정돈할 필요가 있음 >> 객체들의 묶음 > 모듈

module.exports = M;
// M객체를 모듈바깥으로 사용하도록 설정한다


