import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.038", // script name
      "override_transfer", // operation name
      {
        issuer: "1.2.x",
        from: "1.2.x",
        to: "1.2.x",
        amount: {
          amount: 1,
          asset_id: "1.3.x"
        },
        memo: "",
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
