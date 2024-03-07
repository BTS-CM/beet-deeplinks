import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.033", // script name
      "vesting_balance_withdraw", // operation name
      {
        vesting_balance: "1.13.x",
        owner: "1.2.x",
        amount: {
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
