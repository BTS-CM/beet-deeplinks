import inject from './inject.js'

let run = async function () { 
    let injectionResult;
    try {
      injectionResult = await inject(
      "InjectExample.035", // script name
      "BTS_TEST", // chain
      "wss://testnet.xbts.io/ws", // wss url
      "custom", // operation name
      {
        payer: "1.2.x",
        required_auths: ["1.2.x"],
        id: 1337,
        data: "bytes..."
      },
      "" // beetKey
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
}

run();
