import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.041", // script name
      "BTS_TEST", // chain
      "wss://testnet.xbts.io/ws", // wss url
      "transfer_from_blind ", // operation name
      {
        amount: {
          amount: 1,
          asset_id: "1.3.x"
        },
        to: "1.2.x",
        blinding_factor: "",
        inputs: [{
          commitment: "",
          owner: {
            weight_threshold: 1,
            account_auths: [{"1.2.x": 1}],
            key_auths: [{"": 1}],
            address_auths: [{"": 1}]
          }
        }],
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
