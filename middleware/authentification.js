const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodeToken = jwt.verify(token, 'STRHCYSHFXGJCVHXXFGhsdfyhfcvhdfxcgf15242414hfcwgd');
        const userId = decodeToken.userId;
        if(req.body.userId && req.body.userId !== userId) {
            throw 'User Id non valable !';
        }
        else {
            next();
        }
    }
    catch (error) {
        res.status(401).json({ error: error | 'requête non authentifiée !'});
    }
}