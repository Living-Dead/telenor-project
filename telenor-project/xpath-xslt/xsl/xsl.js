function loadXMLDoc(filename) {
    if (window.ActiveXObject) {
        xhttp = new ActiveXObject('Msxml2.XMLHTTP');
    } else {
        xhttp = new XMLHttpRequest();
    }

    xhttp.open('GET', filename, false);

    try { xhttp.responseType = "msxml-document" } catch (err) {} // Helping IE11
    xhttp.send('');
    return xhttp.responseXML;
}

function displayResult() {
    xml = loadXMLDoc('https://index.hu/24ora/rss/');
    xsl = loadXMLDoc('https://cors-anywhere.herokuapp.com/http://xslformat.uw.hu/indexrssfeedxsl.xsl');
    // code for IE
    if (window.ActiveXObject || xhttp.responseType == "msxml-document") {
        ex = xml.transformNode(xsl);
        document.getElementById('xsl').innerHTML = ex;
    }
    // code for Chrome, Firefox, Opera, etc.
    else if (document.implementation && document.implementation.createDocument) {
        xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xsl);
        resultDocument = xsltProcessor.transformToFragment(xml, document);
        document.getElementById('xsl').appendChild(resultDocument);
    }
}