// This solution: portability of application
const SOAP = require('./node_modules/soap/index.js');
const URL = 'http://www.dneonline.com/calculator.asmx?WSDL';
const PI = 3.14
const ENTRY_POINT = {
    intA: 55,
    intB: 42
};
let secondArgs = {};
let thirdArgs = {};

console.log('Creating client..');
SOAP.createClient(URL,
    function(err, client) {

    if (err) {
        console.log('Error creating client: ', err);
    } else {

        console.log('Client created..');
        client.Add(ENTRY_POINT,
            function(err, firstAdd) {

            secondArgs = {
                intA: parseInt(firstAdd.AddResult),
                intB: 12,
            };

            client.Multiply(secondArgs,
                function(err, multi) {

                thirdArgs = {
                    intA: parseInt(multi.MultiplyResult),
                    intB: 3,
                };

                client.Add(thirdArgs,
                    function(err, finish) {
     
     				// The dneonline.com wait only INTEGER input values, and
     				// the FLOAT values return an error message.
                    console.log('The result:', parseInt(finish.AddResult) / PI);
                    
                });
            });
        });
    }
});