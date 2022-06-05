const TWEET_RX = /(?:http)?(?:s:\/\/)?(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)\/status\/[0-9]{19}/;

export function isValidTweetUrl(tweetUrl: string): boolean {
	return TWEET_RX.test(tweetUrl);
}

export function getTweetId(tweetUrl: string): string {
	return tweetUrl.match(/(?<=status\/\s*)\d+/)![0];
}

export function tryGet<T>(fn: () => T): T | undefined {
	try {
		return fn();
	} catch (ex) {}
	return undefined;
}
