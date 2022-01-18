# MemoTickets

This project uses the ERC 721 Smart contract from Open zeppelin. Event owners can create tickets for their event. The tickets are immediately stored to IPFS and are ready on the ticket marketplace for users to purchase either by using their wallet or by using circle's credit card payment processor. After an event, the event organizers create a memorable video of that event as NFT, and users can come back to the site and claim their MemoTicket. This is sent to their wallet address and it is immutable.  after several years to come, they can go back to the wallets and view those memories.


### Setup 
#### To run this project, Install using npm:

```
   $ Clone repo
   $ cd MemoTickets
   $ npm install
   $ px hardhat node
   $ npx hardhat run scripts/deploy.js --network localhost
   $ npm run dev
   
   
### Then do this add the Circle (USDC) Credit card payment processor


# Get Circle Developers API Key
https://my-sandbox.circle.com/

# Change into sample app folder
cd payments

# Create a .env file and configure the base url for api calls
echo BASE_URL=https://api-sandbox.circle.com > .env

# Install the dependencies
yarn install

# Run the sample app locally

yarn dev

you can now use the DApp with http://localhost:3000/


### Deploying to polygon
To deploy to Polygon test or main networks, update the configurations located in hardhat.config.js to use a private key and, optionally, deploy to a private RPC like Infura or Alchemy

require("@nomiclabs/hardhat-waffle");
const fs = require('fs');
const privateKey = fs.readFileSync(".secret").toString().trim() || "01234567890123456789";

// infuraId is optional if you are using Infura RPC
const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      // Infura
      // url: `https://polygon-mumbai.infura.io/v3/${infuraId}`
      url: "https://rpc-mumbai.matic.today",
      accounts: [privateKey]
    },
    matic: {
      // Infura
      // url: `https://polygon-mainnet.infura.io/v3/${infuraId}`,
      url: "https://rpc-mainnet.maticvigil.com",
      accounts: [privateKey]
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};



Make sure you create your Infura or Alchemy RPC, update .infuraid with your Infura project ID.
