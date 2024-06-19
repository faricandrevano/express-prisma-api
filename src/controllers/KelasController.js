import {Prisma, PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

export const getKelas = async (req,res) => {
    try {
        const data = await prisma.kelas.findMany();

        if(data == "") {
            res.status(404).json({
                data,
                message: "data kelas belum tersedia"
            })
        }
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({
            data,
            message: "data kelas berhasil didapat"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Server Sedang Mengalami Gangguan"});
    }
}

export const postKelas = async (req,res) => {
    try {
        const {jurusan,count_kesehatan,kelas} = req.body;
        const data = await prisma.kelas.create({data: {jurusan,kelas,count_kesehatan}});
        return res.status(201).json({
            data,
            message: "data kelas berhasil ditambahkan"
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: "Server Sedang Mengalami Gangguan"});
    }
}

export const updateKelas = async (req,res) => {
    try {
        const {jurusan,kelas,count_kesehatan,id_kelas} = req.body;
        const data = await prisma.kelas.update({
            data: {
                kelas,
                jurusan,
                count_kesehatan
            },
            where: {id_kelas}
        });
        return res.status(201).json({
            data,
            message: "data kelas berhasil di update"
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: "Server Sedang Mengalami Gangguan"});
    }
}

export const deleteKelas = async (req,res) => {
    try {
        const data = await prisma.kelas.delete({where: {id_kelas:  parseInt(req.params.id)}});
        return res.status(201).json({data, message: "data kelas berhasil di hapus"});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: "Server Sedang Mengalami Gangguan"});
    }
}