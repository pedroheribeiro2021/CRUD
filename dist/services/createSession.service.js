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
exports.createSessionService = void 0;
const bcrypt_1 = require("bcrypt");
const data_source_1 = require("../data-source");
const users_entity_1 = require("../entities/users.entity");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createSessionService = ({ email, password, }) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(users_entity_1.User);
    const user = yield userRepository.findOneBy({
        email: email,
    });
    if (!user) {
        // Lançar um erro apropriado
        throw new Error("Usuário e/ou senha inválidos");
    }
    const passwordMatch = yield (0, bcrypt_1.compare)(password, user.password);
    if (!passwordMatch) {
        // Lançar um erro apropriado
        throw new Error("Usuário e/ou senha inválidos");
    }
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
    }, String(process.env.SECRET_KEY), {
        subject: String(user.id),
        expiresIn: "30m",
    });
    return {
        id: user.id,
        data_criacao: user.created_at,
        token,
    };
});
exports.createSessionService = createSessionService;
