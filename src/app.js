const express=require('express')
const path=require("path")
const hbs=require("hbs")
const geocode=require("../src/utils/geocode")
const forecast=require("../src/utils/forecast")
const app=express();

const directoryPath=path.join(__dirname,"../public");
const viewPath=path.join(__dirname,"../templates/views")
const partialPath=path.join(__dirname,"../templates/partials")

app.set("view engine","hbs")
app.set("views",viewPath)
hbs.registerPartials(partialPath)
app.use(express.static(directoryPath));


app.get('',(req,res)=>{
res.render('index',{
    title:"Weather App",
    name:"Ajay Prasad"
})
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About App",
        name:"Ajay Prasad"
    })
    })
app.get('/help',(req,res)=>{
 res.render('help',{
     title: 'help',
     message:"This is help page",
     name:"Ajay"
    })
})

app.get('/weather',(req,res)=>{
    const address=req.query.address;
    if(!address){
        return res.send({error:"You must provide the address term"});
    }
    geocode(address,(error,{location,latitude,longitude}={})=>{
        if(error){
            
            return res.send({error})
        }
    
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error){
                return res.send({error})
            }
           
            res.send({
                forecast: forecastdata,
                location:location,
                address:address
               })
        })
    })




    
   })
   

app.get("/help/*",(req,res)=>{
    res.render("error",{
        title:"help error",
        message:"Help Article not found",
        name:"Ajay Prasad"
    });
})

app.get("*",(req,res)=>{
    res.render("error",{
        title:"error",
        message:"My 404 Page",
        name:"Ajay Prasad"
    })
})
 //create server
 app.listen(3000,()=>{
     console.log("Server is up with Port 3000")
 })