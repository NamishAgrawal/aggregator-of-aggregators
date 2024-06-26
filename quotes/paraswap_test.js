const baseUrl = 'https://apiv5.paraswap.io/prices';

function parseQuote(quote) {
  // console.log('Quote:', quote);
  const outputTokens = quote.priceRoute.destAmount;
  console.log("the output amount is :", outputTokens);
  const outputValue = quote.priceRoute.destUSD;
  console.log("the output value is :", outputValue);
  // const outputAmount = parseFloat(quote.outAmounts[0]) / (10 ** quote.destDecimal);
  // console.log(`Output amount: ${outputAmount.toFixed(6)} ${quote.destToken}`);
}

function _constructor(_srcToken, _srcDecimals, _destToken, _destDecimals, _amount, _side, _network) {
  const queryParams = {
    srcToken: _srcToken, // Replace with actual source token address
    srcDecimals: _srcDecimals,
    destToken: _destToken, // Replace with actual destination token address
    destDecimals: _destDecimals,
    amount: _amount, // 1 ETH (in wei)
    side: _side, // "BUY" or "SELL"
    network: _network, // chainId
    includeDEXS: "", // Optional parameters, leave empty if not used
    excludeDEXS: "",
    includeContractMethods: "",
    excludeContractMethods: "",
  };
  const url = new URL(baseUrl);
  url.search = new URLSearchParams(queryParams);
  getQuote(url);
}
async function getQuote(url) {
  fetch(url, {
    method: 'GET',
    headers: { 'accept': 'application/json' },
  })
    .then(response => {
      if (!response.ok) { // Check for non-200 HTTP status codes
        throw new Error(`Error fetching quote: ${response.status}`);
      }
      return response.json();
    })
    .then(quote => {
      console.log('Quote:', quote);
      // parseQuote(quote);
      return quote;
    })
    .catch(error => {
      console.error('Error:', error);
      return;
    });
}
export{ _constructor};
// _constructor("0xf97f4df75117a78c1A5a0DBb814Af92458539FB4", 18, "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8", 6, "1000000000000000000", "SELL", 42161);