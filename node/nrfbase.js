var config = require("./config");
var NRF24 = require("nrf"),
    spiDev = "/dev/spidev0.1",
    cePin = 24, irqPin = 17,            //var ce = require("./gpio").connect(cePin)
    pipes = config.pipes;
var connected=0, sleep=0, security=0, pir=0, temp = 1, light = 1, lightover=0, fanover=0, lightset=1, fanset=0;
//var setdat = {"sleep":sleep, "fanover":fanover, "lightover":lightover, "lightset": lightset, "fanset": fanset};
//var statusdat = {"connected":connected, "pir": pir, "temp":temp, "light":light};
var nrf = NRF24.connect(spiDev, cePin, irqPin);
var express = require('express'), app = express();
var path = require('path'), cors = require('cors'), bodyParser = require('body-parser'), buff = require('bufferpack'), mongo = require('mongojs');
var dbenable = 1;
if(dbenable==1){
	var mongouri = config.mongouri;
	var collection = mongo.connect(mongouri, [config.collection]);
}
app.use(express.static(process.cwd() + '/public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
var tx, rx1, rx2;
var sock;
setInterval(function(){lightover=0;radioSend();meterUpdate();butUpdate();},2700000);
function startRadio(){
	nrf.end(function(){
		nrf.begin(function () {
		    nrf.printDetails();
		    tx = nrf.openPipe('tx', pipes[0]);
		    rx1 = nrf.openPipe('rx', pipes[1]);
		    rx2 = nrf.openPipe('rx', pipes[2]);
		    rx1.on('data', function(d){recvDat(d)});
		    rx2.on('data', function(d){recvDat(d)});
		    tx.on('error', function (e) {
			console.warn("Error sending reply.", e);
			startRadio();
		    });	
		});
	});
}
//nrf._debug = true;
nrf.channel(0x4c).transmitPower('PA_HIGH').dataRate('1Mbps').crcBytes(2).autoRetransmit({count:15, delay:4000});
startRadio();
app.get('/status.json', function (req, res) {
	var senddat = {"connected":connected, "pir": pir, "temp":temp, "light":light, "sleep":sleep, "fanover":fanover, "lightover":lightover, "lightset": lightset, "fanset": fanset};
	res.jsonp(senddat);
});
app.get('/sleep', function (req, res) {
	sleep = !sleep ? 1 : 0;
	if(sleep==0){
		res.send("Sleep Mode Off");
	}
	if(sleep==1){
		res.send("Sleep Mode On");
	}
	radioSend();
	meterUpdate();
	butUpdate();
});
app.get('/sleepoff', function (req, res) {
	sleep=0;
	res.send("Sleep Mode Off");
	radioSend();
	meterUpdate();
	butUpdate();
});
app.get('/overon', function (req, res) {
	lightover=1;
	lightset=1;
	res.send("Light Override!");
	radioSend();
	meterUpdate();
	butUpdate();
});
app.get('/red', function (req, res) {
	colorChange(30);
	res.send("Red Light!");
});
app.get('/blue', function (req, res) {
	colorChange(31);
	res.send("Blue Light!");
});
app.get('/green', function (req, res) {
	colorChange(32);
	res.send("Green Light!");
});
app.get('/white', function (req, res) {
	colorChange(33);
	res.send("White Light!");
});
app.get('/fade', function (req, res) {
	colorChange(34);
	res.send("Fade Light!");
});

var server = app.listen(3000, function () {
  //var host = server.address().address
  var host = "192.168.1.50"
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})
var io = require('socket.io')(server);
io.on('connection', function(socket){
	sock = socket;
	meterUpdate();
	butUpdate();
	socket.emit('all', {"sleep":sleep, "fanover":fanover, "lightover":lightover, "lightset": lightset, "fanset": fanset, "connected":connected, "pir": pir, "temp":temp, "light":light});
	socket.on('recvBut', function(dat){
		sleep = dat.sleep;
		lightover = dat.lightover;
		lightset = dat.lightset;
		radioSend();
		meterUpdate();
		butUpdate();
	});
	socket.on('statusGet', function(){
		socket.emit('statusRecv', {"sleep":sleep, "connected":connected, "pir": pir, "temp":temp, "light":light});
	});
	socket.on('getchart', function(){
		if(dbenable==1){
			collection.DataLog.find({temp: {$exists: true}}, {time: 1, temp: 1, light: 1}).sort({"time": -1}).limit(500, function(err, docs){
				socket.emit('templightdat', docs.reverse());
			});
			collection.DataLog.find({pir: {$exists: true}}, {time: 1, pir: 1, sleep: 1}).sort({"time": -1}).limit(500, function(err, docs){
				socket.emit('pirsleepdat', docs.reverse());
			});
		}
	});
	if(dbenable==1){
		collection.DataLog.find({temp: {$exists: true}}, {time: 1, temp: 1});
	}
});
function recvDat(d){
	connected=1
	try{
		var var5 = d.readUInt16BE(0);
		var var4 = d.readUInt16BE(2);
		var var3 = d.readUInt16BE(4);
		var var2 = d.readUInt16BE(6);
		var var1 = d.readUInt16BE(8);
		var id = d.readUInt16BE(10);
		if(id==1){
			temp = var1;
			light=var2;
			console.log("Temp:", temp, "Light:", light);
			meterUpdate();
			if(dbenable==1){
				collection.DataLog.save({time: Date.now(), temp: temp, light: light}, function(err, updated) {
				  if( err || !updated ) console.log("Update Failed");
				});
			}
		}
		if(id==2){
			pir = var1;
			sleep = var2;
			console.log("PIR:", pir, "Sleep:", sleep);
			butUpdate();
			if(dbenable==1){
				collection.DataLog.save({time: Date.now(),pir: pir, sleep: sleep}, function(err, updated) {
				  if( err || !updated ) console.log("Update Failed");
				});
			}
		}
		//new client		
		if(id==122){
			radioSend();
		}
		
	}
	catch(e){
		console.log("Failed to decode received data");
		console.log(e);
	}
}
function radioSend(){
	var dat = buff.pack('hhhhhh', [8, 7, lightset, lightover, sleep, 6]);
	console.log("Sent Radio Update");
	tx.write(dat);
}
function colorChange(id){
	var dat = buff.pack('hhhhhh', [id, id, id, id, id, id]);
	console.log("Sent Radio for IR LED Change using"+id);
	tx.write(dat);
}
function meterUpdate(){
	try{
		io.emit('meterupdate', {"sleep":sleep, "connected":connected, "pir": pir, "temp":temp, "light":light});
	}
	catch(e){
		console.log("Failed to update webpage");
	}
}
function butUpdate(){
	try{	
		io.emit('butupdate', {"pir": pir, "sleep":sleep, "lightover":lightover, "lightset": lightset});
	}
	catch(e){
		console.log("Failed to update webpage");
	}
}
