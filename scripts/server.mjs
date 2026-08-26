import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const root = process.cwd();
const port = Number(process.env.PORT || 4173);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.pdf': 'application/pdf'
};

createServer(async (request, response) => {
  const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;
  const requested = pathname === '/' ? 'index.html' : pathname.replace(/^\//, '');
  const file = normalize(join(root, requested));

  if (!file.startsWith(root)) {
    response.writeHead(403).end('Forbidden');
    return;
  }

  try {
    const body = await readFile(file);
    response.writeHead(200, { 'Content-Type': types[extname(file).toLowerCase()] || 'application/octet-stream' });
    response.end(body);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  }
}).listen(port, '127.0.0.1', () => {
  console.log(`Mike Vais website: http://127.0.0.1:${port}`);
});
