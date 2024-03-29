import inject from './inject.js'

let run = async function () { 
    let injectionResult;
  try {
    injectionResult = await inject(
      "InjectExample.073", // script name
      "credit_deal_repay", // operation name
      {
        account: "1.2.x",
        deal_id: "1.22.x",
        repay_amount: {
          amount: 1,
          asset_id: "1.3.x"
        },
        credit_fee: {
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
