var counter = 1;

document.querySelector("#postBlog").addEventListener("click", function()  {
    let checker = document.querySelector("#postBlog").innerText;
    if( checker == "Add Post"){
        if(editChecker()){
            alert("You are already editing a post");
        }else{
            document.querySelector("#cancelPost").classList.remove("notVisible");
            document.querySelector("#cancelPost").classList.add("Visible");
            document.querySelector("#createSection").classList.add("visible");
            document.querySelector("#postBlog").innerText = "Save Post";
        }
        
    } else {
        let Title = document.querySelector("#createTitle").value;
        let Text = document.querySelector("#createArea").value;
        if(Title == "" || Text == ""){
            alert("There are some empty fields.");
        }else {
            hidepostBuilder();
            createPost(Title, Text);
        }
        
    }
});

document.querySelector("#cancelPost").addEventListener("click", function(){
    hidepostBuilder();
});

function hidepostBuilder(){
    document.querySelector("#postBlog").innerText = "Add Post";
    document.querySelector("#createTitle").value = "";
    document.querySelector("#createArea").value = "";
    document.querySelector("#createSection").classList.remove("visible");
    document.querySelector("#createSection").classList.add("notVisible");
    document.querySelector("#cancelPost").classList.remove("visible");
    document.querySelector("#cancelPost").classList.add("notVisible");
}

function createPost(inTitle, inText){
    counter++;
    let myDiv = document.createElement("div");
    myDiv.setAttribute("id",`postId${counter}`);

    let myTitle = document.createElement("h3");
    myTitle.innerText = inTitle;

    let myText = document.createElement("p");
    myText.innerText = inText;

    let myEdit = document.createElement("button");
    myEdit.setAttribute("alt","edit");
    myEdit.classList.add("btn");
    myEdit.classList.add("p-1");
    let myEditImg = document.createElement("img");
    myEditImg.setAttribute("src", "./Images/edit.png");
    myEdit.appendChild(myEditImg);

    addClickEvent(myEdit);

    let myDelete = document.createElement("button");
    myDelete.setAttribute("alt","delete");
    myDelete.classList.add("btn");
    myDelete.classList.add("p-1");
    let myDeleteImg = document.createElement("img");
    myDeleteImg.setAttribute("src", "./Images/delete.png");
    myDelete.appendChild(myDeleteImg);

    myDelete.addEventListener("click", function(){
        this.parentElement.remove();
    });

    myDiv.appendChild(myTitle);
    myDiv.appendChild(myText);
    myDiv.appendChild(myEdit);
    myDiv.appendChild(myDelete);
    
    document.querySelector("#myPosts").appendChild(myDiv);
}

addClickEvent(document.querySelector("#myPosts > div > button"));

function addClickEvent(element){
    element.addEventListener("click", function(){
        if(this.previousElementSibling.classList.contains("focusEdit")){
            this.previousElementSibling.contentEditable=false;
            this.previousElementSibling.classList.remove("focusEdit");
            this.previousElementSibling.previousElementSibling.contentEditable=false;
            this.previousElementSibling.previousElementSibling.classList.remove("focusEdit");
            this.firstChild.setAttribute("src","./Images/edit.png");
        }else {
            if(editChecker()){
                alert("Sorry, You are already editing one Post");
            }else if(document.querySelector("#createSection").classList.contains("visible")){
                alert("You are already creating a Post.");
            }else{
                this.previousElementSibling.contentEditable=true;
                this.previousElementSibling.classList.add("focusEdit");
                this.previousElementSibling.previousElementSibling.contentEditable=true;
                this.previousElementSibling.previousElementSibling.classList.add("focusEdit");
                this.firstChild.setAttribute("src","./Images/save.png");
            }     
        }
    });
}

document.querySelector("#myPosts > div > button:nth-child(4)").addEventListener("click", function(){
    this.parentElement.remove();
});

function editChecker(){
    let count = 0;
    let items = document.querySelectorAll("#myPosts > div > h3:nth-child(1)");
    for (let i = 0; i < items.length; i++){
        if(items[i].contentEditable == "true"){
            count++;
        }
    }
    if(count > 0){
        return true;
    }else{
        return false;
    }
}
