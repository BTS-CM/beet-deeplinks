import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.021", // script name
      "BTS_TEST", // chain
      "wss://testnet.xbts.io/ws", // wss url
      "witness_update", // operation name
      {
        witness: "1.6.x",
        witness_account: "1.2.x",
        new_url: "",
        new_signing_key: ""
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
