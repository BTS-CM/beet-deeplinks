import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.064", // script name
      "BTS_TEST", // chain
      "wss://testnet.xbts.io/ws", // wss url
      "samet_fund_create", // operation name
      {
        owner_account: "1.2.x",
        asset_type: "1.3.x",
        balance: 1,
        fee_rate: 1,
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
