<!doctype html>
<html lang="de">

<head>
    <meta charset="utf-8">
    <title>Redirect</title>

    <meta name="Nickels Witte" content="">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">


    <!--Styles -->
    <link rel="stylesheet" href="../css/redirect.css">

    <!-- Bootstrap -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <!--Set Favicon-->
    <link rel="shortcut icon" href="../img/favicon.ico">


</head>

<body>
<div class="rotate-container text-center">

    <?php
    //The rapla link
    $raplaLink = "http://193.196.6.13/rapla?page=calendar&user=Schmidt";
    //Get the courses from the url
    $course = "";
    if (isset($_GET['course'])) {
        $course = "Plan" . $_GET['course'];
    } else {
        echo "<div class='rotate'>
                   <h1>You did not provide a course</h1>
                   <h1 >Go <a href='dhbw-plans.html'>HOME</a></h1>
              </div>";
        return;
    }
    //Get the current date
    $date = date("Y-m-d");
    //Go to the next working day
    if (date("d") == "Sat") {
        $date = date('Y-m-d', strtotime($date . ' + 2 days'));
    } else if (date("d") == "Sun") {
        $date = date('Y-m-d', strtotime($date . ' + 1 days'));
    }
    //Create the link
    $raplaLink .= "&file=" . $course;
    $raplaLink .= "&year=" . explode("-", $date)[0];
    $raplaLink .= "&month=" . explode("-", $date)[1];
    $raplaLink .= "&day=" . explode("-", $date)[2];
    //Relocate
    header('Location: ' . $raplaLink);
    ?>
</div>
</body>

</html>