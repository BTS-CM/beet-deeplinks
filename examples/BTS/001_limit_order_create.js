import inject from './inject.js'

let run = async function () {

  let currentDate = new Date();
  let currentMonth = currentDate.getMonth(); // for example, 2021
  currentDate.setMonth(currentMonth + 1);

  let injectionResult;
  try {
    injectionResult = await inject(
      "InjectExample.001", // script name
      "BTS_TEST",
      "wss://testnet.xbts.io/ws", // wss url
      "limit_order_create", // operation name
      {
        seller: "1.2.26299",
        amount_to_sell: {
          amount: 1,
          asset_id: "1.3.0"
        },
        min_to_receive: {
          amount: 1,
          asset_id: "1.3.1756"
        },
        expiration: currentDate,
        fill_or_kill: true,
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