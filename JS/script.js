'use strict'
let categoryButton;


$(document).ready(function () {
    //buttonclick
    $('.filter').on('click', function () {
        $(this).toggleClass('button-clicked');

        let result = document.getElementsByClassName('button-clicked');
        console.log(result);
        if (result.length > 0) {
            $('.item').hide();
            for (let i = 0; i < result.length; i++) {
                categoryButton = $(result[i]).text().split(' ');
                $(`.${categoryButton[0]}`).show();
                console.log(categoryButton[0]);
            }
        } else {
            $('.item').show();
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
                console.log(genre);
    
                console.log(category);
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
                console.log(d);
            }
        }
    });
});

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
};