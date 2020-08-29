class CommentsController<ActionController::Base

  def new
  end

  def create
    @user = User.find_by(id: params[:user_id])
    @comment = Comment.create({photo_id: params[:photo_id], user_id: params[:user_id], comment_text: @user.email + ": " + params[:comment][:comment_text]})
    flash[:notice] = "Comment Added"
    redirect_to user_path(@comment.user_id)
  end



end