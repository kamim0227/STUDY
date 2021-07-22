var args = process.argv;
//node.js 는 뒤에 들어오는 입력값을
//두번째 인덱스부터 배열로 삽입한다
// console.log(args[2]);
console.log('A');
console.log('B');

if(args[2]==='1'){
    console.log('C1');
}else{
    console.log('C2');
}

console.log('D');
