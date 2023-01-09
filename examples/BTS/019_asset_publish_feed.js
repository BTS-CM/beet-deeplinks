import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.019", // script name
      "asset_publish_feed", // operation name
      {
        publisher: "1.2.x",
        asset_id: "1.3.x",
        feed: {
          settlement_price: {
            base: {
              amount: 1,
              asset_id: "1.3.x"
            },
            quote: {
              amount: 1,
              asset_id: "1.3.x"
            }
          },
          maintenance_collateral_ratio: 100,
          maximum_short_squeeze_ratio: 100,
          core_exchange_rate: {
            base: {
              amount: 1,
              asset_id: "1.3.x"
            },
            quote: {
              amount: 1,
              asset_id: "1.3.x"
            }
        }
      },
        extensions: set(future_extensions)
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
