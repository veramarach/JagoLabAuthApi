import express, {Router} from "express"
import jwt from "jsonwebtoken"
import {UserReg, LoginUser,UpdateUser, deleteUser,RegLab,Lablogin ,UpdateLab, DeleteLab,GetoneLab} from "../Controller/UserController"
import upload from "../MiddleWear/Multer"

const router = express.Router()




const verifyToken = async(req:any, res:any, next:any)=> {
    const getsession = req.headers["cookie"]
    if(!getsession)
    {
        return res.status(404).json({
            message:"please login to get token"
        })
    }
    const tokenCookies = getsession.split("=")[1]
    
    if(tokenCookies)
    {
      const token = await tokenCookies
      jwt.verify(token, "hohdgtuodbgdspi", (err:any, payload:any)=>{
        if(err)
        {
            return res.status(404).json({
                message:"token expired"
            })
        }
        req.user = payload
        next()
      } )
      
    }else
    {
         return res.status(404).json({
            message:"please provide a valid token"
         })
    }
}

router.route("/create-user").post(upload,UserReg)
router.route("/login-user").post(verifyToken,LoginUser)
router.route("/update-user/:id").put( verifyToken,UpdateUser)
router.route("/delete-user/:id").delete(verifyToken,deleteUser)
router.route("/create-lab").post(upload,RegLab)
router.route("/Login-lab").post(Lablogin)
router.route("/update-lab/:id").put(verifyToken,UpdateLab)
router.route("/delete-lab/:id").delete(verifyToken,DeleteLab)
router.route("/single-lab:id").get(GetoneLab)

export default router