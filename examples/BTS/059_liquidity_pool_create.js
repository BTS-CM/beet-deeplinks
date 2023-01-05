import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.059", // script name
      "BTS_TEST", // chain
      "wss://testnet.xbts.io/ws", // wss url
      "liquidity_pool_create", // operation name
      {
        account: "1.2.x",
        asset_a: "1.3.x",
        asset_b: "1.3.x",
        share_asset: "1.3.x",
        taker_fee_percent: 1,
        withdrawal_fee_percent: 1,
        extensions: []
      }
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

  process.exit(0);
}

run();
