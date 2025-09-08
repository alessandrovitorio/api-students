import axios from "axios";
import { Request, Response } from "express";
import { prisma } from "../databases/prisma-client";

export const gitController = {

  auth: (req: Request, res: Response) => {
    try {
      const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user,repo&prompt=consent`;
      return res.redirect(redirectUrl);

      res.status(200).json({ message: "Autenticado com sucesso" })
    } catch (error) {
      if (error instanceof Error)
        res.status(400).json(error.message)
    }
  },
  callback: async (req: Request, res: Response): Promise<any> => {
    const code = req.query.code as string;  // Pega o código do GitHub

    console.log(code)

    if (!code) {
      return res.status(400).json({ error: 'Código não fornecido' });
    }

    try {
      // Troca o código pelo token de acesso
      const response = await axios.post('https://github.com/login/oauth/access_token', null, {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code: code,
          redirect_uri: 'https://api-students-production.up.railway.app/auth/github/callback',
        },
        headers: {
          accept: 'application/json',
        },
      });
      const { access_token } = response.data;
      console.log(access_token)

      // Obtém informações do usuário usando o token de acesso
      const userResponse = await axios.get('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      const reposi = await axios.get('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      const user = userResponse.data;
      const data = {
        name: user.name,
        avatar: user.avatar_url,
        login: user.login,
        email: user.email,
        urlRepository: `https://github.com/${user.login}/exercicios-pw`
      }
      // Retorna as informações do usuáriostu
      const students = await prisma.students.create({
        data
      });
      return res.status(201).json(students);

    } catch (error) {

      return res.status(400).json({ error: 'Falha ao cadastrar informações do usuário' });
    }

  }
}