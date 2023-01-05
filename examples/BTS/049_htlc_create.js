import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.049", // script name
      "BTS_TEST", // chain
      "wss://testnet.xbts.io/ws", // wss url
      "htlc_create", // operation name
      {
        from: "1.2.x",
        to: "1.2.x",
        amount: {
          amount: 1,
          asset_id: "1.3.x"
        },
        preimage_hash: "",
        preimage_size: 0,
        claim_period_seconds: 600,
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
