'use strict'

let categoryButton;
let generalFilter = [];
let genreClickedArray = [];
let result;



$(document).ready(function () {

    

    //ajax call voor de informatie binnen te trekken van de .json file
    //met deze ajax call zullen de .item worden weergegeven.
    $.ajax({
        url: '../entries.json',
        method: 'GET',
        dataType: 'json'
    }).done(function (data) {
        for (var i in data) {
            for (var j in data[i]) {
                let d = data[i][j];

                //alle gebruikte waarden worden ingeladen.
                let category = d.category;
                let thumbnail = d.thumbnail.url;
                let name = d.name;
                let uitvoerders = d.excerpt;
                let recorded_on = d["recorded-at"];
                let duration = d["video-length"];
                let genre = d["genre-v2"];

                //alle zoektermen voor genre worden ingeladen.
                if (generalFilter.includes(genre) == false) {
                    generalFilter.push(genre);
                }

                //elk .item wordt toegevoegd naast elkaar op de pagina in volgende vorm:
                $('.vue').append(
                    `
                    <div class="item ${category} ${genre}">
                        <a class="videoCard">
                            <div class="videoCardWrapper">
                                <img src=${thumbnail} class="thumbnail">
                                <div class="video-card-inner">
                                    <div class="tagline" >
                                        <p>${category}</p>
                                    </div>
                                </div>
                             </div>
                         <div class="videoCardContent">
                                <div>
                                    <h3>${name}</h3>
                                    <div class="vervaardigers">
                                        <p>${uitvoerders}</p>
                                        <p>${recorded_on}</p>
                                        <p>${duration}</p>
                                        <div class="play_button">
                                            <img class="iconSmall" src="/assets/img/play.0f9560cd.svg">
                                        </div>
                                    </div> 
                                </div>
                            </div>
                        </a> 
                    </div>
                `);
            }
        }
    });

    //Wanneer er wordt geklikt op de filter knoppen (genre of doelgroep)
    $('.filter').on('click', function () {

        let items = document.getElementsByClassName('item');
        //array voor aangeklikte doelgroepen
        let doelgroepClickedArray = [];

        //geeft styling mee aan de aangeklikte knop met een classe button-clicked
        $(this).toggleClass('button-clicked');
        //html collection(nodelist) wordt aangemaakt voor alle elementen met class button-clicked
        result = document.getElementsByClassName('button-clicked');
        
        for (let i = 0; i < result.length; i++) {
            //neem de tekst op de knop als waarde in categoryButton
            categoryButton = $(result[i]).text().split(' ');
            //wanneer de waarde van categoryButton niet volwassenen of familie is, dus geen doelgroep is steek ze in een array
            if (categoryButton[0] != 'volwassenen' && categoryButton[0] != 'familie') {
                //voor de .push() checken of de waarde al in de array zit. 
                if (genreClickedArray.includes(categoryButton[0]) == false) {
                    genreClickedArray.push(categoryButton[0]);
                }
            } else { //de volwassenen en familie gaan in de doelgroepArray
                if (doelgroepClickedArray.includes(categoryButton[0]) == false) {
                    doelgroepClickedArray.push(categoryButton[0]);
                }

            }

        }

        //wanneer er op een filterknop geklikt wordt om de filter uit te schakelen
        // wordt de waarde hiervan uit de array gehaald. 
        if ($(this).hasClass('button-clicked') == false) {
            let getText = $(this).text().split(' ');
            let index = genreClickedArray.indexOf(getText[0]);
            genreClickedArray.splice(index, 1);
        }

        // alle items (dat zijn de blokken met info) worden verstopt
        $('.item').hide();
        //de arrays worden bij elke klik op de knop leeg gemaakt. 
        let genres = [];
        let doelgroepen = [];
        let allGenresDoelgroepen = [];
        //omzetten van de nodelist naar een array
        items = Array.prototype.slice.call(items).values();

        //filter
        for (const item of items) { //loop door alle items
            //if structuur om na te gaan of de aangeklikte button een doelgroep, een genre of beide zijn.
            if (doelgroepClickedArray.length > 0 && genreClickedArray.length > 0) {
                for (const doelgroep of doelgroepClickedArray.values()) { //loop door doelgroep
                    for (const genre of genreClickedArray.values()) { //loop door genres
                        if ($(item).hasClass(doelgroep) == true && $(item).hasClass(genre) == true) {
                            allGenresDoelgroepen.push(item); //push naar array als statement juist is.
                        }
                        for (const element of allGenresDoelgroepen) { //loop door array en show alles wat daar in zit
                            $(element).show();
                        }
                    }

                }
                //werkt op zelfde manier als hierboven, maar enkel wanneer er enkel een doelgroep is geselecteerd
            } else if (doelgroepClickedArray.length > 0) {
                for (const doelgroep of doelgroepClickedArray.values()) {
                    if ($(item).hasClass(doelgroep) == true) {
                        doelgroepen.push(item);
                    }
                    for (const element of doelgroepen) {
                        $(element).show();
                    }
                }

                //werkt enkel als er genreknoppen zijn geselecteerd
            } else if (genreClickedArray.length > 0) {
                for (const genre of genreClickedArray.values()) {
                    if ($(item).hasClass(genre) == true) {
                        genres.push(item);
                    }
                    for (const element of genres) {
                        $(element).show();
                    }
                } 
                //werkt als er niets is geselecteerd
            } else {
                $('.item').show();
            }
        }
    });

    //functionaliteit van de zoekbalk
    $('.search-bar').keyup(function(){ //bij keyup in zoekbalk werkt deze code
        //haal string uit de ingegeven tekst van de zoekbalk
        let fieldInputText = $('.search-bar').val().toLowerCase();
        //maak de div leeg waar de voorgestelde zoekopdrachten inkomen
        $('.horizontal-search-filter').empty();
      
        //elke keer na 'keyup' wordt een nieuwe ajax call naar de .json gemaakt
        $.ajax({
            url: '../entries.json',
            method: 'GET',
            dataType: 'json'
        }).done(function(data){
            
            for(let i in data){
                for(let j in data[i]){
                    //gebruikte data uit de .json wordt in variabelen gestoken.
                    console.log(data[i][j]);
                    let k = data[i][j];
                    let name = k.name;
                    let productiehuis = k.excerpt;
                    let opnameplaats = k["recorded-at"];
                    let image = k.thumbnail.url;
                   
                    // wanneer de ingegeven tekst van de zoekbalk
                    // ook dezelfde lettervolgorde als de titel van de voorstelling bevat
                    //wordt het volgende getoont
                    let nameLower = name.toLowerCase();
                    if(nameLower.includes(fieldInputText) == true){
                        //aan de div die we eerst leeg maken worden nu alle gerelateerde
                        //zoekresultaten getoont
                        $('.horizontal-search-filter').append(`
                            <div class="horizontal-item">
                                <a href="#" class="video-card-horizontal">
                                    <div class="card-horizontal-image">
                                        <img scr="${image}" class="g-image">
                                        <div class="card-horizontal-image-inner">
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <h3>${name}</h3>
                                        <p>${productiehuis}</p>
                                        <p>${opnameplaats}</p>
                                    </div>
                                </a>
                            </div>
                        `)
                    }
                    //als de zoekbalk leeg is dan wordt ook de div leeg gemaakt.
                    //er is dan niets om te zoeken
                    if(fieldInputText == ''){
                        $('.horizontal-search-filter').empty();
                    }

                }
            }
            
        });
    });
});
