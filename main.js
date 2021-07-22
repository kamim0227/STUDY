const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
// 생성한 모듈을 불러온다
const path = require('path');
const sanitizeHtml = require('sanitize-html');
// 스크립트 태그 입력시 인식안하도록 하는 모듈
const template = require('./lib/template.js');

const app = http.createServer(function (request, response) {
  const _url = request.url;
  const queryData = url.parse(_url, true).query; // url의 쿼리 추출
  const { pathname } = url.parse(_url, true);
  if (pathname === '/') {
    // 홈과 각각의 페이지를 구분할수 없음
    if (queryData.id === undefined) {
      // 홈 인경우 쿼리문 없음
      // 파일리스트 가지고 오기
      fs.readdir('./data', function (err, filelist1) {
        // 특정디렉토리의 리스트를 배열로 생성해 반환한다
        const title = 'Welcome'; // 메인 페이지인 경우 띄울 내용
        const data1 = 'Hello, Node.js';
        // 특정 디렉토리에 있는 리스트 a태그로 리스트 출력하기
        const list = template.list(filelist1);
        // 실질적으로 메인페이지에 띄울 내용
        const html = template.HTML(
          title,
          list,
          `<h2>${title}</h2><p>${data1}</p>`,
          `<a href = "/creat">creat</a>`,
        );
        response.writeHead(200); // 잘 실행됬는지 확인
        response.end(html); // 메인페이지에 띄우기
      });
    } else {
      // 홈 이 아닌경우
      fs.readdir('./data', function (err, filelist1) {
        // 특정 디렉토리의 리스트 가져오기
        // 특정디렉토리의 리스트를 배열로 생성해 반환한다
        const filteredID = path.parse(queryData.id).base;
        fs.readFile(`data/${filteredID}`, 'utf8', function (err, data) {
          // 쿼리의 아이디를 통해 해당하는 파일 내용 불러오기
          var title = queryData.id;
          const sanitizedTitle = sanitizeHtml(title);
          const sanitizedData = sanitizeHtml(data, { allowedTags: ['h1'] });

          const list = template.list(filelist1);
          const html = template.HTML(
            sanitizedTitle,
            list,
            `<h2>${sanitizedTitle}</h2>${sanitizedData}`,
            `<a href = "/creat">creat</a>
            <a href = "/update?id=${sanitizedTitle}">update</a>
            <form action="/delete_process" method="post">
                  <input type="hidden" name="id" value="${sanitizedTitle}">
                  <input type="submit" value="delete">
                </form>`,
          );
          response.writeHead(200); // 잘 실행됬는지 확인
          response.end(html);
        });
      });
    }
  } else if (pathname === '/creat') {
    fs.readdir('./data', function (err, filelist1) {
      // 특정디렉토리의 리스트를 배열로 생성해 반환한다

      const title = 'WEB - creat';
      const list = template.list(filelist1);
      // 실질적으로 메인페이지에 띄울 내용
      const html = template.HTML(
        title,
        list,
        `
        <form action="/create_process" method="POST">
<p><input type = 'text' name = 'title' placeholder = 'title'></p>
<p><textarea name = 'description' placeholder = 'descrription'></textarea></p>
<p><input type="submit"></p></form>
        `,
        '',
      );
      response.writeHead(200); // 잘 실행됬는지 확인
      response.end(html); // 메인페이지에 띄우기
    });
  } else if (pathname === '/create_process') {
    var body = '';
    request.on('data', function (data) {
      // 웹브라우저가 post로 보낼때 부분적으로 나눠 받으면서 data라고 받는다
      body += data;
    });
    request.on('end', function () {
      // 데이터가 없으면 end뒤의 콜백함수 실행
      const post = qs.parse(body);
      // 데이터를 다 불러오면 끝내기
      const { title } = post;
      const { description } = post;

      fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
        response.writeHead(302, { Location: `/?id=${title}` });
        response.end(); // 메인페이지에 띄우기
        // 생성된 페이지로 이동하기(302)
        // {location : 이동할 곳}
      });
    });
  } else if (pathname === '/update') {
    fs.readdir('./data', function (err, filelist1) {
      // 특정 디렉토리의 리스트 가져오기
      // 특정디렉토리의 리스트를 배열로 생성해 반환한다
      const filteredID = path.parse(queryData.id).base;
      fs.readFile(`data/${filteredID}`, 'utf8', function (err, data) {
        // 쿼리의 아이디를 통해 해당하는 파일 내용 불러오기
        const title = queryData.id;
        const list = template.list(filelist1);
        const html = template.HTML(
          title,
          list,
          `
            <form action="/update_process" method="POST">
            <p><input type = "hidden" name = "id" value = "${title}"></p> 
<p>
<input type = 'text' name = 'title' placeholder = 'title' value = "${title}">
</p>
<p>
<textarea name = 'description' placeholder = 'descrription' >${data}</textarea>
</p>
<p><input type="submit"></p>
</form>
            `,
          ` <a href = "/creat">creat</a>
            <a href = "/update?id=${title}">update</a>`,
        );
        response.writeHead(200); // 잘 실행됬는지 확인
        response.end(html);
      });
    });
  } else if (pathname === '/update_process') {
    var body = '';
    request.on('data', function (data) {
      // 웹브라우저가 post로 보낼때 부분적으로 나눠 받으면서 data라고 받는다
      body += data;
    });
    request.on('end', function () {
      // 데이터가 없으면 end뒤의 콜백함수 실행
      const post = qs.parse(body);
      // 데이터를 다 불러오면 끝내기
      const { title } = post;
      const { id } = post;
      const { description } = post;
      fs.rename(`data/${id}`, `data/${title}`, function (err) {
        // 파일 이름 변경하기
        // 내용 변경하기
        fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
          response.writeHead(302, { Location: `/?id=${title}` });
          response.end(); // 메인페이지에 띄우기
          // 생성된 페이지로 이동하기(302)
          // {location : 이동할 곳}
        });
      });
    });
  } else if (pathname === '/delete_process') {
    var body = '';

    request.on('data', function (data) {
      // 웹브라우저가 post로 보낼때 부분적으로 나눠 받으면서 data라고 받는다
      body += data;
    });
    request.on('end', function () {
      // 데이터가 없으면 end뒤의 콜백함수 실행
      const post = qs.parse(body);
      const { id } = post;
      const filteredID = path.parse(id).base;
      // 사용자가 쿼리에 경로를 입력할 경우
      // 중요한 정보가 노출될 수 있다
      // 입력한 경로를 차단(검사)하는 path.parse.base를 사용해
      // 값을 불러오지 못하도록 한다(데이터 입/출력 둘다)
      fs.unlink(`data/${filteredID}`, function (error) {
        response.writeHead(302, { Location: `/` });
        response.end();
      });
    });
  } else {
    response.writeHead(404);
    response.end('Not found');
  }
});
app.listen(3000);

// 해당 버튼을 클릭시 데이터를 불러오기 때문에
// 데이터만 변경되도 실시간으로 변경된 데이터를 출력한다
// 하지만 해당서버 > main 수정시 껏다 켜야함
