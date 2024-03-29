import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.034", // script name
      "worker_create", // operation name
      {
        owner: "1.2.x",
        work_begin_date: 1663766042,
        work_end_date: 2663766042,
        daily_pay: 1,
        name: "",
        url: "",
        initializer: [ 0,{} ]
        /*
        initializer: [
          1,{
            "pay_vesting_period_days": 1
          }
        ]
        */
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
