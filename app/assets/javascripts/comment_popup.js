var CommentPopup = {
  setup: function() {
    var image_list = document.getElementsByClassName("my_photos");
    var users_photos = [];
    var users = document.getElementsByClassName("users");
    // add hidden 'div' to end of page to display popup:
    var popupDiv = $('<div id="photoComments"></div>');
    popupDiv.hide().appendTo($('body'));
    for(var i=0, l=image_list.length; i<l; i++){
    	image_list[i].onmouseup = function(event){CommentPopup.getPhotoComments(event);};
    }
    for(var i=0, l=users.length; i<l; i++){
	if(users.length>0){
	     users_photos[i] = document.getElementsByClassName("photos"+(users[i].id));
	}
    }
    for(var i=0, l=users_photos.length; i<l; i++){
    	for(var j=0, k=users_photos[i].length; j<k; j++){
		users_photos[i][j].onmouseup = function(event){CommentPopup.getPhotoComments(event);};
	}
    }
  }
  ,getPhotoComments: function(event) {  
    var photo_id = event.target.nextElementSibling.id;
    $.ajax({type: 'GET',
            timeout: 5000,
	    data: {"photo_id": photo_id },
            success: CommentPopup.showPhotoComments,
            error: function(xhrObj, textStatus, exception) { alert('Error!'); }
            // 'success' and 'error' functions will be passed 3 args
           });
    return(false);
  }
  ,showPhotoComments: function(data, requestStatus, xhrObject) {
    // center a floater 1/2 as wide and 1/4 as tall as screen
    var oneFourth = Math.ceil($(window).width() / 4);
    $('#photoComments').
      css({'left': oneFourth,  'width': 2*oneFourth, 'top': 250}).
      html(data).
      show();
    // make the Close link in the hidden element work
    $('#closeLink').click(CommentPopup.hidePhotoComments);
    return(false);  // prevent default link action
  }
  ,hidePhotoComments: function() {
    $('#photoComments').hide();
    return(false);
  }
};
$(CommentPopup.setup);