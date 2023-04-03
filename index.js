const express=require("express");
const {createServer}=require("http");
const {Server}=require("socket.io");


const app=express();
const httpServer=createServer(app);
const ioServer=new Server(httpServer);

// app.route("/").get((request,response)=>{
//     response.json("Chat app using Socket.io and Flutter");
// })
ioServer.on("connection",(socket)=>{
    console.log("Connected");
    socket.join("group");
    socket.on("sendMsg",(msg)=>{
        console.log(msg);
        // socket.emit("sendMsgServer",{...msg,type:"other"})
        ioServer.to("group").emit("sendMsgServer",{...msg,type:"other"})
    })
    
});

httpServer.listen(3000);
