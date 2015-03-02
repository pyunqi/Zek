var express     =    require("express");
var multer      =    require('multer');
var app         =    express();
var done        =    false;
var fs = require('fs');
var img = fs.readFileSync('./uploads/default_avatar');

app.use('/img', express.static(__dirname + "/uploads"));
app.use(function(req, res, next) { //跨域
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  next();
});

app.get('/*',function(req, res, next){
  res.status(404).writeHead(200, {'Content-Type': 'image/gif' });
  res.status(404).end(img, 'binary');
});

app.use(multer({ dest: './uploads/',
 rename: function (fieldname, filename) {
    return fieldname;
  },
onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...')
},
onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to  ' + file.path)
  done=true;
},
limits: {
  fieldNameSize: 20, //限制文件名字长度
  fileSize: 100000, //限制文件大小
}
}));

app.get('/',function(req,res){


});

app.post('/api/photo',function(req,res){
  if(done==true){
    res.end("File uploaded.");
  }
});

app.listen(4000,function(){
    console.log("Working on port 4000");
});


//使用方法:

        // scedimg.toBlob(
        //   function(blob){
        //     var xhr = new XMLHttpRequest();
        //     var formData = new FormData();
        //     formData.append(userId, blob);
        //     xhr.open('POST', imageServerUrl, true);
        //     xhr.send(formData);
        //     xhr.onload = function(e) {
        //         Router.go('/profile');
        //     };
        // });