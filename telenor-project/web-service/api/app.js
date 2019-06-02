// PORT={{value}} node app.js
// This solution: portability of application
const express = require('./node_modules/express/index.js');
const app = express();
// This solution: portability of application
const moment = require('./node_modules/moment/moment.js');
// Default PORT: 3000
let port = process.env.PORT || 3000;

// Access Control Allow
app.use(function(req, res, next) {
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.set('Access-Control-Allow-Credentials', true);
    next();
});

// JSON format
app.use(express.json());

// Restful API
app.get('/date', function(req, res) {
    res.json({
        currentDate: moment(),
        year: moment().format('YYYY'),
        currentDateFormat: moment().format('YYYY-MM-DD'),
        currentDateHuDay: moment().locale('hu').format('dddd'),
        currentDateHuMonth: moment().locale('hu').format('MMMM'),
        currentDateDay: moment().format('DD'),
    });
});

// Port listen
app.listen(port, () => console.log(`The app listening on port ${port}!`));