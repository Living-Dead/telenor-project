const XHTTP = new XMLHttpRequest();
XHTTP.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        showLastBuildDateWithXPATH(XHTTP.responseXML);
        showTitleWithXPATH(XHTTP.responseXML);
    }
};
XHTTP.open(
    'GET',
    'https://index.hu/24ora/rss/',
    true
);
XHTTP.send();

function showLastBuildDateWithXPATH(xml) {
    let txt = '';
    path = '/rss/channel/lastBuildDate';
    document.getElementById('xpath').innerHTML = path;

    if (xml.evaluate) {
        let nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
        let result = nodes.iterateNext();
        while (result) {
            txt += result.childNodes[0].nodeValue + '<br>';
            result = nodes.iterateNext();
        }
        // Code For Internet Explorer
    } else if (window.ActiveXObject || XHTTP.responseType == 'msxml-document') {
        xml.setProperty('SelectionLanguage', 'XPath');
        nodes = xml.selectNodes(path);
        for (i = 0; i < nodes.length; i++) {
            txt += nodes[i].childNodes[0].nodeValue + '<br>';
        }
    }
    document.getElementById('lastBuildDate').innerHTML = txt;
}

function showTitleWithXPATH(xml) {
    let txt = '';
    path = '/rss/channel/item/title';

    if (xml.evaluate) {
        let nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
        let result = nodes.iterateNext();
        while (result) {
            txt += '<span class="title">' + result.childNodes[0].nodeValue + '<span><br>';
            result = nodes.iterateNext();
        }
        // Code For Internet Explorer
    } else if (window.ActiveXObject || XHTTP.responseType == 'msxml-document') {
        xml.setProperty('SelectionLanguage', 'XPath');
        nodes = xml.selectNodes(path);
        for (i = 0; i < nodes.length; i++) {
            txt += nodes[i].childNodes[0].nodeValue + '<br>';
        }
    }
    document.getElementById('title').innerHTML = txt;
}