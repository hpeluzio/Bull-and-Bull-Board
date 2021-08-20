import express from "express";
import cors from "cors";
import Bull from "bull";
import { createBullBoard } from "@bull-board/api";
import { BullAdapter } from "@bull-board/api/bullAdapter.js";
import { ExpressAdapter } from "@bull-board/express";

// import { videoTranscodingQueue } from "./queues/videoTranscodingQueue.js";
// import { userReportQueue } from "./queues/userReportQueue.js";

import * as jobs from "./jobs";
import Queue from "./queues";

const app = express();
app.use(cors());
app.use(express.json());

// //Bull Queue Route
// app.get("/video", async (req, res) => {
//   videoTranscodingQueue.add({ data: "dataoi" });

//   console.log("Video Transcoding Route /");
//   return res.send({ message: "videoTranscoding job add" });
// });

app.get("/user", async (req, res) => {
  Queue.add("userReport", { user: { name: "Henrique", age: 32 } });

  console.log("user Report Route /");
  return res.send({ message: " userReport job add" });
});

app.get("/jobs", async (req, res) => {
  return res.send({ jobs });
});

app.get("/queues", async (req, res) => {
  // console.log(Queue);
  Queue.queues.map((queue) => console.log(queue.bull));
  return res.send({ oi: "oi" });
});

//BullBoard config
const serverAdapter = new ExpressAdapter();
const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: Queue.queues.map((queue) => new BullAdapter(queue.bull)),
  // queues: [
  //   new BullAdapter(videoTranscodingQueue),
  //   new BullAdapter(userReportQueue),
  // ],
  serverAdapter: serverAdapter,
});
serverAdapter.setBasePath("/admin/queues");
app.use("/admin/queues", serverAdapter.getRouter());

app.listen(3000, () => console.log("App on 3000 port "));
