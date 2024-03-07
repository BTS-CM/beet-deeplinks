import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.012", // script name
      "asset_update_bitasset", // operation name
      {
        issuer: "1.2.x",
        asset_to_update: "1.3.x",
        new_options: {
          feed_lifetime_sec: 100000,
          minimum_feeds: 1,
          force_settlement_delay_sec: 60,
          force_settlement_offset_percent: 0,
          maximum_force_settlement_volume: 5,
          short_backing_asset: "1.3.x",
          extensions: []
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
