import { Tweet, TweetMedia, VideoMedia, PhotoMedia } from './types';

export function getTweetInfo(tweetData: any): Tweet {
	const text = getTweetText(tweetData);

	const {
		id_str: id,
		created_at,
		favorite_count,
		retweet_count,
		reply_count,
		quote_count,
		lang,
	} = tweetData;

	const tweet: Tweet = {
		id,
		createdAt: new Date(created_at),
		text,
		favoriteCount: favorite_count,
		retweetCount: retweet_count,
		replyCount: reply_count,
		quoteCount: quote_count,
		lang,
	};

	return tweet;
}

export function getTweetMedia(tweetData: any): TweetMedia[] | undefined {
	const list: TweetMedia[] = [];

	if (tweetData.hasOwnProperty('extended_entities')) {
		const mediaArray = tweetData.extended_entities.media as any[];
		for (const media of mediaArray) {
			if (media.type === 'video') {
				list.push(getVideoMedia(media));
			} else if (media.type === 'photo') {
				list.push(getPhotoMedia(media));
			}
		}
	}

	return list.length ? list : undefined;
}

export function getTimelineIds(data: any): string[] {
	try {
		// data.timeline.instructions[0].addEntries.entries[1].content.timelineModule.items
		const instructions = data.timeline.instructions as any[];
		const instruction = instructions.find(x => x.hasOwnProperty('addEntries'))
		const entries = instruction.addEntries.entries as any[];
		const entry = entries.find(x => x.hasOwnProperty('content') && x.content.hasOwnProperty('timelineModule'));
		const items = entry.content.timelineModule.items as any[];
		return items.map(x => x.item.content.tweet.id as string);
	} catch (ex) {}
	return [];
}

export function getTweetMediaList(tweetId: string, data: any): TweetMedia[] | undefined {
	const ids = [ tweetId, ...getTimelineIds(data) ];
	const tweets = ids.map(id => data.globalObjects.tweets[id]);
	const mediaList = [];
	for (const tweet of tweets) {
		const media = getTweetMedia(tweet);
		if (media) {
			mediaList.push(...media);
		}
	}
	return mediaList.length ? mediaList : undefined;
}

function getPhotoMedia(media: any): PhotoMedia {
	return {
		type: 'photo',
		...getMediaSize(media),
		url: media.media_url_https,
		contentType: 'image/jpg'
	};
}

function getVideoMedia(media: any): VideoMedia {
	const variants = (media.video_info.variants as any[])
		.filter(x => x.hasOwnProperty('bitrate'))
		.sort((a: any, b: any) => b.bitrate - a.bitrate);

	if (!variants.length) throw new Error('Invalid video media');

	const { bitrate, content_type: contentType, url } = variants[0];

	return {
		type: 'video',
		url,
		contentType,
		bitrate,
		...getMediaSize(media),
		duration: media.video_info.duration_millis,
	};
}


function getTweetText(tweetData: any) {
	const text: string = tweetData.text || tweetData.full_text || '';
	const range = tweetData.display_text_range;
	return range ? text.substring(range[0], range[1]) : text;
}

function getMediaSize(media: any) {
	const { width, height } = media.original_info;
	return { width, height };
}
