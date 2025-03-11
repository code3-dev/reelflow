import { InstagramDownloader } from './instagram-downloader.js';
export { InstagramError as ReelflowError } from './types.js';

const instance = new InstagramDownloader();
export const getVideoInfo = (url: string) => instance.getVideoInfo(url);

// Default export
export default {
  getVideoInfo
}; 