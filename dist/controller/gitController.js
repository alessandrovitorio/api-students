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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitController = void 0;
const axios_1 = __importDefault(require("axios"));
const prisma_client_1 = require("../databases/prisma-client");
exports.gitController = {
    auth: (req, res) => {
        try {
            const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user,repo&prompt=consent`;
            return res.redirect(redirectUrl);
            res.status(200).json({ message: "Autenticado com sucesso" });
        }
        catch (error) {
            if (error instanceof Error)
                res.status(400).json(error.message);
        }
    },
    callback: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const code = req.query.code; // Pega o código do GitHub
        console.log(code);
        if (!code) {
            return res.status(400).json({ error: 'Código não fornecido' });
        }
        try {
            // Troca o código pelo token de acesso
            const response = yield axios_1.default.post('https://github.com/login/oauth/access_token', null, {
                params: {
                    client_id: process.env.GITHUB_CLIENT_ID,
                    client_secret: process.env.GITHUB_CLIENT_SECRET,
                    code: code,
                    redirect_uri: 'http://localhost:3000/auth/github/callback',
                },
                headers: {
                    accept: 'application/json',
                },
            });
            const { access_token } = response.data;
            console.log(access_token);
            // Obtém informações do usuário usando o token de acesso
            const userResponse = yield axios_1.default.get('https://api.github.com/user', {
                headers: { Authorization: `Bearer ${access_token}` },
            });
            const reposi = yield axios_1.default.get('https://api.github.com/user', {
                headers: { Authorization: `Bearer ${access_token}` },
            });
            const user = userResponse.data;
            const data = {
                name: user.name,
                avatar: user.avatar_url,
                login: user.login,
                email: user.email,
                urlRepository: `https://github.com/${user.login}/exercicios-pwI`
            };
            // Retorna as informações do usuáriostu
            const students = yield prisma_client_1.prisma.students.create({
                data
            });
            return res.status(201).json(students);
        }
        catch (error) {
            return res.status(400).json({ error: 'Falha ao cadastrar informações do usuário' });
        }
    })
};
