const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');  // authentication middleware check
const nodemailer = require('nodemailer'); // for sending emails
const smtpTransport = require('nodemailer-smtp-transport');

// models
const User = require('../../models/User');

// @route    Post api/user/signup
// @access   Public
router.post('/signup', async (req, res) => {
    try {
        const {
            fullname,
            email,
            password,
        } = req.body;

        if (!email || !password || !fullname) {
            return res.status(400).json({ success: false, msg: 'Not all Fields have been entered' });
        }

        if (password.length < 6) {
            return res
                .status(400)
                .json({ success: false, msg: 'The password needs to be atleast 6 characters long' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ success: false, msg: 'An account with this email already exists.' });
        }

        const salt = await bcrypt.genSalt();
        const passordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullname,
            email,
            password: passordHash,
            login_type: "email"
        });

        await newUser.save();  // save user into DB

        // login user
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ success: false, msg: 'No account with this email has been registered.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, msg: 'Invalid Credentials.' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        // send registring email to new user
        var transporter = nodemailer.createTransport(smtpTransport({

            service: 'gmail',
            host: 'smtp.gmail.com',
            tls: {
                // ciphers: 'SSLv3',
                rejectUnauthorized: false,
            },
            auth: {
                user: '******@gmail.com', // enter your gmail
                pass: '*********', // enter your password
            },

        }));

        // setup e-mail data
        var mailOptions = {
            from: '"Xislo" <Your Email Address>', // sender address (who sends)
            to: email, // list of receivers (who receives)
            subject: 'Welcome to Xislo', // Subject line
            html: "<b>Your are Successfully Registered to Xislo</b>",
            // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });

        res.json({
            success: true,
            msg: "Registered Successfully",
            token,
            user: {
                // id: user._id,
                fullname: user.fullname,
                email: user.email,
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Server Error"
        });
    }
});

// @route    Post api/user/login
// @access   Public
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, msg: 'Not all Fields have been entered' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ success: false, msg: 'No account with this email has been registered.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, msg: 'Invalid Credentials.' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({
            success: true,
            msg: "Logged In successfully",
            token,
            user: {
                // id: user._id,
                fullname: user.fullname,
                email: user.email,
            },
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Server Error"
        });
    }
});

// @route    Post api/user/updateProfile
// @access   Private
router.put('/updateProfile', auth, async (req, res) => {
    try {
        const {
            fullname,
            email,
            login_type
        } = req.body;

        if (login_type == "google") {
            // Built user object
            const userFields = {};
            userFields.fullname = fullname;

            // Update User
            await User.findOneAndUpdate(
                { _id: req.user.id },
                { $set: userFields },
                { new: true }
            );

            return res.status(200).json({ success: true, msg: "Your profile has been updated" });
        }

        if (!email || !fullname) {
            return res.status(400).json({ success: false, msg: 'Not all Fields have been entered' });
        }

        // Built user object
        const userFields = {};
        userFields.fullname = fullname;
        userFields.email = email;

        // Update User
        await User.findOneAndUpdate(
            { _id: req.user.id },
            { $set: userFields },
            { new: true }
        );

        return res.status(200).json({ success: true, msg: "Your profile has been updated" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// @route    Post api/user/changePassword
// @access   Private
router.put('/changePassword', auth, async (req, res) => {
    try {
        const { old_password, new_password } = req.body;

        if (!old_password || !new_password) {
            return res.status(400).json({ success: false, msg: 'Not all Fields have been entered' });
        }

        let findUser = await User.findById({ _id: req.user.id });

        const isMatch = await bcrypt.compare(old_password, findUser.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, msg: 'Old Password is not correct.' });
        }

        const salt = await bcrypt.genSalt();
        const passordHash = await bcrypt.hash(new_password, salt);  // hash password

        const userFields = {}; // built object
        userFields.password = passordHash;

        // Update Password
        await User.findOneAndUpdate(
            { _id: req.user.id },
            { $set: userFields },
            { new: true }
        );

        return res.status(200).json({ success: true, msg: "Your password has been changed" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;