import { inspect } from 'util';

import { getTweet } from '../src';

async function main() {
	const noMediaTweet = 'https://twitter.com/openjsf/status/1516087899468419076?s=20&t=BkuB7DJlOkK4Qv3VPyN8og';
	const singleImageTweet = 'https://twitter.com/RydMike/status/1533229922000461824?s=20&t=BkuB7DJlOkK4Qv3VPyN8og';
	const enThreadWithVideo = 'https://twitter.com/ldachet/status/1533018682984697858?s=20&t=BkuB7DJlOkK4Qv3VPyN8og';
	try {
    const tweetMeta = await getTweet(enThreadWithVideo);
		console.log(JSON.stringify(tweetMeta, null, 2));
  } catch (error) {
    console.log(error);
  }
}

main();
