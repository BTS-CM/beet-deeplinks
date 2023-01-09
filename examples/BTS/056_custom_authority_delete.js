import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.056", // script name
      "custom_authority_delete", // operation name
      {
        account: "1.2.x",
        authority_to_delete: "2.14.x",
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
