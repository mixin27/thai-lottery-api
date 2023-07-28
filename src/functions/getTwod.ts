import { load } from 'cheerio';
import moment, { utc } from 'moment';

export const getTwodData = async () => {
  const $ = load(
    await fetch('https://www.set.or.th/en/home').then((o) => o.text()),
  );

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

  const twod =
    set.split('.')[1].charAt(1).toString() + value.charAt(5).toString();

  // const utcDT = new Date().toUTCString();
  var dt = moment();

  // const date = dt.format('DD-MM-yyyy');
  // const time = dt.format('hh:mm:ss a');

  return {
    set,
    value,
    twod,
    date: dt.utcOffset('+06:30').format('YYYY-MM-DD HH:mm:ss'),
  };
};
