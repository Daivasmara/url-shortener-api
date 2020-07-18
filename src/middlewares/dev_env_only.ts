import { Middlewares } from '@helpers/interfaces';
import { ENVIRONMENT } from '@helpers/constants';

const { NODE_ENV } = process.env;

const devEnvOnly: Middlewares = (_req, _res, next) => {
  if (NODE_ENV !== ENVIRONMENT.production) {
    next();
  } else {
    next('route');
  }
};

export default devEnvOnly;
