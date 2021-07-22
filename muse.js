// var M = {
//   v:'v',
//   f : function(){
//     console.log(this.v);
//   }

// };

//mpart에서 모듈로 뺀 것을 가지고 온다
var M = require('./mpart.js');
// 모듈 가지고오기 requeir(가져올 모듈이 있는 경로)
M.f();

//이러한 함수들의 묶음(객체)들이 많아지면
//정리정돈할 필요가 있음 >> 객체들의 묶음 > 모듈


//

