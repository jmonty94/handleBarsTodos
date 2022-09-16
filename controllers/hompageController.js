const router = require('express').Router();
const apiController = require('./apiController')
const { User }= require('./../models')

const todos = [
    'Do the Laundry',
    'Clean the floors',
]

router.get('/', (req,res) => res.render('landingPage'));

router.get('/users', async (req,res) => {
    console.log(req.session, `I am the Session`);
    try {
        const dbUsersData = await User.findAll();
        const users = dbUsersData.map(dbUser => dbUser.get({ plain: true }));
        res.render(`users`, { 
            users,
            loggedInUser: req.session.user || null,
            isLoggedIn: req.session.isLoggedIn,
        });
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.get('/users/:userId', async (req,res) => {
    try {
        const userData = await User.findByPk(req.params.userId);
        const user = userData.get({ plain: true });
        res.render('user_profile', {user})
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.get('/todos', async (req,res) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/');
    }
    res.render('todos');

});

router.use('/api', apiController);



module.exports = router