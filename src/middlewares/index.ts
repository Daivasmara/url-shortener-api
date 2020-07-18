import compress from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import notFound from '@middlewares/not_found';
import errorHandler from '@middlewares/error_handler';

export {
  cors,
  helmet,
  morgan,
  compress,
  notFound,
  errorHandler,
};
