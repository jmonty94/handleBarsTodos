const router = require('express').Router();
const { User } = require('./../models')

router.post('/signup', async (req,res) => {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
});

module.exports = router;