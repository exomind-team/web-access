#!/usr/bin/env node
// URL 编码工具 - 将非 ASCII 字符转换为 URL 安全格式
// 用法: node url-encode.mjs "中文文本"
// 或作为模块导入: import { encodeUrl, decodeUrl } from './url-encode.mjs'

/**
 * URL 编码主函数
 * @param {string} text - 要编码的文本
 * @returns {string} - URL 安全的编码字符串
 */
export function encodeUrl(text) {
  return encodeURIComponent(text);
}

/**
 * URL 解码函数
 * @param {string} text - 要解码的编码字符串
 * @returns {string} - 解码后的文本
 */
export function decodeUrl(text) {
  return decodeURIComponent(text);
}

/**
 * 完整 URL 编码（保留 URL 结构）
 * @param {string} url - 完整的 URL
 * @returns {string} - 仅编码路径部分的 URL
 */
export function encodeUrlPath(url) {
  try {
    const urlObj = new URL(url);
    // 编码路径部分（仅编码非 ASCII 字符）
    const encodedPath = urlObj.pathname.split('/').map(p => {
      if (/[^\x00-\x7F]/.test(p)) {
        // 只编码包含非 ASCII 字符的部分
        return encodeURIComponent(p);
      }
      return p;
    }).join('/');

    // 编码查询参数中的非 ASCII 字符
    const encodedSearch = urlObj.search ? '?' + Array.from(urlObj.searchParams.entries())
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&') : '';

    return `${urlObj.origin}${encodedPath}${encodedSearch}${urlObj.hash}`;
  } catch {
    // 如果不是有效 URL，直接返回编码结果
    return encodeURIComponent(url);
  }
}

// --- CLI 入口 ---
const isMain = process.argv[1]?.endsWith('url-encode.mjs');
if (isMain) {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
    console.log(`
🌐 URL 编码工具

用法:
  node url-encode.mjs <文本> [选项]

选项:
  -d, --decode    解码模式（将 %XX 转换回原文）
  -p, --path     编码完整 URL（保留协议、域名等结构）
  -h, --help     显示帮助信息

示例:
  # 编码中文文本
  node url-encode.mjs "你好世界"
  # 输出: %E4%BD%A0%E5%A5%BD%E4%B8%96%E7%95%8C

  # 编码完整 URL
  node url-encode.mjs "https://example.com/你好" -p
  # 输出: https://example.com/%E4%BD%A0%E5%A5%BD

  # 解码
  node url-encode.mjs "%E4%BD%A0%E5%A5%BD" -d
  # 输出: 你好
`);
    process.exit(0);
  }

  const isDecode = args.includes('-d') || args.includes('--decode');
  const isPath = args.includes('-p') || args.includes('--path');

  // 过滤掉选项，只保留文本参数
  const textArgs = args.filter(arg => !arg.startsWith('-'));

  if (isDecode) {
    console.log(decodeUrl(textArgs.join(' ')));
  } else if (isPath) {
    console.log(encodeUrlPath(textArgs.join(' ')));
  } else {
    console.log(encodeUrl(textArgs.join(' ')));
  }
}
