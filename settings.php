    <?php require("header.php");?>
    <div class="container" id="main" style="text-align: center">

      <!-- Main component for a primary marketing message or call to action -->
      <div class="jumbotron container-fluid">
        <h1>Settings Panel:</h1>
        <div id="btnpanel">
		  </br>
          <b>Sleep Timer:</b>
          <input type="text" id="sleepslide"/>
          </br>
          <!--<b>Fan Temperature Threshold:</b>
          <input type="text" id="tempslide"/>
          </br>-->
          <b>Light Threshold:</b>
          <input type="text" id="lightslide"/>
          </br>
          <b>PIR Timeout:</b>
          <input type="text" id="timeoutslide"/>
          </br>
        </div>
        <div id="meterpanel" class='container-fluid'>
          <div id="temp" class='col-md-4 meter'></div>
          <div id="photo" class='col-md-4 meter'></div>
          <div id="pir" class='col-md-4 meter'></div>
          <div id="humid" class='col-md-4 meter'></div>
          <div id="connected" class='col-md-4 meter'></div> 
          <div id="slee" class='col-md-4 meter'></div>
        </div>
      </div>

    </div> <!-- /container -->

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/raphael.2.1.0.min.js"></script>
    <script src="js/justgage.1.0.1.min.js"></script>
    <script src="js/ion.rangeSlider.min.js"></script>
    <script src="js/sha256.js"></script>
    <script src="js/cookie.min.js"></script>
    <script src="js/dialog.js"></script>
	<script src="https://cdn.socket.io/socket.io-1.2.0.js"></script>
    <script src="main.js"></script>
    <link href="css/ion.rangeSlider.skinFlat.css" rel="stylesheet">
    <link href="css/ion.rangeSlider.css" rel="stylesheet"><link rel="stylesheet" href="//code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css"> 
  </body>
</html>
