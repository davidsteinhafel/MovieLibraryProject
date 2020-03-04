function processForm( e ){
    var dict = {
        Title : this["title"].value,
        Director: this["director"].value,
        Genre: this["genre"].value
    };

    $.ajax({
        url: 'https://localhost:44325/api/movie',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(dict),
        success: () => {
            $("#my-form")[0].reset();
        },
        error: function( jqXhr, textStatus, errorThrown ){
          alert( errorThrown );
        }
    })
    .then(() =>{
        getData();
    });
    e.preventDefault();
}


function getData(){
    $.ajax({
        url:"https://localhost:44325/api/movie",
        //dataType:"json",
        type:"get",
        contentType:"application/json",
        success: (data, textStatus, jqXHR) => populateTable(data),
        error: (data,textStatus) => alert("Error status " + textStatus)
    });
}

function populateTable(data){
    $("#movieTable").html('');
    console.log(data);

    $.each(data, function (index, el){
        $('#movieTable').append(
            "<tr>" +
                "<td>" + el.title + "</td>" +
                "<td>" +  el.director + "</td>" +
                "<td>" + el.genre + "</td>" +
                "<td class='text-center'>" + createDeleteButtton(el.movieId) + "</td>" +
                "<td class='text-center'>" + createEditButtton(el.movieId) + "</td>" +
            "</tr>"
            );
         }
    );
}


function createDeleteButtton(id){
    return "<button class='tn btn-outline-secondary btn-sm' value='" + id + "' onclick='deleteMovie(this.value);'>Delete</button>";
}
function createEditButtton(id){
    return "<button  class='tn btn-outline-secondary btn-sm' value='" + id + "' onclick='editForm(this.value);'>Edit</button>";
}

function deleteMovie(movieId){
    $.ajax({
        url:"https://localhost:44325/api/movie?" + $.param({"id": movieId }),
        type:"delete",
        contentType:"application/json",
        error: (data,textStatus) => alert("Error status " + textStatus)
    })
    .then(() => {
        //requests are faster than server processing. Temporary solution to redisplaying data after deletion.
        // window.setTimeout(200);
        getData();
    });
}

function editForm(id){
    $("#edit-div").show(500);
    $("#my-div").hide();
    getMovieData(id);
}

function getMovieData(movieId){
    $.ajax({
        url: "https://localhost:44325/api/movie/" + movieId,
        type: "get",
        contentType:"application/json",
        //dataType:"json",
        success: (data,textStatus,jqXHR) => processMovie(data),
        error: (data,textStatus) => alert("Error status: " + textStatus)
    })
}

function processMovie(data){
    $("#edit-Form > div > input[name='title']").val(data["title"]);
    $("#edit-Form > div > input[name='director']").val(data["director"]);
    $("#edit-Form > div > input[name='genre']").val(data["genre"]);
    $("#edit-Form > div > input[name='id']").remove();
    $("#edit-Form").prepend('<input type="hidden" name="id" value="' + data["movieId"] + '">');
}

function processEditForm(e){

    var dict = {
        Title : this["title"].value,
        Director: this["director"].value,
        Genre: this["genre"].value,
    };
    var movieId = this["id"].value;

    $.ajax({
        url:"https://localhost:44325/api/movie?" + $.param({"id": movieId }),
        type: "put",
        contentType:"application/json",
        data: JSON.stringify(dict),
        success: () => {
        },
        error: (data,textStatus) => {
            alert("Error! Check console for details.");
            console.log(data,textStatus);
        }
    })
    .then(() =>
    {
        $("#my-div").show(500);
        getData();
    });
    e.preventDefault();
    $("#edit-div").hide(); 
}

function processSearchForm(e){
    var dict = {
        Field: this["fieldList"].value,
        SearchParams : this["searchParams"].value,
    };

    $.ajax({
        url:"https://localhost:44325/api/movie/" + dict.Field + "/" + dict.SearchParams,
        type: "get",
        contentType:"application/json",
        success: (data) => populateTable(data),
        error: (data) => {
            alert("Error! Check console for details.");
            console.log(data);
        }
    });
    e.preventDefault();
    // return false;

}

($(document).ready(function(){
    $("#edit-div").hide();
    $('#my-form').submit( processForm );
    $("#edit-Form").submit(processEditForm);
    $("#search-Form").submit(processSearchForm);
    getData();
}));