console.log('A')
console.log('B')
console.log('C')
var i = 0;
while(i<10){
    console.log('D')
    console.log('E')
    i++;
}

var number = [1,400,12,13,34];
var j = 0;
var total = 0;

while(j<number.length){
    total = total + number[j];
    console.log(`${j}번째 누적값 ${total}`)
    j = j+1;
}
