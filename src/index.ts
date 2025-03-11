import { InstagramDownloader } from './instagram-downloader';

// Main class with a simpler name
export { InstagramDownloader as Reelflow } from './instagram-downloader';
export { InstagramError as ReelflowError } from './types';
export type { VideoInfo } from './types';

// Create a simple default instance
const reelflow = new InstagramDownloader();

// Export convenient methods
export const getVideo = (url: string) => reelflow.getVideoInfo(url);

// Default export for even simpler usage
export default reelflow; 