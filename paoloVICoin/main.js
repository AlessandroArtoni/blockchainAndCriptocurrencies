const SHA256 = require("crypto-js/sha256");

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
    }

    calculateHash() {
      return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}


class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "03/03/2018", "Genesis block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

let paoloVICoin = new Blockchain();
//Aggiungo i blocchi
paoloVICoin.addBlock(new Block(1, "04/03/2018", { amount: 4 }));
paoloVICoin.addBlock(new Block(2, "04/03/2018", { amount: 8 }));
//Controllo se la blockchain è valida
console.log('Blockchain valid? ' + paoloVICoin.isChainValid());
console.log(JSON.stringify(paoloVICoin,null, 4))
//Modifico un blocco
console.log('Changing a block...');
paoloVICoin.chain[1].data = { amount: 100 };
console.log("Blockchain valid? " + paoloVICoin.isChainValid());
console.log(JSON.stringify(paoloVICoin,null, 4))

