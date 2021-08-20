export default {
  queuename: "videoTransconding",
  handle: (job) => {
    setTimeout(() => {
      console.log("SetTimeoUT");
      // done();
    }, 2000);
    // done(null, { success: "ok" });
  },
  options: {
    attempts: 1,
  },
};
