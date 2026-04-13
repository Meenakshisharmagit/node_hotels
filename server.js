const express=require('express');
const app=express();
const db=require('./db')
require('dotenv').config();

app.use(express.json()); 
const PORT=process.env.PORT || 3000


const Person = require('./models/Person');
const MenuItem=require('./models/MenuItem')
app.get('/',(req,res)=>{
   res.send("welcome to my hotel")
})

//post route to add person


app.post('/menu',async(req,res)=>{
    try{
        const data=req.body
        const newMenu=new MenuItem(data);
        const response=await newMenu.save();
        console.log('data saved');
        res.status(200).json(response);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

app.get('/menu',async(req,res)=>{
    try{
        const data=await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})


app.get('/person/:workType',async(req,res)=>{
    try{
        const workType=req.params.workType;
        if(workType=="chef" || workType=="manager" || workType=="waiter"){
            const response=await Person.find({work:workType});
            console.log('response fetched');
            res.status(200).json(response);

        }
        else{
            res.status(404).json({error:'Invalid work type'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server error'})

    }
})
//import router file
const personRoutes=require('./routes/personRoutes')
const menuItemRoutes=require('./routes/menuItemRoutes')


app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes);




app.listen(PORT,()=>{
    console.log(" listening on port 3000")
});
