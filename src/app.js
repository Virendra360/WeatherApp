const express=require("express");
const path=require("path");
const hbs=require("hbs");
const app=express();
const port=8000;

//public static path
//we are not using this instead we are using template engine
const static_path= path.join(__dirname,"../public");
const template_path= path.join(__dirname,"../templates/views");
const partials_path= path.join(__dirname,"../templates/partials");

//set view engine
app.set("view engine","hbs");
app.set('views',template_path);

//registerig partials
hbs.registerPartials(partials_path)

app.use(express.static(static_path));

//routing
app.get("",(req,res)=>{
     res.render('index')
    // res.send("Welcome to Web dev tutorials !!!");
})

app.get("/about",(req,res)=>{
    res.render('about');
    // res.send("We are trying to build Weather forecasting app !!!");
})

app.get("/weather",(req,res)=>{
    res.render('weather');
    // res.send("<h1>Weather result page !!!</h1>");
})

app.get("*",(req,res)=>{
    res.render('404error',{
        errorMsg:"Oops! Page Not Found.."
    });
    //  res.send("404 error page");
})

app.listen(port,()=>{
    console.log(`listening to port ${port}....`)
});