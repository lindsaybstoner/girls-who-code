
startButtons = ["frog"]

function createButtons() {
    for (var i = 0; i < startButtons.length; i++) {
        var makeButton = $("<button>");
        makeButton.attr("data-animal", startButtons[i])
        makeButton.text(startButtons[i])
        $("#buttons").append(makeButton);
    }
    makeGif();

};

createButtons();

function createSubmits() {
    var directionText = $("<p>");
    directionText.text("Add an animal");
    directionText.addClass("makeBold")
    $("#submitInfo").append(directionText);

    var makeInput = $("<input>");
    makeInput.addClass("form-control");
    makeInput.attr("type", "text");
    makeInput.attr("id", "searchInput");
    $("#submitInfo").append(makeInput);

    var makeSubmit = $("<button>");
    makeSubmit.text("Submit");
    makeSubmit.attr("type", "submit");
    makeSubmit.attr("id", "submitButton");
    makeSubmit.addClass("btn btn-default");
    $("#submitInfo").append(makeSubmit);

}

createSubmits();


$(document.body).on("click", "#submitButton", function () {


    event.preventDefault();

    var submitButtonText = $("#searchInput").val();
    if (!(submitButtonText === "")) {
        $("#buttons").empty();
        startButtons.push(submitButtonText);
        console.log(startButtons);
        createButtons();
        $("#submitInfo").empty();
        createSubmits();
    }



})

function makeGif() {

    $("#buttons > button").on("click", function () {

        event.preventDefault();

        var animal = $(this).attr("data-animal");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=QJ6UNAIBuReGMsfde4Q9d32vfqDndwkb&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {

                var results = response.data;

                //var searchInput = $("#search").val().trim();
                //$("#search").text(searchInput);

                for (var i = 0; i < results.length; i++) {

                    var gifDiv = $("<div>");
                    gifDiv.addClass("fixDisplay")

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var animalImage = $("<img>");
                    animalImage.attr("src", results[i].images.fixed_height_still.url);
                    animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                    animalImage.attr("data-animate", results[i].images.fixed_height.url);
                    animalImage.attr("data-state", "still");
                    animalImage.addClass("gif");


                    gifDiv.prepend(animalImage);
                    gifDiv.prepend(p);

                    $("#gifs-appear-here").prepend(gifDiv);
                }

                $(".gif").on("click", function () {
                    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                    var state = $(this).attr("data-state");
                    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                    // Then, set the image's data-state to animate
                    // Else set src to the data-still value
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                });
            });
    });

};