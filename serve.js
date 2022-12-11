const http = require("http"),
  fs = require("fs"),
  path = require("path"),
  url = require("url");

var root = path.resolve();
const { log } = console;
// 创建服务器
var serve = http.createServer(function (request, response) {
  var extname = path.extname(request.url);
  var pathname = url.parse(request.url).pathname;
  var filepath = path.join(root, pathname);
  // 获取文件状态
  fs.stat(filepath, function (err, stats) {
    if (err) {
      // 发送404响应
      response.writeHead(404);
      response.end("404 Not Found.");
    } else {
      // 针对不同类型文件设置响应头Content-Type
      if (extname == ".html") {
        response.writeHeader(200, {
          "Content-Type": "text/html;charset=UTF-8",
        });
      } else if (extname == ".js") {
        response.writeHeader(200, {
          "Content-Type": "application/javascript;charset=UTF-8",
        });
      } else if (extname == ".mp3") {
        response.writeHeader(200, {
          "Content-Type": '"audio/mpeg";charset=UTF-8',
        });
      }
      // // 发送200响应
      //    response.writeHeader(200, {'Content-Type':'text/html;charset=UTF-8'});
      // response是一个writeStream对象，fs读取html后，可以用pipe方法直接写入
      fs.createReadStream(filepath).pipe(response);
    }
  });
});
log("<=======服务器启动成功,正在监听8068端口=======>");
serve.listen(8068);
