import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.036", // script name
      "assert", // operation name
      {
        fee_paying_account: "1.2.x",
        predicates: [
          [0, {"account_id":"1.2.x","name":"abc"}],
          [1, {"asset_id":"1.3.x","symbol":"ABC"}]
        ],
        required_auths: ["1.2.x"],
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
