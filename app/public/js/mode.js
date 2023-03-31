var mode = "light";

(function () {
    const COLORS = {
        light: {
            text: "#000000",
            background: "#DDDDDD",
            primary: "#05A3A1",
            secondary: "#CCEFEF",
            codeback: "#EEEEEE",
            codeline: "#77AAAA",
            codetext: "#24292E"
        },
        dark: {
            text: "#FFFFFF",
            background: "#383842",
            primary: "#05A3A1",
            secondary: "#355252",
            codeback: "#1E1E1E",
            codeline: "#77AAAA",
            codetext: "#DDDDCC"
        }
    };

    function getInitialColorMode() {
        const persistedColorPreference = window.localStorage.getItem('color-mode');
        const hasPersistedPreference = typeof persistedColorPreference === 'string';
        // If the user has explicitly chosen light or dark,
        // let's use it. Otherwise, this value will be null.
        if (hasPersistedPreference) {
            return persistedColorPreference;
        }
        // If they haven't been explicit, let's check the media
        // query
        const mql = window.matchMedia('(prefers-color-scheme: dark)');
        const hasMediaQueryPreference = typeof mql.matches === 'boolean';
        if (hasMediaQueryPreference) {
            return mql.matches ? 'dark' : 'light';
        }
        // If they are using a browser/OS that doesn't support
        // color themes, let's default to 'light'.
        return 'light';
    }
    mode = getInitialColorMode();
    const root = document.documentElement;
    var comments
    function findComments() {
        comments = root.querySelector("#giscus-script")
        if (comments !== null) console.log(comments.getAttribute("data-theme"));
        if (comments !== null) {
            comments.setAttribute("data-theme",
                mode === 'light'
                    ? 'light'
                    : 'dark-dimmed');
        }
    }
    findComments();
    function setAttributesFromMode() {
        root.style.setProperty(
            '--color-text',
            mode === 'light'
                ? COLORS.light.text
                : COLORS.dark.text
        );
        root.style.setProperty(
            '--color-background',
            mode === 'light'
                ? COLORS.light.background
                : COLORS.dark.background
        );
        root.style.setProperty(
            '--color-primary',
            mode === 'light'
                ? COLORS.light.primary
                : COLORS.dark.primary
        );
        root.style.setProperty(
            '--color-secondary',
            mode === 'light'
                ? COLORS.light.secondary
                : COLORS.dark.secondary
        );
        root.style.setProperty(
            '--color-codeback',
            mode === 'light'
                ? COLORS.light.codeback
                : COLORS.dark.codeback
        );
        root.style.setProperty(
            '--color-codeline',
            mode === 'light'
                ? COLORS.light.codeline
                : COLORS.dark.codeline
        );
        root.style.setProperty(
            '--color-codetext',
            mode === 'light'
                ? COLORS.light.codetext
                : COLORS.dark.codetext
        );
        root.setAttribute("mode", mode);
        if (comments !== null) {
            commsDiv = root.querySelector(".giscus");
            commsDivParent = commsDiv.parentElement;
            commsDivParent.removeChild(commsDiv);
            commsDivParent.appendChild(commsDiv.cloneNode(false));
            newComments = comments.cloneNode(false);
            newComments.setAttribute("data-theme",
                mode === 'light'
                    ? 'light'
                    : 'dark-dimmed');
            root.querySelector("head").removeChild(comments);
            root.querySelector("head").appendChild(newComments);
            comments = newComments;
        }

    }
    setAttributesFromMode();

    function toggleMode(mutationList, observer) {
        const root = mutationList[0].target;
        if (root.classList.contains("toggle-mode")) {
            root.classList.remove("toggle-mode");
            if (mode === "light") mode = "dark";
            else mode = "light";
            window.localStorage.setItem("color-mode", mode);

            setAttributesFromMode();
        }
        
    }

    const options = { attributes: true };
    const mutObserver = new MutationObserver(toggleMode);
    mutObserver.observe(root, options);
    function handleMessage(event) {
        if (event.origin !== 'https://giscus.app') return;
        if (!(typeof event.data === 'object' && event.data.giscus)) return;

        const giscusData = event.data.giscus;
        findComments();
    }
    window.addEventListener('message', handleMessage);
})()

