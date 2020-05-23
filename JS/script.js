'use strict'

let categoryButton;
let generalFilter = [];
let genreClickedArray = [];
let result;



$(document).ready(function () {

    //buttonclick
    $('.filter').on('click', function () {

        let items = document.getElementsByClassName('item');
        let doelgroepClickedArray = [];

        $(this).toggleClass('button-clicked');
        result = document.getElementsByClassName('button-clicked');

        for (let i = 0; i < result.length; i++) {
            categoryButton = $(result[i]).text().split(' ');
            if (categoryButton[0] != 'volwassenen' && categoryButton[0] != 'familie') {
                if (genreClickedArray.includes(categoryButton[0]) == false) {
                    genreClickedArray.push(categoryButton[0]);
                }
            } else {
                if (doelgroepClickedArray.includes(categoryButton[0]) == false) {
                    doelgroepClickedArray.push(categoryButton[0]);
                }

            }

        }

        if ($(this).hasClass('button-clicked') == false) {
            let getText = $(this).text().split(' ');
            let index = genreClickedArray.indexOf(getText[0]);
            genreClickedArray.splice(index, 1);
        }


        $('.item').hide();
        let genres = [];
        let doelgroepen = [];
        let allGenresDoelgroepen = [];
        items = Array.prototype.slice.call(items).values();


        for (const item of items) {
            if (doelgroepClickedArray.length > 0 && genreClickedArray.length > 0) {
                for (const doelgroep of doelgroepClickedArray.values()) {
                    for (const genre of genreClickedArray.values()) {
                        if ($(item).hasClass(doelgroep) == true && $(item).hasClass(genre) == true) {
                            allGenresDoelgroepen.push(item);
                        }
                        for (const element of allGenresDoelgroepen) {
                            $(element).show();
                        }
                    }

                }
            } else if (doelgroepClickedArray.length > 0) {
                for (const doelgroep of doelgroepClickedArray.values()) {
                    if ($(item).hasClass(doelgroep) == true) {
                        doelgroepen.push(item);
                    }
                    for (const element of doelgroepen) {
                        $(element).show();
                    }
                }

            } else if (genreClickedArray.length > 0) {
                for (const genre of genreClickedArray.values()) {
                    if ($(item).hasClass(genre) == true) {
                        genres.push(item);
                    }
                    for (const element of genres) {
                        $(element).show();
                    }
                } 
            } else {
                $('.item').show();
            }
        }
    });


    $.ajax({
        url: '../entries.json',
        method: 'GET',
        dataType: 'json'
    }).done(function (data) {
        for (var i in data) {
            for (var j in data[i]) {
                let d = data[i][j];

                let category = d.category;
                let videoNotes = d["video-notes"];
                let thumbnail = d.thumbnail.url;
                let name = d.name;
                let uitvoerders = d.excerpt;
                let recorded_on = d["recorded-at"];
                let duration = d["video-length"];
                let videoUrl = 0;
                let genre = d["genre-v2"];

                if (generalFilter.includes(genre) == false) {
                    generalFilter.push(genre);
                }

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
});

function fillArrayButtonClicked() {
    categoryButton = $(result[i]).text().split(' ');
    genreClickedArray.push(categoryButton[0]);
    console.log(genreClickedArray);
}

function checkOnSelectedItems() {
    let count = 0;
    for (let i = 0; i <= 12; i++) {
        if ($('#button' + i).hasClass('button-clicked') == true) {
            count += 1;
            //$(`.${words[0]}`).show();
        } else {
            count = count;
            //$(`.${words[0]}`).hide();
        }
        //console.log('#button' + counter);

    }
    console.log(count);
    return count;
}

function showItems() {

}