const quoteUrl = 'https://api.odos.xyz/sor/quote/v2';

async function _constructor(_chainId, _slippage, _referral_code, _compact, _input_address, _output_address, _input_amount, _user_address) {

    const quoteRequestBody = {
        chainId: _chainId, // Replace with desired chainId
        inputTokens: [
            {
                tokenAddress: _input_address, // checksummed input token address
                amount: _input_amount, // input amount as a string in fixed integer precision
            }
        ],
        outputTokens: [
            {
                tokenAddress: _output_address, // checksummed output token address
                proportion: 1
            }
        ],
        userAddr: _user_address, // checksummed user address
        slippageLimitPercent: _slippage, // set your slippage limit percentage (1 = 1%),
        referralCode: _referral_code, // referral code (recommended)
        compact: _compact,
    };
    return await getQuote(quoteRequestBody);
}

async function getQuote(quoteRequestBody) {
    const response = await fetch(
        quoteUrl,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(quoteRequestBody),
        });

    if (response.status === 200) {
        const quote = await response.json();
        console.log('ODOS Quote:', quote);
        console.log("the output amount is :",quote.outAmounts[0]);
        return await quote;
        // handle quote response data
    } else {
        console.error('Error in Quote:', response);
        return ;
        // handle quote failure cases
    }
}
// let quote_odos = await _constructor("42161", "0.3", "0", true, "0xf97f4df75117a78c1A5a0DBb814Af92458539FB4", "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8", "1000000000000000000", "0x0a1c4d82a73f32023d527b3bc779f5d0f0715f05")
// // //method call
// console.log("\n \n \n", quote_odos)
// console.log("\n \n \n ",quote_odos.outAmounts[0])
export{
    _constructor
}