import mongoose from "mongoose";

const url:string = "mongodb://0.0.0.0:27017/JagoLab"
mongoose.connect(url).then(()=> {
    console.log("database connected successfully")
})
.catch((error:any)=> {
    console.log("an error occurred")
})

export default mongoose