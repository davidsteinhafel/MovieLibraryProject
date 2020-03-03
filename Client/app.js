function add(){
    $('#my-form').submit( processForm );
}
function processForm( e ){
    var dict = {
        Title : this["title"].value,
        Director: this["director"].value,
        Genre: this["genre"].value
    };

    $.ajax({
        url: 'https://localhost:44325/api/movie',
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(dict),
        success: () => {
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    })
    .then(() =>{
        e.preventDefault();
        $("#my-form")[0].reset();
        getData();
    });


}


function getData(){
    $.ajax({
        url:"https://localhost:44325/api/movie",
        dataType:"json",
        type:"get",
        contentType:"application/json",
        success: (data, textStatus, jqXHR) => populateTable(data),
        error: (data,textStatus) => alert("Error status " + textStatus)
    });
}

function populateTable(data, textStatus, jqXHR){
    $("#movieTable").html('');
    console.log(data);

    $.each(data, function (index, el){
        $('#movieTable').append(
            "<tr>" +
                "<td>" + el.title + "</td>" +
                "<td>" +  el.director + "</td>" +
                "<td>" + el.genre + "</td>" +
                "<td>" + createDeleteButtton(el.movieId) + "</td>" +
                "<td>" + createEditButtton(el.movieId) + "</td>" +
            "</tr>"
            );
         }
    );
}

function createDeleteButtton(id){
    return "<button value='" + id + "' onclick='deleteMovie(this.value);'>Delete</button>";
}
function createEditButtton(id){
    return "<button value='" + id + "' onclick='editForm(this.value);'>Edit</button>";
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
    $("#edit-Form").show(500);
    getMovieData(id);

}

function getMovieData(movieId){
    $.ajax({
        url: "https://localhost:44325/api/movie/" + movieId,
        type: "get",
        contentType:"application/json",
        dataType:"json",
        success: (data,textStatus,jqXHR) => processMovie(data),
        error: (data,textStatus) => alert("Error status: " + textStatus)
    })
}

function processMovie(data){
    $("#edit-Form > input[name='title']").val(data["title"]);
    $("#edit-Form > input[name='director']").val(data["director"]);
    $("#edit-Form > input[name='genre']").val(data["genre"]);
    $("#edit-Form > input[name='id']").remove();
    $("#edit-Form").prepend('<input type="hidden" name="id" value="' + data["movieId"] + '">');
}

function edit(){
    $("#edit-Form").submit(processEditForm);
}

function processEditForm(e){

    var dict = {
        Title : this["title"].value,
        Director: this["director"].value,
        Genre: this["genre"].value,
    };
    var movieId = this["id"].value;
    console.log(dict);

    $.ajax({
        url:"https://localhost:44325/api/movie?" + $.param({"id": movieId }),
        type: "put",
        contentType:"application/json",
        data: JSON.stringify(dict),
        success: () => {
        },
        error: (data) => {
            alert("Error! Check console for details.");
            console.log(data);
        }
    })
    .then(() =>
    {
        getData();
    });
    e.preventDefault();
    $("#edit-Form").hide(500); 

}




($(document).ready(function(){
    getData();
}));