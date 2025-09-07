"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client"); // Import Prisma Client
const prisma = new client_1.PrismaClient(); // Create Prisma Client Instance
exports.prisma = prisma;
// 
