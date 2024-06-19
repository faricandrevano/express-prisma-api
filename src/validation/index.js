import { body } from "express-validator";

export const registerValidation = [
    body('username').isLength({min: 8}).withMessage('username minimal 8 karakter!').isString().withMessage('username tidak berupa angka atau simbol'),
    body('password').isLength({min: 6}).withMessage('password minimal 6 karakter!')
]

export const loginValidation = [
    body('username').notEmpty().withMessage('username tidak boleh kosong'),
    body('password').notEmpty().withMessage('password tidak boleh kosong'),
]