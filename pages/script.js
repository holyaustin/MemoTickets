// Demo API Key
const APIKEY = 'ckey_docs'

// Blockchain network setup
const chainId = 43114 // Avalanche Mainnet

// Covalent API Endpoints
const nftIdsEndpoint = 'nft_token_ids'
const nftMetadataEndpoint = 'nft_metadata'

// List of supported_collection
const supported_collection = [
  {
    "name": "CryptoSeals",
    "address": "0x0540E4EE0C5CdBA347C2f0E011ACF8651bB70Eb9"
  },
  {
    "name": "Avaxtars",
    "address": "0x53d2230EAC25643cd0772B310EEBb569a100eA73"
  }
]

function getNFTIdData() {
    // Get key HTML elements and reset table content
    const ul = document.getElementById('metadata');
    const tableRef = document.getElementById('tokenTable');
    tableRef.innerHTML =
    `<thead class="thead-dark">
            <tr>
                <th>Image</th>
                <th>Owner</th>
                <th>Link</th>
            </tr>
        </thead>
        <tbody>
        </tbody>`;

    // Covalent API request setup
    const address = document.getElementById('address').value || '0x0540E4EE0C5CdBA347C2f0E011ACF8651bB70Eb9';

    const url = new URL(`https://api.covalenthq.com/v1/${chainId}/tokens/${address}/${nftIdsEndpoint}/?&key=${APIKEY}`);

    // Use Fetch API to get Covalent data
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        let tokens = data.data.items;
        
        // Update wallet metadata
        ul.innerHTML = 
            `<li> Contract address: ${data.data.items[0].contract_address} </li>` +
            `<li> Last update: ${data.data.updated_at} </li>` 
            

        return tokens.map(function(token) { // Map through the results and for each run the code below
        if (token.contract_decimals > 0) {
            balance = parseInt(token.balance) / Math.pow(10, token.contract_decimals);
        } else {
            balance = parseInt(token.balance);
        }
        tableRef.insertRow().innerHTML = 
            
            `<td> ${token.contract_name} </td>` +
            `<td> ${token.contract_ticker_symbol} </td>` +
            `<td> ${token.token_id} </td>`;
        })
    })
}

function getNFTMetaData() {
    // Get key HTML elements and reset table content
    const ul = document.getElementById('metadata');
    const tableRef = document.getElementById('tokenTable');
    tableRef.innerHTML = 
        `<thead class="thead-dark">
            <tr>
                <th>Image</th>
                <th>Owner</th>
                <th>Link</th>
            </tr>
        </thead>
        <tbody>
        </tbody>`;

    // Covalent API request setup
    const address = document.getElementById('address').value;
    const tokenId = document.getElementById('tokenId').value;    

    const url = new URL(`https://api.covalenthq.com/v1/43114/tokens/${address}/${nftMetadataEndpoint}/${tokenId}/?&key=${APIKEY}`);

    // Use Fetch API to get Covalent data
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        let tokens = data.data.items;
        
        // Update wallet metadata
        ul.innerHTML = 
            `<li> Contract address: ${data.data.items[0].contract_address} </li>` +
            `<li> Last update: ${data.data.updated_at} </li>` 
            

        return tokens.map(function(token) { // Map through the results and for each run the code below
        if (token.contract_decimals > 0) {
            balance = parseInt(token.balance) / Math.pow(10, token.contract_decimals);
        } else {
            balance = parseInt(token.balance);
        }
        console.log(token.nft_data);
        tableRef.insertRow().innerHTML = 
            
            `<td> <img src="${token.nft_data[0].external_data.image}" width=200 height=200></img></td>` +
            `<td><a href="https://cchain.explorer.avax.network/address/${token.nft_data[0].owner}" target="_blank"> ${token.nft_data[0].owner} </a></td>` +
            `<td><a href="${token.nft_data[0].token_url}">View API data</a> </td>`;
        })
    })
}

supported_collection.forEach((item, index) => {
  var option = document.createElement("option");
  option.text = item.name;
  option.value = item.address;
  var collection = document.getElementById('address');
  collection.appendChild(option);
});