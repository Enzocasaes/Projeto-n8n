"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const True_Random_Number_Generator_1 = require("./connectors/True_Random_Number_Generator");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const connector = new True_Random_Number_Generator_1.RandomConnector();
app.use(express_1.default.json());
// Servir o front-end
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// API para gerar número randômico
app.post('/api/random', async (req, res) => {
    const { min, max } = req.body;
    try {
        const result = await connector.execute({ min, max });
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map