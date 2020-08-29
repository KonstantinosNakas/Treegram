class FollowsController<ActionController::Base
  def new
  end

  def create
    @follow = Follow.where("user_id_follower = ? and user_id_followed = ?", params[:follow][:user_id_follower], params[:follow][:user_id_followed]).first
    if params[:follow][:user_id_follower] == params[:follow][:user_id_followed]
      flash[:notice] = "Can not follow myself"
      redirect_to :back
    elsif @follow != nil
      flash[:notice] = "Can not follow the same user twice"
      redirect_to :back
    else
    @follow = Follow.create({user_id_follower: params[:follow][:user_id_follower], user_id_followed: params[:follow][:user_id_followed]})
    flash[:notice] = "Follows enabled"
    redirect_to user_path(@follow.user_id_follower)
    end
  end

end
