import { useEffect } from 'react';
function Results() {
    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let score = urlParams.get('score');
        let wpm = urlParams.get('wpm');
        let accuracy = urlParams.get('accuracy');
        let time = urlParams.get('time');
        let quote = urlParams.get('quote');
        let difficulty = urlParams.get('difficulty');
        let length = urlParams.get('length');
        let category = urlParams.get('category');

        // https://api.unsplash.com/search/photos/?client_id=ZihFNsFacCnVOhVA24DdVwq2z-DwXK0Pz9D0czKg79Q&query=Motivational
        // .results.urls.full

        async function GetImage() {
            if (category == null) {
                return;
            }
            let url = "https://api.unsplash.com/search/photos/?client_id=ZihFNsFacCnVOhVA24DdVwq2z-DwXK0Pz9D0czKg79Q&query=" + category
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('HTTP Error: ' + response.status);
                const data = await response.json();
                console.log(data);
                let min = 0
                let max = data.results.length
                let chosen = Math.floor(Math.random() * (max - min + 1)) + min
                document.getElementById("quoteImage").src = data.results[chosen].urls.full
            } catch (error) {
                console.error('Failed to fetch:', error);
                //GetQuote();
            }
        }

        document.getElementById("statScore").innerHTML = score;
        document.getElementById("statWpm").innerHTML = wpm;
        document.getElementById("statAccuracy").innerHTML = accuracy/10 + "%";
        document.getElementById("statTime").innerHTML = Math.round(time / 100)/10 + "s";
        document.getElementById("quoteText").innerHTML = quote;
        document.getElementById("quoteImage").alt = category;

        // if the api fails, default to backup image
        document.getElementById("quoteImage").src = `/backupimages/${category}.jpg`;
        GetImage()

        let nextRound = "/typing?";
        if (difficulty) {
            nextRound = `${nextRound}difficulty=${difficulty}&`;
        }
        if (length) {
            nextRound = `${nextRound}length=${length}&`;
        }
        if (category) {
            nextRound = `${nextRound}category=${category}&`;
        }
        console.log(nextRound);
        document.getElementById("nextRoundBtn").href = nextRound;
    }, [])

    return (
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>QuoteSprint – Results</title>
        <link rel="stylesheet" href="style.css" />
    </head>

    <body class="page-results">

    {/* <!-- ─── NAVBAR ─────────────────────────────────────────────────── --> */}
    <header class="navbar">
        <a href="/" class="navbar__logo" aria-label="QuoteSprint home">
        <img src="/quotesprint.png" alt="QuoteSprint logo" class="navbar__logo-img" />
        </a>

        <button class="navbar__hamburger" id="hamburgerBtn" aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
        </button>

        <nav class="navbar__nav" id="mainNav" aria-label="Main navigation">
        <ul class="navbar__links">
            <li><a href="/" class="navbar__link">Home</a></li>
            <li><a href="results.html" class="navbar__link navbar__link--active">Scores</a></li>
            <li><a href="#" class="navbar__link">About</a></li>
        </ul>
        <a href="/typing" class="btn btn--primary navbar__cta">PLAY</a>
        </nav>
    </header>
    {/* <!-- ─────────────────────────────────────────────────────────────── --> */}

    {/* <!-- ─── MAIN CONTENT ─────────────────────────────────────────────── --> */}
    <main class="results-main">

        <h1 class="results-main__heading">Results</h1>

        <div class="results-layout">


        {/* <!-- Stats --> */}
        <aside class="results-stats" aria-label="Your round statistics">
            <dl class="results-stats__list">

            <div class="results-stats__row">
                <dt class="results-stats__label">Score:</dt>
                <dd class="results-stats__value results-stats__value--highlight" id="statScore">890</dd>
            </div>

            <div class="results-stats__row">
                <dt class="results-stats__label">WPM:</dt>
                <dd class="results-stats__value results-stats__value--highlight" id="statWpm">72</dd>
            </div>

            <div class="results-stats__row">
                <dt class="results-stats__label">Accuracy:</dt>
                <dd class="results-stats__value results-stats__value--highlight" id="statAccuracy">92%</dd>
            </div>

            <div class="results-stats__row">
                <dt class="results-stats__label">Time:</dt>
                <dd class="results-stats__value results-stats__value--highlight" id="statTime">45s</dd>
            </div>

            </dl>
        </aside>

        {/* <!-- Image + quote --> */}
        <section class="results-quote-card" aria-label="Quote and image">
            {/* <!--
            API HOOK: The API person should set:
                1. The background image via  results-quote-card__image's `src`
                2. The quote text in  results-quote-card__text

            The JS below reads quoteText and imageUrl from sessionStorage
            and populates both automatically.
            --> */}
            <div class="results-quote-card__image-wrapper">
            <img class="results-quote-card__image" id="quoteImage" src="" alt="Sailboat" />
            
            <blockquote class="results-quote-card__text" id="quoteText">
                “I can’t change the direction of the wind, but I can adjust my sails to always reach my destination.”
            </blockquote>
            </div>
        </section>

        {/* <!-- Buttons --> */}
        <div class="results-actions">
            <a href="/typing" class="btn btn--primary btn--wide" id="nextRoundBtn">
            Next Round
            </a>

            <a href="/" class="btn btn--primary btn--wide" id="changeSettingsBtn">
            Change Settings
            </a>
        </div>

        </div>

    </main>
    {/* <!-- ─────────────────────────────────────────────────────────────── --> */}

    <script>

    </script>

    </body>

    </html>);
}

export default Results