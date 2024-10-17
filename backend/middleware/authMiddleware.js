const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log(token);
    if (!token) return res.status(401).json({ error: 'No token provided' });
    console.log(token.split(' ')[1]);
    // jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
    //     if (err) return res.status(403).json({ error: 'Invalid token' });
    //     req.user = decoded;
    //     next();
    // });
    try {
        const decoded=jwt.verify(token.split(' ')[1],process.env.JWT_SECRET);
        next();
    } catch (err){
        if(err.name==='TokenExpiredError'){
            return res.status(401).json({msg:'Token expired, please log in again'});
        }
        res.status(401).json({msg:'Invalid token, please log in again'});
    }
};

module.exports = authenticate;
