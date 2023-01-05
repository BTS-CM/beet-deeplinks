import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.061", // script name
      "BTS_TEST", // chain
      "wss://testnet.xbts.io/ws", // wss url
      "liquidity_pool_deposit", // operation name
      {
        account: "1.2.x",
        pool: "1.19.x",
        amount_a: {
          amount: 1,
          asset_id: "1.3.x"
        },
        amount_b: {
          amount: 1,
          asset_id: "1.3.x"
        },
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
