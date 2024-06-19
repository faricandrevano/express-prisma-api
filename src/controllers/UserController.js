import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();


export const getUserbyFilter = async (req,res) => {
    try {
        const filter = req.query.search;
        const data = await prisma.user.findMany();
        if (data == "") {
            return res.status(404).json(
                {message: "data user belum tersedia!"}
            );
        }
        // jalankan kondisi pertama jika ada query search
        if (validationResult(req).isEmpty()) {
            const dataResult = await prisma.user.findMany({where: {nama: {contains: filter}}});
            return res.status(200).json({
                message : `Hasil Pencarian User ${filter}`,
                data : dataResult,
            });
        } else {
            res.setHeader('Content-Type','application/json');
            return res.status(200).json({
                data,
                message: "data user berhasil didapat"
            });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: "Server Sedang Mengalami Gangguan"});
    }
}

export const postUser = async (req,res) => {
    try {
        const {kelas_id,nis,username,password,nama,jk,level} = req.body;
        const hash = await bcrypt.hash(password,10);
        const data = await prisma.user.create({data: {
            kelas_id,
            nis,
            username,
            password: hash,
            nama,
            jk,
            level
        }});
        return res.status(201).json({
            data,
            message: "data user berhasil ditambahkan"
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: "Server Sedang Mengalami Gangguan"});
    }
}

export const deleteUser = async (req,res) => {
    try {
        const data = await prisma.user.delete({
            where: {id_user : parseInt(req.params.id)}
        });
        return res.status(201).json({
            data,
            message: "data user berhasil dihapus"
        });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message: "Server Sedang Mengalami Gangguan"});
    }
}

export const updateUser = async (req,res) => {
    try {
        const {id,kelas_id,nis,username,password,jk,level} = req.body;
        const data = await prisma.user.update({
            data: {
                kelas_id,
                nis,
                username,
                password,
                jk,
                level
            },
            where: {
                id_user : id
            }
        });
        return res.status(201).json({
            data,
            message: "data user berhasil di update"
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: "Server Sedang Mengalami Gangguan"});
    }
}