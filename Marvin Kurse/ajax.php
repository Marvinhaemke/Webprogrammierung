<?php
/*
EA3 Marvin Hämke
*/
require("config.php");
//Klasse Shoppingliste
class Ajax {
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

function lesen() {
    //MySql Anfrage
    $res = array();
    $i = 0;
    $sql = "select * from kurse";
    $result = mysqli_query($this->conn, $sql);
    while($row = mysqli_fetch_object($result)) {
        $res[$i] = $row;
        $i += 1;
    }
    //Listenelemente erzeugen
    echo json_encode($res);
    return;

}
}
//Shoppinglist Objekt erzeugen mit den Werten aus config.db.php
$Ajax = new Ajax($servername, $username, $password, $db);

//Methode zum herstellen der Verbindung aufrufen
$Ajax->connect();

//je nach über POST oder GET übertragenen daten die dazugehörigen Methoden aufrufen und relevante Werte übergeben
if (isset($_POST["read"])) {
    $Ajax->lesen();
}

?>