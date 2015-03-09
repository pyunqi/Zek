var express     =    require("express");
var multer      =    require('multer');
var fs          =    require('fs');
var app         =    express();
var done        =    false;
var avatarFolder = './uploads/';

app.use('/img', express.static(__dirname + '/uploads'));
app.use(function(req, res, next) { //跨域
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  next();
});

app.use(multer({ dest: avatarFolder,
 rename: function (fieldname, filename) {
    return fieldname;
  },
onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...')
},
onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to ' + file.path)
  done=true;
},
limits: {
  fieldNameSize: 20, //限制文件名字长度
  fileSize: 100000, //限制文件大小
}
}));

//测试multer 页面
// var form = "<form method=\"post\" action=\"uploadgallerypic\" enctype=\"multipart/form-data\" >" +
//     "<input type=\"file\" name=\"gallerypic\" />" +
//     "<input type=\"submit\" value=\"upload\" />" +
//     "</form>";

// app.get('/',function(req,res){
//    res.writeHead(200, {'Content-Type': 'text/html' });
//    res.end(form);

// });

app.post('/api/photo-multer',function(req,res){
  if(done==true){
    res.end("File uploaded.");
  }
});

app.post('/api/photo',function(req,res){

var tempAvater = req.query.avatar;
var fileName = req.query.id;
var avatarFile = avatarFolder+fileName;
var decodedImage = new Buffer(tempAvater.split(',')[1], 'base64').toString('binary');

fs.writeFile(avatarFile,decodedImage, 'binary', function(err) {
    if(err) {
          // console.log(err);
      } else {
          // console.log(fileName);
          res.end("ok");
      }
    }); 
});

app.listen(4000,function(){
    console.log("Working on port 4000");
});


//直接传送blob的client端使用方法:

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