import express from "express";
import 'dotenv/config'
import cors from 'cors';
import  routes  from "./routes";
const app = express();
const port = process.env.PORT || 3000;  // default port to listen   

app.use(cors({
    origin: '*',  // Permite todas as origens, você pode configurar para um domínio específico, como 'http://localhost:3000'
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Defina os métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'],  // Defina os cabeçalhos permitidos
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// define a route handler for the default home page

//
app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erro interno do servidor" });
});

// start the Express server
app.listen(port, () => {
    console.log(`server started at ${process.env.ENDPOINT_API}:${port}`);
});