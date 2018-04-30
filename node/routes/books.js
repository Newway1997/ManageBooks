var express = require('express');
var router = express.Router();
var fs=require('fs');
var path=require('path');
/* GET users listing. */

var books;
fs.readFile(path.join(__dirname,'../books.json'),'utf-8',function(err,data) {    //读取用户列表json文件
    if (err) {
        console.log(err);        //读取失败则返回失败提示
    } else {
        books = JSON.parse(data)["books"];
    }
});

router.get("/:id",function (req,res) {
    if(req.params.id>=books.length){
    var data=fs.readFileSync(path.join(__dirname,'../books.json'),'utf-8');
    books=JSON.parse(data)['books'];}
  fs.readFile(path.join(__dirname,'../public/books/')+books[req.params.id]['txt-src'],'utf-8',function (err,data) {

      if (err) {
        res.writeHeader(404, {'Content-Type':'text/html;charset=UTF-8'});
        res.end("没有找到这本书");
          console.log(err);        //读取失败则返回失败提示
      } else {
          res.render('book', { bookTitle:books[req.params.id].name,bookContent:data});
          return;
      }

  });
});
module.exports = router;
