const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');  // authentication middleware check
const google_auth = require('../../middleware/google_auth');  // google authentication middleware check

// models
const User = require('../../models/User');

// Google Auth
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = process.env.CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

// @route    Post api/google/login
// @access   Public
router.post('/login', async (req, res) => {
    try {
        const { token } = req.body;

        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: CLIENT_ID
            });
            const payload = ticket.getPayload();
            // const userid = payload['sub']; // user ID
            return payload;
        }

        verify()
            .then(async (response) => {

                let { sub, email, name } = response;  // getting thing from google api response

                const user = await User.findOne({ email });
                if (!user) {
                    const newUser = new User({
                        google_user_id: sub,  // save google user_id
                        fullname: name,
                        email,
                        login_type: "google"
                    });

                    await newUser.save();  // save user into DB

                    const findUser = await User.findOne({ email });

                    res.cookie('x-session-token', token);
                    return res.json({
                        success: true,
                        msg: "Registered & Logged In successfully",
                        token,
                        user: {
                            id: findUser._id,
                            google_user_id: findUser.google_user_id,
                            fullname: findUser.fullname,
                            email: findUser.email,
                        },
                    });
                }

                res.cookie('x-session-token', token);
                res.json({
                    success: true,
                    msg: "Logged In successfully",
                    token,
                    user: {
                        // id: user._id,
                        // google_user_id: user.google_user_id,
                        fullname: user.fullname,
                        email: user.email,
                    },
                });
            })
            .catch(console.error);

    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Error Occurs While Logged In"
        });
    }
});

router.get('/check_authenticated', google_auth, (req, res) => {
    res.json({ success: true, msg: "This is Protected Route" })
})

module.exports = router;