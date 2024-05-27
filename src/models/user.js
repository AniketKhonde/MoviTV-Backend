const mongoose=require("mongoose")
const bcrypt = require('bcryptjs');

const userSchema=new mongoose.Schema(
    {
        username:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type: String,
            required: true 
        },
        accessToken: { 
            type: String 
        },
        createdAt: { 
            type: Date, 
            default: Date.now 
        },
        updatedAt: { 
            type: Date, 
            default: Date.now 
        }
    }
);

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){  // this is pre middleware which run before saving user
        return next();  // if password is not modified then do nothing
    }
    try{
        const salt=await bcrypt.genSalt();
        const hashedPassword=await bcrypt.hash(this.password,salt);
        this.password=hashedPassword;//replace plain text with hashed password
        next();
    }
    catch(error){
        next(error);
    }
});

const User = mongoose.model('User',userSchema);
module.exports = User;