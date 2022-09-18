import { ethers, run, network } from "hardhat"

async function main() {
    const simpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log(`Deploying contract ....`)
    const simpleStorage = await simpleStorageFactory.deploy()
    await simpleStorage.deployed()

    console.log(`Deployed contract to: ${simpleStorage.address}`)

    // console.log("hardhat network", network.config)
    // if (network.config.chainId != 31337 && process.env.ETHERSCAN_API_KEY) {
    // }
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        console.log("Waiting for block confirmations")
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }

    const currentValue = await simpleStorage.retrieve()
    console.log(`Current Value is: ${currentValue}`)

    const store = await simpleStorage.store("7")
    await store.wait(1)

    const updatedCurrentValue = await simpleStorage.retrieve()
    console.log(`Update Value is: ${updatedCurrentValue}`)
}

const verify = async (contractAddress: string, args: any[]) => {
    console.log("Verifying......")
    try {
        await run("verify:verify", {
            address: contractAddress,
            contructorArguments: args,
        })
    } catch (error: any) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Already verified")
        } else {
            console.log(error)
        }
    }
}

main()
    .then(() => {
        process.exit(0)
    })
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
