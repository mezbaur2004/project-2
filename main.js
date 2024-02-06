let http=require('http');
let fs=require('fs');
let multer=require('multer');

let storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./uploaded");
    },
    filename:function(req,file,cb){
        let name=file.originalname;
        cb(null,name);
    }
})

const upload = multer({storage}).array('myfile',5)

let server=http.createServer(function(req,res){
    if(req.url=="/"){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write("<h1>This is Homepage</h1>");
        res.end();
    }else if(req.url=="/about"){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write("<h1>This is About Page</h1>");
        res.end();
    }else if(req.url=="/contact"){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write("<h1>This is Contact Page</h1>");
        res.end();
    }else if(req.url=="/file-write"){
        fs.writeFileSync('demo.txt','hello world');
        res.write("<h1>File Write Success</h1>");
        res.end();
    }else if(req.method == "POST" && req.url === "/upload" ){
        upload(req,res,function(error){
            if(error){
                res.writeHead(400, {'Content-Type': 'text/html' });
                res.write("<h1>Error Uploading File</h1>");
                res.end();
            }else{
                res.writeHead(200, {'Content-Type': 'text/html' });
                res.write("<h1>File Uploaded Successfully</h1>");
                res.end();
            }
        });
    }
});

let port=5500;
server.listen(port,function(){
    console.log(`Server is Listening on port ${port}`);
});