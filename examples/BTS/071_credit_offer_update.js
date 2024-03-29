import inject from "./inject.js";

let run = async function () {
  let injectionResult;
  try {
    injectionResult = await inject(
      "InjectExample.071", // script name
      "credit_offer_update", // operation name
      {
        owner_account: "1.2.x",
        offer_id: "1.21.x",
        delta_amount: {
          // optional
          amount: 1,
          asset_id: "1.3.x",
        },
        fee_rate: 1,
        max_duration_seconds: 6000,
        min_deal_amount: 1,
        enabled: true,
        auto_disable_time: 600,
        acceptable_collateral: [
          [
            "1.3.0", // matching quote asset_id
            {
              base: {
                amount: 1,
                asset_id: "1.3.x",
              },
              quote: {
                amount: 1,
                asset_id: "1.3.0",
              },
            },
          ],
        ],
        acceptable_borrowers: [["1.2.x", 1]],
        extensions: [],
      }
    );
  } catch (error) {
    console.log(error);
  }

  if (injectionResult && injectionResult.includes("beet:")) {
    console.log("Successfully generated deeplink!");
    console.log(injectionResult);
  } else {
    console.log("Invalid injection result");
  }

  process.exit(0);
};

run();
