"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000; // default port to listen   
app.use((0, cors_1.default)({
    origin: '*', // Permite todas as origens, você pode configurar para um domínio específico, como 'http://localhost:3000'
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Defina os métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Defina os cabeçalhos permitidos
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(routes_1.default);
// define a route handler for the default home page
//
app.use((req, res) => {
    res.status(404).json({ error: "Rota não encontrada" });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Erro interno do servidor" });
});
// start the Express server
app.listen(port, () => {
    console.log(`server started at ${process.env.ENDPOINT_API}:${port}`);
});
