require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Để sử dụng biến môi trường

module.exports = {
  solidity: "0.8.18", // Hoặc phiên bản phù hợp với hợp đồng của bạn
  networks: {
    arbitrum_sepolia: {
      url: "https://sepolia-rollup.arbitrum.io/rpc", // RPC của Arbitrum Sepolia
      accounts: [process.env.PRIVATE_KEY], // Thay bằng private key của bạn
      chainId: 421614, // Chain ID của Arbitrum Sepolia
    },
  },
};
