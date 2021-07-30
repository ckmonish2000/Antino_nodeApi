let jwt = require('jsonwebtoken')


exports.generateToken = (user)=>{
    return jwt.sign(user,process.env.TOKEN_SECRET, { expiresIn: '1800s' })
}


exports.authenticateToken=(req, res, next)=> {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    console.log(token)
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.TOKEN_SECRET , (err, user) => {
    //   console.log(err)
  
      if (err) return res.sendStatus(403)
  
      req.user = user
  
      next()
    })
  }