import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.009", // script name
      "BTS_TEST", // chain
      "wss://testnet.xbts.io/ws", // wss url
      "account_transfer", // operation name
      {
        account_id: "1.2.x",
        new_owner: "1.2.x",
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
