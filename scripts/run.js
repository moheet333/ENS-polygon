const { hexStripZeros } = require("ethers/lib/utils");

const main = async () => {
  const [owner, supeCoder] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("pirate");
  await domainContract.deployed();
  console.log("Contract deployed to: ", domainContract.address);
  console.log("COntract deployed by: ", owner.address);

  const txn = await domainContract.register("luffyPirateKing", {
    value: hre.ethers.utils.parseEther("1234"),
  });
  await txn.wait();

  const domainOwner = await domainContract.setRecord(
    "luffyPirateKing",
    "0xAaD4e106f05AADf25f8e1C4B321896d445FCdbA8"
  );
  await domainOwner.wait();

  const record = await domainContract.getRecord("luffy");
  console.log("My address is: ", record);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract Balance: ", hre.ethers.utils.formatEther(balance));

  try {
    txn = await domainContract.connect(supeCoder).withdraw();
    await txn.wait();
  } catch (error) {
    console.log("Could not rob contract :(");
  }
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
