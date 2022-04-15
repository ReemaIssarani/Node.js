const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");

/*app.get("/api", (req,res)=>{
  res.json({
      success:1,
      message:"This is rest apis working"
  })
})*/

app.use(express.json());

app.use("/api/users",userRouter)

app.listen(8000,()=>{
    console.log("Server is up and running")
})