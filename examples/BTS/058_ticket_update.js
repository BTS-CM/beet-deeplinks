import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.058", // script name
      "BTS_TEST", // chain
      "wss://testnet.xbts.io/ws", // wss url
      "ticket_update", // operation name
      {
        ticket: "1.18.x",
        account: "1.2.x",
        target_type: 1,
        amount_for_new_target: {
          amount: 1,
          asset_id: "1.3.x"
        },
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
