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
exports.getList = void 0;
const cheerio_1 = require("cheerio");
const getList = (page) => __awaiter(void 0, void 0, void 0, function* () {
    const $ = (0, cheerio_1.load)(yield fetch(`https://news.sanook.com/lotto/archive/page/${page}`).then((o) => o.text()));
    const res = $('div.box-cell.box-cell--lotto.content > div > div > div > article.archive--lotto')
        .map((_, element) => {
        var _a;
        const titleElement = $('div.archive--lotto__body > div > a > div > h3.archive--lotto__head-lot', element);
        const linkElement = $('div > div > a', element);
        const id = (_a = linkElement.attr('href')) === null || _a === void 0 ? void 0 : _a.split('/')[5];
        const rawTitleText = titleElement.text();
        const parsedTitle = rawTitleText.substring(rawTitleText.indexOf('ตรวจหวย') + 8);
        return {
            id: id || '',
            url: `/lotto/${id}`,
            date: parsedTitle,
        };
    })
        .toArray();
    return res;
});
exports.getList = getList;
//# sourceMappingURL=getList.js.map