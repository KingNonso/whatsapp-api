import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import { pino } from 'pino';

import { healthCheckRouter } from '@/api/healthCheck/healthCheckRouter';
// import { userRouter } from '@/api/user/userRouter';
import { waWebRouter } from '@/api/whatsapp/waWebRouter';
import { openAPIRouter } from '@/api-docs/openAPIRouter';
import errorHandler from '@/common/middleware/errorHandler';
// import rateLimiter from '@/common/middleware/rateLimiter';
import requestLogger from '@/common/middleware/requestLogger';
import { env } from '@/common/utils/envConfig';

import { webRouter } from './api/web/webRouter';

const logger = pino({ name: 'server start' });
const infoLoggerToFile = pino({ name: 'Info logger', level: 'info' }, pino.destination('public/logs/info.log'));
const errorLoggerToFile = pino({ name: 'Error logger', level: 'error' }, pino.destination('public/logs/errors.log'));

const app: Express = express();

// Set the application to trust the reverse proxy
app.set('trust proxy', true);

app.set('views', 'views');
app.set('view engine', 'ejs');

// Middlewares
app.use(express.json());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
// app.use(rateLimiter);
app.use(express.static('public'));

// Request logging
app.use(requestLogger);

// Routes
app.use('/', webRouter);
app.use('/health-check', healthCheckRouter);
app.use('/wa-web', waWebRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app, errorLoggerToFile, infoLoggerToFile, logger };
