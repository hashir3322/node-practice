import User from '../models/user.model.js';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
import generateToken from '../utils/generateToken.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const authController = {
    login: catchAsync(async (req, res, next) => {

            const { email, password } = req.body;
            
            if (!email) {
                return next(new AppError('Email is required', 400));
            }

            if (!password) {
                return next(new AppError('Password is required', 400));
            }

            const user = await User.findOne({ email }).select("+password").exec();

            if (!user) {
                return next(new AppError('Invalid email or password', 400));
            }

            const match = await user.matchPassword(password,user.password);
            
            // const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return next(new AppError('Invalid email or password', 400));
            }

            const accessToken = generateToken(res, user._id);

            res.status(200).json({
                accessToken
            })
    }),
    // Get all users
    getAllUsers: async (req, res, next) => {
        try {

            // const users = User.find().select('-password').lean();
            const users = await User.find().select('-__v').lean();
            res.status(200).json(users)
        } catch (error) {
            res.status(404).json({
                status: 'failed',
                err: error
            })
        }
    },

    // Create a new user
    register: catchAsync(async (req, res, next) => {

        const { name, email, password, roles } = req.body;

        const userObj = { name, email, password, roles }

        const newUser = await User.create(userObj);

        newUser.password = undefined;

        res.status(201).json(newUser);

    }),

    test: async (req, res) => {
        return res.status(200).json({ 'body': req.body })
    }



}







// exports.logout = async (req, res) => {
//     try {

//         const cookies = req.cookies;


//         if(!cookies?.jwt) return res.status(200).json({status: 'No cookie present'});

//         res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None' });


//         res.status(200).json({
//             status: 'success',
//         })
//     } catch (error) {
//         res.status(400).json({
//             status: 'failed',
//             error: error
//         })
//     }
// }
// exports.refresh = async (req, res) => {
//     try {

//         const cookies = req.cookies;

//         if (!cookies?.jwt) {
//             return res.status(401).json({ message: 'Unauthorized' });
//         }

//         const refreshToken = cookies.jwt;

//         jwt.verify(
//             refreshToken,
//             process.env.REFRESH_TOKEN_SECRET,
//             async (err, decoded) => {
//                 if (err) res.status(403).json({ message: 'Forbidden' });

//                 const foundUser = await User.findOne({ username: decoded.username });

//                 if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });

//                 const accessToken = jwt.sign(
//                     {
//                         "UserInfo": {
//                             "username": foundUser.username
//                         }
//                     },
//                     process.env.JWT_SECRET,
//                     { expiresIn: '10s' }
//                 )

//             }
//         )

//         res.status(201).json({
//             status: 'success',
//             data: 'User refreshed'
//         })
//     } catch (error) {
//         res.status(401).json({
//             status: 'Error',
//             error: error
//         })
//     }

// }