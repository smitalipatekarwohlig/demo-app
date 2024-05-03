const express = require("express");
const app = express();
const PORT = 8080;

// Add this to the very top of the first file loaded in your app
var apm = require("elastic-apm-node").start({
  serviceName: "my-service-name",
  secretToken: "IoEQpEKhEPRMriOKlu",
  serverUrl:
    "https://a67f4013d9e04cc58c2c3daf58e974ef.apm.us-central1.gcp.cloud.es.io:443",
  environment: "my-environment",
});
console.log("apm", apm);

app.get("/", (req, res) => {
  res.send("Node app is running!");
});

app.get("/exit", (req, res) => {
  res.send("Server stopped");
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
