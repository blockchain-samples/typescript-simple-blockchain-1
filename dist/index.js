"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
Block.calculatedBlockHash = (index, previousHash, data, timestamp) => {
    return CryptoJS.SHA256(index + previousHash + data + timestamp).toString();
};
Block.validateStructure = (aBlock) => {
    return (typeof aBlock.index === "number" &&
        typeof aBlock.previousHash === "string" &&
        typeof aBlock.hash === "string" &&
        typeof aBlock.data === "string" &&
        typeof aBlock.timestamp === "number");
};
const genesisBlock = new Block(0, "abcdefg", "", "hello!", 123456);
let blockchain = [genesisBlock];
const getBlockchain = () => blockchain;
const getLatestBlock = () => blockchain[blockchain.length - 1];
const getNewTimeStamp = () => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data) => {
    const previousBlock = getLatestBlock();
    const newIndex = previousBlock.index + 1;
    const newTimestamp = getNewTimeStamp();
    const newHash = Block.calculatedBlockHash(newIndex, previousBlock.hash, data, newTimestamp);
    const newBlock = new Block(newIndex, newHash, previousBlock.hash, data, newTimestamp);
    addBlock(newBlock);
    return newBlock;
};
const getHashForBlock = (aBlock) => {
    return Block.calculatedBlockHash(aBlock.index, aBlock.previousHash, aBlock.data, aBlock.timestamp);
};
const isBlockValid = (candidateBlock, previousBlock) => {
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    }
    else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    }
    else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    }
    else if (getHashForBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    }
    else {
        return true;
    }
};
const addBlock = candidateBlock => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock);
    }
};
createNewBlock("second Block");
createNewBlock("third Block");
createNewBlock("fourth Block");
console.log(getBlockchain());
//# sourceMappingURL=index.js.map