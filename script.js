const btnMoreLess = document.querySelector('.btn');
const quotes = document.querySelector('.quotes');
const clockAreaInfo = document.querySelector('.clock-area-info');
const hiddenClockInfo = document.querySelector('.hidden-clock-info');
const arrowIcon = document.querySelector('.arrow-icon');
const bigClock = document.querySelector('.big-clock');
const timeStandart = document.querySelector('.time-standart');
const cityTown = document.querySelector('.cityTown');
const country = document.querySelector('.country');
const timeZone = document.querySelector('.time-zone');
const daysOfWeek = document.querySelector('.day-of-the-week');
const dayOfYear = document.querySelector('.day-of-the-year');
const weekNumber = document.querySelector('.week-number');
const greetingMessage = document.querySelector('.greeting-message');
const greetingAfternoon = document.querySelector('.greeting-afternoon');
const greetingEvening = document.querySelector('.greeting-evening');
const iconMessage = document.querySelector('.icon-message');
const iconNight = document.querySelector('.icon-night');
const refreshSentenceBtn = document.querySelector('.refresh-sentence-btn');
const sentence = document.querySelector('.sentence');
const author = document.querySelector('.author');
const refreshBtn = document.querySelector('.refreshBtn');
const backImage = document.querySelector('.main-section');
const backNightColor = document.querySelector('.hidden-clock-info');
const textColor = document.querySelectorAll('.txt-day');

btnMoreLess.addEventListener('click', moreLess);

function moreLess(e) {
    // e.preventDefault();
    if (btnMoreLess.innerHTML == 'More') {
        quotes.style.display = "none";
        clockAreaInfo.style.padding = "5% 0 0 5%";
        hiddenClockInfo.style.display = "block";
        btnMoreLess.classList.remove("btn");        
        btnMoreLess.classList.add("btn-click");        
        btnMoreLess.innerHTML = "Less"
    } else {
        quotes.style.display = "block";
        clockAreaInfo.removeAttribute('style');
        hiddenClockInfo.style.display = "none";
        btnMoreLess.classList.remove("btn-click");
        btnMoreLess.classList.add("btn");
        btnMoreLess.innerHTML = "More"
    }
}

fetch(`https://api.ipbase.com/v2/info?apikey=xGpGSFKuvtlZoYQ6ncCrMpAdJHi1Bk23rkcyDLVj`)
    .then(resp => resp.json())
    .then(data => clockDisplayCity(data))

fetch(`http://worldtimeapi.org/api/ip`)
    .then(resp => resp.json())
    .then(showData => clockDisplay(showData))

function clockDisplayCity(data) {
    cityTown.textContent = data.data.location.city.name;
    country.textContent = data.data.location.country.alpha2;
}

function clockDisplay(showData) {
    let timeClock = "";
    let bc;
    timeClock = showData.datetime;
    bc = timeClock.toString();
    bigClock.textContent = bc.slice(11, 16);

    timeStandart.textContent = showData.abbreviation;
    timeZone.textContent = showData.timezone;
    daysOfWeek.textContent = showData.day_of_week;
    dayOfYear.textContent = showData.day_of_year;
    weekNumber.textContent = showData.week_number;

    let hh = bc.slice(11, 13);

    if (hh >= "05" && hh <= "12") {
        greetingMessage.style.display = 'flex';
        greetingAfternoon.style.display = 'none';
        greetingEvening.style.display = 'none';
    }
    if (hh > "12" && hh <= "18") {
        greetingMessage.style.display = 'none';
        greetingAfternoon.style.display = 'flex';
        greetingEvening.style.display = 'none';
    }
    if (hh >= "18" || hh < "05") {
        greetingMessage.style.display = 'none';
        greetingAfternoon.style.display = 'none';
        greetingEvening.style.display = 'flex';
    }
    if (hh >= "05" && hh < "18") {
        iconMessage.style.display = 'flex';
        iconNight.style.display = 'none';
        backImage.classList.add("main-section");
        backImage.classList.remove("main-section-night");        
        backNightColor.classList.add("hidden-clock-info");
        backNightColor.classList.remove("hidden-clock-info-night");
        textColor.forEach(txt => {
            txt.classList.add('txt-day');
            txt.classList.remove('night-txt');
        });

    }
    if (hh >= "18" || hh < "05") {
        iconMessage.style.display = 'none';
        iconNight.style.display = 'flex';
        backImage.classList.remove("main-section");
        backImage.classList.add("main-section-night");        
        backNightColor.classList.remove("hidden-clock-info");
        backNightColor.classList.add("hidden-clock-info-night");
        textColor.forEach(txt => {
            txt.classList.remove('txt-day');
            txt.classList.add('night-txt');
        })
        
    }
}

window.addEventListener('load', sentenceQuotes);
refreshBtn.addEventListener('click', sentenceQuotes);

function sentenceQuotes() {
    fetch("https://programming-quotes-api.herokuapp.com/Quotes/random")
        .then(resp => resp.json())
        .then(showSentence => {
            sentence.textContent = showSentence.en;
            author.textContent = showSentence.author;
        })
}
