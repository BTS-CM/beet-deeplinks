import inject from './inject.js'

let run = async function () { 
  let injectionResult;
  try {
    injectionResult = await inject(
      "InjectExample.068", // script name
      "samet_fund_repay", // operation name
      {
        account: "1.2.x",
        fund_id: "1.20.x",
        repay_amount: {
          amount: 1,
          asset_id: "1.3.x"
        },
        fund_fee: {
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
