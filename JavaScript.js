$(document).ready(function() {

    var list = ["Neil Patrick Harris", "Samuel L. Jackson", "Sylvester Stalone", "Michael B. Jordan", "Brad Pitt", "Scarlett Johansan", "Emily Blunt", "Anne Hathaway", "Natalie Portman", "Keira Knightley", "Jennifer Lawrence", "Bruce Willis"];

    function makeButtons(list) {
        $("#buttons").empty();
        for (var i = 0; i < list.length; i++) {
            var button = $("<button>");
            button.addClass("list-button list list-button-color")
            button.attr("list-member", list[i]);
            button.text(list[i]);
            $("#buttons").append(button);
        }
    }

    //Makes all the buttons
    makeButtons(list);

    var submitbutton = $("<button>");
    submitbutton.text("Submit");
    $("#submit").append(submitbutton);

    //displays what button is being pressed
    $(".list-button").on("click", function() {
        console.log($(this).attr("list-member"));
        var person = $(this).attr("list-member");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            person + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function(response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div>");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var personImage = $("<img>");
                    personImage.attr("src", results[i].images.fixed_height.url);

                    gifDiv.prepend(p);
                    gifDiv.prepend(personImage);

                    $("#gifs").prepend(gifDiv);
                }
            });
    });

    //adds what you submitted to the array
    $("#submit").click(function() {
        var text = $("#textBox").val().trim();
        if (text !== "") {

            list.push(text);

            makeButtons(list);
        }
        $("#textBox").val('');
    });
});