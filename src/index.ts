import { env } from '@/common/utils/envConfig';
import { app, logger } from '@/server';
import { waWebClient } from '@/waweb';

const server = app.listen(env.PORT, () => {
  const { NODE_ENV, HOST, PORT } = env;
  waWebClient.initialize();
  logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
  logger.info(`WhatsApp Web Client initialized`);
});

const onCloseSignal = async () => {
  logger.info('sigint received, shutting down');
  await waWebClient.destroy();
  server.close(async () => {
    // await waWebClient.destroy();
    logger.info('server closed');
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
};

process.on('SIGINT', onCloseSignal);
process.on('SIGTERM', onCloseSignal);
