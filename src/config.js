/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable max-len */
module.exports = {
  // Node.js app
  port: process.env.PORT || 3000,

  // https://expressjs.com/en/guide/behind-proxies.html
  trustProxy: process.env.TRUST_PROXY || 'loopback',

  // API Gateway
  api: {
    // API URL to be used in the client-side code
    clientUrl: process.env.API_CLIENT_URL || '',
    // API URL to be used in the server-side code
    serverUrl:
      process.env.API_SERVER_URL ||
      `http://localhost:${process.env.PORT || 3000}`,
  },

  // Database
  databaseUrl: process.env.DATABASE_URL || 'sqlite:database.sqlite',

  // Authentication
  auth: {
    jwt: { secret: process.env.JWT_SECRET || 'Node Starter Kit' },

    // https://developer.github.com/
    github: {
      id: process.env.GITHUB_CLIENT_ID || 'd43f6df45f0696a12807',
      secret:
        process.env.GITHUB_CLIENT_SECRET ||
        '4b98543f71a2ecf3068fbdbfc00f96329eb2091b',
    },
  },
};
