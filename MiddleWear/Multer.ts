import multer from "multer"
import express, {Request} from "express"
import path from "path"

type DestinationCallback=(err:Error | null, destination:string)=> void
type FileNameCallback = (err:Error | null, filename:string)=> void


const storage = multer.diskStorage({
    destination:function(req:Request, file:any, cb:DestinationCallback){
        cb(null, path.join(__dirname,"../uploads"))
    },
    Filename:function(req:Request, file:any, cb:FileNameCallback){
        const UniqueSuffix =Date.now() + "-" + Math.round(Math.random() * 1e9)
        cb(null, file.fieldname + "-" + UniqueSuffix + path.extname(file.originalname))
    }
    
    
})

const upload = multer({storage:storage}).single("profileImage")
export default upload
