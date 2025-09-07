import { prisma } from "../databases/prisma-client";
import { Request, Response } from 'express';


export const studentsController = {
    findUser: async (req: Request, res: Response) => {

        const students = await prisma.students.findMany({
            orderBy: {
                name: 'asc',
            }
        })
        if (!students) {
            res.status(404).json({ message: 'No students found' });
        }
        res.status(200).json(students);

    },
    findStudentsBySerie: async (req: Request, res: Response) => {

        const { serie } = req.params;

        const students = await prisma.students.findMany({
            where: {
                serie
            },
            orderBy: {
                name: 'asc',
            }
        })
        if (!students) {
            res.status(404).json({ message: 'No students found' });
        }
        res.status(200).json(students);

    },
    studentsCreate: async (req: Request, res: Response) => {
        const { name, email, login, serie,avatar, urlRepository } = req.body
        try {
            const existingStudent = await prisma.students.findUnique({
                where: { login },
            });

            if (existingStudent) throw new Error("Student already exists");

            const students = await prisma.students.create({
                data: {
                    name,
                    email,
                    login,
                    serie,
                    avatar: `https://github.com/${login}.png`,
                    urlRepository: `https://github.com/${login}/${urlRepository}`,

                }
            })
            res.status(201).json(students)
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json(error.message)
            }
        }
    }

}

