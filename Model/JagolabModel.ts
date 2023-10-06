import mongoose from "mongoose";

interface LabAuth{
    LabName:string,
    Email:string,
    PassWord:string,
    Address:string,
    Tests:string [],
    ProfileImage:string

}
interface iLabAuth extends LabAuth,mongoose.Document{} 
const LabScheme = new mongoose.Schema({
    LabName:
    {
        type:String,
        require:true
    },
    Email:
    {
        type:String,
        unique:true
    },
    PassWord:
    {
       type:String,
       require:true
    },

    Address:
    {
        type:String,
        require:true
    },
    TestS:
    {
        type:Array,
        default:[]
    },
    ProfileImage:
    {
        type:String
    }

},
{timestamps:true}
)
export default mongoose.model<iLabAuth>("labuser",LabScheme)