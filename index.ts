import express, {Application} from "express"
import "./DataBase/DataBase"
import router from "./Route/UserRoute"

const port:Number = 4000
const app:Application= express()

app.use(express.json())
app.use("/api/V1", router)

const server= app.listen(port, ()=> {
    console.log(`listening on port ${port}`)
})

process.on("uncaughtException ", (error:Error)=> {
    console.log("stop here:uncaughtexception occurred", error)
    process.exit(1)
})

process.on("unhandledRejection", (reason:any)=> {
    console.log("stop here: unhandledrejection occured", reason)
    server.close(()=> {
        process.exit(1)
    })
})