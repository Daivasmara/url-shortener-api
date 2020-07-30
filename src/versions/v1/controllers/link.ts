import randomstring from 'randomstring';
import retry from 'async-retry';
import Joi from '@hapi/joi';
import urlRegex from 'url-regex';
import { Middlewares } from '@helpers/interfaces';
import { Link } from '@models/index';
import { LinkInterface } from '@models/link';
import { HASH_LENGTH, HASH_RETRY_COUNT } from '@helpers/constants';

class LinkController {
  static getAllLink: Middlewares = async (_req, res, next) => {
    try {
      const message = await Link.findAll();
      res.json({ warning: 'DEV ONLY', message });
    } catch (err) {
      next(err);
    }
  }

  static getLink: Middlewares = async (req, res, next) => {
    try {
      const { hash } = req.params;
      const linkExist = await Link.findByPk(hash);
      if (!linkExist) {
        res.status(400);
        throw new Error('Link not found');
      }
      res.json({ message: linkExist });
    } catch (err) {
      next(err);
    }
  }

  static addLink: Middlewares = async (req, res, next) => {
    const { link } = req.body;
    let hash: string = '';

    try {
      const schema = Joi.object({
        link: Joi.string().required(),
      });
      await schema.validateAsync({ link });
      if (!urlRegex({ strict: false }).test(link)) {
        throw new Error('"link" must be a valid URL');
      }
    } catch (err) {
      res.status(400);
      next(err);
      return;
    }

    try {
      const linkExist = await Link.findOne({ where: { link } });
      if (linkExist) {
        res.status(201);
        res.json({ message: linkExist });
        return;
      }

      await retry(async () => {
        hash = randomstring.generate(HASH_LENGTH);
        const hashExist = await Link.findByPk(hash);

        if (hashExist) {
          throw new Error(`Failed to produce unique hash after ${HASH_RETRY_COUNT} retries`);
        }

        return hash;
      }, {
        retries: HASH_RETRY_COUNT,
      });

      const record: LinkInterface = { hash, link };
      const message = await Link.create(record);
      res.status(201);
      res.json({ message });
    } catch (err) {
      next(err);
    }
  }
}

export default LinkController;
