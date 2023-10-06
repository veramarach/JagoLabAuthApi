import mongoose from "mongoose";

interface JagoUser{
    FullName:string,
    Email:string,
    PassWord:string,
    Gender:string,
    ProfileImage:string
}

interface iJagoUser extends JagoUser,mongoose.Document{}

const UserSchema = new mongoose.Schema({
    FullName:
    {
        type:String,
        require:true
    },
    Email:
    {
        type:String,
        require:true
    },
    PassWord:
    {
        type:String,
        require:true
    },
    Gender:
    {
        type:String,
        require:true
    },
    ProfileImage:
    {
        type:String
    }
},
{timestamps:true}
)

export default mongoose.model<iJagoUser>("Users", UserSchema)



