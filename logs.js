$(function(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	if(dd<10) {
    	dd='0'+dd
	} 

	if(mm<10) {
		mm='0'+mm
	} 
	$.ajax({url: "logs/log-"+mm+'-'+dd+'-'+yyyy+".csv"}).done(function(data){
		var lines = data.split("\n"),
			output = [],
			i;
		for (i = 0; i < lines.length; i++)
			output.push("<tr><td>"
						+ lines[i].slice(0,-1).split(",").join("</td><td>")
						+ "</td></tr>");
		output = "<table>" + output.join("") + "</table>";
		$("#logtable").html(output);
		console.log(output);
	});
});