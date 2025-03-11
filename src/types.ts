export interface VideoInfo {
  width: string;
  height: string;
  videoUrl: string;
}

export interface GraphQLResponse {
  data: {
    xdt_shortcode_media: MediaData;
  };
  extensions: {
    is_final: boolean;
  };
}

export interface MediaData {
  __typename: string;
  __isXDTGraphMediaInterface: string;
  id: string;
  shortcode: string;
  thumbnail_src: string;
  dimensions: {
    height: number;
    width: number;
  };
  is_video: boolean;
  video_url: string;
  video_duration: number;
  owner: {
    id: string;
    username: string;
    is_verified: boolean;
    profile_pic_url: string;
    full_name: string;
  };
}

export class InstagramError extends Error {
  constructor(
    message: string,
    public status: number = 500
  ) {
    super(message);
    this.name = 'InstagramError';
  }
} 