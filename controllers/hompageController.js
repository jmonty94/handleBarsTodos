const router = require('express').Router();
const { User }= require('./../models')

const todos = [
    'Do the Laundry',
    'Clean the floors',
]

router.get('/', (req,res) => res.render('landingPage'));

router.get('/users', async (req,res) => {
    try {
        const dbUsersData = await User.findAll();
        const users = dbUsersData.map(dbUser => dbUser.get({ plain: true }));

        console.log(users);
        res.render(`users`, { users });
    } catch (error) {
        res.status(500).json({ error })
    }
})



module.exports = router