import { Middlewares } from '@helpers/interfaces';

const notFound: Middlewares = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export default notFound;
