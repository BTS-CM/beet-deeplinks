import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.024", // script name
      "proposal_delete", // operation name
      {
        fee_paying_account: "1.2.x",
        using_owner_authority: true,
        proposal: "1.10.x",
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
