import axios from 'axios';
import { load } from 'cheerio';
import type {
  VideoInfo,
  GraphQLResponse,
  MediaData,
  InstagramMediaInfo
} from './types.js';
import { InstagramError } from './types.js';
import {
  formatGraphqlJson,
  formatPageJson,
  getPostIdFromUrl,
  encodeGraphqlRequestData,
  validateInstagramURL
} from './utils.js';
import {
  INSTAGRAM_BASE_URL,
  INSTAGRAM_ENDPOINTS,
  GRAPHQL_HEADERS,
  WEBPAGE_HEADERS
} from './constants.js';

export class InstagramDownloader {
  private async getPostPageHTML(postId: string): Promise<string> {
    try {
      const response = await axios.get(
        `${INSTAGRAM_BASE_URL}${INSTAGRAM_ENDPOINTS.POST}/${postId}`,
        {
          headers: WEBPAGE_HEADERS
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new InstagramError(
          error.response?.data?.message || 'Failed to fetch Instagram page',
          error.response?.status || 500
        );
      }
      throw error;
    }
  }

  private async getPostGraphqlData(postId: string): Promise<GraphQLResponse> {
    try {
      const encodedData = encodeGraphqlRequestData(postId);
      const response = await axios.post(
        `${INSTAGRAM_BASE_URL}${INSTAGRAM_ENDPOINTS.GRAPHQL}`,
        encodedData,
        {
          headers: GRAPHQL_HEADERS
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new InstagramError(
          error.response?.data?.message || 'Failed to fetch GraphQL data',
          error.response?.status || 500
        );
      }
      throw error;
    }
  }

  private async getVideoInfoFromHTML(postId: string): Promise<VideoInfo | null> {
    const html = await this.getPostPageHTML(postId);
    const $ = load(html);
    return formatPageJson($);
  }

  private async getVideoInfoFromGraphQL(postId: string): Promise<VideoInfo | null> {
    const data = await this.getPostGraphqlData(postId);
    const mediaData = data.data?.xdt_shortcode_media;

    if (!mediaData) {
      return null;
    }

    if (!mediaData.is_video) {
      throw new InstagramError('This post is not a video', 400);
    }

    return formatGraphqlJson(mediaData);
  }

  public async getVideoInfo(url: string): Promise<VideoInfo> {
    const validationError = validateInstagramURL(url);
    if (validationError) {
      throw new InstagramError(validationError, 400);
    }

    const postId = getPostIdFromUrl(url);
    if (!postId) {
      throw new InstagramError('Could not extract post ID from URL', 400);
    }

    // Get the HTML first to extract media info
    const html = await this.getPostPageHTML(postId);
    const mediaInfo = await this.extractMediaInfo(html);

    // Try webpage method first
    let videoInfo = await this.getVideoInfoFromHTML(postId);
    if (videoInfo) {
      return {
        ...videoInfo,
        username: mediaInfo.username,
        description: mediaInfo.description,
        thumbnail: mediaInfo.thumbnail
      };
    }

    // Fallback to GraphQL method
    videoInfo = await this.getVideoInfoFromGraphQL(postId);
    if (videoInfo) {
      return {
        ...videoInfo,
        username: mediaInfo.username,
        description: mediaInfo.description,
        thumbnail: mediaInfo.thumbnail
      };
    }

    throw new InstagramError('Could not fetch video information', 404);
  }

  private async extractMediaInfo(html: string): Promise<InstagramMediaInfo> {
    try {
      const $ = load(html);

      // Get thumbnail URL
      const thumbnail = $('meta[property="og:image"]').attr('content') || undefined;

      // Get description and username from meta description
      const rawDescription = $('meta[property="og:description"]').attr('content') || '';
      let description: string | undefined = undefined;
      let username: string | undefined = undefined;

      // Try to extract username from likes format first (e.g., "2,420 likes, 13 comments - almas.graphi on...")
      const likesMatch = rawDescription.match(/- (.*?) on/);  // Match everything between "- " and " on"
      if (likesMatch && likesMatch[1]) {
        // Get the username part and remove any trailing spaces
        username = likesMatch[1].replace(/\s+$/, '');

        // Extract description by removing the likes/comments/date part
        const descMatch = rawDescription.match(/^[^-]+ - [^\ ]+ on [^‎]+‎(.+)$/);
        if (descMatch) {
          // Remove quotes and trim
          description = descMatch[1].trim().replace(/^["']|["']$/g, '') || undefined;
        }
      } else {
        // Fallback: try to extract username from description format (username: description)
        const usernameMatch = rawDescription.match(/^([^:]+):/);
        if (usernameMatch) {
          username = usernameMatch[1].split(' on ')[0].trim();
          // Remove username from description, quotes, and trim
          description = rawDescription.replace(/^[^:]+:\s*/, '').trim().replace(/^["']|["']$/g, '') || undefined;
        }
      }

      // Extract video or image URL
      const videoUrl = $('meta[property="og:video"]').attr('content');
      const videoWidth = $('meta[property="og:video:width"]').attr('content');
      const videoHeight = $('meta[property="og:video:height"]').attr('content');

      if (videoUrl && videoWidth && videoHeight) {
        return {
          url: videoUrl,
          type: 'video',
          width: videoWidth,
          height: videoHeight,
          username,
          thumbnail,
          description,
        };
      }

      const imageUrl = $('meta[property="og:image"]').attr('content');
      if (imageUrl) {
        return {
          url: imageUrl,
          type: 'image',
          username,
          thumbnail,
          description,
        };
      }

      throw new Error('No media URL found');
    } catch (error) {
      throw new Error(`Failed to extract media info: ${(error as Error).message}`);
    }
  }
} 