import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.045", // script name
      "bid_collateral", // operation name
      {
        bidder: "1.2.x",
        additional_collateral: {
          amount: 1,
          asset_id: "1.3.x"
        },
        debt_covered: {
          amount: 1,
          asset_id: "1.3.x"
        },
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
