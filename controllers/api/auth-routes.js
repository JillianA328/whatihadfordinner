const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

const bcrypt = require('bcrypt')
const passport = require('passport')

const initializePassport = require('../../passport/passport-config.js')

initializePassport(
    passport,
    //   username => User.find(user => user.username === username),
    username => {
        User.findOne({
            where: {
                username: username
            }
        })
    },
    //   id => User.find(user => user.id === id)
    id => {
        User.findOne({
            where: {
                id: id
            }
        })
    }
)

//find all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['[password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//find one user by id
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [{
            model: Post,
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
            ]
        },

        {
            model: Comment,
            attributes: ['id', 'comment_text', 'created_at'],
            include: {
                model: Post,
                attributes: ['title']
            }
        },
        {
            model: Post,
            attributes: ['title'],
        }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



// router.get('/', withAuth, (req, res) => {
//     res.render('index', { name: req.user.name })
// })

// router.get('/login', withAuth, (req, res) => {
//     res.render('login.ejs')
// })

// router.post('/login', withAuth, passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
// }))

// traditional route handler, passed req/res
router.post("/login", function(req, res, next) {
    // generate the authenticate method and pass the req/res
    passport.authenticate('local', function(err, user, info) {
      if (err) { returnres.status(500).json(err); }
      if (!user) { return res.redirect('/'); }
      // req / res held in closure
    //   req.logIn(user, function(err) {
    //     if (err) { return next(err); }
    //     return res.send(user);
    //   });
    // if the user authenticateion is succsful
    req.session.save(() => {

        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
  
        res.json({ user: dbUserData, message: 'You are now logged in!' });
      });
    })(req, res, next);
  });

//sign up
// router.get('/signup', withAuth, (req, res) => {
//     res.render('signup')
// })

// signup - done!
router.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        // users.push({
        //     id: Date.now().toString(),
        //     name: req.body.name,
        //     email: req.body.email,
        //     password: hashedPassword
        // })
        // res.redirect('/login')
        User.create({
            username: req.body.username,
            password: hashedPassword
        }).then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json(dbUserData);
            });
        })
    } catch {
        res.redirect('/signup')
    }
})

//logout
// router.delete('/logout', (req, res) => {
//     req.logOut()
//     res.redirect('/login')
// })

//logout by checking session 
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

module.exports = router;