var settings = {sleep: 0, sleeptime: 12, security: 0, lightover: 0, fanover: 0, tempthresh: 0, lightthresh: 0, timeout: 0, fanset: 0, lightset: 0};
var g1, g2, g3, g4, g5, g6;
var socket = io('192.168.1.50:3000');
socket.on('butupdate', function(data){
	if(data.sleep!=settings['sleep']){
		$("#sleep").toggleClass("btn-primary");
		$("#sleep").toggleClass("btn-warning");
	}
	if(data.lightover!=settings['lightover']){
		$("#lightover").toggleClass("btn-danger");
		$("#lightover").toggleClass("btn-success");
		$("#lightdrop").toggleClass("btn-danger");
		$("#lightdrop").toggleClass("btn-success");
		$("#lightdrop").toggleClass("disabled");
	}
	if(data.lightset!=settings['lightset']){
		$("#lighton").toggleClass("btn-danger");
		$("#lighton").toggleClass("btn-success");
		$("#lightoff").toggleClass("btn-danger");
		$("#lightoff").toggleClass("btn-success");
		$("#lighton").toggleClass("disabled");
		$("#lightoff").toggleClass("disabled");
	}
	g3.refresh(data.pir);
	g5.refresh(data.sleep);
	settings = data;
});
socket.on('meterupdate', function(data){
	g1.refresh(data.temp);
	g2.refresh(data.light);
	g3.refresh(data.pir);
	g4.refresh(data.connected);
	g5.refresh(data.sleep);
	g6.refresh(data.humid);
});
var passprompt = {
	state0: {
		title: 'Password',
		html:'<label>Password: <input type="password" name="pass" value=""></label><br />',
		focus: "input[name='pass']",
		submit:function(e,v,m,f){ 
			if(CryptoJS.SHA256(f['pass'].concat("saltiness")) == "df5048d83536b8ad1ce3ff86d8691aaefea4363756d169cbf429ebf09f023fb2"){
				$.cookie('login', 1, { expires: 1 });
				location.reload();
			}
			else{
				alert("Access Denied!");
				location.reload();
			}
		}
	}
}
function sendJSON() {
	//$("#temp").html(CryptoJS.SHA256("saltiness").toString(CryptoJS.enc.Base64));
	if (window.location.host == "192.168.1.50" || $.cookie('login')==1) {
		//$.post('http://'+window.location.hostname+':3000/settings.php', {"sleep": settings["sleep"], "fanover": settings["fanover"], "fanset": settings["fanset"], "lightover": settings["lightover"], "lightset":settings["lightset"]})
		socket.emit("recvBut", {"sleep": settings["sleep"], "fanover": settings["fanover"], "fanset": settings["fanset"], "lightover": settings["lightover"], "lightset":settings["lightset"]});
	}
	else {
		$.prompt(passprompt);
	}
}
function updateBut(){
	if (changed == 0) {
		$.getJSON('http://'+window.location.hostname+':3000/status.json', function(data){
			if(data['sleep']!=settings['sleep']){
				$("#sleep").toggleClass("btn-primary");
				$("#sleep").toggleClass("btn-warning");
			}
			if(data['security']!=settings['security']){
				$("#security").toggleClass("btn-danger");
				$("#security").toggleClass("btn-success");
			}
			if(data['lightover']!=settings['lightover']){
				$("#lightover").toggleClass("btn-danger");
				$("#lightover").toggleClass("btn-success");
				$("#lightdrop").toggleClass("btn-danger");
				$("#lightdrop").toggleClass("btn-success");
				$("#lightdrop").toggleClass("disabled");
			}
			if(data['lightset']!=settings['lightset']){
				$("#lighton").toggleClass("btn-danger");
				$("#lighton").toggleClass("btn-success");
				$("#lightoff").toggleClass("btn-danger");
				$("#lightoff").toggleClass("btn-success");
				$("#lighton").toggleClass("disabled");
				$("#lightoff").toggleClass("disabled");
			}
			if(tempchange==0){
				$("#tempslide").ionRangeSlider("update", {
					from: data['tempthresh']
				});
			}
			if(lightchange==0){
				$("#lightslide").ionRangeSlider("update", {
					from: data['lightthresh']
				});
			}
			if(timeoutchange==0){
				$("#timeoutslide").ionRangeSlider("update", {
					from: data['timeout']
				});
			}
            if(sleepchange==0){
				$("#sleepslide").ionRangeSlider("update", {
					from: data['sleeptime']
				});
			}
			settings=data;
		});
	}
	changed=0;
}
$(function () {
	g1 = new JustGage({
		id: "temp",
		value: 0,
		min: 0,
		max: 100,
		title: "Temperature",
		label: "",
		levelColorsGradient: true
	});
	g2 = new JustGage({
		id: "photo",
		value: 0,
		min: 0,
		max: 350,
		title: "Light Sensor",
		label: "",
		levelColorsGradient: true
	});
	g3 = new JustGage({
		id: "pir",
		value: 0,
		min: 0,
		max: 1,
		title: "PIR Sensor",
		label: "",
		levelColors: ["#006600"]
	});
	g4 = new JustGage({
		id: "connected",
		value: 0,
		min: 0,
		max: 1,
		title: "Connection",
		label: "",
		levelColors: ["#006600"]
	});
	g5 = new JustGage({
		id: "slee",
		value: 0,
		min: 0,
		max: 1,
		title: "Sleep",
		label: "",
		levelColors: ["#006600"]
	});
	g6 = new JustGage({
		id: "humid",
		value: 0,
		min: 0,
		max: 100,
		title: "Humidity",
		label: "",
		levelColors: ["#006600"]
	});
	$("#sleepslide").ionRangeSlider({
		min: 0,
		max: 24,
		from: 0,
		prettify: false,
		hasGrid: true,
		onChange: function (obj) {
			sleepchange = 1;
		},
		onFinish: function (obj) {
			settings['sleeptime'] = obj['fromNumber'];
			sendJSON();
			sleepchange = 0;
		}
	});
    $("#tempslide").ionRangeSlider({
		min: 40,
		max: 100,
		from: 0,
		postfix: "°",
		prettify: false,
		hasGrid: true,
		onChange: function (obj) {
			tempchange = 1;
		},
		onFinish: function (obj) {
			settings['tempthresh'] = obj['fromNumber'];
			sendJSON();
			tempchange = 0;
		}
	});
	$("#lightslide").ionRangeSlider({
		min: 60,
		max: 250,
		from: 0,
		prettify: false,
		hasGrid: true,
		onChange: function (obj) {
			lightchange = 1;
		},
		onFinish: function (obj) {
			settings['lightthresh'] = obj['fromNumber'];
			sendJSON();
			lightchange = 0;
		}
	});
	$("#timeoutslide").ionRangeSlider({
		min: 0,
		max: 250,
		from: 0,
		prettify: false,
		hasGrid: true,
		onChange: function (obj) {
			timeoutchange = 1;
		},
		onFinish: function(obj){
			settings['timeout'] = obj['fromNumber'];
			sendJSON();
			timeoutchange = 0;
		}
	});
	$("#sleep").click(function(){
		$("#sleep").toggleClass("btn-primary");
		$("#sleep").toggleClass("btn-warning");
		settings["sleep"] = !settings["sleep"]; 
		settings["sleep"] = +settings["sleep"];
		sendJSON();
		changed = 1;
	});
	$("#security").click(function(){
		$("#security").toggleClass("btn-danger");
		$("#security").toggleClass("btn-success");
		settings["security"] = !settings["security"]; 
		settings["security"] = +settings["security"];
		sendJSON();
		changed = 1;
	});
	$("#lightover").click(function(){
		$("#lightover").toggleClass("btn-danger");
		$("#lightover").toggleClass("btn-success");
		$("#lightdrop").toggleClass("btn-danger");
		$("#lightdrop").toggleClass("btn-success");
		$("#lightdrop").toggleClass("disabled");
		settings["lightover"] = !settings["lightover"];
		settings["lightover"] = +settings["lightover"];
		sendJSON();
		changed=1;
	});
	$(".lightset").click(function(){
		$("#lighton").toggleClass("btn-danger");
		$("#lighton").toggleClass("btn-success");
		$("#lightoff").toggleClass("btn-danger");
		$("#lightoff").toggleClass("btn-success");
		$("#lighton").toggleClass("disabled");
		$("#lightoff").toggleClass("disabled");
		settings["lightset"] = !settings["lightset"];
		settings["lightset"] = +settings["lightset"];
		sendJSON();
		changed=1;
	});
});
