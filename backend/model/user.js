const mongoose = require('mongoose')



const UserSchema = new mongoose.Schema({

    //donate
    dname: String,
    demail: String,
    dage: String,
    dblood: String,
    dmob:String,
    //request
    rname: String,
    remail: String,
    rage: String,
    rblood: String,
    rmob:String

})

const UserModel = mongoose.model("user", UserSchema)
module.exports = UserModel
