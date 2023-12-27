const jwt = require("jsonwebtoken");
const secretKey = process.env.KEY;

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Authenticate first" });
    }
    try {
        const data = jwt.verify(token, secretKey);
        req.user_id = data._id;
        // res.send(req.user_id);
        next();
    } catch (error) {
        res.status(401).send({ error: "server error" });
    }

}

module.exports = fetchuser;

