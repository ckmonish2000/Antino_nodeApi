let express =require('express')
let app = express()
let getRouter =require("./routers/Users")
let getProducts = require("./routers/Products")
let dontenv = require('dotenv')
let jwt = require('jsonwebtoken')



dontenv.config();


app.use(
    express.urlencoded({
      extended: true
    })
  )

  app.use(express.json())  




app.use("/users", getRouter)
app.use("/products",getProducts)





app.listen(3000,()=>{
    console.log("listing on port 3000")
})