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
exports.getTwodData = void 0;
const cheerio_1 = require("cheerio");
const getTwodData = () => __awaiter(void 0, void 0, void 0, function* () {
    const $ = (0, cheerio_1.load)(yield fetch('https://www.set.or.th/en/home').then((o) => o.text()));
    const res = $('div.table-market-overview.py-2 > table > tbody > tr')
        .map((_, element) => {
        const cols = $('td', element);
        const raw = cols.text();
        return { raw };
    })
        .toArray();
    const dataList = res[8].raw
        .trim()
        .replace(/ /g, '')
        .replace(/\n\n/g, '|')
        .split('|');
    const set = dataList[1];
    const value = dataList[4];
    const twod = set.split('.')[1].charAt(1).toString() + value.charAt(5).toString();
    const dt = new Date();
    const date = dt.toLocaleDateString();
    const time = dt.toLocaleTimeString();
    return {
        set,
        value,
        twod,
        date,
        time,
    };
});
exports.getTwodData = getTwodData;
//# sourceMappingURL=getTwod.js.map