const si = require("systeminformation");
const { exec } = require("child_process");

async function checkCpuAndRestart() {
  try {
    const load = await si.currentLoad();
    const usagePercent = load.currentLoad; // Total CPU Load %

    console.log(`CPU Usage: ${usagePercent.toFixed(2)}%`);

    if (usagePercent > 70) {
      console.warn("⚠️ High CPU detected, restarting server...");
      exec("pm2 restart all", (err, stdout, stderr) => {
        if (err) {
          console.error("Failed to restart:", stderr);
        } else {
          console.log("Server restarted:", stdout);
        }
      });
    }
  } catch (err) {
    console.error("Error fetching CPU load:", err);
  }
}

module.exports = { checkCpuAndRestart };
