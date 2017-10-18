$(document).ready(function(){
	var lat;
	var long;

	//Gets the location //
	function getLocation() {
    	if (navigator.geolocation) {
        	navigator.geolocation.getCurrentPosition(setPosition);
    	} else { 
        	$("demo").text("Geolocation is not supported by this browser.");
    	}
	}

	//set the variables of latitude and longitude//
	function setPosition(position) {
		lat = position.coords.latitude;
		long = position.coords.longitude;
    	getLocationName(lat, long);
    	getWeather(lat, long);
	}

	//use google geocode api to find city name and state
	function getLocationName(lat, long){
		var latlng = lat + ',' + long;
		var url = 'https://maps.google.com/maps/api/geocode/json?latlng=' + latlng + '&sensor=false&key=AIzaSyCofrPyvm_444asZAAapzGyuuA6TvzEfBs';
		$.getJSON(url, function (data) {	
			var address = data.results[1].formatted_address;
			$('#add').text(address);
		})
	}

	function getWeather(lat, long){
		var url = 'https://fcc-weather-api.glitch.me/api/current?lat=' + lat + '&lon=' + long;
		$.getJSON(url, function(response) {
			var weatherType = JSON.stringify(response.weather[0].main);
			weatherType = weatherType.substring(1, weatherType.length-1)
			var temp = parseInt(JSON.stringify(response.main.temp));
			$('#temps').text(temp);
			$('#type').text(weatherType);
			button(temp);
			getLogo(weatherType);
		})
	}

	var cel = true;
	$('#unit').text("C");


	function button(temp){
		$('#unit').on('click', function(){
			if (cel == true){
				$('#temps').text(temp*9/5+32);
				$('#unit').text("F");
				cel = false;
			}
			else{
				$('#temps').text(temp);
				$('#unit').text("C");
				cel = true;
			}
		})
	}

	//https://icons8.com/icon/pack/Weather
	//https://www.iconfinder.com/iconsets/meteocons
	function getLogo(weatherType){
		
		if (weatherType == "Rain"){
			document.getElementById('logo').src="https://cdn3.iconfinder.com/data/icons/meteocons/512/rain-128.png";
		}
		else if (weatherType == "Clouds"){
			document.getElementById('logo').src = 'https://cdn3.iconfinder.com/data/icons/meteocons/512/clouds-128.png';
		}
		else if (weatherType=="Mist"){
			document.getElementById('logo').src = 'https://cdn3.iconfinder.com/data/icons/meteocons/512/rain-2-128.png';
		}
		else if (weatherType=="Clear"){
			document.getElementById('logo').src= 'https://cdn3.iconfinder.com/data/icons/meteocons/512/sun-symbol-128.png';
		}
		else {
			document.getElementById('logo').src="https://cdn3.iconfinder.com/data/icons/meteocons/512/temperature-128.png" ;
		}
		
	}


	window.onload = getLocation();

})