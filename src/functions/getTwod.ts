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
  const utcDate = moment();
  const date = utcDate.format('DD-MM-yyyy');
  const time = utcDate.format('hh:mm:ss a');

  const dt = new Date().toUTCString();
  const dateTime = new Date(dt);

  return {
    set,
    value,
    twod,
    utc_date: date,
    utc_time: time,
    local_date: dateTime.toLocaleDateString(),
    local_time: dateTime.toLocaleTimeString(),
    local_date_time: dateTime.toLocaleString(),
  };
};
