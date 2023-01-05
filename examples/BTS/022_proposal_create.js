import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.022", // script name
      "BTS_TEST", // chain
      "wss://testnet.xbts.io/ws", // wss url
      "proposal_create", // operation name
      {
        fee_paying_account: "1.2.x",
        expiration_time: 1763764722,
        proposed_ops: [{}],
        review_period_seconds: 60000,
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
