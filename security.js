$(function(){
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
	$("#submit").click(function(){
		if(CryptoJS.SHA256($("#pass").value.concat("saltiness")) == "df5048d83536b8ad1ce3ff86d8691aaefea4363756d169cbf429ebf09f023fb2"){
			$.cookie('login', 1);
			location.reload();
		}
		else{
			alert("Access Denied!");
		}
		$("#dialog").dialog("close");
	});
	if (window.location.host == "192.168.1.50" || $.cookie('login')==1) {
		$('#secphoto').magnificPopup({
			delegate: 'a',
			type: 'image',
			tLoading: 'Loading image #%curr%...',
			mainClass: 'mfp-img-mobile',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1] // Will preload 0 - before current, and 1 after the current image
			},
			image: {
				tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
				titleSrc: function(item) {
					return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
				}
			}
		});
	}
	else {
		$.prompt(passprompt);
	}
});
