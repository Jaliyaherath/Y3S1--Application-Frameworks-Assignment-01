const mongooge=require('mongoose');

const userSchema = new mongooge.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    email:{
        type:String,
        required:[true,'email is required']
    },
    //Token be gerenarated
    password:{
        type:String,
        required:[true,'password is required']
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isFaculty:{
        type:Boolean,
        default:false
    },
    notification:{
        type:Array,
        default:[]
    },
    seennotificaton:{
        type:Array,
        default:[]
    }
       


})

const userModel = mongooge.model('user', userSchema);

module.exports = userModel;