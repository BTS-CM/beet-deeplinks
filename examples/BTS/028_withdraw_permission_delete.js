import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.028", // script name
      "withdraw_permission_delete", // operation name
      {
        withdraw_from_account: "1.2.x",
        authorized_account: "1.2.x",
        withdrawal_permission: "1.12.x"
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
