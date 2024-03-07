import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.039", // script name
      "transfer_to_blind", // operation name
      {
        amount: {
          amount: 1,
          asset_id: "1.3.x"
        },
        from: "1.2.x",
        blinding_factor: "",
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
