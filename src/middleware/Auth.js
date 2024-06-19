import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const authencticateToken = async (req,res,next) => {
    const authHeader = req.headers['authorization'];
    var token = "";
    // split bearer menjadi satu kata
    if (authHeader != "") {
        token = authHeader.split(' ')[1];
    }
    // jika token tidak ada maka kirim kode 401 
    const checkIfBlacklist = await prisma.blackListToken.findFirst({where: {token: token}});
    if (checkIfBlacklist) return res.status(401).json({message: "Session Sudah expired. silahkan Login"});
    if (token == null) return res.status(401).json({message:"Silahkan Login"});
    jwt.verify(token,String(process.env.TOKEN_SECRET), (err,user) => {
        console.log(err);
        // jika kode gagal diverifikasi maka kirimkan pesan gagal
        if(err) return res.status(401).json({message:"Session Sudah expired. silahkan Login"});
        req.user = user;
        // console.log(user);
        next();
    });
};
export default authencticateToken;