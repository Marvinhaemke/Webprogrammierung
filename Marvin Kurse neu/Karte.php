<!DOCTYPE html>
<html>
<head>
    <title>Simple Map</title>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
              integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
        <link rel="stylesheet" media="screen" href="https://fontlibrary.org/face/aileron" type="text/css"/>
        <link rel="stylesheet" href="style.css">

    <link rel="stylesheet" type="text/css" href="kartenstyle.css" />
    <script src="kartenscript.js"></script>
</head>
<body>
<div class="container header" style="margin-bottom: 4em;">
    <div class="row">

        <div class="col-sm-3">
            <a href="startseite.html">
                <img src="logofull.jpg">
            </a>
        </div>
        <div class="col-sm-3">
            <a href="ueber_uns/"  ><h3 class="nav">Über uns</h3></a>
        </div>
        <div class="col-sm-3">
            <a href="ausbildung/" ><h3 class="nav kurse">Kurse</h3></a>
        </div>
        <div class="col-sm-3">
            <a href="kontakt/" ><h3 class="nav">Kontakt</h3></a>
        </div>
    </div>
</div>

<h1 style="margin-bottom: 2em;"> Vielen Dank für ihre Bestellung!<br><br> Die Buchung des Kurses <?php echo $_POST['Kurs'] ?> wurde erfolgreich durchgeführt.</h1>
<h3 style="margin-bottom: 1em"> So finden sie uns:</h3>

<div id="map" ></div>
<div>

    <?php echo ('<input id="address" type="hidden" value="'. $_POST['Stadt']. ', '. $_POST['Strasse']. ' '. $_POST['Hausnummer'].'">
                 <input id="standort" type="hidden" value="'. $_POST['Standort'].'">')
    ?>

</div>

<div class="Newsbestellen">
    <div class="Newsletter">
        <h2>Newsletter bestellen?</h2>
        <label for="EmailNewsletter">Email:</label>
        <input type="text" placeholder="Email-Adresse" id="EmailNewsletter" class="NewsletterEmail">
        <button type="button" class="btn btn-default" id="bestellen">Bestellen</button>
    </div>
    <h2 class="Danke hidden">Vielen Dank!</h2>
</div>


<div class="footer">
    <div>
        <h2>EXPLORERS' AKADEMIE</h2>
        <h3>Dr. Frank Görmar</h3>

    </div>
    <div>
        <h2>SOCIAL</h2>
        <a href="https://de-de.facebook.com/explorers.akademie"><h3>Facebook -> </h3></a>
        <h3>Tel. +49 69/ 48005636</h3>
        <h3>Skype: frank.goermar</h3>
        <h3>E-Mail: info@explorers-akademie.de</h3>
    </div>
    <div>
        <h2>AUTHORS</h2>
        <h3> BY M.HAEMKE, <br> B.BEHRENS, & <br> P.WAGNER - GÖRMAR</h3>

        </div>
    </div>


 <script
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDT3lbYbpIzldP-cvC_TRUiEtr-AB_Quvk&callback=initMap"
            async defer
    ></script>

</body>
</html>
<?php
    require("config.php");

    class Database {
        private $servername;
        private $username;
        private $password;
        private $db;
        public $conn;


    function __construct($servername, $username, $password, $db) {
        $this->servername = $servername;
        $this->username = $username;
        $this->password = $password;
        $this->db = $db;
    }

     function connect() {
        //Verbindung herstellen

        $this->conn = new mysqli($this->servername, $this->username, $this->password, $this->db);

        //Verbindung überprüfen
        if ($this->conn->connect_error) {
          die("Verbindung fehlgeschlagen: " . $this->conn->connect_error);
        }
        return;
    }

    function buchen($vorname, $nachname, $Stadt, $PLZ, $Strasse, $Hausnummer, $Kurs) {
        $sql = "INSERT INTO buchen (id, vorname, nachname, stadt, plz, strasse, hausnummer, kurs) VALUES (NULL, '$vorname', '$nachname', '$Stadt', '$PLZ', '$Strasse', '$Hausnummer', '$Kurs')";
            if ($this->conn->query($sql) === TRUE) {

            } else {
              echo "Error: " . $sql . "<br>" . $this->conn->error;
            }
            return;
    }
    }

    $Database = new Database($servername, $username, $password, $db);

    //Methode zum herstellen der Verbindung aufrufen
    $Database->connect();

    //je nach über POST oder GET übertragenen daten die dazugehörigen Methoden aufrufen und relevante Werte übergeben

    $Database->buchen($_POST["Vorname"], $_POST["Nachname"],$_POST["Stadt"],$_POST["PLZ"],$_POST["Strasse"],$_POST["Hausnummer"],$_POST["Kurs"]);
    $Database->conn->close();



?>
