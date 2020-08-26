module.exports = {
  apps: [
    {
      name: "vrpacman",
      script: "server.js",
      node_args: "-r dotenv/config",
    },
  ],
};
