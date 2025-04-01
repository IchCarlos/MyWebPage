var counter = 1;

$("#postBlog").on("click", function(){
    let checker = $("#postBlog").text();
    if( checker == "Add Post"){
        $("#cancelPost").removeClass("notVisible");
        $("#cancelPost").addClass("Visible");
        $("#createSection").addClass("visible");
        $("#postBlog").text("Save Post");
    } else {
        let Title = $("#createTitle").val();
        let Text = $("#createArea").val();
        if(Title == "" || Text == ""){
            alert("There are some empty fields.");
        }else {
            hidepostBuilder();
            createPost(Title, Text);
        }
    }
});

$("#cancelPost").on("click", function(){
    hidepostBuilder();
});

function hidepostBuilder(){
    $("#postBlog").text("Add Post");
    $("#createTitle").val("");
    $("#createArea").val("");
    $("#createSection").removeClass("visible");
    $("#createSection").addClass("notVisible");
    $("#cancelPost").removeClass("visible");
    $("#cancelPost").addClass("notVisible");
}

function createPost(inTitle, inText){
    counter++;
    let myDiv = $("<div></div>");
    myDiv.attr("id",`postId${counter}`);

    let myTitle = $("<h3></h3>");
    myTitle.text(inTitle);

    let myText = $("<p></p>");
    myText.text(inText);

    let myEdit = $("<button></button>");
    myEdit.attr("alt","edit");
    myEdit.addClass("btn");
    myEdit.addClass("p-1");
    let myEditImg = $("<img>");
    myEditImg.attr("src", "./Images/edit.png");
    myEdit.append(myEditImg);

    addClickEvent(myEdit);

    let myDelete = $("<button></button>");
    myDelete.attr("alt","delete");
    myDelete.addClass("btn");
    myDelete.addClass("p-1");
    let myDeleteImg = $("<img>");
    myDeleteImg.attr("src", "./Images/delete.png");
    myDelete.append(myDeleteImg);

    myDelete.on("click", function(){
        this.parentElement.remove();
    });

    myDiv.append(myTitle);
    myDiv.append(myText);
    myDiv.append(myEdit);
    myDiv.append(myDelete);
    
    $("#myPosts").append(myDiv);
}

addClickEvent($("#myPosts > div > button"));

function addClickEvent(element){
    element.on("click", function(){
        if(element.prev().hasClass("focusEdit")){
            element.prev().attr("contentEditable","false");
            element.prev().removeClass("focusEdit");
            element.prev().prev().attr("contentEditable","false");
            element.prev().prev().removeClass("focusEdit");
            element.children(":first").attr("src","./Images/edit.png");
        }else {
            let count = 0;
            let items = $("#myPosts > div > h3:nth-child(1)");
            for (let i = 0; i < items.length; i++){
                if(items[i].contentEditable == "true"){
                    count++;
                }
            }
            if(count > 0){
                alert("Sorry, You are already editing one Post");
            }else{
                element.prev().attr("contentEditable","true");
                element.prev().addClass("focusEdit");
                element.prev().prev().attr("contentEditable","true");
                element.prev().prev().addClass("focusEdit");
                element.children(":first").attr("src","./Images/save.png");  
            }     
        }
    });
}

$("#myPosts > div > button:nth-child(4)").on("click", function(){
    this.parentElement.remove();
});

//Aqui vamos a hacer remove event listener