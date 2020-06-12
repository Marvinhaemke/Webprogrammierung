//import  {Ajax} from "ajax.js";

class ViewController {

    constructor() {
        this.aja = new Ajax();

    }

    initialiseView() {
        /*this.modalbut = document.getElementsByClassName("buchenbut");

        for (this.i = 0; this.i < this.modalbut.length; this.i++) {
            this.modalbut[this.i].addEventListener("click", function() {
                createKalendar();
                createForm();
            });
        }*/

        this.aja.lesen();

        //createKurse();

    }

}
/*function createKalendar() {
    var cont = document.getElementById("kalcont");
    if (cont.querySelector(".row") == null) {
        var temp = document.getElementsByTagName("template")[0];
        var item = temp.content.querySelector(".row");
        var a = document.importNode(item, true);




        cont.appendChild(a);
    }
}

function createForm() {
    var cont = document.getElementById("modal");
    if (cont.querySelector(".form") == null) {
        var temp = document.getElementsByTagName("template")[1];
        var item = temp.content.querySelector(".form");
        var a = document.importNode(item, true);

        cont.appendChild(a);
    }*/

/*function createKurse() {

    //Importiere Kurs Template
    var cont = document.getElementById("kurse");
    var temp = document.getElementsByTagName("template")[0];
    var item = temp.content.querySelector("#kurs");


    //Wie oft?
    for (var i = 0; i < 4; i++) {
        //Verändere Inhalte im Template
        var a = document.importNode(item, true);

        a.querySelector("#demo").id = `demo${i}`;
        a.querySelector("#myModal").id = `myModal${i}`;

        a.querySelector("#buchenButton").setAttribute("data-target",`#myModal${i}`);
        a.querySelector("#buchenButton").id = `buchenButton${i}`;

        a.querySelector(`#demobutton`).setAttribute("data-target",`#demo${i}`);
        a.querySelector("#demobutton").id = `button${i}`;

        //Inhalt ändern
        a.querySelector(`#button${i}`).textContent = "Weihnachtsfeier";
        a.querySelector(".kursname").textContent = "Weihnachtsfeier";
        a.querySelector(".kurstext").textContent = "Investition: 100€";

        a.querySelectorAll("td")[22].classList.add("btn-primary");
        a.querySelectorAll("td")[22].innerHTML = "<strong>20</strong>"

        cont.appendChild(a);
    }

}*/

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

        a.querySelector(`#demobutton`).setAttribute("data-target",`#demo${i}`);
        a.querySelector("#demobutton").id = `button${i}`;

        //Inhalt ändern
        a.querySelector(`#button${i}`).textContent = allekurse[i]["Kursname"];
        a.querySelector(".kursname").textContent = allekurse[i]["Kursname"];
        a.querySelector(".kurstext").textContent = allekurse[i]["Beschreibung"];

        a.querySelectorAll("td")[22].classList.add("btn-primary");
        a.querySelectorAll("td")[22].innerHTML = "<strong>20</strong>";

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
                console.log(JSON.parse(request.responseText));

                createKursefromArray(JSON.parse(request.responseText));

            }
        }
    }
}

const instance = new ViewController();
window.onload = () => {
    instance.initialiseView();
}


