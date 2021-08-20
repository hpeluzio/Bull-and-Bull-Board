export default {
  queuename: "userReport",
  handle: (job) => {
    console.log("UserReport: ", job.data);
  },
  options: {
    attempts: 1,
  },
};
