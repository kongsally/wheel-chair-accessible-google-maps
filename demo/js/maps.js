var map = L.map('map').setView([39.9524384, -75.1636757], 13);

		L.tileLayer('http://{s}.tiles.mapbox.com/v3/leekinney.ij51biij/{z}/{x}/{y}.png', {
    		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    		maxZoom: 18
	}).addTo(map);

	var marker = L.marker([39.9524384, -75.1636757]).addTo(map);

	marker.bindPopup("wheelchairs cannot<br>navigate transfers here").openPopup();

	String.prototype.splitCSV = function(sep) {
	  for (var foo = this.split(sep = sep || ","), x = foo.length - 1, tl; x >= 0; x--) {
	    if (foo[x].replace(/"\s+$/, '"').charAt(foo[x].length - 1) == '"') {
	      if ((tl = foo[x].replace(/^\s+"/, '"')).length > 1 && tl.charAt(0) == '"') {
	        foo[x] = foo[x].replace(/^\s*"|"\s*$/g, '').replace(/""/g, '"');
	      } else if (x) {
	        foo.splice(x - 1, 2, [foo[x - 1], foo[x]].join(sep));
	      } else foo = foo.shift().split(sep).concat(foo);
	    } else foo[x].replace(/""/g, '"');
	  } return foo;
	};


var url = "http://localhost:8888/wheel-chair-accessible-google-maps/demo/rail-stops.txt"
var txtFile = new XMLHttpRequest();
txtFile.open("GET",  url, true);
txtFile.onreadystatechange = function()
{
  if (txtFile.readyState === 4) {  // document is ready to parse.
    if (txtFile.status === 200) {  // file is found
      allText = txtFile.responseText; 
      //lines is an array
      // console.log(allText)

      lines = txtFile.responseText.split("\n");
      
      $.each( lines, function( index, line ){
      	var elements = line.splitCSV();
      	var stopID = elements[0]
      	var stopName = elements[1]
      	var stopDesc = elements[2]
      	var stopLong = elements [3]
      	var stopLat = elements[4]
      	var zone = elements[5]	
    	var point = [stopLong, stopLat]
    	// console.log(point);
    	var marker = L.marker([stopLong, stopLat]).addTo(map);
    	// marker.bindPopup(stopName).openPopup();
    	      var popup = L.popup();

	    	function onMarkerClick(e) {
		    alert("You clicked the map at " + stopName);
		}

		marker.on('click', onMarkerClick);
		});

	    }
	  }
	}
	txtFile.send(null);
	
	// function onMapClick(e) {
	//     popup
	//         .setLatLng(e.latlng)
	//         .setContent("You clicked the map at " + stopName)
	//         .openOn(map);
	// }

	// map.on('click', onMapClick);