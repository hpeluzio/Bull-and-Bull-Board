import Bull from "bull";
import videoTranscodingJob from "../jobs/videoTranscodingJob.js";
import redisConfig from "../config/redis.js";

const videoTranscodingQueue = new Bull("video transcoding", redisConfig);

videoTranscodingQueue.process(videoTranscodingJob.handle);

export { videoTranscodingQueue };
