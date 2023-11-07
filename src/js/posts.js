$(function() {
    //Json query
    $.get( "res/json/posts.json", function( data ) {
        console.log(data);
        $( ".result" ).html( data );
        $.each(data, function( index, value ) {

            let postAuthor = new User(value.authorName, value.authorAvatar)
            
            let post = new UserPost(value.id,postAuthor,value.createTime,value.body,value.image);
        
            $(".contentfield").append(post.postContent());
            
        });
    })
})

class User{
    constructor(name, avatar){
        this.name=name;
        this.avatar=avatar;
    }
}

class UserPost{

    constructor(id, author, createTime, text, image){
        this.id=id;
        this.author = author;
        this.createTime=createTime;
        this.text=text;
        this.image=image;
    }

    isPostWithImage() {
        if (this.image==null) {
            return false;
        } else {
            return true;
        }
    }


    postContent(){
        let txt;
        if(this.text==null){
            txt="";
        }else{
            txt=this.text;
        }
        let header=
        '<header class="box-header">' +
            '<img class="profile" src="'+ this.author.avatar + '" width="50" height="50" alt="Post author">'+
            '<p class="post-author"> '+this.author.name+'</p>'+
          '<time class="post-date">'+ this.createTime+'</time>'+
        '</header>';

       let postBody= "";
       if(this.isPostWithImage()){
           let postContent="";
            postContent='<img class="box-image" src="' + this.image + '" alt="">';
            postBody=postContent+
            '</img>'+
            '<p  class="comment">'+
            txt+
            '</p>'+
         '<footer class=box-footer>'+
         '<img src="res/images/like.png" alt="like-button" width="50" height="50" class=like-button>'+
         '</footer>';
       }else{
        postBody='<p  class="comment">'+
        txt+
        '</p>'+
        '<footer class=box-footer>'+
        '<img src="res/images/like.png" alt="like-button" width="50" height="50" class=like-button>'+
        '</footer>';
       }

       return '<div class="container">'+header+postBody+'</div>';

    }
}