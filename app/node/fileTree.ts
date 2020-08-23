import * as fs from 'fs';
import * as path from 'path';

interface Result {
  filename: string;
  filepath: string;
  isDir?: boolean;
  isFile?: boolean;
  children?: Result[];
}

function walkDirRecursive(dir: string, result: Result[], trimPos: number): void {
  const files = fs.readdirSync(dir);
  for (let i = 0; i < files.length; i++) {
    const file = path.join(dir, files[i]);
    if (fs.statSync(file).isDirectory()) {
      const item = { filename: file.substr(trimPos), filepath: file, isDir: true, children: [] };
      result.push(item);
      walkDirRecursive(file, item.children, trimPos);
    } else {
      result.push({ filename: file.substr(trimPos), filepath: file, isFile: true });
    }
  }
}

export function getDirFiles(dir: string): Result[] {
  if (dir.charAt(dir.length - 1) !== '/' || dir.charAt(dir.length - 1) !== '\\') {
    dir += '/';
  }
  const result: Result[] = [];
  walkDirRecursive(dir, result, dir.length);
  return result;
}

export default function getFileTree() {
  const filePath = path.join(__dirname, '../../alix_content').replace(/\\/g, '/');
  fs.watch(filePath, (e, filename) => {
    console.log(e, filename, 'watch file change');
  });
  return getDirFiles(filePath);
}
