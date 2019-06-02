const CONFIG = {
  apiKey: 'd86647d2b128b1783d41cf7305a404b4',
  latitude: '47.4813602',
  longitude: '18.9902195',
  darkSkyUrl: 'https://api.darksky.net/forecast/',
  cors: 'https://cors-anywhere.herokuapp.com/',
};

const monthNames = [
  'Január',
  'Február',
  'Március',
  'Április',
  'Május',
  'Június',
  'Július',
  'Augusztus',
  'Szeptember',
  'Október',
  'November',
  'December'
];

const dayOfWeekNames = [
  'Vasárnap',
  'Hétfő',
  'Kedd',
  'Szerda',
  'Csütörtök',
  'Péntek',
  'Szombat'
];

function twoDigitPad(num) {
    return num < 10 ? "0" + num : num;
}

function formatDate(date, patternStr) {
    if (!patternStr) {
        patternStr = 'M/d/yyyy';
    }
    var day = date.getDate(),
        month = date.getMonth(),
        year = date.getFullYear(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds(),
        miliseconds = date.getMilliseconds(),
        h = hour % 12,
        hh = twoDigitPad(h),
        HH = twoDigitPad(hour),
        mm = twoDigitPad(minute),
        ss = twoDigitPad(second),
        aaa = hour < 12 ? 'AM' : 'PM',
        EEEE = dayOfWeekNames[date.getDay()],
        EEE = EEEE.substr(0, 3),
        dd = twoDigitPad(day),
        M = month + 1,
        MM = twoDigitPad(M),
        MMMM = monthNames[month],
        MMM = MMMM.substr(0, 3),
        yyyy = year + "",
        yy = yyyy.substr(2, 2)
    ;
    // checks to see if month name will be used
    if (patternStr.indexOf('MMM') > -1) {
        patternStr = patternStr
          .replace('MMMM', MMMM)
          .replace('MMM', MMM);
    }
    else {
        patternStr = patternStr
          .replace('MM', MM)
          .replace('M', M);
    }


    return patternStr
      .replace('hh', hh).replace('h', h)
      .replace('HH', HH).replace('H', hour)
      .replace('mm', mm).replace('m', minute)
      .replace('ss', ss).replace('s', second)
      .replace('S', miliseconds)
      .replace('dd', dd).replace('d', day)
      
      .replace('EEEE', EEEE).replace('EEE', EEE)
      .replace('yyyy', yyyy)
      .replace('yy', yy)
      .replace('aaa', aaa)
    ;
}

const YEAR = formatDate(new Date(), 'yyyy');
const DAY = formatDate(new Date(), 'dd');
const MONTH = monthNames[new Date().getMonth()];
const VISIBILITY_PIXEL = 3;

function loadXMLDoc() {
	
  document.getElementById('currentDate').innerHTML =
    YEAR + ' ' + MONTH + ' ' + DAY + ', ' + dayOfWeekNames[new Date().getUTCDay()];

  const XHTTP = new XMLHttpRequest();

  XHTTP.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

  	    let html = '';      	 
  		  for (let i = 0; i < 4; i++) {

  		   	  document.getElementById('ticks').style.width = (150*(i+1)+100) + 'px'; 

            let darkSky = {
              precipProbality: JSON.parse(this.responseText).hourly.data[i].precipProbability,
              precipIntensity: JSON.parse(this.responseText).hourly.data[i].precipIntensity,
              temperature: (JSON.parse(this.responseText).hourly.data[i].temperature-32)/1.8,
            };

  		    	let precip = darkSky.precipProbality > 0 ?
              darkSky.precipProbality :
                (darkSky.precipIntensity) > 0 ?
                  darkSky.precipIntensity : 0;

  		    	let precipText = precip === 0 ? '' : 'Esőzés várható.';

  		    	html += '<tr style="left:'+(150*(i+1))+'px" class="qtr" id="'  + 'q' + (i + 1) + '">' +
  		    		'<th scope="row">' +
  		    			new Date(JSON.parse(this.responseText).hourly.data[i].time*1000).getHours() + ':00' +
  		    		'</th>' +
  		    		'<td class="rain bar" style="height:' + (precip > 0 ? precip + VISIBILITY_PIXEL : precip) + 'px;">' +
  		    			'<p class="precip">' + precipText + '</p>' +
                '<p class="precipDisplay">Csapadék: ' + precip + 'mm</p>' +
  		    		'</td>' +
  		    		'<td class="celsius bar" style="height:' + darkSky.temperature + 'px;">' +
  		    			'<p>' + darkSky.temperature.toFixed(1) + '&deg;C' + '</p>' +
  		    		'</td></tr>';
  		}

  		document.getElementById('weather').innerHTML = html;
      }
  }

  XHTTP.open(
    'GET',
      CONFIG.cors +
      CONFIG.darkSkyUrl +
      CONFIG.apiKey + '/' +
      CONFIG.latitude + ',' +
      CONFIG.longitude,
    true
  );

  XHTTP.send();
}