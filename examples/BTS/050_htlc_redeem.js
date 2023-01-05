import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.050", // script name
      "BTS_TEST", // chain
      "wss://testnet.xbts.io/ws", // wss url
      "htlc_redeem", // operation name
      {
        htlc_id: "1.16.x",
        redeemer: "1.2.x",
        preimage: "",
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
