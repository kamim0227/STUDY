var fs = require('fs');

//readfilesync(동기)

// console.log("A");
// var result = fs.readFileSync('syntex/sample.txt','utf8');
// console.log(result);
// console.log("C");


//비동기
console.log("A");
//비동기방식은 일자로 쭉 내려가면서 불러오는 파일은 
//시작하다가 작업이 끝나면 출력한다
fs.readFile('syntex/sample.txt','utf8',function(err,reuslt){
  //해당파일을 읽어와 대신 오래걸릴수 있으니까 하는동안
  //다른거 해...
  console.log(reuslt);
});

console.log("C");

