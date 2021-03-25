const express = require('express');
var app=express();

const cors =require('cors');
app.use(cors());


var mongoose =require('mongoose');
var router=require('./route')

var bodyparser=require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

port=4000;
mongoose.connect("mongodb://localhost:27017/EcommerceProject", 
{ useNewUrlParser: true, 
useUnifiedTopology: true } ,(err,result)=>{
  if(result){
    console.log("Connected With Database");
  }
});
app.listen(port ,() => {
    console.log(`Server started on port`+" "+port);
});


app.use('/',router);