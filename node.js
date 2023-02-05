const express = require('express');
const upload = require('express-fileupload')
const port = process.env.PORT || 5000;

const app = express();

app.use(upload());
app.use(express.static('public'));

app.get('/',(req, res)=>{
    res.sendFile(__dirname + '/index.html');
})

app.post('/',(req, res)=>{
    if(req.files){
        console.log(req.files)
        var file = req.files.file
        var filename = file.name
        console.log(filename)

        file.mv('./uploads/'+filename, function(err){
            if(err){
                res.send(err)
            }else{
                res.sendFile(__dirname + '/public/html/thank.html');
            }
        })
    }
})

app.listen(port,()=>{
    console.log('Server started at http://localhost:${port}')
});