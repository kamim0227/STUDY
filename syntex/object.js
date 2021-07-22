var member =['egoing','k8805','hoya']
console.log(member[1]);

var roles= {
  'programmer' : 'egoing',
  'k8805':'designer',
  'hoya':'manager'
}
console.log(roles.programmer);

var i = 0;
while(i<member.length){
  console.log(member[i]);
  i=i+1;
}
console.log('=======================');
for(var n in roles){
  console.log(n,roles[n]);  
}

