import axios from 'axios';
import { load } from 'cheerio';
import {
  VideoInfo,
  GraphQLResponse,
  InstagramError
} from './types';
import {
  getPostIdFromUrl,
  validateInstagramURL,
  encodeGraphqlRequestData,
  formatGraphqlJson,
  formatPageJson
} from './utils';
import {
  INSTAGRAM_BASE_URL,
  INSTAGRAM_ENDPOINTS,
  GRAPHQL_HEADERS,
  WEBPAGE_HEADERS
} from './constants';

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

    // Try webpage method first
    let videoInfo = await this.getVideoInfoFromHTML(postId);
    if (videoInfo) return videoInfo;

    // Fallback to GraphQL method
    videoInfo = await this.getVideoInfoFromGraphQL(postId);
    if (videoInfo) return videoInfo;

    throw new InstagramError('Could not fetch video information', 404);
  }
} 