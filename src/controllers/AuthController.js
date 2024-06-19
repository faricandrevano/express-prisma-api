import bcrypt from 'bcrypt';
import {PrismaClient} from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const register = async (req,res) => {
    try {
        const {kelas_id,nis,username,password,nama,jk,level} = req.body;
        const checkUsername = await prisma.user.findFirst({where: {username: username}});
        if (checkUsername) return res.status(409).json({message: "username sudah digunakan!"});
        const hash = await bcrypt.hash(password,10);
        function generateAccessToken (username) {
            return jwt.sign({plainText : username},process.env.TOKEN_SECRET, {expiresIn: '10m'})
        }
        const token = generateAccessToken(username);
        const data = await prisma.user.create({
            data: {
                kelas_id,
                nis,
                username,
                password: hash,
                nama,
                jk,
                level
            }
        });
        return res.status(201).json({
            data,
            token,
            message: "Register Berhasil!"
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: "Server Sedang Mengalami Gangguan"});
    }
}

export const login = async (req,res) => {
    try {
        const {username,password} = req.body;
        // const hash = await bcrypt.hash(password,10);
        const data = await prisma.user.findFirst({
            where: {    
               username: username
            }
        });
        function generateAccessToken(username) {
            return jwt.sign({plainText: username},process.env.TOKEN_SECRET, {expiresIn: '90m'});
        }
        if (data) {
                const result = await bcrypt.compare(password,data.password);
                if (result) {
                    const token = generateAccessToken({username: username});
                    return res.status(201).json({
                        token :token,
                        message: "berhasil Login!",
                        data: data
                    });
                } else {
                    return res.status(203).json({message: "Username atau Password anda salah"});
                }
            } else {
                return res.status(203).json({message: "Username tidak ditemukan"});
            }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: "Server Sedang Mengalami Gangguan"});
    }
}

export const logout = async (req,res) => {
    try {
        // cek jika menggunakan session
        // const authHeader = req.headers['cookie'];
        // if(!authHeader) return res.sendStatus(204);
        // const cookie = authHeader.split('=')[1];
        // const accessToken = cookie.split(';')[0];
        // const checkIfBlacklist = await prisma.blackListToken.findFirst({where: {token:   }});
        // if (checkIfBlacklist) return res.status(401).json([{message:"tidak bisa login"}]);
        // const blackListToken = await prisma.blackListToken.create({data: {token: accessToken}})
        // res.setHeader('Clear-Site-Data', '"cookies"'); 

        // cek jika menggunakan kode bearer
        const authHeader = req.headers['authorization'];
        if(!authHeader) return res.sendStatus(204);
        const bearer = authHeader.split(" ")[1];
        const checkIfBlacklist = await prisma.blackListToken.findFirst({where: {token: bearer}});
        if (checkIfBlacklist) return res.sendStatus(401);
        const data = await prisma.blackListToken.create({data: {token: bearer}});
        return res.status(200).json({ message: 'kamu berhasil logout!',data});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: "Server Sedang Mengalami Gangguan"});
    }
}