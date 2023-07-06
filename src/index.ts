import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { getList } from './functions/getList';
import { getLotto } from './functions/getLotto';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get('/api/ping', (req: Request, res: Response) => {
  res.json({
    status: 'success',
    message: 'pong',
  });
});

app.get('/api/lotto/list/:page', async (req: Request, res: Response) => {
  try {
    const lists = await getList(+req.params.page);

    res.json({
      status: 'success',
      data: lists,
    });
  } catch (e) {
    res.status(500).json({
      status: 'crash',
      message: 'api cannot fulfill your request at this time',
    });
  }
});

app.get('/api/lotto/:id', async (req: Request, res: Response) => {
  try {
    if (!Number.isSafeInteger(Number(req.params.id))) {
      res.status(400).json({
        status: 'crash',
        message: 'invalid positive integer',
      });
    } else {
      const lotto = await getLotto(req.params.id);

      res.json({
        status: 'success',
        data: lotto,
      });
    }
  } catch (e) {
    res.status(500).json({
      status: 'crash',
      message: 'api cannot fulfill your request at this time',
    });
  }
});

app.get('/api/lotto', async (req: Request, res: Response) => {
  try {
    const latestLottery = await getList(1);
    const lotto = await getLotto(latestLottery[0].id);

    if (
      lotto.prizes.some((prize) =>
        prize.number.some((num) => num.toLowerCase().includes('x')),
      )
    ) {
      res.json({
        status: 'success',
        data: await getLotto(latestLottery[1].id),
      });
    } else {
      res.json({
        status: 'success',
        data: lotto,
      });
    }
  } catch (e) {
    res.status(500).json({
      status: 'crash',
      message: 'api cannot fulfill your request at this time',
    });
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
