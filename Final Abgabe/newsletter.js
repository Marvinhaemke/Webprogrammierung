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

var bestellbut = document.getElementById("bestellen");
bestellbut.addEventListener("click", function () {

    emailsend();
});