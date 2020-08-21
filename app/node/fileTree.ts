import * as fs from 'fs';
import * as path from 'path';

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath: string, result: any[]) {
  // 根据文件路径读取文件，返回文件列表
  fs.readdir(filePath, (err, files) => {
    if (err) {
      console.warn(err);
    } else {
      // 遍历读取到的文件列表
      files.forEach((filename) => {
        // 获取当前文件的绝对路径
        const filedir = path.join(filePath, filename);
        // 根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(filedir, (eror, stats) => {
          if (eror) {
            console.warn('获取文件stats失败');
          } else {
            const isFile = stats.isFile(); // 是文件
            const isDir = stats.isDirectory(); // 是文件夹
            if (isFile) {
              console.log(filedir);
              result.push({ filename, isFile });
            }
            if (isDir) {
              const item = { filename, isDir, children: [] };
              result.push(item);
              fileDisplay(filedir, item.children); // 递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }
          }
        });
      });
    }
  });
}

export default function readFilePath() {
  return new Promise((resolve, reject) => {
    const filePath = path
      .join(__dirname, '../../alix_content')
      .replace(/\\/g, '/');

    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        try {
          fs.mkdirSync(filePath);
          resolve({});
        } catch (error) {
          reject(Error('alix-content 创建失败'));
        }
      } else {
        const result: any[] = [];
        fileDisplay(filePath, result);
        resolve(result);
      }
    });
  });
}
