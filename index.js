const startButtons = ["frog", "bird"]

function createButtons() {
    // Buttons that we start off with

    // Putting those buttons on the page
    startButtons.forEach(button => {
        const makeButton = $("<button>");
        makeButton.attr("data-animal", button)
        makeButton.text(button)
        $("#buttons").append(makeButton);
    })

    getTheGifs();
}

createButtons();

function createSubmitInput() {
    // Text associated with the search box
    const directionText = $("<p>");
    directionText.text("Add an animal");
    $("#submitInfo").append(directionText);

    // Search box
    const makeSearchInput = $("<input>");
    makeSearchInput.attr("type", "text");
    makeSearchInput.attr("id", "searchInput");
    $("#submitInfo").append(makeSearchInput);

    // Button to actually kick off search
    const makeSubmitButton = $("<button>");
    makeSubmitButton.text("Submit");
    makeSubmitButton.attr("type", "submit");
    makeSubmitButton.attr("id", "submitButton");
    $("#submitInfo").append(makeSubmitButton);

}

createSubmitInput()

$(document.body).on("click", "#submitButton", function () {
    // Not import but it prevents forms from being submitted when we dont want them to be!
    event.preventDefault();

    // Grab whatever is within the search box
    const submitButtonText = $("#searchInput").val();
    // Check if it is empty and if not, empty the previous buttons
    // and add the new content from the input to the list
    // and clear the search box
    if (!(submitButtonText === "")) {
        $("#buttons").empty();
        startButtons.push(submitButtonText);
        createButtons();
        $("#submitInfo").empty();
        createSubmitInput();
    }
})

function getTheGifs() {
    $("#buttons > button").on("click", function () {
        event.preventDefault();

        const animal = $(this).attr("data-animal");
        const queryURL = `https://api.giphy.com/v1/gifs/search?q=${animal}&api_key=QJ6UNAIBuReGMsfde4Q9d32vfqDndwkb&limit=10`;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            const results = response.data;

            results.forEach(gif => {

                const gifDiv = $("<div>");
                gifDiv.addClass("fixDisplay")
                const animalImage = $("<img>");
                animalImage.attr("src", gif.images.fixed_height.url);
                animalImage.attr("data-animate", gif.images.fixed_height.url);

                gifDiv.prepend(animalImage);

                $("#gifs-appear-here").prepend(gifDiv);
            })
        })
    })
}


// function makeGif() {

//     $("#buttons > button").on("click", function () {

//         event.preventDefault();

//         var animal = $(this).attr("data-animal");
//         var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
//             animal + "&api_key=QJ6UNAIBuReGMsfde4Q9d32vfqDndwkb&limit=10";

//         $.ajax({
//             url: queryURL,
//             method: "GET"
//         })
//             .then(function (response) {

//                 var results = response.data;

//                 //var searchInput = $("#search").val().trim();
//                 //$("#search").text(searchInput);

//                 for (var i = 0; i < results.length; i++) {

//                     var gifDiv = $("<div>");
//                     gifDiv.addClass("fixDisplay")

//                     var rating = results[i].rating;

//                     var p = $("<p>").text("Rating: " + rating);

//                     var animalImage = $("<img>");
//                     animalImage.attr("src", results[i].images.fixed_height_still.url);
//                     animalImage.attr("data-still", results[i].images.fixed_height_still.url);
//                     animalImage.attr("data-animate", results[i].images.fixed_height.url);
//                     animalImage.attr("data-state", "still");
//                     animalImage.addClass("gif");


//                     gifDiv.prepend(animalImage);
//                     gifDiv.prepend(p);

//                     $("#gifs-appear-here").prepend(gifDiv);
//                 }

//                 $(".gif").on("click", function () {
//                     // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
//                     var state = $(this).attr("data-state");
//                     // If the clicked image's state is still, update its src attribute to what its data-animate value is.
//                     // Then, set the image's data-state to animate
//                     // Else set src to the data-still value
//                     if (state === "still") {
//                         $(this).attr("src", $(this).attr("data-animate"));
//                         $(this).attr("data-state", "animate");
//                     } else {
//                         $(this).attr("src", $(this).attr("data-still"));
//                         $(this).attr("data-state", "still");
//                     }
//                 });
//             });
//     });

// };