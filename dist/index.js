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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const getList_1 = require("./functions/getList");
const getLotto_1 = require("./functions/getLotto");
const getTwod_1 = require("./functions/getTwod");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/ping', (req, res) => {
    res.json({
        status: 'success',
        message: 'pong',
    });
});
app.get('/api/lotto/list/:page', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lists = yield (0, getList_1.getList)(+req.params.page);
        res.json({
            status: 'success',
            data: lists,
        });
    }
    catch (e) {
        res.status(500).json({
            status: 'crash',
            message: 'api cannot fulfill your request at this time',
        });
    }
}));
app.get('/api/lotto/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!Number.isSafeInteger(Number(req.params.id))) {
            res.status(400).json({
                status: 'crash',
                message: 'invalid positive integer',
            });
        }
        else {
            const lotto = yield (0, getLotto_1.getLotto)(req.params.id);
            res.json({
                status: 'success',
                data: lotto,
            });
        }
    }
    catch (e) {
        res.status(500).json({
            status: 'crash',
            message: 'api cannot fulfill your request at this time',
        });
    }
}));
app.get('/api/lotto', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const latestLottery = yield (0, getList_1.getList)(1);
        const lotto = yield (0, getLotto_1.getLotto)(latestLottery[0].id);
        if (lotto.prizes.some((prize) => prize.number.some((num) => num.toLowerCase().includes('x')))) {
            res.json({
                status: 'success',
                data: yield (0, getLotto_1.getLotto)(latestLottery[1].id),
            });
        }
        else {
            res.json({
                status: 'success',
                data: lotto,
            });
        }
    }
    catch (e) {
        res.status(500).json({
            status: 'crash',
            message: 'api cannot fulfill your request at this time',
        });
    }
}));
app.get('/api/twod/live', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, getTwod_1.getTwodData)();
        res.json({
            data,
            success: true,
        });
    }
    catch (e) {
        res.status(500).json({
            status: 'crash',
            message: 'api cannot fulfill your request at this time',
            error: e,
        });
    }
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map