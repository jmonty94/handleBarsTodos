const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { User } = require('./../models');

router.post('/signup', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        req.session.save(() => {
            req.session.user = newUser;
            req.session.isLoggedIn = true;
            res.json(newUser);
        });
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.post('/signin', async (req, res) => {
    try {
        const existingUser = await user.findOne({
            where: {
                email: req.body.email
            }
        });
        if (!existingUser) {
            return res.status(401).json({ error: 'Invalid Credentials' });
        }
        const doesPasswordMatch = await bcrypt.compare(req.body.password, existingUser.password);
        if (!doesPasswordMatch) {
            return res.status(401).json({ error: 'Invalid Credentials' });
        }
        req.session.save(() => {
            req.session.user = existingUser;
            req.session.isLoggedIn = true;
            res.json({ success: true })
        });
    } catch (error) {
        res.status(500).json({ error });
    }
});
router.post('/signout', async (req, res) => {
    if (req.session.isLoggedIn) {
        req.session.destroy(() => {
            res.json({ success: true });
        });
    }
});

module.exports = router;