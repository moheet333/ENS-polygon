const { hexStripZeros } = require("ethers/lib/utils");

const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("pirate");
  await domainContract.deployed();

  console.log("Contract deployed to : ", domainContract.address);

  let txn = await domainContract.register("zoro", {
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await txn.wait();
  console.log("Minted domain zoro.pirate");

  txn = await domainContract.setRecord(
    "zoro",
    "Will become the Strongest Swordsman in the world!"
  );
  await txn.wait();
  console.log("set record for zoro.pirate");

  const address = await domainContract.getAddress("zoro");
  console.log("Owner of domain zoro is : ", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract Balance : ", balance);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
