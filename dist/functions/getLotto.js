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
exports.getLotto = void 0;
const cheerio_1 = require("cheerio");
const scrapeText = (cheerio) => (selector) => cheerio(selector)
    .map((_, el) => cheerio(el).text())
    .toArray();
const getLotto = (targetId) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://news.sanook.com/lotto/check/${targetId}`;
    const $ = (0, cheerio_1.load)(yield fetch(url).then((o) => o.text()));
    const scraper = scrapeText($);
    const [date, prizeFirst, prizeFirstNear, prizeSecond, prizeThird, prizeForth, prizeFifth, runningNumberFrontThree, runningNumberBackThree, runningNumberBackTwo,] = yield Promise.all([
        $('#contentPrint > header > h2')
            .text()
            .substring($('#contentPrint > header > h2').text().indexOf(' ') + 1),
        scraper('#contentPrint > div.lottocheck__resize > div.lottocheck__sec.lottocheck__sec--bdnone > div.lottocheck__table > div:nth-child(1) > strong.lotto__number'),
        scraper('#contentPrint > div.lottocheck__resize > div.lottocheck__sec.lottocheck__sec--bdnone > div.lottocheck__sec--nearby > strong.lotto__number'),
        scraper('#contentPrint > div.lottocheck__resize > div:nth-child(2) > div > span.lotto__number'),
        scraper('#contentPrint > div.lottocheck__resize > div:nth-child(3) > div > span'),
        scraper('#contentPrint > div.lottocheck__resize > div.lottocheck__sec.lottocheck__sec--font-mini.lottocheck__sec--bdnoneads > div.lottocheck__box-item > span.lotto__number'),
        scraper('#contentPrint > div.lottocheck__resize > div:nth-child(7) > div > span.lotto__number'),
        scraper('#contentPrint > div.lottocheck__resize > div.lottocheck__sec.lottocheck__sec--bdnone > div.lottocheck__table > div:nth-child(2) > strong.lotto__number'),
        scraper('#contentPrint > div.lottocheck__resize > div.lottocheck__sec.lottocheck__sec--bdnone > div.lottocheck__table > div:nth-child(3) > strong.lotto__number'),
        scraper('#contentPrint > div.lottocheck__resize > div.lottocheck__sec.lottocheck__sec--bdnone > div.lottocheck__table > div:nth-child(4) > strong.lotto__number'), // runningNumberBackTwo
    ]);
    return {
        date: date,
        endpoint: url,
        prizes: [
            {
                id: 'prizeFirst',
                name: 'รางวัลที่ 1',
                reward: '6000000',
                amount: prizeFirst.length,
                number: prizeFirst,
            },
            {
                id: 'prizeFirstNear',
                name: 'รางวัลข้างเคียงรางวัลที่ 1',
                reward: '100000',
                amount: prizeFirstNear.length,
                number: prizeFirstNear,
            },
            {
                id: 'prizeSecond',
                name: 'รางวัลที่ 2',
                reward: '200000',
                amount: prizeSecond.length,
                number: prizeSecond,
            },
            {
                id: 'prizeThird',
                name: 'รางวัลที่ 3',
                reward: '80000',
                amount: prizeThird.length,
                number: prizeThird,
            },
            {
                id: 'prizeForth',
                name: 'รางวัลที่ 4',
                reward: '40000',
                amount: prizeForth.length,
                number: prizeForth,
            },
            {
                id: 'prizeFifth',
                name: 'รางวัลที่ 5',
                reward: '20000',
                amount: prizeFifth.length,
                number: prizeFifth,
            },
        ],
        runningNumbers: [
            {
                id: 'runningNumberFrontThree',
                name: 'รางวัลเลขหน้า 3 ตัว',
                reward: '4000',
                amount: runningNumberFrontThree.length,
                number: runningNumberFrontThree,
            },
            {
                id: 'runningNumberBackThree',
                name: 'รางวัลเลขท้าย 3 ตัว',
                reward: '4000',
                amount: runningNumberBackThree.length,
                number: runningNumberBackThree,
            },
            {
                id: 'runningNumberBackTwo',
                name: 'รางวัลเลขท้าย 2 ตัว',
                reward: '2000',
                amount: runningNumberBackTwo.length,
                number: runningNumberBackTwo,
            },
        ],
    };
});
exports.getLotto = getLotto;
//# sourceMappingURL=getLotto.js.map