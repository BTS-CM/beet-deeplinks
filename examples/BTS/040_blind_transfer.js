import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.040", // script name
      "BTS_TEST", // chain
      "wss://testnet.xbts.io/ws", // wss url
      "blind_transfer", // operation name
      {
        inputs: [{
          commitment: "",
          owner: {
            weight_threshold: 1,
            account_auths: [{"1.2.x": 1}],
            key_auths: [{"": 1}],
            address_auths: [{"": 1}]
          }
        }],
        outputs: [{
          commitment: "",
          range_proof: "",
          owner: {
            weight_threshold: 1,
            account_auths: [{"1.2.x": 1}],
            key_auths: [{"": 1}],
            address_auths: [{"": 1}]
          },
          stealth_memo: { // optional
            one_time_key: "",
            to: "",
            encrypted_memo: ""
          }
        }]
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
