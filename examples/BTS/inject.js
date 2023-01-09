import { TransactionBuilder } from 'bitsharesjs';
import { Apis } from "bitsharesjs-ws";
import prompts from 'prompts';

import DeepLink from "../../src/lib/DeepLink.js";
import { testNodes } from "../../src/lib/queries.js";

const onCancel = prompt => {
  console.log('rejected prompt')
}

/**
 * Inject an operation into Beet for broadcast
 * @param {string} scriptName
 * @param {string} opType
 * @param {Object} opContents
 */
 export default async function inject (
  scriptName,
  opType,
  opContents
) {
  return new Promise(async (resolve, reject) => {

    let response;
    try {
        response = await prompts(
            [
              {
                type: 'select',
                name: 'deeplinkType',
                message: 'What type of Beet deeplink are you creating?',
                choices: [
                    {
                        title: 'TOTP',
                        value: true
                    },
                    {
                        title: 'RAW',
                        value: false
                    },
                ]
              },
              {
                type: 'select',
                name: 'environment',
                message: 'Which blockchain do you want to use?',
                choices: [
                    {
                        title: 'Bitshares',
                        value: "BTS"
                    },
                    {
                        title: 'Bitshares (Testnet)',
                        value: "BTS_TEST"
                    },
                ]
              },
            ],
            { onCancel }
        );
    } catch (error) {
        console.log(error);
    }
    
    if (!response || !response.environment) {
        console.log("Invalid args");
        process.exit();
    }

    let totpCode;
    if (response.deeplinkType === true) {
      let totpCodePrompt;
      try {
        totpCodePrompt = await prompts(
              [
                {
                  type: 'text',
                  name: 'value',
                  message: `Enter your Beet TOTP code:`
              },
              ],
              { onCancel }
          );
      } catch (error) {
          console.log(error);
      }

      if (!totpCodePrompt || !totpCodePrompt.value) {
        console.log("Invalid TOTP code");
        process.exit();
      }

      totpCode = totpCodePrompt.value;
    }

    let beetLink = new DeepLink(
      scriptName,
      response.environment,
      'cli',
      'localhost',
      totpCode ?? ''
    );

    let TXBuilder = await beetLink.inject(
      TransactionBuilder,
      {sign: true, broadcast: true},
      response.deeplinkType
    );
  
    let tested;
    try {
      tested = await testNodes(response.environment);
    } catch (error) {
      console.log(error);
      process.exit();
    }

    if (!tested || !tested.length) {
      console.log("No nodes available");
      process.exit();
    }

    try {
      await Apis.instance(
          tested[0],
          true,
          10000,
          {enableCrypto: false, enableOrders: true},
          (error) => console.log(error),
      ).init_promise;
    } catch (error) {
      console.log(`api instance: ${error}`);
      return reject(error);
    }
    
    let tr = new TXBuilder();
    tr.add_type_operation(opType, opContents);
    
    try {
      await tr.update_head_block();
    } catch (error) {
      console.error(error);
      return reject(error);
    }

    try {
      await tr.set_required_fees();
    } catch (error) {
      console.error(error);
      return reject(error);
    }

    if (opContents.expiry || opContents.expiration) {
      let targetDate = opContents.expiry || opContents.expiration;
      let expirySeconds = Math.round(
        Math.abs(
          (targetDate.getTime() - new Date().getTime()) / 1000
        )
      );

      if (!expirySeconds || expirySeconds <= 0) { // TODO: limit to max chain expiry
        console.log("Invalid expiry")
        return reject("Invalid expiry")
      }

      try {
          tr.set_expire_seconds(expirySeconds); // 1 month exipiry
      } catch (error) {
          console.error(error);
          return reject(error);
      }
   }

    try {
      tr.add_signer("inject_wif");
    } catch (error) {
      console.error(error);
      return reject(error);
    }

    try {
      tr.finalize();
    } catch (error) {
      console.error(error);
      return reject(error);
    }
    
    let encryptedPayload;
    try {
      encryptedPayload = await tr.encrypt();
    } catch (error) {
      console.error(error);
      return reject(error);
    }
  
    return resolve(
      `${response.deeplinkType === true ? 'beet' : 'rawbeet'}://api?chain=${response.environment}&request=${encryptedPayload}`
    );
  });
}