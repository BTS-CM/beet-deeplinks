Deeplink example instructions

Prior to running an example, log into your Beet wallet and navigate to the TOTP section, then change the inputs within the script example to those you wish to use (your account/asset ids, etc).

Run in a terminal the following steps:

* yarn install
* node ./BTS/001_limit_order_create.js

Then click the output deeplink in the terminal, resulting in a TOTP based Beet prompt.

---

Deeplinks are broadcast-only, so if you require the result of an injected operation you'll need to be listening to the blockchain within the 3rd party app rather than wait for a response to a deeplink.

If you require bi-directional communications with the Beet wallet and your application, then use the beet-js repo for a socket.io based solution.
