import Bull from "bull";
import userReportJob from "../jobs/userReportJob.js";
import redisConfig from "../config/redis.js";

const userReportQueue = new Bull("userReportQueue", redisConfig);

userReportQueue.process(userReportJob.handle);

export { userReportQueue };
