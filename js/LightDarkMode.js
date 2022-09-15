var mode = undefined;

function toggleMode() {
    if (document.getElementById("modesheet-code")) {
        var stylesheetCode = document.getElementById("modesheet-code");
        stylesheetCode.parentNode.removeChild(stylesheetCode);
    }
    if (document.getElementById("modesheet")) {
        var stylesheet = document.getElementById("modesheet");
        stylesheet.parentNode.removeChild(stylesheet);
    }
    if (mode) darkMode();
    else lightMode();
}

function darkMode() {
    if (!mode) return;
    mode = !mode;
    if (document.getElementById("toggleMode")) {
        var img = document.getElementById("toggleMode");
        img.setAttribute("src", "img/lightMode.svg");
    }
    let stylesheetCode = document.createElement("link");
    stylesheetCode.setAttribute("id", "modesheet-code");
    stylesheetCode.href = "./lib/highlight/styles/github-dark-dimmed.min.css";
    stylesheetCode.type = "text/css";
    stylesheetCode.rel = "stylesheet";
    document.head.append(stylesheetCode);

    let stylesheet = document.createElement("link");
    stylesheet.setAttribute("id", "modesheet");
    stylesheet.href = "./css/DarkMode.css";
    stylesheet.type = "text/css";
    stylesheet.rel = "stylesheet";
    document.head.append(stylesheet);
}

function lightMode() {
    if (mode) return;
    mode = !mode;
    if (document.getElementById("toggleMode")) {
        var img = document.getElementById("toggleMode");
        img.setAttribute("src", "img/darkMode.svg");
    }
    let stylesheetCode = document.createElement("link");
    stylesheetCode.setAttribute("id", "modesheet-code");
    stylesheetCode.href = "./lib/highlight/styles/github.min.css";
    stylesheetCode.type = "text/css";
    stylesheetCode.rel = "stylesheet";
    document.head.append(stylesheetCode);

    let stylesheet = document.createElement("link");
    stylesheet.setAttribute("id", "modesheet");
    stylesheet.href = "./css/LightMode.css";
    stylesheet.type = "text/css";
    stylesheet.rel = "stylesheet";
    document.head.append(stylesheet);
}