<?php
if (isset($_GET["entry"])) {
    $entry = $_GET["entry"];
} else {
    $entry = "qdblog/posts/index.html";
}
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>potch dot me!</title>
    <link rel="stylesheet/less" type="text/css" href="media/reset.less">
    <link rel="stylesheet/less" type="text/css" href="media/base.less">
    <link rel="stylesheet/less" type="text/css" href="media/style.less">
    <script src="media/less-1.1.3.min.js" type="text/javascript"></script>
    <script>
      less.watch();
    </script>
  </head>
  <body>
    <header>
      <h1>potch.me</h1>
    </header>
    <?php include $entry; ?>
    <footer>
      Matt "Potch" Claypotch is a web developer at Mozilla, geek,
      and all-around swell guy who currently resides in Palo Alto,
      California.
    </footer>
    <script src="media/jquery-1.6.2.js"></script>
    <script type="text/javascript">
      var _gauges = _gauges || [];
      (function() {
        var t   = document.createElement('script');
        t.type  = 'text/javascript';
        t.async = true;
        t.id    = 'gauges-tracker';
        t.setAttribute('data-site-id', '4f408abc844d524b45000062');
        t.src = '//secure.gaug.es/track.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(t, s);
      })();
    </script>
  </body>
</html>
