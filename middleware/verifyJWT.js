import jwt from 'jsonwebtoken';
import AppError from '../utils/appError.js';

const { verify } = jwt;

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;


    if(!authHeader){
        return next(new AppError('Unauthorized', 401));
    }

    if(!authHeader.startsWith('Bearer ')) {
        return next(new AppError('Unauthorized', 401));
    }

    const token = authHeader.split(' ')[1];

    verify(
        token,
        process.env.JWT_SECRET,
        (err, decoded) => {
            if(err){
                return next(new AppError('Unauthorized', 401));
                // res.status(401).json({status: 'Unauthorized'});
            }

            req.userId = decoded.userId;
            next();
        }
    )
}

export default verifyJWT;