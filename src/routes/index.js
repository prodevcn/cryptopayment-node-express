const api_v1 = require('./v1');
// const api_v2 = require('./v2');
module.exports = (app) => {
    app.use('/api/v1', api_v1);
    // app.use('/api/v2', api_v2);
}