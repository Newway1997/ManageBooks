var express = require('express');
var router = express.Router();
var fs=require("fs");
var multer = require('multer');
var path=require("path");

/* GET home page. */
var books;
var jsonData;
var upload = multer({ dest: __dirname + '/temp/' });
fs.readFile(path.join(__dirname,'../books.json'),'UTF-8',function(err,data) {    //读取用户列表json文件

    if (err) {
        console.log(err);        //读取失败则返回失败提示

    } else {
        jsonData = JSON.parse(data);
        books=jsonData["books"];
    }
});

router.get('/', function(req, res, next) {

    res.render('index', { books:books});
});
router.get('/add', function(req, res) {

    res.render('add', {});
});
router.post('/add',upload.fields([{ name: 'file'}, { name: 'img'}]),function(req, res) {
    var file=req.files["file"][0];
    var img=req.files["img"][0];

    var filetype=file.originalname.split(".").pop();
    var imgtype=img.originalname.split('.').pop();
    if(filetype!='txt'||(imgtype!='jpg'&&imgtype!='bmp'&&imgtype!='png')){
        fs.unlink(file.path);
        fs.unlink(img.path);
        res.redirect('/add');
    }else{
    fs.renameSync(file.path,path.join(__dirname,'../public/books/')+file.originalname);
    fs.renameSync(img.path,path.join(__dirname,'../public/images/')+img.originalname);
    console.log(file.originalname);
    console.log(img.originalname);
    jsonData['books'].push({"ID":books.length,
        "name":req.body.bookname,
        "img-src":img.originalname,
        "txt-src":file.originalname
    });
    console.log(JSON.stringify(jsonData));
    fs.writeFile(path.join(__dirname,'../books.json'),JSON.stringify(jsonData),function(err){
        if (err) {console.log(err);}
        console.log("ok");
        books=jsonData['books'];
    });
    res.redirect('/');
    }
});

module.exports = router;
