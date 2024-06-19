import {validationResult} from 'express-validator';

const validation = (req,res,next) => {
    let Listvalidasi = validationResult(req);
    let errors = {};
    //jika validasi memiliki pesan error maka jalankan kondisi berikut
    if(!Listvalidasi.isEmpty()) {
        Listvalidasi.array().map((error) => {
            errors[error.path] = error.msg;
        })
        return res.status(422).json({errors});
    }
    next();
}

export default validation;