const router = require('express').Router();
const db = require("../auth/authModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

router.post('/register', async (req, res, next) => {
  try {
    const { username } = req.body
    const user = await db.findBy({ username }).first()

    if (user) {
      return res.status(409).json({
        message: "username already exist"
      })
    }

    res.status(201).json(await db.insert(req.body))
  }

  catch (err) {
    next(err)
  }

});



router.post('/login', async (req, res, next) => {
  const authError = {
    message: "invalid credentials"
  }

  try {
    const { username, password } = req.body

    const user = await db.findBy({ username }).first()

    if (!user) {
      return res.status(401).json({
        message: "user doesnt exist"
      })
    }
  
    const passwordValid = await bcrypt.compare(password, user.password)

    if(!passwordValid){
      return res.status(401).json({
        message: "password not valid"
      })
    }

    const payload = {
      userId: user.id,
      userRole: "basic",
    }

    const token = jwt.sign(payload, "secret")

    res.cookie("token", token)

    res.json({
      message: `welcome ${user.username}`
    })

  } catch (err) {
    next(err)
  }
});

module.exports = router;
