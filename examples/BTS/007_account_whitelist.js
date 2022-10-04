import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.007", // script name
      "BTS_TEST", // chain
      "wss://testnet.xbts.io/ws", // wss url
      "account_whitelist", // operation name
      {
        authorizing_account: "1.2.x",
        account_to_list: "1.2.x",
        new_listing: 0,
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
