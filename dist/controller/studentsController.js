"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentsController = void 0;
const prisma_client_1 = require("../databases/prisma-client");
exports.studentsController = {
    findUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const students = yield prisma_client_1.prisma.students.findMany({
            orderBy: {
                name: 'asc',
            }
        });
        if (!students) {
            res.status(404).json({ message: 'No students found' });
        }
        res.status(200).json(students);
    }),
    findStudentsBySerie: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { serie } = req.params;
        const students = yield prisma_client_1.prisma.students.findMany({
            where: {
                serie
            },
            orderBy: {
                name: 'asc',
            }
        });
        if (!students) {
            res.status(404).json({ message: 'No students found' });
        }
        res.status(200).json(students);
    }),
    studentsCreate: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, email, login, serie, avatar, urlRepository } = req.body;
        try {
            const existingStudent = yield prisma_client_1.prisma.students.findUnique({
                where: { login },
            });
            if (existingStudent)
                throw new Error("Student already exists");
            const students = yield prisma_client_1.prisma.students.create({
                data: {
                    name,
                    email,
                    login,
                    serie,
                    avatar: `https://github.com/${login}.png`,
                    urlRepository: `https://github.com/${login}/${urlRepository}`,
                }
            });
            res.status(201).json(students);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json(error.message);
            }
        }
    })
};
