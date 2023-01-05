import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.017", // script name
      "BTS_TEST", // chain
      "wss://testnet.xbts.io/ws", // wss url
      "asset_settle", // operation name
      {
        account: "1.2.x",
        amount: {
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
