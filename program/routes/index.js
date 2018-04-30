var express = require('express');
var router = express.Router();
var fs=require("fs");
var path=require("path");


var books;
var jsonData;


router.get('/', function(req, res, next) {
    jsonData = JSON.parse(fs.readFileSync(path.join(__dirname,'../books.json')));
    books=jsonData["books"];
    res.render('index', { books:books});
});

module.exports = router;
