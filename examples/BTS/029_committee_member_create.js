import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.029", // script name
      "committee_member_create", // operation name
      {
        committee_member_account: "1.2.x",
        url: ""
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
