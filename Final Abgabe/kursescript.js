
class ViewController {

    constructor() {
        //erzeugt ein Ajax Objekt
        //this.aja = new Ajax();

    }
    //wird bei aufruf der Seite ausgeführt
    initialiseView() {
        //Listener auf den Email-bestell Button setzen
        this.bestellbut = document.getElementById("bestellen");
        this.bestellbut.addEventListener("click", function () {

            emailsend();
        });
        //die lese Methode des Ajax Objektes aufrufen
        lesen();
        }
    }



function lesen() {
    //XMLHttpRequest Objekt erzeugen (evtl. ActiveXObjekt um so kompatibel wie möglich zu sein)
    var request;

    try {
        // Opera 8.0+, Firefox, Safari
        request = new XMLHttpRequest();
    } catch (e) {
        // Internet Explorer
        try {
            request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                alert("Your browser broke!");
                return false;
            }
        }
    }
// Post Anfrage öffnen
    request.open("POST", "ajax.php", true);

// Anfrage senden
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send('read');    // calls the send() method with datas as parameter

//die zurückgegebenen Daten an die Funktion createKursefromArray weitergeben, um die Kurse zu erstellen
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            console.log(JSON.parse(request.responseText));

            createKursefromArray(JSON.parse(request.responseText));

        }
    }
}


function emailsend() {

    //XMLHttpRequest Objekt erzeugen (evtl. ActiveXObjekt um so kompatibel wie möglich zu sein)
    var request;

    try {
        // Opera 8.0+, Firefox, Safari
        request = new XMLHttpRequest();
    } catch (e) {
        // Internet Explorer
        try {
            request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                alert("Your browser broke!");
                return false;
            }
        }
    }
// Post Anfrage öffnen
    request.open("POST", "ajax.php", true);

// Email Adresse schicken
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(`email=${document.querySelector('.NewsletterEmail').value}`);    // calls the send() method with datas as parameter

//Bei erfolgreicher Sendung die Anzeige ändern
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            console.log(request.responseText);
            document.querySelector(".Newsletter").classList.toggle("hidden");
            document.querySelector(".Danke").classList.toggle("hidden");
            return;

        }
    }
}


//aus dem erhaltenen 2D Array Die Kurse in das Dokument einfügen
function createKursefromArray(allekurse) {

    //Importiere Kurs Template
	
    var temp = document.getElementsByTagName("template")[0];
    var item = temp.content.querySelector("#kurs");


    //Für jeden Kurs in der Datenbank die Inhalte ändern und an das richtige Div anhängen
    for (var i = 0; i < allekurse.length; i++) {
	//console.log(allekurse[i]["Name"]);
        console.log(allekurse[i]["Kursname"]);
	console.log(allekurse[i]["Monat"]);
	console.log(allekurse[i]["Tag"]);
	console.log(allekurse[i]["Standort"]);
	console.log(allekurse[i]["Preis"]);
	console.log(allekurse[i]["special"]);
	console.log(allekurse[i]["Beschreibung"]);

        //Verändere Inhalte im Template

        //Das kurs div importieren
        var a = document.importNode(item, true);

        //die Id's so setzen, das das richtige Collapsible/Modal geöffnet wird und nicht alle auf einmal angesprochen werden
        a.querySelector("#demo").id = `demo${i}`;
        a.querySelector("#myModal").id = `myModal${i}`;

        a.querySelector("#buchenButton").setAttribute("data-target",`#myModal${i}`);
        a.querySelector("#buchenButton").id = `buchenButton${i}`;

        //jeden 2. Button farblich ändern
        if (i%2 != 0) {

            a.querySelector("#demobutton").classList.toggle("blackbutton");
        }
        a.querySelector(`#demobutton`).setAttribute("data-target",`#demo${i}`);
        a.querySelector("#demobutton").id = `button${i}`;




        //Inhalt ändern
        //Kursname und ein + Zeichen einfügen
        a.querySelector(`#button${i}`).innerHTML = allekurse[i]["Kursname"] + '<img src=\"icons8-plus-math-52.png\" class=\"plus\">';

        a.querySelector(".kursname").textContent = allekurse[i]["Kursname"];
        a.querySelector(".kurstext").innerHTML = allekurse[i]["Beschreibung"];
        a.querySelector("#preis").textContent = allekurse[i]["Preis"];
        a.querySelector(".Preis").textContent = allekurse[i]["Preis"];

        //Modal ändern
        a.querySelector("#kursName").value = allekurse[i]["Kursname"];
        a.querySelector("#standort").value = allekurse[i]["Standort"];
        a.querySelector(".modal-title").textContent = allekurse[i]["Kursname"];

        //die Termine ändern anhand der in der im JSON Format in der Datenbank gespeicherten Daten

        var dates = JSON.parse(allekurse[i]["Datum"]);
        console.log(dates.Dates);
        var Datum = '';
        for (var k = 0; k<dates.Dates.length;k++) {
            Datum += '<option value="'+dates.Dates[k] + '">' + dates.Dates[k] + '</option>';
        }
        console.log(Datum); 

        a.querySelector(".options").innerHTML = Datum;


        //Entscheidung in welches div der Kurs kommen soll, anhand der in der Datenbank gespeicherten Informationen
        if(allekurse[i]["special"] == 0) {
            var cont = document.getElementById("kurse");
        }
        else {
            var cont = document.getElementById("kurse2");
        }

        //Anhang des kurses in das div
        cont.appendChild(a);
    }
}



//Ajax
/*class Ajax {
    constructor() {

    }

    lesen() {
        //XMLHttpRequest Objekt erzeugen (evtl. ActiveXObjekt um so kompatibel wie möglich zu sein)
        var request;

        try {
            // Opera 8.0+, Firefox, Safari
            request = new XMLHttpRequest();
        } catch (e) {
            // Internet Explorer
            try {
                request = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    request = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {
                    alert("Your browser broke!");
                    return false;
                }
            }
        }
// Post Anfrage öffnen
        request.open("POST", "ajax.php", true);

// Anfrage senden
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send('read');    // calls the send() method with datas as parameter

//die zurückgegebenen Daten an die Funktion createKursefromArray weitergeben, um die Kurse zu erstellen
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                console.log(request.responseText);

                createKursefromArray(JSON.parse(request.responseText));

            }
        }
    }

}*/

//Es war zuerst die Idee mit Views zu arbeiten, allerdings haben wir uns schließlich doch für die traditionellere Methode entschieden
//Bei Aufruf der Seite wird eine Instanz des Viewcontrollers erzeugt und dessen Methode initialiseView ausgeführt
const instance = new ViewController();
window.onload = () => {
    instance.initialiseView();
}


