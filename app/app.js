// Require all the NPM Modules as needed
var http = require('http');
var express = require('express');
var app = express();

var requested_character = process.argv[2];
var host = 'http://marvel.wikia.com/api/v1/Articles/';


//http://marvel.wikia.com/api.php?action=query&format=json&prop=revisions&rvprop=content&titles=Captain_America_(Steven_Rogers)

var characterList = function(path,limitLower,LimitUpper){
	http.get(host + path,function callback(response){
		response.setEncoding('utf8');
		var rawData = '';
		response.on('data', function (chunk){
			rawData += chunk;		
		});
		response.on('end', function(){
			jsonData = JSON.parse(rawData);
			data = jsonData['items'];

			for(i=1;i<=data.length;i++){
				var character = data[i-1];
				character.title = character.title.replace(" (Earth-199999)","");
				console.log(character.title);
				console.log(character.url);
			}
		});
	});
}

//characterList(path,0,25);

http.get('http://marvel.wikia.com/api.php?format=json&action=query&titles=Anthony_Stark_%28Earth-199999%29&prop=revisions&rvprop=content',function callback(response){
	
	response.setEncoding('utf8');
	var rawData = '';
	
	response.on('data', function (chunk){
		rawData += chunk;		
	});
	
	response.on('end', function(){
		jsonData = JSON.parse(rawData);
		var pageID = Object.keys(jsonData.query.pages)[0];
		var data = jsonData.query.pages[pageID].revisions[0]['*'];
		var data = data.split("| HistoryText");
		var stats = data[0]
			.replace(/r\|/g,'')
			.replace(/\[\[/g,'')
			.replace(/\]\]/g,'')
			.replace(/{{/g,'')
			.replace(/}}/g,'')
			.replace(/\n/g,'');
		
		//statsArr = stats.split('|');

		statsArr = {};
		stats.split('|').forEach(function(x){
			var arr = x.split('=');
			arr[1] && (statsArr[arr[0].replace(/^\s+|\s+$/g,'')] = arr[1].replace(/^\s+|\s+$/g,''));
		});

		console.log(statsArr);
	});
});





/* app.get('/', function (req, res) {
	res.send(data);
})*/



/*var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})/*

// test conection to wikia

/**
 * Setup routes
 * 1. get: /character/ 
 */

/**
 * homescreen
 * splashscreen with app logo on load
 * grid of popular characters
 * navigation fixed to footer
 * [popular][search][about]
 */

/**
 * Search
 * slide up from bottom with search input
 * Results: list view
 * -----------------
 *
 * Alias
 * Name
 * -----------------
 */