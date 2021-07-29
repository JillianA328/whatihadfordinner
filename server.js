const express = require('express');
//packaged endpoints
const routes = require('./controllers');
const sequelize = require('./config/connection');
//establish relative path to other directories
const path = require('path');
//assign templating engine
const helpers = require('./utils/helpers')
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3001;

//set up sessions
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: { maxAge: 360000 },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(routes);

//turn on connection to db and server
//sync takes models and connects them to associated database tables
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'))
});