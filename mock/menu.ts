import { Request, Response } from 'express';
import routes from '../config/routes';

function getAccountUserInfo(req: Request, res: Response) {
  const result = {
    data: routes,
    success: true,
  };

  return res.json(result);
}

export default {
  'GET  /api/menus': getAccountUserInfo,
};
