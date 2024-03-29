import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.055", // script name
      "custom_authority_update", // operation name
      {
        account: "1.2.x",
        authority_to_update: "2.14.x",
        new_enabled: true,
        new_valid_from: 1663771380,
        new_valid_to: 1763771380,
        new_auth: { // optional
          weight_threshold: 1,
          account_auths: [{"1.2.x": 1}],
          key_auths: [{"": 1}],
          address_auths: [{"": 1}]
        },
        restrictions_to_remove: [1],
        restrictions_to_add: [{
          member_index: 2,
          restriction_type: 2,
          argument: false
        }],
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
