import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.014", // script name
      "asset_issue", // operation name
      {
        issuer: "1.2.x",
        asset_to_issue: {
          amount: 1,
          asset_id: "1.3.x"
        },
        memo: "", //optional
        issue_to_account: "1.2.x",
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
