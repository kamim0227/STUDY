// function a(){
//   console.log("A");
// }
// (function (){
//   console.log("A");
// })() >> 즉시실행

let b = function(){
  console.log("A");
}

function slowfunc(callback){
  //함수 실행 후 다음 기능 실행하세요
  console.log("콜백함수 실행시작");
  callback();
}

slowfunc(b);
//패키지 : 프로그램을 일컫는말
//npm : 노드js 설치기 기본적으로 설치된 프로그램