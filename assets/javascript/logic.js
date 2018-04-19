//===================================GLOBAL VARIABLES=================================
    //Initial array of celebrities
var celebrities = ["Nicolas Cage", "Anna Ferris", "Bruce Campbell", "Kathy Griffin"];
    


//Function for grabbing info from the API when the button gets pushed
function displayCeleb () {
    var celeb = $(this).attr("data-name");
    console.log(celeb);
    console.log($(this));
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + celeb +"&api_key=cYspV105zCuhSY2GlSUP66RGIjGSLURD&limit=10";
    console.log(queryURL);
    //Create an ajax call for the celebrity that is clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log("response=========^", response);
        $("#celebrities-view").empty();
        for (var i=0; i < 10; i++) {
            console.log(i);
            //Create a variable for a div that will contain the rating and the picture, which will nest inside "#celebrities-view"
            var celebDiv = $("<div class=\"search-result\">")
            
            //Create variables for data associated with the rating, the still image, and the animated gif. 
            var rating = response.data[i].rating;
            var still = response.data[i].images.fixed_height_still.url;
            var animated = response.data[i].images.fixed_height.url; 
            
            //Create a variable to dynamically insert an image element to the DOM and a p element for the rating
            var celebImage = $("<img>");
            var p = $("<p>").text("rating:" + rating);

            //Use data-* method to add data attributes for the still and animated versions of the gif
            celebImage.attr("src", still);
            celebImage.attr("data-still", still);
            celebImage.attr("data-animate", animated);
            celebImage.attr("data-state", "still"); //Ask about this

            //Add a class to the celebImage variable to target it for a click event in another function
            celebImage.addClass("celeb-image");
            
            //Append the p variable and the celebImage variable to the celebDiv variable
            celebDiv.append(p);
            celebDiv.append(celebImage);

            //Append the celebDiv variable to the #celebrities-view div element in the DOM
            $("#celebrities-view").append(celebDiv);
        }
        
        //Create an event listener which will toggle the animated link when the user clicks on the gif. 
        $(document).on("click", ".celeb-image", function(){
            var state = $(this).attr("data-state");
            if (state === "still"){
                $(this).attr("src",
                $(this).attr("data-animate"));
                $(this).attr("data-state", "animated");
            }
            else{
                $(this).attr("src",
                $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });
    });
}

$(document).on("click", ".celebrity", displayCeleb);

//Function to generate buttons
function renderButtons() {

    // Deleting the movie buttons prior to adding new movie buttons
    // (Review this)
    $("#buttons").empty();

    // Looping through the array of movies
    for (var i = 0; i < celebrities.length; i++) {

      // Then dynamicaly generate buttons for each movie in the array.
      var button = $("<button>");
      // Add a class to use for the on-click event
      button.addClass("celebrity");
      //Add a bootstrap class to create some space
      button.addClass("mr-3");
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


