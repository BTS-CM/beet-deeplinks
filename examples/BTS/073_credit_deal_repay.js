import inject from './inject.js'

let run = async function () { 
    let injectionResult;
  try {
    injectionResult = await inject(
      "InjectExample.073", // script name
      "BTS_TEST", // chain
      "wss://testnet.xbts.io/ws", // wss url
      "credit_deal_repay", // operation name
      {
        account: "1.2.x",
        deal_id: "1.22.x",
        repay_amount: {
          amount: 1,
          asset_id: "1.3.x"
        },
        credit_fee: {
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
