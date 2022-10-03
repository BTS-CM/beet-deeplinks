import aes from "crypto-js/aes.js";

class DeepLink {
    constructor(appName, browser, origin, beetKey) {
        this.appName = appName; // Name/identifier of the app making use of this client
        this.browser = browser;
        this.origin = origin;
        this.beetKey = beetKey;
      }

    /**
     * Encrypt the deeplink payload
     *
     * @param {object} payload
     * @returns {String}
     */
    async encryptPayload(payload) {
        return new Promise(async (resolve, reject) => {
            if (!this.beetKey) {
                return reject('No beet key');
            }

            let encryptedPayload;
            try {
                encryptedPayload = aes.encrypt(
                    JSON.stringify(payload),
                    this.beetKey
                ).toString();
            } catch (error) {
                console.log(error)
                return reject(error)
            }

            return resolve(encryptedPayload)
        });
    }

    /**
     * Enable the user to inject the bitsharesjs library for advanced bitshares chain interaction
     *
     * @param {Module} TransactionBuilder
     * @param {object} options
     * @returns {Module}
     */
    injectTransactionBuilder(TransactionBuilder, options) {
        let encryptPayload = this.encryptPayload.bind(this);

        // if both options are set, we only want 1 beet call anyways
        if (options.sign && options.broadcast) {
            // forfeit private keys, and store public keys
            TransactionBuilder.prototype.add_signer = function add_signer(private_key, public_key) {
                if (typeof private_key !== "string" || !private_key || private_key !== "inject_wif") {
                    throw new Error("Do not inject wif while using Beet")
                }
                if (!this.signer_public_keys) {
                    this.signer_public_keys = [];
                }
                this.signer_public_keys.push(public_key);
            };
            TransactionBuilder.prototype.sign = function sign(chain_id = null) {
                // do nothing, wait for broadcast
                if (!this.tr_buffer) {
                    throw new Error("not finalized");
                }
                if (this.signed) {
                    throw new Error("already signed");
                }
                if (!this.signer_public_keys.length) {
                    throw new Error(
                        "Transaction was not signed. Do you have a private key? [no_signers]"
                    );
                }
                this.signed = true;
            };
            let handle_payload = function handlePayload(builder) {
                return new Promise((resolve, reject) => {
                    if (builder.operations.length != builder.operations.length) {
                        throw "Serialized and constructed operation count differs"
                    }
                    let args = ["signAndBroadcast", JSON.stringify(builder.toObject()), builder.signer_public_keys];
                    encryptPayload(args).then((result) => {
                        resolve(result);
                    }).catch((err) => {
                        reject(err);
                    });
                });
            };
            TransactionBuilder.prototype.encrypt = function encrypt(was_encrypted_callback) {
                return new Promise((resolve, reject) => {
                    handle_payload(this).then(
                        result => {
                            if (was_encrypted_callback) {
                                was_encrypted_callback();
                            }
                            resolve(result);
                        }
                    ).catch(err => {
                        reject(err);
                    });
                });
            }
        } else if (options.sign && !options.broadcast) {
            // forfeit private keys, and store public keys
            TransactionBuilder.prototype.add_signer = function add_signer(private_key, public_key) {
                if (typeof private_key !== "string" || !private_key || private_key !== "inject_wif") {
                    throw new Error("Do not inject wif while using Beet")
                }
                if (!this.signer_public_keys) {
                    this.signer_public_keys = [];
                }
                this.signer_public_keys.push(public_key);
            };
            TransactionBuilder.prototype.sign = function sign(chain_id = null) {
                return new Promise((resolve, reject) => {
                    let args = ["sign", JSON.stringify(this.toObject()), this.signer_public_keys];
                    encryptPayload(args).then((result) => {
                        // check that it's the same
                        console.log(result);
                        let tr = new TransactionBuilder(JSON.parse(result));
                        let sigs = tr.signatures;
                        tr.signatures = [];
                        if (JSON.stringify(tr) === JSON.stringify(this)) {
                            throw "Oh boy!"
                        }
                        this.signatures = sigs;
                        this.signer_private_keys = [];
                        this.signed = true;
                        resolve();
                    }).catch((err) => {
                        reject(err);
                    });
                });
            };
        } else if (!options.sign && options.broadcast) {
            throw "Unsupported injection"
        }
        return TransactionBuilder;
    }

    /*
     * Inject an external blockchain library into Beet-JS
     */
    inject(pointOfInjection, options = {sign: true, broadcast: true}) {
        if (!!pointOfInjection.prototype && !!pointOfInjection.prototype.get_type_operation) {
            // transaction builder
            return this.injectTransactionBuilder(pointOfInjection, options);
        }
        throw new Error("Unsupported point of injection")
    }
}

export default DeepLink;