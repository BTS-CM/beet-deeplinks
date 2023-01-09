import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.027", // script name
      "withdraw_permission_claim", // operation name
      {
        withdraw_permission: "1.12.x",
        withdraw_from_account: "1.2.x",
        withdraw_to_account: "1.2.x",
        amount_to_withdraw: {
          amount: 1,
          asset_id: "1.3.x"
        },
        memo: ""
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
