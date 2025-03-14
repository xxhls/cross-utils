import fs from 'fs';
import path from 'path';

function cleanDir(dir) {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const filePath = path.join(dir, file);
      if (fs.lstatSync(filePath).isDirectory()) {
        cleanDir(filePath);
      } else {
        fs.unlinkSync(filePath);
      }
    });
    fs.rmdirSync(dir);
  }
}

function handleOutput(output) {
  const outputs = Array.isArray(output) ? output : [output];
  outputs.forEach(output => {
    if (output.dir) {
      cleanDir(output.dir);
    }
  });
}

export default function clean() {
  return {
    name: 'clean',
    buildStart(options) {
      if (options.output) {
        handleOutput(options.output);
      }
    }
  };
}