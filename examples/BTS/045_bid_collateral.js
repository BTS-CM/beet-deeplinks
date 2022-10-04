import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.045", // script name
      "BTS_TEST", // chain
      "wss://testnet.xbts.io/ws", // wss url
      "bid_collateral", // operation name
      {
        bidder: "1.2.x",
        additional_collateral: {
          amount: 1,
          asset_id: "1.3.x"
        },
        debt_covered: {
          amount: 1,
          asset_id: "1.3.x"
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
