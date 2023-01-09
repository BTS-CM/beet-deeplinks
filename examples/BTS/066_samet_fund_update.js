import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.066", // script name
      "samet_fund_update", // operation name
      {
        owner_account: "1.2.x",
        fund_id: "1.20.x",
        delta_amount: { // optional
          amount: 1,
          asset_id: "1.3.x"
        },
        new_fee_rate: 2, // optional
        extensions: []
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
