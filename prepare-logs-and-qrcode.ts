import * as fs from 'fs';
import * as path from 'path';

// Directory and file paths
const logsDir = path.join(__dirname, 'public/logs');
const qrCodesDir = path.join(__dirname, 'public/qr-codes');
const infoLogPath = path.join(logsDir, 'info.log');
const errorsLogPath = path.join(logsDir, 'errors.log');
const latestQRCodePath = path.join(qrCodesDir, 'latest.png');

// Create the logs directory if it doesn't exist
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Create the info.log file if it doesn't exist
if (!fs.existsSync(infoLogPath)) {
  fs.writeFileSync(infoLogPath, '', 'utf8');
}

// Create the errors.log file if it doesn't exist
if (!fs.existsSync(errorsLogPath)) {
  fs.writeFileSync(errorsLogPath, '', 'utf8');
}

// Create the qr-codes directory if it doesn't exist
if (!fs.existsSync(qrCodesDir)) {
  fs.mkdirSync(qrCodesDir);
}

// Create the qr-codes latest.png if it doesn't exist
if (!fs.existsSync(latestQRCodePath)) {
  fs.writeFileSync(latestQRCodePath, '', 'utf8');
}

console.log('Logs directory and files are prepared.');
