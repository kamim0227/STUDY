//array, object
//console.log(1+1);

// 함수는 값임
// 함수를 변수에 넣을수 있으면 값
// 넣을수 없으면 값이 아님

// var i = if(true){
//   console.log(1);
// }
// 조건문은 값이 아님

var func = function(){
  console.log(1+1);
  console.log(1+2);
}

console.log("fun 출력시 함수의 모양이 출력",func);
console.log("func() 출력시 함수가 실행되고 남은 결과값 출력");
func();
//[f] > 배열에 함수가 들어가 있음

var a = [func]; // 배열에 원소로서 함수가 들어간다
console.log(a);

var o = {
  func1:func
}

o.func1()
// 객체에서도 함수를 값으로서 담을 수 있다 
