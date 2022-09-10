const express = require('express');
const exphbs = require(`express-handlebars`);
const sequelize = require(`./config/connection`);
const routes = require('./controllers/hompageController.js');

const hbs = exphbs.create({});
const app = express();


const PORT = process.env.PORT || 3001;
/**
 * template engine setup
 */
app.engine(`handlebars`, hbs.engine);
app.set(`view engine`, `handlebars`);

/**
 * middlewares
 */

/**body parser */
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/**Controllers */
app.use(routes);



sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`We Made it to ${PORT}`));
});

