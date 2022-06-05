export interface TweetMedia {
  type: 'video' | 'photo';
	width: number;
	height: number;
	url: string;
  contentType: string;
}

export interface VideoMedia extends TweetMedia {
  type: 'video';
	duration: number;
  bitrate: number;
}

export interface PhotoMedia extends TweetMedia {
  type: 'photo';
}

export interface Tweet {
  id: string;
  createdAt: Date;
  text?: string;
  favoriteCount: number;
  retweetCount: number;
  replyCount: number;
  quoteCount: number;
	lang: string;
	media?: TweetMedia[];
}
