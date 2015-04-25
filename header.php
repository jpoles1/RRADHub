<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="favicon.ico" type="image/x-icon">
    <title>Room Automation Control Panel</title>

    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/normalize.min.css" rel="stylesheet">
    <link href="css/ion.rangeSlider.css" rel="stylesheet">
    <link rel="stylesheet" href="/css/jquery-ui.min.css">
    <!-- Custom styles for this template -->
    <link href="main.css" rel="stylesheet">
  </head>

  <body>
    <div class="navbar navbar-default navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Automation Panel</a>
        </div>
        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            
            <li class="navbut <?php if($_SERVER["REQUEST_URI"] == "/index.php" || $_SERVER["REQUEST_URI"] == "/"){print("active");} ?>" id="home"><a href="index.php">Control</a></li>
            <li class="navbut <?php if($_SERVER["REQUEST_URI"] == "/settings.php"){print("active");} ?>" id="settings"><a href="settings.php">Settings</a></li>
            <li class="navbut <?php if($_SERVER["REQUEST_URI"] == "/charts.php"){print("active");} ?>" id="charts"><a href="charts.php">Charts</a></li>
            <!--<li class="navbut <?php if($_SERVER["REQUEST_URI"] == "/security.php"){print("active");} ?>" id="logs"><a href="security.php">Security Cam</a></li>-->
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </div> 