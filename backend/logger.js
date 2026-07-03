import fs from 'fs';

export const logger = () => {
  return (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    fs.appendFile('server.log', `${new Date().toISOString()} ${req.method} ${req.url}\n`, (err) => {
      if (err) {
        console.error('Failed to write to log file:', err);
      }
    });
    next();
  };
}