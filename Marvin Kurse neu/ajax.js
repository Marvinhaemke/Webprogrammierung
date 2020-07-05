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
            }
        }
    }
}
export {
    Ajax
}