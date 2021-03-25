var model = require('./model')
var jwt =require('jsonwebtoken')

function create(req,res){
    let signup=new model({
        firstname :req.body.firstname,
        lastname  :req.body.lastname,
        email     :req.body.email,
        address   :req.body.address,
        password  :req.body.password,
        role      :req.body.role,
        city      :req.body.city,
        state     :req.body.state,
        country   :req.body.country,
        zip       :req.body.zip,
        phone     :req.body.phone
    })
    signup.save().then(result=>{
        res.status(200).json({message:"user created"});
        console.log(result);
    }).catch(err=>{
        res.status(400).json(err);
        console.log(err);
    })
}





function login(req, res) {
    email = req.body.email;
    password = req.body.password;
    console.log(email, password);
    model.findOne({ 'email': email }).then(result => {
        console.log(result);
        if (result == null) {
            res.status(400).json({ error: "User Not Found" });
        } else {
            result.comparePassword(password, (error, isMatch) => {
                if (isMatch) {
                    console.log(isMatch);
                    let token=jwt.sign({"email":email,"password":password}, "angular", {expiresIn:'1h' })
                    
                    res.status(200).json({message:'login successfully',token:token});
                    console.log('login successfully');
                } else {
                    res.status(400).json(' Password not match')
                    console.log(error);
                }
            })
        }
    }).catch(err => {
        res.status(400).json({ error: 'user not found' });
        console.log(err);
    })
}

module.exports={create,login}