import './style.css';
import { useEffect } from 'react';
function Home() {
    useEffect(() => {
        document.getElementById("startBtn").onclick = function() {
            let Difficulty = document.getElementById("difficultySelect").value
            let Length = document.getElementById("lengthSelect").value
            let Category = document.getElementById("categorySelect").value
            window.location.href = `/typing?difficulty=${Difficulty}&length=${Length}&category=${Category}`;
        };
    }, [])

    return (
        <html lang="en">

        <head>  
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>QuoteSprint – Home</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link rel="stylesheet" href="style.css" />
        </head>

        <body class="page-home">

        {/* <!-- ─── NAVBAR ─────────────────────────────────────────────────── --> */}
        <header class="navbar">
            <a href="/" class="navbar__logo" aria-label="QuoteSprint home">
            <img src="/quotesprint.png" alt="QuoteSprint logo" class="navbar__logo-img" />
            </a>

            {/* <!-- Mobile hamburger (hidden on desktop) --> */}
            <button class="navbar__hamburger" id="hamburgerBtn" aria-label="Open menu" aria-expanded="false">
            <span></span><span></span><span></span>
            </button>

            <nav class="navbar__nav" id="mainNav" aria-label="Main navigation">
            <ul class="navbar__links">
                <li><a href="/" class="navbar__link navbar__link--active">Home</a></li>
                <li><a href="#" class="navbar__link">Scores</a></li>
                <li><a href="#" class="navbar__link">About</a></li>
            </ul>
            <a href="typing" class="btn btn--primary navbar__cta">PLAY</a>
            </nav>
        </header>
        {/* <!-- ─────────────────────────────────────────────────────────────── --> */}

        {/* <!-- ─── MAIN CONTENT ─────────────────────────────────────────────── --> */}
        <main class="home-main">

            <section class="home-hero" aria-labelledby="heroHeading">
            <h1 id="heroHeading" class="home-hero__heading">See where the words take you.</h1>
            <p class="home-hero__subheading">Customize your round before you begin.</p>
            </section>

            {/* <!-- Settings card --> */}
            <section class="home-settings" aria-label="Game settings">
            <div class="settings-card">

                {/* <!-- Difficulty --> */}
                <div class="settings-card__row">
                <label class="settings-card__label" for="difficultySelect">Difficulty</label>
                <div class="settings-card__select-wrapper">
                    <select class="settings-card__select" id="difficultySelect" name="difficulty">
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                    </select>
                    {/* <!-- Chevron icon rendered via CSS/pseudo-element or replaced by your CSS person --> */}
                </div>
                </div>

                {/* <!-- Length --> */}
                <div class="settings-card__row">
                <label class="settings-card__label" for="lengthSelect">Length</label>
                <div class="settings-card__select-wrapper">
                    <select class="settings-card__select" id="lengthSelect" name="length">
                    <option value="short">Short</option>
                    <option value="medium">Medium</option>
                    <option value="long">Long</option>
                    </select>
                </div>
                </div>

                {/* <!-- Category --> */}
                <div class="settings-card__row">
                <label class="settings-card__label" for="categorySelect">Category</label>
                <div class="settings-card__select-wrapper">
                    <select class="settings-card__select" id="categorySelect" name="category">
                    <option value="motivational">Motivational</option>
                    <option value="wisdom">Wisdom</option>
                    <option value="science">Science</option>
                    </select>
                </div>
                </div>

                {/* <!-- Start button --> */}
                <div class="settings-card__action">
                <button class="btn btn--primary btn--wide" id="startBtn" type="button">
                    Start Typing
                </button>
                </div>

            </div>
            {/* <!-- /settings-card --> */}
            </section>

        </main>
        {/* <!-- ─────────────────────────────────────────────────────────────── --> */}

        <script>

        </script>

        </body>

        </html>

    );
}

export default Home;