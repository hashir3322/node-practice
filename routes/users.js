import express from 'express';
const router = express.Router();
import { authController } from '../controllers/authController.js';
import verifyJWT from '../middleware/verifyJWT.js';


router.route('/login')
    .post(authController.login);


router.route('/getAllUsers')
    .get(authController.getAllUsers);


// router.route('/refresh')
//     .get(authController.refresh);


// router.route('/logout')
//     .post(authController.logout);

router.route('/register')
    .post(authController.register);


export default router;
