    <?php require("header.php");?>
    <div class="container" id="main" style="text-align: center">

      <!-- Main component for a primary marketing message or call to action -->
      <div class="jumbotron container-fluid">
        <h1>Control Panel:</h1>
		  <div id="btnpanel">
		  </br>
          <a class="btn btn-lg btn-warning" id="sleep" role="button">Sleep Mode</a>
          <!--<div class="btn-group">
            <button type="button" id="fanover" class="btn btn-lg btn-danger">Fan Override</button>
            <button type="button" class="btn btn-lg btn-danger dropdown-toggle disabled" id="fandrop" data-toggle="dropdown">
              <span class="caret"></span>
              <span class="sr-only">Toggle Dropdown</span>
            </button>
            <ul class="dropdown-menu" role="menu">
              <li><a class="btn btn-danger fanset" id="fanon" role="button">Fan On</a></li>
              <li class="divider"></li>
              <li><a class="btn btn-success fanset disabled" id="fanoff" role="button">Fan Off</a></li>
            </ul>
          </div>-->
          <div class="btn-group">
            <button type="button" id="lightover" class="btn btn-lg btn-danger">Light Override</button>
            <button type="button" class="btn btn-lg btn-danger dropdown-toggle disabled" id="lightdrop" data-toggle="dropdown">
              <span class="caret"></span>
              <span class="sr-only">Toggle Dropdown</span>
            </button>
            <ul class="dropdown-menu" role="menu">
              <li><a class="btn btn-danger lightset" id="lighton" role="button">Light On</a></li>
              <li class="divider"></li>
              <li><a class="btn btn-success lightset disabled" id="lightoff" role="button">Light Off</a></li>
            </ul>
          </div>
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
  </body>
</html>
