<div align="center">

# 🎬 reelflow

Elegant and powerful Instagram reels downloader for seamless content extraction.

> **Note:** This library is specifically designed for Instagram Reels. It does not support Stories or Posts.

[![npm version](https://img.shields.io/npm/v/reelflow.svg)](https://www.npmjs.com/package/reelflow)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Instagram](https://img.shields.io/badge/Instagram-Compatible-E4405F.svg)](https://www.instagram.com)

</div>

## 🚀 Simple Usage

### ESM (TypeScript/JavaScript)
```typescript
// ESM - TypeScript/JavaScript
import { getVideoInfo } from 'reelflow';

async function downloadReel() {
  try {
    const url = 'https://www.instagram.com/reels/CxKp7';
    const video = await getVideoInfo(url);
    console.log(video.videoUrl); // Direct download URL
  } catch (error) {
    console.error('Failed:', error instanceof Error ? error.message : String(error));
  }
}

downloadReel();
```

### CommonJS
```javascript
// CommonJS
const { getVideoInfo } = require('reelflow');  // Will automatically use the CJS version

async function downloadReel() {
  try {
    const url = 'https://www.instagram.com/reels/CxKp7';
    const video = await getVideoInfo(url);
    console.log(video.videoUrl);
  } catch (error) {
    console.error('Failed:', error.message);
  }
}

downloadReel();
```

## ✨ Features

- 🚀 Lightning-fast video downloads
- 📝 Full TypeScript support
- 🛡️ Robust error handling
- 🔑 No API key required

## 📦 Installation

```bash
npm install reelflow
```

## 📖 Documentation

<details>
<summary><strong>Advanced Usage</strong></summary>

```typescript
import { getVideoInfo, ReelflowError } from 'reelflow';

async function downloadVideo(url: string) {
  try {
    const video = await getVideoInfo(url);
    console.log('URL:', video.videoUrl);
    console.log('Size:', `${video.width}x${video.height}`);
    return video;
  } catch (error) {
    if (error instanceof ReelflowError) {
      console.error(`Failed (${error.status}):`, error.message);
      throw error;
    }
    console.error('Unexpected error:', error instanceof Error ? error.message : String(error));
    throw new ReelflowError('Unexpected error occurred', 500);
  }
}

// Use it
const reelUrl = 'https://www.instagram.com/reels/CxKp7';
downloadVideo(reelUrl).catch(console.error);
```
</details>

<details>
<summary><strong>Error Handling</strong></summary>

```typescript
import { getVideoInfo, ReelflowError } from 'reelflow';

async function handleReelDownload() {
  try {
    const url = 'https://www.instagram.com/reel/CxKp7';
    const video = await getVideoInfo(url);
    return video;
  } catch (error) {
    if (error instanceof ReelflowError) {
      switch (error.status) {
        case 400: console.error('Invalid URL format'); break;
        case 401: console.error('Video is not accessible'); break;
        case 404: console.error('Video not found'); break;
        default: console.error(`Error ${error.status}:`, error.message);
      }
      throw error;
    }
    console.error('Unexpected error:', error instanceof Error ? error.message : String(error));
    throw new ReelflowError('Unexpected error occurred', 500);
  }
}

handleReelDownload().catch(console.error);
```
</details>

## 📞 Support

- GitHub Issues: [Open an issue](https://github.com/code3-dev/reelflow/issues)
- Email: [h3dev.pira@gmail.com](mailto:h3dev.pira@gmail.com)
- Telegram: [@h3dev](https://t.me/h3dev)

## 📄 License

MIT © [Hossein Pira](https://github.com/code3-dev)

---

<div align="center">

Made with ❤️ by [Hossein Pira](https://github.com/code3-dev)

</div>