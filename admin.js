var model = require('./model');
var jwt =require('jsonwebtoken');

function login(req, res) {
    email   = req.body.email;
    password= req.body.password;
    console.log(email, password);
    model.findOne({ 'email': email }).then(result => {
        console.log(result);
        if (result == null) {
            res.status(400).json({ error: "admin not found " });
        } else {
            role = result.role;
            if (role == "admin") {
                result.comparePassword(password, (error, isMatch) => {
                    if (isMatch) {
                        console.log(isMatch);
                        let token = jwt.sign({ "email": email, "password": password }, "angular", { expiresIn: '1h' })
                        res.status(400).json({ message: 'Admin login successfully', token: token });
                    } else {
                        res.status(200).json('password not match');
                    }
                })
            }else{
                res.status(400).json({error:"admin does not exist"});
            }
        }
    }).catch(err=>{
        res.status(400).json({error:"admin not found"});
    })
}




module.exports = { login }