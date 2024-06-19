import qrcode from 'qrcode-terminal';
import waWeb from 'whatsapp-web.js';

import { logger } from '@/server';

const { Client, LocalAuth } = waWeb;
const wwebVersion = '2.2412.54';
// const wwebVersion = '2.3000.1014192904';

// const waWebClient = new Client();
const waWebClient = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
  webVersionCache: {
    type: 'remote',
    remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/${wwebVersion}.html`,
  },
});

waWebClient.on('ready', () => {
  logger.info('Client is ready!');

  //   setTimeout(() => {
  //     waWebClient.sendMessage(
  //       '2348060971903@c.us',
  //       "Hello! I'm a bot. I'm currently under development. Please don't spam me. Thanks!"
  //     );
  //   }, 5000);
});

waWebClient.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

// Listening to all incoming messages
waWebClient.on('message_create', (message) => {
  if (message.body === '!ping') {
    // reply back "pong" directly to the message
    message.reply('pong');
  }
});

export { waWebClient };
