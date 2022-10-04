import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.032", // script name
      "BTS_TEST", // chain
      "wss://testnet.xbts.io/ws", // wss url
      "vesting_balance_create", // operation name
      {
        creator: "1.2.x",
        owner: "1.2.x",
        amount: {
          amount: 1,
          asset_id: "1.3.x"
        },
        policy: [0, {
          begin_timestamp: 1663765941,
          vesting_cliff_seconds: 60000,
          vesting_duration_seconds: 60000
        }]
        /*
        policy: [1, {
              start_claim: 1663765941,
              vesting_seconds: 60000
        }]
        */
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
