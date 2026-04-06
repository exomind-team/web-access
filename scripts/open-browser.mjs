#!/usr/bin/env node
// 在默认浏览器中打开 URL
// 用法: node open-browser.mjs <URL>

import { exec } from 'node:child_process';
import { platform } from 'node:os';

/**
 * 在系统默认浏览器中打开 URL
 * @param {string} url - 要打开的 URL
 * @returns {Promise<void>}
 */
export function openInBrowser(url) {
  return new Promise((resolve, reject) => {
    let cmd;

    switch (platform()) {
      case 'win32':
        cmd = `start "" "${url}"`;
        break;
      case 'darwin':
        cmd = `open "${url}"`;
        break;
      case 'linux':
        cmd = `xdg-open "${url}"`;
        break;
      default:
        reject(new Error(`Unsupported platform: ${platform()}`));
        return;
    }

    exec(cmd, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

// --- CLI 入口 ---

const isMain = process.argv[1]?.endsWith('open-browser.mjs');
if (isMain) {
  const url = process.argv[2];

  if (!url) {
    console.log(`
🌐 在默认浏览器中打开 URL

用法:
  node open-browser.mjs <URL>

示例:
  node open-browser.mjs "https://github.com"
`);
    process.exit(1);
  }

  openInBrowser(url)
    .then(() => console.log(`已在浏览器中打开: ${url}`))
    .catch((err) => {
      console.error(`打开失败: ${err.message}`);
      process.exit(1);
    });
}
