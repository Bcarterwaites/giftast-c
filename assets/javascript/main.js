$(document).ready(function() {

var searchArray = ["Spongebob", "Catdog", "Hey Arnold"]
var stilImgUrl = " ";
var animateImgUrl = " ";
var gifCondition = " ";
var stillUrl = " ";
var animateUrl = " ";

// Functions 

var createButton = function() {
    // clear elements in button section
    $("#cartoonButtons").empty();
    
    //Create buttons for searches 
    for ( var i = 0; i < searchArray.length; i++) {
        // Create buttons to put on DOM
        var btn = $("<button>");
        //Give button attribute
        btn.attr("data-name", searchArray[i]);
        //Add class to button
        btn.attr("class", "gif")
        //Give button the corresponding name in array
        btn.text(searchArray[i])
        //Appened button so it shows on DOM
        $("#cartoonButtons").append(btn);
    }


}

// Function for submit 

$("#submit").on("click", function(event) {
    submit();
});


var submit = function() {
    event.preventDefault();
    // Get search value
    var searchVal = $("#search-input").val();
    //Push the search value into the searchArray
    searchArray.push(searchVal);
    //Create button from search value
    createButton();
    
}


var displayGif = function() {
    //Gets the value of whatever button is clicked 
    var btnVal = $(this).data("name")
    //Making AJAX call
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + btnVal + "&api_key=yhg4kyalklWWUhgQJWgijeB93pzb3Ud8&limit=10"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        //removes images when a new button is clicked
        $("#cartoonGiphs").empty();
        var newh1 = $("<h1>");
        newh1.html(btnVal);
        $("#cartoonGiphs").append(newh1);

        // Loop through the 10 gifs we set in the limit
        for (var i = 0; i < 10; i++) {
            // Variables for still & animated images
            stilImgUrl = response.data[i].images.fixed_height_still.url;
            animateImgUrl = response.data[i].images.fixed_height.url;
            // Gemerate the text for rating.
            var rating = response.data[i].rating;
            //Assign image element to newImg variable
            var searchDiv = $("<div>");
            var p = $("<p>");
            var newImage = $("<img>");
            //Giving image element the still and animated attributes
            newImage.attr("data-still", stilImgUrl);
            newImage.attr("data-animate", animateImgUrl);
            newImage.attr("src", stilImgUrl);
            newImage.attr("data-type", "still");
            newImage.addClass("gifImage");
            //Assigning the ratings from response to the p tag
            p.html("Rating: " + rating);
            $(p).appendTo(searchDiv)
            $(newImage).appendTo(searchDiv);
            $("#cartoonGiphs").append(searchDiv);
        }
        
    });

}

var gifAnimate = function() {
    //sets gifCodntion to either still or animate
    gifCondition = $(this).data("type");
    stillUrl = $(this).data("still");
    animateUrl = $(this).data("animate");
    if (gifCondition === "still") {
        //Changes the gif to animated image by switching URL
        $(this).attr("src", animateUrl);
        //switch the data-type to animate
        $(this).data("type", "animate");


    } else if (gifCondition === "animate") {
        //Changes src to still
        $(this).attr("src", stillUrl);
        //Switch the data-type to still
        $(this).data("type", "still");
    }

}




//Excute functions

createButton();
$(document).on("click", ".gif", displayGif);
$(document).on("click", ".gifImage", gifAnimate)


});