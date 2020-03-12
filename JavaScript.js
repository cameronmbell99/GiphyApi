$(document).ready(function() {

    var list = ["Neil Patrick Harris", "Samuel L. Jackson", "Sylvester Stalone", "Michael B. Jordan", "Brad Pitt", "Scarlett Johansan", "Emily Blunt", "Anne Hathaway", "Natalie Portman", "Keira Knightley", "Jennifer Lawrence", "Bruce Willis"];

    function makeButtons(list) {
        console.log(list);
        $("#buttons").empty();
        for (var i = 0; i < list.length; i++) {
            var button = $("<button>");
            button.addClass("list-button list list-button-color")
            button.attr("list-member", list[i]);
            button.text(list[i]);
            $("#buttons").append(button);
            console.log(i);
        }
    }

    //Make all the buttons
    makeButtons(list);

    var submitbutton = $("<button>");
    submitbutton.attr("id", "submitButton");
    submitbutton.text("Submit");
    $("#submit").append(submitbutton);

    //add what you submitted to the array
    $(document).on("click", "#submitButton", function() {
        console.log("getting here");
        var text = $("#textBox").val().trim();
        if (text !== "") {

            list.push(text);
            console.log(text);
            makeButtons(list);
        }
        $("#textBox").val('');
    });

    $(document).on("click", "img", function() {
        var still = $(this).id;
        console.log(still);
        if ($(this).attr("src") === stills[1])
            $(this).attr("src, ")
    });

    //calls 10 images from Giphy api, and displays them and their "rating"
    $(document).on("click", ".list-button", function() {
        $("#gifs").empty();
        var person = $(this).attr("list-member");
        console.log(person);
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=iG6Vfxa9G7IT19VXGWv4IsdmFBpkKZAw&q=" + person + "&limit=10&lang=en";
        console.log(queryURL);
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function(response) {
                var results = response.data;
                console.log(results);
                //console.log(response.attr("data-gif"))
                for (var i = 0; i < results.length; i++) {

                    var gifDiv = $("<div>");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var personImage = $("<img id = " + i + ">");

                    personImage.attr("src", results[i].images.fixed_height.url);

                    gifDiv.prepend(p);
                    gifDiv.prepend(personImage);

                    $("#gifs").prepend(gifDiv);
                    console.log(i);
                }
                console.log(stills);
                console.log(animations);
            });
    });


});