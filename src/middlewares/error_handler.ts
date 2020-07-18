import { ErrorHandler } from '@helpers/interfaces';
import { ENVIRONMENT } from '@helpers/constants';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorHandler = (err, _req, res, _next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  if (process.env.NODE_ENV === ENVIRONMENT.production) {
    res.json({
      message: err.message,
    });
  } else {
    res.json({
      message: err.message,
      stack: err.stack,
    });
  }
};

export default errorHandler;
