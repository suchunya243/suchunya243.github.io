$(document).ready(function() {

    $('#advance-group').hide();

    $('#adv-search-btn').click(function(){
        $('#advance-group').toggle();
    });
    // set data to table
    $.ajax({
        url: "data.json",
        dataType: "json"
    }).done(function(response) {
        console.log(response);
        var t= "";
        response.forEach(element => {
            console.log(element.name, element.category, element.author, element.Publisher, element.price);
            t += "<tr>"+
            "<td>"+element.name+"</td>"+
            "<td>"+element.category+"</td>"+
            "<td>"+element.author+"</td>"+
            "<td>"+element.Publisher+"</td>"+
            "<td>"+element.price+"</td>";
            $('#table').html(t);
        });
    });

    //normal search
    $('#search-btn').click(function() {
        $.ajax({
            url: "data.json",
            dataType: "json"
        }).done(function(response) {
            console.log(response);
            var t= "";
            var check = false;
            response.forEach(element => {
                if(element.name.includes($('#input-text').val())){
                    console.log(element.name, element.category, element.author, element.Publisher, element.price);
                t += "<tr>"+
                "<td>"+element.name+"</td>"+
                "<td>"+element.category+"</td>"+
                "<td>"+element.author+"</td>"+
                "<td>"+element.Publisher+"</td>"+
                "<td>"+element.price+"</td>";
                $('#table').html(t);
                }
            });
        });
    });

    //Set category Selector Box
    $.ajax({
        url: "data.json",
        dataType: "json"
        }).done(function(response) {
            var data = response;
            var x = "";
            var category =[];
            for(var i = 0;i < data.length;i++){
                if(jQuery.inArray(data[i].category,category) ==-1){
                    category.push(data[i].category);
                    x +="<option>"+data[i].category+"</option>";
                }
            }
            $('#category-selector').html(x);
        }
    );
    //Set Author Selector Box
    $.ajax({
        url: "data.json",
        dataType: "json"
        }).done(function(response) {
            var data = response;
            var x = "";
            var author =[];
            var category =$('#category-selector').val();
            var auth =$('#author-selector').val();
            for(var i = 0;i < data.length;i++){
                if(jQuery.inArray(data[i].author,author) ==-1){
                        author.push(data[i].author);
                        x +="<option>"+data[i].author+"</option>";
                }
            }
            $('#author-selector').html(x);
        }
    );

    //Set publisher Selector Box
    $.ajax({
        url: "data.json",
        dataType: "json"
        }).done(function(response) {
            var data = response;
            var x = "";
            var Publisher =[];
            for(var i = 0;i < data.length;i++){
                if(jQuery.inArray(data[i].Publisher,Publisher) ==-1){
                    Publisher.push(data[i].Publisher);
                    x +="<option>"+data[i].Publisher+"</option>";
                }
            }
            $('#publisher-selector').html(x);
        }
    );
 //advance search
 $('#advance-search-btn').click(function(){
    var category =$('#category-selector').val();
    var author =$('#author-selector').val();
    var publisher =$('#publisher-selector').val();
        $('p#message').text("");
        $.ajax({
            url: "data.json",
            dataType: "json"
            }).done(function(response){
                var data = response;
                var x ="";
                var check = false;
                for(var i = 0;i < data.length;i++){
                    if(data[i].category.includes(category) && data[i].author.includes(author) && data[i].Publisher.includes(publisher)){
                        check = true;
                        x +="<tr>";
                        x +="<td>"+data[i].name+"</td>"+
                            "<td>"+data[i].category+"</td>"+
                            "<td>"+data[i].author+"</td>"+
                            "<td>"+data[i].Publisher+"</td>"+
                            "<td>"+data[i].price+"</td>";
                        $('#table').html(x);
                    }
                }
                if(check == false){
                    $('p#message').text("No book that you search.");
                    $('#table').html("");
                }
            })
});

});