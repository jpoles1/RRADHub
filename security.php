    <?php require("header.php");?>
    <div class="container" id="main" style="text-align: center">

      <!-- Main component for a primary marketing message or call to action -->
      <div class="jumbotron container-fluid">
        <b>Security Photos:</b>
        </br>
        <div id="secphoto">
          <?php
            if(array_key_exists('login', $_COOKIE) || $_SERVER['SERVER_NAME']=="192.168.1.50"){
              $images = array_reverse(glob("secphoto/*"));
              foreach($images as $image) {
                echo '<a href="'.$image.'"/><img src="'.$image.'"</a>';
              }
            }
          ?>
        </div>
        <a class="btn btn-danger" id="delete" role="button" href="photowipe.php">DELETE ALL PHOTOS</a>
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
    <script src="js/dygraph-combined.js"></script>
    <script src="http://code.highcharts.com/highcharts.js"></script>
    <script src="js/charttheme.js"></script>
    <script src="js/cookie.min.js"></script>
    <script src="js/dialog.js"></script>
    <script src="js/sha256.js"></script>
    <script src="js/lightbox.min.js"></script>
    <script src="security.js"></script>
    <link href="css/lightbox.min.css" rel="stylesheet">

  </body>
</html> 