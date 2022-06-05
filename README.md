Tweet Media Extractor

```typescript
import { getTweet } from '../src';

async function main() {
	const tweet = await getTweet('https://twitter.com/ldachet/status/1533018682984697858?s=20&t=BkuB7DJlOkK4Qv3VPyN8og');
		console.log(JSON.stringify(tweet, null, 2));
}

main();
```

```json
{
  "id": "1533018682984697858",
  "createdAt": "2022-06-04T09:31:50.000Z",
  "text": "Having fun this weekend creating a movie explorer with @FlutterDev\n\nCode source below",
  "favoriteCount": 162,
  "retweetCount": 20,
  "replyCount": 9,
  "quoteCount": 0,
  "lang": "en",
  "media": [
    {
      "type": "video",
      "url": "https://video.twimg.com/ext_tw_video/1533018633953222656/pu/vid/720x1280/Z9bDmG1UKVygwLw6.mp4?tag=12",
      "contentType": "video/mp4",
      "bitrate": 2176000,
      "width": 720,
      "height": 1280,
      "duration": 13313
    }
  ]
}
```
