import axios, { AxiosError } from 'axios';
//import { writeFile } from 'fs/promises';

export async function getTweetData(tweetId: string): Promise<any> {
	const guestId = await getRandomGuestID();

	try {
		const res = await requestTweetMeta(tweetId, guestId);

		if (res.status === 401) {
			return getTweetData(tweetId);
		}

		//await writeFile(`${tweetId}.json`, JSON.stringify(res.data, null, 2), 'utf8');
		return res.data;
	} catch (ex: any) {
		if (ex instanceof AxiosError && ex.response) {
			const { status, statusText } = ex.response;
			ex = new Error(`${status} ${statusText}`);
			ex.status = status;
		}
		throw ex;
	}
}

async function getRandomGuestID(): Promise<string> {
	const res = await axios(API_ACTIVATE, { method: 'POST', headers: DEFAULT_HEADERS });
	const responseData: any = res.data;
	return responseData.guest_token;
}

async function requestTweetMeta(tweetId: string, guestId: string) {
	const url = `https://twitter.com/i/api/2/timeline/conversation/${tweetId}.json?include_profile_interstitial_type=1&include_blocking=1&include_blocked_by=1&include_followed_by=1&include_want_retweets=1&include_mute_edge=1&include_can_dm=1&include_can_media_tag=1&skip_status=1&cards_platform=Web-12&include_cards=1&include_ext_alt_text=true&include_quote_count=true&include_reply_count=1&tweet_mode=extended&include_entities=true&include_user_entities=true&include_ext_media_color=true&include_ext_media_availability=true&send_error_codes=true&simple_quoted_tweet=true&count=20&include_ext_has_birdwatch_notes=false&ext=mediaStats%2ChighlightedLabel`;
	return await axios.get(url, { headers: { ...DEFAULT_HEADERS, 'x-guest-token': guestId } });
}


const API_ACTIVATE = 'https://api.twitter.com/1.1/guest/activate.json';
const DEFAULT_HEADERS = {
	authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
	'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36'
};
