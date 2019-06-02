function tokenize(string) {
    return string.split(" ");
}

function ucFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function nameFormat(string) {
    return tokenize(string).map(ucFirst).join(" ");
}

function displayFormat() {
    let fname = document.getElementById("fname");
    document.getElementById("nameUcFirstFormat").innerHTML = nameFormat(fname.value);
    document.getElementById("simpleSolution").innerHTML = fname.value;
}