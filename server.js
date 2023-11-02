const express=require("express");
const app=express();
const fs=require("fs");
app.use(express.urlencoded());
const path=require('path');
//app.use(express.static("."));
app.get("/addtask",(req,res)=>{
    res.sendFile(path.join(__dirname,"./index.html"));
})
app.get("/tasks",(req,res)=>{
    fs.readFile("todo.txt","utf-8",(err,data)=>{
        let todoData=JSON.parse(data);
        let result=todoData.filter((item)=>{
            if(item.status==req.query.status){
                return true;
            }
        })
        res.json(result);
    })
})

app.post("/addtask",(req,res)=>{
    fs.readFile("todo.txt","utf-8",(err,data)=>{
        let todoData=JSON.parse(data);
        let obj={};
        obj.title=req.body.title;
        obj.id=req.body.id;
        obj.status=req.body.status;
        todoData.push(obj);
        fs.writeFileSync("./todo.txt",JSON.stringify(todoData));
        res.send("Task is Added");
    })
})

app.get("/delete",(req,res)=>{
    fs.readFile("todo.txt","utf-8",(err,data)=>{
        let todoData=JSON.parse(data);
        let result=todoData.filter((item)=>{
            if(item.id!=req.query.id){
                return true;
            }
        })
        fs.writeFileSync("todo.txt",JSON.stringify(result));
        let arr=result.filter((item)=>{
            if(item.status=='pending'){
                return true;
            }
        })
        res.json(arr);
    })
})

app.listen(3001 ,(err)=>{
    console.log("Server started....")
})