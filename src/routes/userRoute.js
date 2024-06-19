import express from 'express';
import {check, body} from 'express-validator';
import * as UserController from '../controllers/UserController.js';
import validation from '../middleware/Validate.js';

const router = express.Router();
router.get('/',validation,UserController.getUserbyFilter);
router.post('/',UserController.postUser);
router.delete('/:id',UserController.deleteUser);
router.patch('/',UserController.updateUser);
export default router;