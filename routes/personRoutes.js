const express=require('express');
const router=express.Router();
const Person=require('./../models/Person')

router.post('/', async (req, res) => {
    try {
        const newPerson = new Person(req.body);
        const savedPerson = await newPerson.save();
        res.status(201).json(savedPerson);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/',async(req,res)=>{
    try{
        const data=await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

router.get('//:workType',async(req,res)=>{
    try{
        const workType=req.params.workType;
        if(workType=="chef" || workType=="manager" || worktype=="waiter"){
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

router.put('/:id',async(req,res)=>{
    try{

        const personId=req.params.id;  //extrct the id from the url parameter
        const updatedPersonData=req.body; // updated data for the person

        const response=await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new : true, //return updated document
            runValidators:true,  // run mongoose validation
        })
        if(!response){
            return res.status(404).json({error:'Person not found'});
        }
        console.log('data updated');
        res.status(200).json(response);


    }
    catch(err){
      
        console.log(err);
        res.status(500).json({error:'Internal Server error'})

    

    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const personId=req.params.id; //extract person id from url

        //assume have a person model

        const response=await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error:'Person not found'});
        }
        console.log('data deleted');
        res.status(200).json({message:'person Deleted Successfully'});

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'})

    }
})



module.exports=router