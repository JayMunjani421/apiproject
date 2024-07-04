const express = require('express');
const app = express();


const studentroute = express.Router();
const userroute = express.Router();


const commonfilter = (req,resp,next)=>{
    console.log("Middleware called");
    
    next();
}; 

const filter1 = (req,resp,next)=>{
    console.log("Middleware 1");
    next();
}; 

const filter2 = (req,resp,next)=>{
    console.log("Middleware 2");
    next();
}; 


studentroute.use(filter1);
userroute.use(filter2);

//app.use(commonfilter);
// const userfilter = (req,resp,next)=>{
//     console.log("Use filter called");
//     next();
// }; 


studentroute.get("/student",(req,resp)=>{
    resp.json([{
        "rollno":"1",
        "name":"ABC"
    },
    {
        "rollno":"2",
        "name":"XYZ"
    }]);
});

userroute.get("/users",(req,resp)=>{
    resp.json([{
        "rollno":"1",
        "name":"uuu"
    },
    {
        "rollno":"2", 
        "name":"XYZ" 
    }]);
});


app.use("/",studentroute);
app.use("/",userroute);


app.listen(8000,()=>console.log("Server Started"));
