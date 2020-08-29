var PhotoSlideShow = {

  setup: function() {
	  var timer;
	  
          var my_id = location.pathname.split("/")[2];
	  var image_list = document.getElementsByClassName("my_photos");
	  var my_comment = document.getElementsByClassName("my_comments");
	  var btn = document.getElementsByClassName("delete_btn");
	  var most_recent = image_list[0].getElementsByTagName("h4")[0].innerText;
	  var my_front_photo = image_list[0];
	  var imageCounter = 0;
	  var enter = false;

	  var users_photos = [];
	  var users = document.getElementsByClassName("users");
	  var users_top_value = parseInt(users[users.length-1].id)+1;
	  var most_recents = [];
	  var front_photos = [];
	  var imagesCounter = [];
	  var comments = document.getElementsByClassName("comments");      
//-----------------------------------------------------------------------------------	  
	  for(var i=0, l=my_comment.length; i<l; i++){
		my_comment[i].style.visibility="hidden";
	  }
	  
	  for(var i=0, l=btn.length; i<l; i++){
		btn[i].style.visibility="hidden";
	  }
	  for(var i=0, l=users.length; i<l; i++){
		if(users.length>0){
	  		users_photos[users[i].id] = document.getElementsByClassName("photos"+(users[i].id));
			most_recents[users[i].id] = users_photos[users[i].id][0].getElementsByTagName("h4")[0].innerText;
			front_photos[users[i].id] = users_photos[users[i].id][0];
			imagesCounter[users[i].id] = 0;
		}
	  }
	  for(var i=0, l=comments.length; i<l; i++){      
		comments[i].style.visibility="hidden";
	  }
          
//-----------------------------------------------------------------------------------
	  for(var i=0, l=users_top_value; i<l; i++){
		if(users_photos[i] && users.length>0){
	  		users_photos[i][0].style.display = "none";
		}
	  }
	  for(var i=0, l=users_top_value; i<l; i++){
		if(users_photos[i] && users.length>0){
			for(var j=1, k=users_photos[i].length; j<k; j++){
			    users_photos[i][j].style.display = "none";
			    if(users_photos[i][j].getElementsByTagName("h4")[0].innerText > most_recents[i]){
				    most_recents[i] = users_photos[i][j].getElementsByTagName("h4")[0].innerText;
				    front_photos[i] = users_photos[i][j];
				    imagesCounter[i] = j;
			    }
			}
		}
	  }
	  for(var i=0, l=users_top_value; i<l; i++){
                if(users_photos[i] && users.length>0){
 	  		front_photos[i].style.display = "block";
		}
	  }

	  for(var i=0, l=users_top_value; i<l; i++){
		if(users_photos[i] && users.length>0){
			for(var j=0, k=users_photos[i].length; j<k; j++){
				users_photos[i][j].onmouseenter=function(event){if(!enter){enter=true;timer=setInterval(
					function(){
						var current_id = parseInt(event.target.id);
						front_photos[current_id].style.display = "none";
						imagesCounter[current_id] = imagesCounter[current_id] - 1;
						if (imagesCounter[current_id] == -1){
							front_photos[current_id] = users_photos[current_id][++imagesCounter[current_id]];
						}else{
							front_photos[current_id] = users_photos[current_id][imagesCounter[current_id]];
						}
						front_photos[current_id].style.display = "block";
						if(imagesCounter[current_id] == 0){
							imagesCounter[current_id] = users_photos[current_id].length;				
						}
					}, 2000)}};
			}
		}
	  }
	  for(var i=0, l=users_top_value; i<l; i++){
		if(users_photos[i] && users.length>0){
			for(var j=0, k=users_photos[i].length; j<k; j++){
	  			users_photos[i][j].onmouseleave=function(){clearInterval(timer);enter=false;};  
				users_photos[i][j].onmousedown=function(){clearInterval(timer);enter=false;};
	  		}
		}
	  }
	  

	  
//-----------------------------------------------------------------------------------
	  image_list[0].style.display = "none";
	  for(var i=1, l=image_list.length; i<l; i++){
	    image_list[i].style.display = "none";
	    if(image_list[i].getElementsByTagName("h4")[0].innerText > most_recent){
		    most_recent = image_list[i].getElementsByTagName("h4")[0].innerText;
		    my_front_photo = image_list[i];
		    imageCounter = i;
	    }
	  }
	  my_front_photo.style.display = "block";	  

	  for(var i=0, l=image_list.length; i<l; i++){
		image_list[i].onmouseenter=function(){if(!enter){enter=true;timer=setInterval(
			function(){
				my_front_photo.style.display = "none";
				imageCounter = imageCounter - 1;
				if (imageCounter == -1){
					my_front_photo = image_list[++imageCounter];
				}else{
					my_front_photo = image_list[imageCounter];
				}
				my_front_photo.style.display = "block";
				if(imageCounter == 0){
					imageCounter = image_list.length;				
				}
			}, 2000)}};
	  }
	  for(var i=0, l=image_list.length; i<l; i++){
	  	image_list[i].onmouseleave=function(){clearInterval(timer);enter=false;};  
		image_list[i].onmousedown=function(){clearInterval(timer);enter=false;};
	  }
	   
  }
}
$(PhotoSlideShow.setup);