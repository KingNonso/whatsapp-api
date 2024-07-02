import qrcode from 'qrcode-terminal';
import waWeb from 'whatsapp-web.js';

import { logger } from '@/server';

const { Client, LocalAuth } = waWeb;
// const wwebVersion = '2.2413.51';
// const wwebVersion = '2.3000.1014192904';

// const waWebClient = new Client();
const waWebClient = new Client({
  authStrategy: new LocalAuth(),
  restartOnAuthFail: true,
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
});

waWebClient.on('ready', async () => {
  logger.info('Client is ready!');
  const version = await waWebClient.getWWebVersion();
  logger.info(`WWeb v${version}`);
});

waWebClient.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

// Listening to all incoming messages
waWebClient.on('message_create', (message) => {
  message.reply('This is an automated response. Kindly contact the admin for further assistance.');
});

export { waWebClient };
