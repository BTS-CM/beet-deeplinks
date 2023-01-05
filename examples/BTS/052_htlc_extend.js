import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.052", // script name
      "BTS_TEST", // chain
      "wss://testnet.xbts.io/ws", // wss url
      "htlc_extend", // operation name
      {
        htlc_id: "1.16.x",
        update_issuer: "1.2.x",
        seconds_to_add: 600,
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
