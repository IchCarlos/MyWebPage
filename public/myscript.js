function createPost(){
    let checker = document.querySelector("#postBlog").innerText;
    if (checker == "Add Post") {
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
            document.querySelector("#createSection > form").submit();  
        }
    }
}

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

function editPost(id){
    if (editChecker()) {
        alert("You are already editing a post");
    } else if(document.querySelector("#postBlog").innerText == "Save Post") {
        alert("You are already creating a post");
    } else {
        document.getElementById(`postEdit${id}`).classList.add("notVisible");
        document.querySelector(`#postId${id} > h3`).contentEditable=true;
        document.querySelector(`#postId${id} > h3`).classList.add("focusEdit");
        document.querySelector(`#postId${id} > p`).contentEditable=true;
        document.querySelector(`#postId${id} > p`).classList.add("focusEdit");
        document.getElementById(`postSave${id}`).classList.remove("notVisible");
    }
}

function savePost(id){
    document.getElementById(`inputTitle${id}`).value = document.querySelector(`#postId${id} > h3`).innerText;
    document.getElementById(`inputMessage${id}`).value = document.querySelector(`#postId${id} > p`).innerText;
    document.querySelector(`#postId${id} > form`).submit();
}

function deletePost(id){
    if (confirm("Are you sure you want to delete this Post?")) {
        document.querySelector(`#postId${id}`).lastElementChild.submit();
    } 
}

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
