import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.023", // script name
      "proposal_update", // operation name
      {
        fee_paying_account: "1.2.x",
        proposal: "1.10.x",
        active_approvals_to_add: ["1.2.x"],
        active_approvals_to_remove: ["1.2.x"],
        owner_approvals_to_add: ["1.2.x"],
        owner_approvals_to_remove: ["1.2.x"],
        key_approvals_to_add: [""],
        key_approvals_to_remove: [""],
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
