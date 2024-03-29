import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.025", // script name
      "withdraw_permission_create", // operation name
      {
        withdraw_from_account: "1.2.x",
        authorized_account: "1.2.x",
        withdrawal_limit: {
          amount: 1,
          asset_id: "1.3.x"
        },
        withdrawal_period_sec: 60000,
        periods_until_expiration: 60000,
        period_start_time: 1663764871
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
