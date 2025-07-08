const { Worker } = require("worker_threads");
const path = require("path");

exports.importData = (filePath) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path.join(__dirname, "../../worker.js"), {
      workerData: { filePath },
    });

    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code) => {
      console.log("Worker thread exited with code:", code);
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
};
