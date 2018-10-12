const express=require('express');
const ejs=require('ejs');
const bodyParser=require('body-parser');
const MongodbService=require('./MongodbService');
const path = require('path');
const static = require('static');
var serveStatic = require('serve-static')
const multer=require('multer');

const mongodbService=new MongodbService();

const app=express();

app.use(express.static('/public'));

app.use(bodyParser());

app.use(serveStatic(path.join(__dirname, 'public')))



app.set('view engine', 'ejs');

// render index page
app.get('/login',(req, res)=> {
    res.render('page/login.ejs',{message:''});
});

app.get('/outfit',async(req, res)=> {
    await mongodbService.init();
  const outfits=  await mongodbService .outfit();
    
    res.render('page/outfit.ejs',{outfits:outfits});
});



app.get('/myoutfit',(req, res)=> {
    res.render('page/myoutfit.ejs',{message:''});
});

app.get('/setting',(req, res)=> {
    res.render('page/setting.ejs',{message:''});
});

app.get('/home',(req, res)=> {
    res.render('page/home.ejs',{message:''});
});

app.get('/recommended',(req, res)=> {
    res.render('page/recommended.ejs',{message:''});
});



















app.get('/clothaccessories',(req, res)=> {
    res.render('page/clothaccessories.ejs',{message:''});
});


app.get('/public',(req, res)=> {
    res.render('public/closet.css',{message:''});
});


app.get('/public', (req, res)=>{

    res.render('public/registration.css',{message:''});
    
  });


  app.get('/public', (req, res)=>{

    res.render('public/login.css',{message:''});
    
  });

  app.get('/public', (req, res)=>{

    res.render('public/outfit.css',{message:''});
    
  });



  app.get('/public', (req, res)=>{

    res.render('public/closet.css',{message:''});
    
  });

  app.get('/public', (req, res)=>{

    res.render('public/myoutfit.css',{message:''});
    
  });

  app.get('/public', (req, res)=>{

    res.render('public/setting.css',{message:''});
    
  });



  app.get('/public', (req, res)=>{

    res.render('public/home.css',{message:''});
    
  });



  app.get('/public', (req, res)=>{

    res.render('public/recommended.css',{message:''});
    
  });




















app.get('/home',(req, res)=> {
    const user=req.body;
    //now make mongodb call to authication user
const success=true;
    if(success){
        res.render('page/home.ejs',);
    }else{
        res.render('page/login.ejs',{message:'failed to authication.please try again.'});
    }

});



app.get('/registration',(req, res) =>{
    res.render('page/registration.ejs');
});

app.post('/registration', async(req, res)=> {
await  mongodbService.init();
const success=true;
const user=req.body;
await mongodbService.Registration(user);
//call mongodb to do registration
if(success){
    res.render('page/login.ejs',{message:'successful registration.please login continue.'});
}else{
    res.render('page/registration.ejs',{message:'failed to register please try again'});
}
});



app.post('/auth', async(req, res)=> {
    await  mongodbService.init();
    const user=req.body;
   const success= await mongodbService.Auth(user);
    //call mongodb to do registration
    if(success){
        res.render('page/home.ejs',{message:'successful login.please login continue.'});
    }else{
        res.render('page/login.ejs',{message:'failed to login please try again'});
    }
    });




    

    


app.listen(8081);
console.log('server is started at 8081');