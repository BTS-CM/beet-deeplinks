import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.020", // script name
      "witness_create", // operation name
      {
        witness_account: "1.2.x",
        url: "",
        block_signing_key: ""
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
