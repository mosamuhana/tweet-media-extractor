import { getTweetData } from './http';
import { isValidTweetUrl, getTweetId } from './utils';
import { Tweet } from './types';
import { getTweetInfo, getTweetMediaList } from './parse-tweet';

export async function getTweet(tweetUrl: string): Promise<Tweet> {
	if (!isValidTweetUrl(tweetUrl)) {
		throw new Error('Invalid tweet url');
	}

	const tweetId = getTweetId(tweetUrl);
	const tweetData = await getTweetData(tweetId);
	const tweet = getTweetInfo(tweetData.globalObjects.tweets[tweetId]);
	const media = getTweetMediaList(tweetId, tweetData);
	if (media) {
		tweet.media = media;
	}

	return tweet;
}
