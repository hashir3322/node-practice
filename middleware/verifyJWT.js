import jwt from 'jsonwebtoken';

const { verify } = jwt;

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if(!authHeader){
        return res.status(401).json({status: 'Unauthorized'})
    }

    if(!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({status: 'Unauthorized'})
    }

    const token = authHeader.split(' ')[1];

    verify(
        token,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err) res.status(401).json({status: 'Unauthorized'});

            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    )
}

export default verifyJWT;