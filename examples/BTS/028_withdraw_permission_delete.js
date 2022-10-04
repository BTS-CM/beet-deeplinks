import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.028", // script name
      "BTS_TEST", // chain
      "wss://testnet.xbts.io/ws", // wss url
      "withdraw_permission_delete", // operation name
      {
        withdraw_from_account: "1.2.x",
        authorized_account: "1.2.x",
        withdrawal_permission: "1.12.x"
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
