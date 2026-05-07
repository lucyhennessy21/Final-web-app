import { data } from 'react-router-dom';
import './style.css';
import { useEffect } from 'react';
function Typing(data) {
    useEffect(() => {
        let typed = "";
        let quote = null;
        let finished = false;
        let startTime = null;
        let endTime = null;
        let timer = null
        let correct = 0;
        let wpm = null;

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let difficulty = urlParams.get('difficulty');
        let length = urlParams.get('length');
        let category = urlParams.get('category');

        document.getElementById("restartBtn").onclick = function() {
            window.location.href = window.location.href = window.location.pathname;
        };

        function Format() {
            if (quote == null) {
                document.getElementById("quoteDisplay").innerHTML = "Loading quote...";
                return;
            }
            let buffer = "";

            let typedBuffer = "<span>";
            let lastCorrect = null;
            correct = 0;
            // error checking
            for (let i = 0; i < typed.length; i++) {
                if (typed[i] == quote[i]) {
                    if (lastCorrect != true) {
                        typedBuffer = typedBuffer + '</span><span class="char char--correct">'
                    }
                    correct += 1;
                    typedBuffer = typedBuffer + typed[i]
                } else if (typed[i] != quote[i]) {
                    if (lastCorrect != false) {
                        typedBuffer = typedBuffer + '</span><span class="char char--incorrect">'
                    }
                    typedBuffer = typedBuffer + quote[i]
                }
            }
            buffer = typedBuffer;
            if (!finished) {
                buffer = buffer + `<span class="char char--cursor"></span>`;
                buffer = buffer + `<span class="char char--pending">${quote.slice(typed.length, quote.length)}</span>`
            }
            document.getElementById("quoteDisplay").innerHTML = buffer;
        }

        function ConvertTime(Time, Expanded) {
            // mins 2 digits?:seconds 2 digits:ms 3 digits
            let ms = Time % 1000;
            let seconds = Math.floor(Time/1000)%60;
            let minutes = Math.floor(Time/60000)
            if (seconds < 10) {
                seconds = `0${seconds}`
            }
            if (ms < 10) {
                ms = `00${ms}`
            } else if (ms < 100) {
                ms = `0${ms}`
            }
            if (!Expanded) {
                return `${minutes}:${seconds}`;
            } else {
                return `${minutes}:${seconds}:${ms}`;
            }
        }

        function UpdateTimer(expanded) {
            if (startTime == null) { return; }
            let time = Date.now();
            if (endTime) {
                time = endTime;
            }
            let calcTime = time - startTime
            document.getElementById("timerDisplay").innerHTML = ConvertTime(calcTime, expanded);
            
        }

        function UpdateWPM() {
            if (startTime == null) { return; }
            let time = Date.now();
            if (endTime) {
                time = endTime;
            }
            let calcTime = time - startTime
            document.getElementById("wpmDisplay").innerHTML = Math.round((correct/5) / ((calcTime/1000)/60))
        }

        function KeyPress(event) {
            if (quote == null) { return; }
            if (finished) { return; }

            if (event.code == "Backspace") {
                typed = typed.slice(0, typed.length-1);
            } else if (event.key.length > 1) { return; }
            else {
                typed = typed + event.key;
            }
            Format();
            if (!finished && typed[typed.length] == quote[quote.length] && typed.length >= quote.length) {
                finished = true;
                clearInterval(timer);
                clearInterval(wpm);
                endTime = Date.now();
                Format();
                UpdateTimer(true);
                UpdateWPM();
                document.removeEventListener("keydown", KeyPress);
                let totalTime = endTime-startTime
                let score = Math.max(Math.round((50000-totalTime)/50), 0) + (correct * 50) - ((correct-quote.length) * 10)
                let accuracy = Math.round((correct/quote.length)*1000)
                let wordTime = Math.round((correct/5) / ((totalTime/1000)/60))
                let redirect = `/result?wpm=${wordTime}&time=${endTime-startTime}&accuracy=${accuracy}&score=${score}&quote=${quote}`
                if (difficulty) {
                    redirect = `${redirect}&difficulty=${difficulty}`
                }
                if (length) {
                    redirect = `${redirect}&length=${length}`
                }
                if (category) {
                    redirect = `${redirect}&category=${category}`
                }
                document.getElementById("resultsBtn").hidden = false;
                document.getElementById("resultsBtn").onclick = function() {
                    window.location.href = redirect;
                };
            }
            if (startTime == null) {
                startTime = Date.now();
            }
        }

        // Categories:
        // Motivational: Motivational|Inspirational
        // Wisdom: Wisdom|Knowledge
        // Humor: Humorous (might have to remove due to lack of quotes)
        // Literature: Literature (lack of quotes)
        // Science: Technology|Science
        async function GetQuote() {
            let url = "https://api.quotable.io/quotes/random?"
            console.log(length);
            if (length == "short") {
                url = url + "maxLength=75"
            } else if (length == "medium") {
                url = url + "minLength=75&maxLength=150"
            } else if (length == "long") {
                url = url + "minLength=150"
            }
            if (category == "motivational") {
                url = url + "&tags=Motivational|Inspirational"
            } else if (length == "wisdom") {
                url = url + "&tags=Wisdom|Knowledge"
            } else if (length == "science") {
                url = url + "&tags=Technology|Science"
            }
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('HTTP Error: ' + response.status);
                const data = await response.json();
                console.log(data[0].content);
                quote = data[0].content;
                // remove em-dashes because you can't type those regularly
                quote.replaceAll("—", "-");
                Format();
            } catch (error) {
                console.error('Failed to fetch:', error);
                //GetQuote();
            }
        }

        timer = setInterval(UpdateTimer, 1000/30)
        wpm = setInterval(UpdateWPM, 1000)
        document.addEventListener("keydown", KeyPress);

        Format();

        GetQuote();
        return () => console.log("hi!");
    }, []);

    return (
    <html lang="en">
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>QuoteSprint – Typing Round</title>

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="style.css" />
    </head>
    <body class="page-typing">
    {/* <!-- ─── NAVBAR ─────────────────────────────────────────────────── --> */}
    <header class="navbar">
        <a href="/" class="navbar__logo" aria-label="QuoteSprint home">
        <img src="quotesprint.png" alt="QuoteSprint logo" class="navbar__logo-img" />
        </a>

        <button class="navbar__hamburger" id="hamburgerBtn" aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
        </button>

        <nav class="navbar__nav" id="mainNav" aria-label="Main navigation">
        <ul class="navbar__links">
            <li><a href="/" class="navbar__link">Home</a></li>
            <li><a href="#"         class="navbar__link">Scores</a></li>
            <li><a href="#"         class="navbar__link">About</a></li>
        </ul>
        <a href="/typing" class="btn btn--primary navbar__cta navbar__cta--active">PLAY</a>
        </nav>
    </header>
    {/* <!-- ─────────────────────────────────────────────────────────────── --> */}

    {/* <!-- ─── MAIN CONTENT ─────────────────────────────────────────────── --> */}
    <main class="typing-main">

        <h1 class="typing-main__heading">Typing Round</h1>

        {/* <!-- Live stats bar --> */}
        <div class="typing-stats" role="status" aria-live="polite" aria-label="Live round stats">
        <div class="typing-stats__item typing-stats__item--timer">
            <span class="typing-stats__value" id="timerDisplay">00:00</span>
        </div>
        <div class="typing-stats__divider" aria-hidden="true"></div>
        <div class="typing-stats__item">
            <span class="typing-stats__label">WPM</span>
        </div>
        <div class="typing-stats__divider" aria-hidden="true"></div>
        <div class="typing-stats__item">
            <span class="typing-stats__value" id="wpmDisplay">0</span>
        </div>
        </div>

        {/* <!-- Quote display area
            Each character is wrapped in a <span> by JS with one of three classes:
            .char--pending   = not yet typed (faded)
            .char--correct   = typed correctly (bright white)
            .char--incorrect = typed wrong (red/orange)
            .char--cursor    = the next character to type (blinking cursor)
        --> */}
        <section class="typing-arena" aria-label="Typing area">
        <div
            class="typing-arena__quote"
            id="quoteDisplay"
            autoFocus
        >
            <span class="char char--pending">Loading quote...</span>
           {/* <!--
            API HOOK: The API person should populate this div with
            <span> elements via JS before the round starts.
            Example of what JS will produce for each character:
                <span class="char char--pending">I</span>
                <span class="char char--pending"> </span>
                ...
            The JS below (renderQuote) handles this automatically
            once you pass it the quote string.
            --> */}
        </div>
        </section>

        {/* <!-- Action buttons --> */}
        <div class="typing-actions">
        <button class="btn btn--primary" id="restartBtn" type="button">Restart Round</button>
        {/* <!--
            The "Results" button is hidden until the round ends.
            JS adds class .typing-actions__results--visible to show it.
        --> */}
        <button class="btn btn--primary typing-actions__results" id="resultsBtn" type="button" hidden>
            Results
        </button>
        </div>

    </main>
    {/* <!-- ─────────────────────────────────────────────────────────────── --> */}
    </body>
    </html>);

}

export default Typing;