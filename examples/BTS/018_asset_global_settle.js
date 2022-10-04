import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.018", // script name
      "BTS_TEST", // chain
      "wss://testnet.xbts.io/ws", // wss url
      "asset_global_settle", // operation name
      {
        issuer: "1.2.x",
        asset_to_settle: "1.3.x",
        settle_price: {
          base: {
            amount: 1,
            asset_id: "1.3.x"
          },
          quote: {
            amount: 1,
            asset_id: "1.3.x"
          }
      },
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