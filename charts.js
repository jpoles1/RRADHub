$(function(){
	var socket = io('192.168.1.50:3000');
	var tempoptions = {
		chart: {
			renderTo: 'temp',
			type: 'spline',
			zoomType: 'x'
		},
		title: {
			text: 'Room Temperature and Humidity'
		},
		xAxis: {
			type: 'datetime'
		},
		yAxis: [{
			labels: {
				format: '{value}°F'
			},
			title: {
				text: 'Temperature'
			}
		},{
			labels: {
				format: '{value}%'
			},
			title: {
				text: 'Humidity'
			}, opposite: true
		}],
		plotOptions: {
			spline: {
				marker: {
					enabled: false
				}			}
		},
		series: [{name: "Temperature", data: [], tooltip: {valueSuffix: ' °F'}}, {name: "Humidity", data: [], yAxis: 1, tooltip: {valueSuffix: ' %'}}]
	};
	var lightoptions = {
		chart: {
			renderTo: 'light',
			type: 'spline',
			zoomType: 'x'
		},
		title: {
			text: 'Room Light Intensity'
		},
		xAxis: {
			type: 'datetime'
		},
		yAxis: {
			title: {
				text: 'Photoresistor Measurement'
			}
		},
		plotOptions: {
			spline: {
				marker: {
					enabled: false
				}			}
		},
		series: [{name: "Light", data: []}]
	};
	var sleepsec = {
		chart: {
			renderTo: 'sleepsec',
			type: 'spline',
			zoomType: 'x'
		},
		title: {
			text: 'System Security/Sleep Status'
		},
		xAxis: {
			type: 'datetime'
		},
		yAxis: {
			title: {
				text: ''
			}
		},
		plotOptions: {
			spline: {
				marker: {
					enabled: false
				}			}
		},
		series: [{name: "PIR", data: []}, {name: "Sleep", data: []}]
	};	
	var options = {
		chart: {
			renderTo: 'other',
			type: 'spline',
			zoomType: 'x'
		},
		title: {
			text: 'Other Indicators'
		},
		xAxis: {
			type: 'datetime'
		},
		yAxis: {
			title: {
				text: ''
			}
		},
		plotOptions: {
			spline: {
				marker: {
					enabled: false
				}			}
		},
		series: []
	}
	socket.emit('getchart', {});
	
	socket.on("templightdat", function(data) {
		$.each(data, function(num, i){
			lightoptions.series[0].data.push([i.time, i.light]);
			tempoptions.series[0].data.push([i.time, i.temp]);
			tempoptions.series[1].data.push([i.time, i.humid]);
		});
		var chart1 = new Highcharts.Chart(tempoptions);
		var chart2 = new Highcharts.Chart(lightoptions);
		//var chart3 = new Highcharts.Chart(options);
	});
	socket.on("pirsleepdat", function(data) {
		$.each(data, function(num, i){
			sleepsec.series[0].data.push([i.time, i.pir]);
			sleepsec.series[1].data.push([i.time, i.sleep]);
		});
		var chart3 = new Highcharts.Chart(sleepsec);
	});
});
