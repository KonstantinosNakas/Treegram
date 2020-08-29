class PhotosController < ApplicationController
  def create
    @user = User.find(params[:user_id])
    if photo_params[:image] == nil || photo_params[:title] == ""
   
      flash[:alert] = "Please upload a photo and add a title."
      redirect_to :back
    else
    @photo = Photo.create(photo_params)
      @photo.user_id = @user.id
      @photo.save
      flash[:notice] = "Successfully uploaded a photo"
      redirect_to user_path(@user)
    end
  end

  def destroy
    @photo = Photo.find(params[:id])
	  user_id = @photo.user_id
    Comment.where(photo_id: @photo.id).each do |comment|
      comment.destroy
    end
    Tag.where(photo_id: @photo.id).each do |tag|
      tag.destroy
    end
    @photo.destroy
    redirect_to user_path(user_id)
  end

  def new
    @user = User.find(params[:user_id])
  end   

  private
  def photo_params
    params.require(:photo).permit(:title,:image)
  end
end
