if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}




// const session = require('express-session')



// const users = []

// app.set('view-engine', 'handlebars')
// app.use(express.urlencoded({ extended: false }))

// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false
// }))









// function checkAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next()
//   }

//   res.redirect('/login')
// }

// function checkNotAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return res.redirect('/')
//   }
//   next()
// }

// app.listen(3000)