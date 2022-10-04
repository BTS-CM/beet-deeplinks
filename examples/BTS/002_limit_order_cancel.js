import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.002", // script name
      "BTS_TEST", // chain
      "wss://testnet.xbts.io/ws", // wss url
      "limit_order_cancel", // operation name
      {
        fee_paying_account: "1.2.x",
        order: "",
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