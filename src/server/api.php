<?php

use IlluminateHttpRequest;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');

Route::get('/angulargames', function () {
    return [["gameId" => 1,
        "gameName" => "Castlevania",
        "gameCode" => "AAA-0101",
        "releaseDate" => "September 26, 1986",
        "description" => "Action-adventure game series created and developed by Konami.",
        "price" => 19.99,
        "thumbRating" => 5.0,
        "imageUrl" => "./assets/images/castlevania.png"
    ],
        [
            "gameId" => 2,
            "gameName" => "Dr Mario",
            "gameCode" => "AAA-1100",
            "releaseDate" => "July 27, 1990",
            "description" => "Action puzzle game produced by Gunpei Yokoi and published by Nintendo.",
            "price" => 15.99,
            "thumbRating" => 3,
            "imageUrl" => "./assets/images/drmario.png"
        ],
        [
            "gameId" => 3,
            "gameName" => "Kid Icarus",
            "gameCode" => "AAA-0048",
            "releaseDate" => "December 19, 1986",
            "description" => "Kid Icarus revolves around protagonist Pit's quest for three sacred treasures.",
            "price" => 20.99,
            "thumbRating" => 4,
            "imageUrl" => "./assets/images/kidicarus.png"
        ],
        [
            "gameId" => 4,
            "gameName" => "Legend Of Zelda",
            "gameCode" => "AAA-0049",
            "releaseDate" => "February 21, 1986",
            "description" => "Link is often given the task of rescuing Princess Zelda and the kingdom of Hyrule from Ganon.",
            "price" => 29.95,
            "thumbRating" => 5,
            "imageUrl" => "./assets/images/legendofzelda.png"
        ],
        [
            "gameId" => 5,
            "gameName" => "Mega Man",
            "gameCode" => "AAA-1042",
            "releaseDate" => "December 17, 1987",
            "description" => "Mega Man is an android originally named Rock, created as a lab assistant by the scientist Dr. Light.",
            "price" => 15.95,
            "thumbRating" => 4.5,
            "imageUrl" => "./assets/images/megaman.png"
        ],
        [
            "gameId" => 6,
            "gameName" => "Metroid",
            "gameCode" => "AAA-4511",
            "releaseDate" => "August 6, 1986",
            "description" => "Metroid follows space-faring bounty hunter Samus Aran, who protects the galaxy from the Space Pirates.",
            "price" => 10.95,
            "thumbRating" => 3,
            "imageUrl" => "./assets/images/metroid.png"
        ],
        [
            "gameId" => 7,
            "gameName" => "Super Mario Bros",
            "gameCode" => "AAA-3325",
            "releaseDate" => "September 13, 1985",
            "description" => "Mario finds power-ups and items that give him special magic powers such as fireball-throwing and size-changing into giant and miniature sizes.",
            "price" => 40.95,
            "thumbRating" => 5,
            "imageUrl" => "./assets/images/supermariobros.png"]];
});
?>