import { Middlewares } from '@helpers/interfaces';

class LinkController {
  static getAll: Middlewares = (_req, res) => {
    const message: any[] = [];
    res.json({ message });
  }
}

export default LinkController;
