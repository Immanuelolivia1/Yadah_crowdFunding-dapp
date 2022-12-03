const { network, ethers } = require("hardhat");

const networkConfig:any = {
    //add config for testNet networks chainId: {name: ,vrfCoordinatorV2: }
    31337:{
        name: "hardhat",

    },
    80001:{
        name: "mumbai",
    }
}

const developmentChains = ["hardhat", "localhost"];


const { verify } = require("../utils/verify");

module.exports = async function ({ getNamedAccounts, deployments }:any) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  let crowdFundingContract:any;

    let args:any = []


  crowdFundingContract = await deploy("CrowdFunding", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  if (
    !developmentChains.includes(network.name) &&
    process.env.POLYGONSCAN_API_KEY
  ) {
    log("verifying....");
    await verify(crowdFundingContract.address, args);
  }
  log("------------------------------------");
};

module.exports.tags = ["all", "deffle"];