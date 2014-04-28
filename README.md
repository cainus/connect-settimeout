connect-settimeout
==================

a connect middleware that runs a provided function if a request lasts longer than a given duration


[![Build Status](https://travis-ci.org/cainus/connect-settimeout.png?branch=master)](https://travis-ci.org/cainus/connect-settimeout)
[![Coverage Status](https://coveralls.io/repos/cainus/connect-settimeout/badge.png?branch=master)](https://coveralls.io/r/cainus/connect-settimeout?branch=master)

[![NPM](https://nodei.co/npm/connect-settimeout.png)](https://nodei.co/npm/connect-settimeout/)

## Setup:

Add this middleware to your connect or express app like this:

```javascript
var connectSetTimeout = require('connect-settimeout');
app.use(connectSetTimeout(function(req, res){
  // do whatever you want with the slow request, eg:
  console.error("There was a slow response at ", req.method, req.url);
}, 10000));  // 10 seconds, specified in milliseconds
```


