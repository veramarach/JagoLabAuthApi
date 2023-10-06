import JagoUser from "../Model/JagoModel"
import LabAuth from "../Model/JagolabModel"
import express, {Request, Response} from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const UserReg= async (req:any, res:Response):Promise<Response> => {
    try
    {
        const {FullName, Email, PassWord, Gender} = req.body
        if(!FullName || !Email || !PassWord || !Gender)
        {
           return res.status(401).json({
            message:"pls enter all field"
           })
        }
        const CheckEmail = await JagoUser.findOne({Email:Email})
        if(CheckEmail)
        {
           return res.status(400).json({
            success:0,
            message:"email already exist"
           })
        }
        const Salt = await bcrypt.genSalt(10)
        const HashPass = await bcrypt.hash(PassWord, Salt)

        const CreateUser = await JagoUser.create({
            FullName,
            Email,
            PassWord:HashPass,
            Gender,
            ProfileImage:req.file.filename
        })
        return res.status(200).json({
            success:1,
            message:"registration successfull",
            result:CreateUser
        })

    }catch(error:any)
    {
       return res.status(400).json({
        message:error.message
       })
    }
}

 export const LoginUser = async (req:Request, res:Response):Promise<Response>=> {
    try
    {

        const {Email, PassWord} =req.body
        if(!Email || !PassWord)
        {
           return res.status(401).json({
            message:"email already exist"
           })
        }
        const checkEmail:any = await JagoUser.findOne({Email:Email})
        if(checkEmail)
        {
           const CheckPasswords = await bcrypt.compare(PassWord, checkEmail.PassWord)
           if(CheckPasswords)
           {
                const token = jwt.sign(
                    {
                        _id:checkEmail._id, FullName:checkEmail.FullName
                    },
                    "hohdgtuodbgdspi",

                    {
                       expiresIn:"10m"
                    }
                )
                const {PassWord,...info} = checkEmail._doc
                const options:any = {expiresIn:"15m"}
                res.cookie("sessionId", token, options)
                return res.status(200).json({
                    message:"log in successfull",
                    result:{info, token}
                })
           }else
           {
            return res.status(401).json({
                message:"incorrect password"
            })
           }
        }else
        {
            return res.status(400).json({
                message:"user not found"
            })
        }   
    }catch(error:any)
    {
       return res.status(400).json({
        success:0,
        meaasge:error.message
       })
    }
}

export const LogOut = async(req:Request, res:Response):Promise<Response>=> {
    try
    {
       res.clearCookie("sessionId")
       return res.status(200).json({
        success:1,
        message:"log out successful"
       })
    }catch(error:any)
    {
       return res.status(400).json({
        message:error.message
       })
    }
}

export const UpdateUser = async (req:Request, res:Response):Promise<Response>=> {
    try
    {
      const data = await JagoUser.findByIdAndUpdate(req.params.id,req.body,{new:true})
      return res.status(200).json({
        message:"user updated successfully"
      })
    }catch(error:any)
    {
       return res.status(400).json({
        message:error.message
       })
    }
}

export const deleteUser = async(req:Request, res:Response):Promise<Response>=> {
    try
    {
        const {id} = req.params
        const data = await JagoUser.findByIdAndDelete(id)
        return res.status(200).json({
            message:"deleted successfully"
        })


    }catch(error:any)
    {
       return res.status(404).json({
        message:error.message
       })
    }
}







export const RegLab = async(req:any, res:Response):Promise<Response>=> {
       try
       {
        const {LabName,Email,Address,Tests,PassWord} = req.body
        if(!LabName || !Email || !Address || !Tests || !PassWord  )
        {
          return res.status(401).json({
            message:"pls enter all field"
          })
        }
        const Checkemail= await LabAuth.findOne({Email:Email})
        if(Checkemail)
        {
           return res.status(401).json({
            message:"email already exist"
           })
        }
        const Salt = await bcrypt.genSalt(10)
        const HashPassWord = await bcrypt.hash(PassWord, Salt)

        const CreateLab = await LabAuth.create({
            LabName,
            Email,
            PassWord:HashPassWord,
            Address,
            Tests,
            ProfileImage:req.file.filename

        })
        return res.status(200).json({
            success:1,
            message:"registration successful",
            result:CreateLab

        })

       }catch(error:any)
       {
         return res.status(400).json({
            message:error.message
         })
       }

       
}

export const Lablogin = async(req:Request, res:Response):Promise<Response>=> {
    try{
        const{Email,PassWord}=req.body
        if(!Email || !PassWord)
        {
           return res.status(401).json({
            message:"enter email and password"
           })
        }
        const ChecksEmail = await LabAuth.findOne({Email:Email})
        if(ChecksEmail)
        {
          const CheckPass = await bcrypt.compare(PassWord,ChecksEmail.PassWord)
          if(CheckPass)
          {
            const tokens =jwt.sign(
                {
                    _id:ChecksEmail._id, LabName:ChecksEmail.LabName,
                },
                "dfgxvbjsurtavnswybxgdysxgdn",
                {
                    expiresIn:"20m"
                }
            )
            const {PassWord,...info} = ChecksEmail._doc
            const options:any = {expiresIn:"10m"}
            res.cookie("sessionId", tokens,options)
            return res.status(200).json({
                message:"login successfull"
            })
            
          }else
          {
             return res.status(400).json({
                message:"incorrect password"
             })
          }
        }else
        {
           return res.status(400).json({
            message:"user not found"
            })
        }

    }catch(error:any)
    {
      return res.status(400).json({
        message:error.message
      })
    }
}

export const UpdateLab = async(req:Request, res:Response):Promise<Response>=> {
    try
    {
        const LabUpdate = await LabAuth.findByIdAndUpdate(req.params.id,req.body, {new:true})
        return res.status(200).json({
            success:1,
            message:"updated successfully",
            result:LabUpdate
        })

    }catch(error:any)
    {
       return res.status(400).json({
        message:error.message
       })
    }
}

export const DeleteLab = async(req:Request, res:Response):Promise<Response>=> {
    try
    {
        const{id}=req.params
        const LabDelete = await LabAuth.findByIdAndDelete(id)
        return res.status(200).json({
            success:1,
            message:"deleted successfully"
        })


    }catch(error:any)
    {
        return res.status(400).json({
            message:error.message
        })
    }
}

export const GetoneLab = async(req:Request, res:Response):Promise<Response>=> {
    try
    {
        const{id} = req.params
        const GetLab = await LabAuth.findById(id)
        return res.status(200).json({
            success:1,
            message:"lab gotten",
            result:GetLab
        })

    }catch(error:any)
    {
        return res.status(400).json({
            message:error.message
        })
    }
}