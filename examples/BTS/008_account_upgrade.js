import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.008", // script name
      "BTS_TEST", // chain
      "wss://testnet.xbts.io/ws", // wss url
      "account_upgrade", // operation name
      {
        account_to_upgrade: "1.2.x",
        upgrade_to_lifetime_member: true,
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
