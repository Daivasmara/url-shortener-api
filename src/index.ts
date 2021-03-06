import 'dotenv/config';
import 'module-alias/register';
import express from 'express';
import {
  cors,
  helmet,
  morgan,
  compress,
  notFound,
  errorHandler,
} from '@middlewares/index';
import v1 from '@v1/index';
import { ENVIRONMENT } from '@helpers/constants';
import db from '@db/index';

const {
  NODE_ENV,
  PORT,
} = process.env;

// Express Initialization
const app = express();

// Test DB Connection & Sync Models
db.testConnection();
db.syncTable();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan(NODE_ENV === ENVIRONMENT.production ? 'combined' : 'dev'));
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Welcome
app.get('/', (_req, res) => {
  res.json({
    message: 'URL Shortener API',
  });
});

// V1
app.use('/v1', v1);

// 404 Not Found and Error Handlers
app.use(notFound);
app.use(errorHandler);

// Listening PORT
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
