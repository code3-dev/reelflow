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

```typescript
// One-line usage
import reelflow from 'reelflow';
const url = 'https://www.instagram.com/reels/CxKp7';
const video = await reelflow.getVideoInfo(url);
console.log(video.videoUrl); // Direct download URL

// With error handling
try {
  const url = 'https://www.instagram.com/reel/CxKp7';
  const { videoUrl, width, height } = await reelflow.getVideoInfo(url);
  console.log(`Video: ${videoUrl} (${width}x${height})`);
} catch (error) {
  console.error('Failed to get video:', error.message);
}
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
<summary><strong>TypeScript Usage</strong></summary>

```typescript
import reelflow, { ReelflowError } from 'reelflow';

async function downloadVideo(url: string) {
  try {
    const video = await reelflow.getVideoInfo(url);
    console.log('URL:', video.videoUrl);
    console.log('Size:', `${video.width}x${video.height}`);
    return video;
  } catch (error: unknown) {
    if (error instanceof ReelflowError) {
      console.error(`Failed (${error.status}):`, error.message);
    }
    throw error;
  }
}

// Use it
const reelUrl = 'https://www.instagram.com/reels/CxKp7';
await downloadVideo(reelUrl);
```
</details>

<details>
<summary><strong>JavaScript (CommonJS)</strong></summary>

```javascript
const { default: reelflow } = require('reelflow');

async function downloadVideo(url) {
  try {
    const video = await reelflow.getVideoInfo(url);
    console.log('URL:', video.videoUrl);
    return video;
  } catch (error) {
    console.error('Failed:', error.message);
  }
}

const reelUrl = 'https://www.instagram.com/reels/CxKp7';
downloadVideo(reelUrl);
```
</details>

<details>
<summary><strong>JavaScript (ES Modules)</strong></summary>

```javascript
import reelflow from 'reelflow';

const downloadVideo = async (url) => {
  try {
    const { videoUrl, width, height } = await reelflow.getVideoInfo(url);
    console.log('Video info:', { videoUrl, width, height });
    return videoUrl;
  } catch (error) {
    console.error('Failed:', error.message);
  }
};

const reelUrl = 'https://www.instagram.com/reels/CxKp7';
downloadVideo(reelUrl);
```
</details>

<details>
<summary><strong>Error Handling</strong></summary>

```typescript
import reelflow, { ReelflowError } from 'reelflow';

try {
  const url = 'https://www.instagram.com/reel/CxKp7';
  const video = await reelflow.getVideoInfo(url);
} catch (error) {
  if (error instanceof ReelflowError) {
    switch (error.status) {
      case 400: console.error('Invalid URL format'); break;
      case 401: console.error('Video is not accessible'); break;
      case 404: console.error('Video not found'); break;
      default: console.error(`Error ${error.status}:`, error.message);
    }
  }
}
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