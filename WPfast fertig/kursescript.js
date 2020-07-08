//import  {Ajax} from "ajax.js";

class ViewController {

    constructor() {
        this.aja = new Ajax();

    }

    initialiseView() {
        this.bestellbut = document.getElementById("bestellen");
        this.bestellbut.addEventListener("click", function () {
            //console.log("Hi");
            emailsend();
        });
        this.aja.lesen();
        }
    }





function emailsend() {
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

// Anfrage senden, auf die das PHP Script das Gästebuch zurückgibt
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(`email=${document.querySelector('.NewsletterEmail').value}`);    // calls the send() method with datas as parameter

//die zurückgegebene Liste in Html Listenelemente umwandeln
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            console.log(request.responseText);
            document.querySelector(".Newsletter").classList.toggle("hidden");
            document.querySelector(".Danke").classList.toggle("hidden");
            return;

        }
    }
}


function createKursefromArray(allekurse) {

    //Importiere Kurs Template

    var temp = document.getElementsByTagName("template")[0];
    var item = temp.content.querySelector("#kurs");


    //Wie oft?
    for (var i = 0; i < allekurse.length; i++) {
        console.log(allekurse[i]["Kursname"]);
        //Verändere Inhalte im Template
        var a = document.importNode(item, true);

        a.querySelector("#demo").id = `demo${i}`;
        a.querySelector("#myModal").id = `myModal${i}`;

        a.querySelector("#buchenButton").setAttribute("data-target",`#myModal${i}`);
        a.querySelector("#buchenButton").id = `buchenButton${i}`;
        if (i%2 != 0) {
            //a.querySelector("#demobutton").style = "background-color: rgba(61,104,112,.4); color:black;";
            a.querySelector("#demobutton").classList.toggle("blackbutton");
        }
        a.querySelector(`#demobutton`).setAttribute("data-target",`#demo${i}`);
        a.querySelector("#demobutton").id = `button${i}`;




        //Inhalt ändern
        a.querySelector(`#button${i}`).innerHTML = allekurse[i]["Kursname"] + '<img src=\"icons8-plus-math-52.png\" class=\"plus\">';
        a.querySelector(".kursname").textContent = allekurse[i]["Kursname"];
        a.querySelector(".kurstext").innerHTML = allekurse[i]["Beschreibung"];
        a.querySelector("#preis").textContent = allekurse[i]["Preis"];
        a.querySelector(".Preis").textContent = allekurse[i]["Preis"];


        a.querySelector("#kursName").value = allekurse[i]["Kursname"];
        a.querySelector("#standort").value = allekurse[i]["Standort"];
        a.querySelector(".modal-title").textContent = allekurse[i]["Kursname"];

        var dates = JSON.parse(allekurse[i]["Datum"]);
        console.log(dates.Dates);
        var Datum = '';
        for (var k = 0; k<dates.Dates.length;k++) {
            Datum += '<option value="'+dates.Dates[k] + '">' + dates.Dates[k] + '</option>';
        }
        console.log(Datum);

        a.querySelector(".options").innerHTML = Datum;



        if(allekurse[i]["special"] == 0) {
            var cont = document.getElementById("kurse");
        }
        else {
            var cont = document.getElementById("kurse2");
        }

        cont.appendChild(a);
    }
}



//Ajax Element erstellen
class Ajax {
    constructor() {

    }

    lesen() {
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

// Anfrage senden, auf die das PHP Script das Gästebuch zurückgibt
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send('read');    // calls the send() method with datas as parameter

//die zurückgegebene Liste in Html Listenelemente umwandeln
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                console.log(request.responseText);

                createKursefromArray(JSON.parse(request.responseText));
                console.log("hi");

            }
        }
    }

}

const instance = new ViewController();
window.onload = () => {
    instance.initialiseView();
}


