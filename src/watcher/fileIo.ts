import * as fs from 'fs';
import path from 'path';

export const getFilePaths = (baseDir: string, _buf?: string[]) => {
  const buf = _buf || [];
  const fileOrDirNames = fs.readdirSync(baseDir);
  fileOrDirNames.map((name) => {
    try {
      const path = `${baseDir}/${name}`;
      const stat = fs.statSync(path);
      if (stat.isDirectory()) {
        getFilePaths(path, buf);
      } else if (stat.isFile()) {
        buf.push(path);
      }
    } catch (e) {}
  });
  return buf;
};

export const createTextFile = (filePath: string, text: string) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, text);
};
