import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.065", // script name
      "BTS_TEST", // chain
      "wss://testnet.xbts.io/ws", // wss url
      "samet_fund_delete", // operation name
      {
        owner_account: "1.2.x",
        fund_id: "1.20.x",
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
