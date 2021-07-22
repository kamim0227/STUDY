var fs = require('fs');
// 불러오는 모듈 
fs.readFile('sample.txt','utf8',function(err, data){
    console.log(data);
});
// 상위디렉토리에서 실행시 실행되지 않음
//없으므로 실행불가
// 디렉토리 변경 cd 변경할 디렉토리 위치 경로
