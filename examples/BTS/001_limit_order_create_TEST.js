import inject from './inject.js'

function blockchainFloat(satoshis, precision) {
  return satoshis * 10 ** precision;
}

let run = async function () {
  var expiry = new Date();
  expiry.setMinutes(expiry.getMinutes() + 60);

  let injectionResult;
  try {
    injectionResult = await inject(
      "InjectExample.001", // script name
      "limit_order_create", // operation name
      {
        seller: "1.2.26299",
        amount_to_sell: {
          amount: blockchainFloat(1, 5).toFixed(0),
          asset_id: "1.3.0"
        },
        min_to_receive: {
          amount: blockchainFloat(1, 0).toFixed(0),
          asset_id: "1.3.1811"
        },
        expiration: expiry,
        fill_or_kill: false,
        extensions: []
      }
    );
  } catch (error) {
    console.log(error)
  }

  if (injectionResult) {
      console.log("Successfully generated deeplink!");
      console.log(injectionResult)
  } else {
    console.log('Invalid injection result')
  }

  process.exit(0);
}

run();