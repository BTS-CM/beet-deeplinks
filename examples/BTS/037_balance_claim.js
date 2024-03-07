import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.037", // script name
      "balance_claim", // operation name
      {
        deposit_to_account: "1.2.x",
        balance_to_claim: "1.15.x",
        balance_owner_key: "",
        total_claimed: {
          amount: 1,
          asset_id: "1.3.x"
        }
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
