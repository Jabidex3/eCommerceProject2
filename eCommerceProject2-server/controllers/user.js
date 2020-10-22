const User = require('../models/user');
const { all } = require('../routes/user');

exports.getAllUsers = async (req, res, next) =>{
    try{
        const [allUsers] = await User.fetchAll();
        res.status(200).json(allUsers);
    } catch{
        console.log('Error');
    }
};

exports.registerUser = async (req, res, next) =>{
    try{
        const postUser = await User.post(req.body.email,req.body.password);
        res.status(201).json(postUser);
    } catch{
        console.log('Error');
    }
};

exports.loginUser = async (req, res, next) =>{
    try{
        const login = await User.find(req.body.email,req.body.password);
        if(login[0].length>0){ //check if there was any matches
            res.status(202).json(login);
        }
        else{
            res.status(404).json(login);
        }
        
    } catch{
        console.log('Error');
    }
};

exports.getUser = async (req, res, next) =>{ //logged in already
    try{
        const [userFound] = await User.find(req.body.email,req.body.password);
        res.status(200).json(userFound);
        
    } catch{
        console.log('Error');
    }
};

exports.putUser = async (req, res, next) =>{
    try{
        const putResponse = await User.update(req.body.id,req.body.email,req.body.password);
        res.status(200).json(putResponse);
    } catch{
        console.log('Error');
    }
};

exports.deleteUser = async (req, res, next) =>{
    try{
        const deleteResponse = await User.delete(req.body.id);
        res.status(200).json(deleteResponse);
    } catch{
        console.log('Error');
    }
};