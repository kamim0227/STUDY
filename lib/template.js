
//템플릿 객체를 모듈로 뺀다

module.exports = {
  HTML : //동일한 코드 함수화진행
  function(title, list, body, control){
    //body는 어떤 값이 들어갈지 모르므로 html코드들여오기
    return `
    <!doctype html>
    <html>
    <head>
    <title>WEB2 - ${title}</title>
    <meta charset="utf-8">
    </head>
    <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${control}
    ${body}
    </body>
    </html>
    `;
  },list ://중복되는 리스트불러오기 함수 생성
  function(filelist1){
    var list = '<ol>';
    var i = 0;
    while(i < filelist1.length){
      list = list + `<li><a href="/?id=${filelist1[i]}">${filelist1[i]}</a></li>`;
      i = i + 1;
    }
      list = list+'</ol>';
    return list; 
  }
}

