(function($){
    function processForm( e ){
        var dict = {
        	Title : this["title"].value,
            Director: this["director"].value,
            Genre: this["genre"].value
        };

        var str = JSON.stringify(dict);

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( data );
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    }

    $('#my-form').submit( processForm );
})(jQuery);


function getData(){
    $.ajax({
        url:"https://localhost:44325/api/movie",
        dataType:"json",
        type:"get",
        contentType:"application/json",
        success: (data, textStatus, jqXHR) => populateTable(data),
        error: () => alert("Error status" + data)
    });
}

function populateTable(data, textStatus, jqXHR){
    $("#movieTable").html('');
    console.log(data);

    $.each(data, function (index, el){
        $('#movieTable').append(
            "<tr>" +
                "<td>" + el.title + "</td>" +
                "<td>" + el.genre + "</td>" +
                "<td>" + el.director + "</td>" +
            "</tr>"
            );
         }
    );
}




($(document).ready(function(){
    getData();
}));