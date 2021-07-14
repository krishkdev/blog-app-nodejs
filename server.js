const http = require("http");
const fs = require("fs");
const _ = require("loadash");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  //Set header content type
  res.setHeader("Content-type", "text/html");

  let path = "./docs/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-us":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();
      break;
    default:
      path += "404.html";
      res.statusCode = 404;
      break;
  }

  //send a HTML file
  fs.readFile(path, (err, data) => {
    if (err) {
      throw err;
    } else {
      res.write(data);
      res.end();
    }
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, "localhost", () => {
  console.log(`Server is listening on port ${PORT}`);
});
