// curl https://www.metaweather.com/api/location/4118/
// curl https://www.metaweather.com/api/location/search/?query=Toronto

//Use the request module
var request = require('request');

var query = process.argv.slice(2);
request('https://www.metaweather.com/api/location/search/?query=' + query, function (err, res, body){
    if(err){
        console.log("error occured", err);
    //if request was successful
    } else if (res.statusCode === 200){
        let data = JSON.parse(body);
        let weatherId = data[0]['woeid'];
        console.log('weather id', weatherId);

        request('https://www.metaweather.com/api/location/' + weatherId + '/', function (err, res, body){
            if(res.statusCode === 200){
                var data = JSON.parse(body);
                var temp = data.consolidated_weather[0]['the_temp'];
                console.log(`Temperature in ${query} is ${temp}`);
            }
        });
    }
});