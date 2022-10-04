import { TransactionBuilder } from 'bitsharesjs';
import { Apis } from "bitsharesjs-ws";
import DeepLink from "../../src/lib/DeepLink.js";

/**
 * Inject an operation into Beet for broadcast
 * @param {string} scriptName
 * @param {string} chain
 * @param {string} wsURL
 * @param {string} opType
 * @param {Object} opContents
 */
 export default async function inject (
  scriptName,
  chain,
  wsURL,
  opType,
  opContents,
  beetKey
) {
  return new Promise(async (resolve, reject) => {
    let beetLink = new DeepLink(scriptName, chain, 'cli', 'localhost', beetKey);

    let TXBuilder = beetLink.inject(TransactionBuilder);
  
    try {
      await Apis.instance(
          wsURL,
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
      `beet://api?chain=${chain}&request=${encryptedPayload}`
    );
  });
}