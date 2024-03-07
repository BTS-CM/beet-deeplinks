import inject from './inject.js'

let run = async function () { 
    let injectionResult;
  try {
    injectionResult = await inject(
      "InjectExample.072", // script name
      "credit_offer_accept", // operation name
      {
        borrower: "1.2.x",
        offer_id: "1.21.x",
        borrow_amount: {
          amount: 1,
          asset_id: "1.3.x"
        },
        collateral: {
          amount: 1,
          asset_id: "1.3.x"
        },
        max_fee_rate: 100,
        min_duration_seconds: 6000,
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
