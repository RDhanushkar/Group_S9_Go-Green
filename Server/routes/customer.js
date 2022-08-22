var express = require('express');

var router = express.Router();

var cors = require('cors');
const customerModel = require('../models/customer.model');

var mongoose  = require('mongoose');

router.get('/list',function(req,res){
    customerModel.find(function(err,customerlistResponse){
        if(err)
        {
            res.send({status:500,message:'Unable to get Customers'});
        }
        else
        {
            const recordCount = customerlistResponse.length;
            res.send({status:200,recordCount:recordCount,result:customerlistResponse});
        }
    });
})


/* create new customers. */ // i read
router.post('/add', function(req, res) {

    let newCustomerObj = new customerModel({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password,
    });


    console.log(newCustomerObj);
    newCustomerObj.save(function(err,newCustomerObj){
        if(err)
        {
            res.send({status:500,message:'unable to add customer'});
        }
        else
        {
            res.send({status:500,message:'User Added Succesfully',customerDetails:newCustomerObj});
        }
    });
    
});

/* Get Specific customer. */ // i read
router.get('/view', function(req, res) {

    const userId = req.query.userId;

    customerModel.findById(userId,function(err,customerResponse){

        if(err){
            res.send({status:500,message:"Unable to Find the Customer"});
        }
        else
        {
            res.send({status:200,result:customerResponse});
        }
    });
    
});

/* update a customers. */ // i read
router.put('/update', function(req, res) {

    const userId = req.body.userId;

    let newCustomerObj = {
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        phonenumber:req.body.phonenumber,
        dob:req.body.dob
    };

    customerModel.findByIdAndUpdate(userId,newCustomerObj, function (error, customerResponse) {
        if(err){
            res.send({status:500,message:"Unable to update the Customer"});
        }
        else
        {
            res.send({status:200,result:customerResponse});
        }
    }
    );
});

/* delete a customers. */   // i read
router.delete('/delete', function(req, res) {
    const userId = req.body.userId;

    customerModel.findByIdAndDelete(userId,function(err,customerResponse){

        if(err){
            res.send({status:500,message:"Unable to delete the Customer"});
        }
        else
        {
            res.send({status:200,result:customerResponse});
        }
    });
});

/* delete multiple customers. */   // i read
router.delete('/delete-many', function(req, res) {
    const userId = req.body.userId;

    customerModel.deleteMany({'firstname':'mohammed'},function(err,customerResponse){

        if(err){
            res.send({status:500,message:"Unable to delete the Customer"});
        }
        else
        {
            res.send({status:200,result:customerResponse});
        }
    });
});

/* search a customers. */   // i read
router.get('/search', function(req, res) {
    res.send('respond with a resource');
});


module.exports = router;
