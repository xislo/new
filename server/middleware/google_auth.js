// Google Auth
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

const checkAuthenticated = (req, res, next) => {

    let token = req.cookies['x-session-token'];

    let user = {};
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        user.name = payload.name;
        user.email = payload.email;
    }
    verify()
        .then(() => {
            req.user = user;
            next();
        })
        .catch(err => {
            // res.redirect('/login');
            res.status(500).json({ success: false, message: "UnAuthorized User" });
            // res.status(500).json({ error: err.message });
        })

}

module.exports = checkAuthenticated;
