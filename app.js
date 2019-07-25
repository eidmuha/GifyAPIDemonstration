var topics = ["flying", "amazon", "iphone", "fail", "bacon", "tv", "Android", "Augmented Reality", "Image processing", "3D images", "Laptops"]
var input = null;
var techname = null;
var queryURL = null;
// add the tech buttons on the html page



$().ready(function () {

    // create the initial
    for (let index = 0; index < topics.length; index++) {
        var btn = $("<input>")
        btn.attr("type", "submit")
        btn.addClass("technology")
        btn.attr("value", topics[index])
        $("#buttons").append(btn)
    }

    // add a tech name in the array
    $("#submitbtn").on("click", function (e) {
        e.preventDefault();

        input = $("#techInput").val().trim();
        if (input != '' && !topics.includes(input)) {
            var btn = $("<input>")
            btn.attr("type", "submit")
            btn.addClass("technology")
            btn.attr("value", input)
            $("#buttons").append(btn)
            topics.push(input)
            console.log("test")

            $("#techInput").attr("placeholder", "Your favourite Technology");
        }


    })
})

function displayTechGifs() {
    $("#gifs-appear-here").empty()

    techname = $(this).attr("value");
    // Constructing a queryURL using the animal name
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        techname + "&api_key=JDAk6GkvekxTVPfL6kD603QL6lKhxkQK&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var techDiv = $("<div class='newTechDiv'>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var techImage = $("<img>");
            techImage.addClass("gif")
            // Setting the src attribute of the image to a property pulled off the result item
            techImage.attr("src", results[i].images.fixed_height_still.url);
            techImage.attr("data-still", results[i].images.fixed_height_still.url);
            techImage.attr("data-animate", results[i].images.fixed_height.url);
            techImage.attr("data-state", "still");

            // Appending the paragraph and image tag to the animalDiv
            techDiv.append(p);
            techDiv.append(techImage);

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#gifs-appear-here").append(techDiv);
        }

    });


}

// play and paus the gifs using mouse click
$(document).on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
})

// display the related gifs after clicked event occur on one of the buttons
$(document).on("click", ".technology", displayTechGifs);


