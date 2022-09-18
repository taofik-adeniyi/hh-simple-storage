import { ethers } from "hardhat"
import { expect, assert } from "chai"
import { SimpleStorage__factory, SimpleStorage } from "../typechain-types"

describe("SimpleStorage", () => {
    let simpleStorageFactory: SimpleStorage__factory, simpleStorage:SimpleStorage
    beforeEach(async () => {
        simpleStorageFactory = (await ethers.getContractFactory("SimpleStorage")) as SimpleStorage__factory
        simpleStorage = await simpleStorageFactory.deploy()
    })
    it("should start with a favorite Number of zero", async () => {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        // assert
        // expect

        // assert.equal(currentValue.toString(), expectedValue)
        expect(currentValue.toString()).to.equal(expectedValue)
    })
    //it.only to run only this test case
    it("should update when we call store", async () => {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.retrieve()
        assert(currentValue.toString(), expectedValue)
    })

    // it.only("person should be empty", async () => {
    //     const expectedValue = []
    //     const people = await simpleStorage.people
    //     assert(people.length, expectedValue)
    //     // assert.length(people, expectedValue)
    // })

    // it("should add a person", async () => {})
})
