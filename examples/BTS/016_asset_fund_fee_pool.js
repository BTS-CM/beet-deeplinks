import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.016", // script name
      "BTS_TEST", // chain
      "wss://testnet.xbts.io/ws", // wss url
      "asset_fund_fee_pool", // operation name
      {
        from_account: "1.2.x",
        asset_id: "1.2.x",
        amount: 1,
        extensions: []
      },
      "" // beetKey
    );
  } catch (error) {
    console.log(error)
    return;
  }

  if (injectionResult && injectionResult.includes('beet:')) {
      console.log("Successfully generated deeplink!");
      console.log(injectionResult)
  } else {
    console.log('Invalid injection result')
    return;
  }
}

run();