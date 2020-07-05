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
    var cont = document.getElementById("kurse");
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

        /*var modalbut = a.querySelector("#buchen");
        modalbut.addEventListener("click", function() {
            window.location.href = "Karte.html/?adresse=Nienburg";
        });*/


        //Inhalt ändern
        a.querySelector(`#button${i}`).innerHTML = allekurse[i]["Kursname"] + '<img src=\"icons8-plus-math-52.png\" class=\"plus\">';
        a.querySelector(".kursname").textContent = allekurse[i]["Kursname"];
        a.querySelector(".kurstext").innerHTML = allekurse[i]["Beschreibung"];
        a.querySelector("#preis").textContent = allekurse[i]["Preis"];

        kalendar(allekurse[i]["Monat"], a);
        a.querySelector("#monthYear").textContent = allekurse[i]["Monat"];

        a.querySelector("#kursName").value = allekurse[i]["Kursname"];
        a.querySelector("#standort").value = allekurse[i]["Standort"];

        a.querySelectorAll("td")[22].classList.add("btn-primary");
        a.querySelectorAll("td")[22].innerHTML = "<strong>20</strong>";




        //Form Submit

        cont.appendChild(a);
    }
}

function kalendar(Monat, a) {
    switch (Monat) {
        case "Februar": {
            for (var i=0;i<31;i++) {
                switch (i) {
                    case 28:
                        a.querySelectorAll("td")[i].innerText = 1;
                    case 29:
                        a.querySelectorAll("td")[i].innerText = 2;
                    case 30:
                        a.querySelectorAll("td")[i].innerText = 3;
                    default:
                        a.querySelectorAll("td")[i].innerText = i + 1;
                }
            }
        }
        case "April": {
            for (var i=0;i<31;i++) {
                switch (i) {
                    case 30:
                        a.querySelectorAll("td")[i].innerText = 1;
                    default:
                        a.querySelectorAll("td")[i].innerText = i + 1;
                }
            }
        }
        case "Juni": {
            for (var i=0;i<31;i++) {
                switch (i) {
                    case 30:
                        a.querySelectorAll("td")[i].innerText = 1;
                    default:
                        a.querySelectorAll("td")[i].innerText = i + 1;
                }
            }
        }
        case "September": {
            for (var i=0;i<31;i++) {
                switch (i) {
                    case 30:
                        a.querySelectorAll("td")[i].innerText = 1;
                    default:
                        a.querySelectorAll("td")[i].innerText = i + 1;
                }
            }
        }
        case "November": {
            for (var i=0;i<31;i++) {
                switch (i) {
                    case 30:
                        a.querySelectorAll("td")[i].innerText = 1;
                    default:
                        a.querySelectorAll("td")[i].innerText = i + 1;
                }
            }
        }
        default: {
            for (var i=0;i<31;i++) {

                a.querySelectorAll("td")[i].innerText = i + 1;
            }
        }
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


