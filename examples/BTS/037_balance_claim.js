import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.037", // script name
      "BTS_TEST", // chain
      "wss://testnet.xbts.io/ws", // wss url
      "balance_claim", // operation name
      {
        deposit_to_account: "1.2.x",
        balance_to_claim: "1.15.x",
        balance_owner_key: "",
        total_claimed: {
          amount: 1,
          asset_id: "1.3.x"
        }
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
