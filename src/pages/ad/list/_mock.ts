import type { Request, Response } from 'express';
import type { AdvertiserItem } from './data.d';

const list: AdvertiserItem[] = Array.from({ length: 77 }).map((_, index) => ({
  id: index + 1,
}));

function getAdvertiserList(req: Request, res: Response) {
  const params = req.query;
  const { pageIndex = 1, pageSize: pageSize1 } = params;
  let dataSource = list;

  let pageSize = 10;
  if (pageSize1) {
    pageSize = parseInt(`${pageSize1}`, 0);
  }

  const totalCount = dataSource.length;

  const start = (+pageIndex - 1) * pageSize;
  const end = +pageIndex * pageSize;

  dataSource = dataSource.slice(start, end);
  return res.json({
    code: 0,
    error: '',
    data: {
      records: dataSource,
      totalCount,
    },
  });
}

export default {
  'GET /api/advertiser/list': getAdvertiserList,
};
