//===================================GLOBAL VARIABLES=================================
    //Initial array of celebrities
var celebrities = ["Nicolas Cage", "Anna Ferris", "Bruce Campbell", "Kathy Griffin"];
    


//Function for grabbing info from the API when the button gets pushed
function displayCeleb () {
    var celeb = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + celeb +"&api_key=cYspV105zCuhSY2GlSUP66RGIjGSLURD";

    //Create an ajax call for the celebrity that is clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        $("#celebrities-view").empty();
        $("#celebrities-view").html(`
            <p>Rating: ${response.data[i].rating}</p>
        `);
    });
}

$("#buttons").on("click", displayCeleb);

//Function to generate buttons
function renderButtons() {

    // Deleting the movie buttons prior to adding new movie buttons
    // (Review this)
    $("#buttons").empty();

    // Looping through the array of movies
    for (var i = 0; i < celebrities.length; i++) {

      // Then dynamicaly generate buttons for each movie in the array.
      var button = $("<button>");
      // Add a class
      button.addClass("celebrity");
      // Add a data attribute with a value of the movie at index i
      button.attr("data-name", celebrities[i]);
      // Provide the button's text with a value of the movie at index i
      button.text(celebrities[i]);
      // Adding the button to the HTML
      $("#buttons").append(button);
    }
  }

  // Create a function to render new buttons based on user input
  $("#add-celebrity").on("click", function(event) {
    //Use preventDefault to prevent the form from submitting itself??
    event.preventDefault();

    // This line will grab the text from the input box
    var celebrity = $("#celebrity-input").val().trim();
    // The movie from the textbox is then added to our array
    celebrities.push(celebrity);

    // calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

  //Call renderbuttons upon page load so that the initial array displays
  renderButtons();

//Create a function that dumps search results from the celeb buttons into the div
  //Make sure it dumps the first ten results, as well as the rating for each.
