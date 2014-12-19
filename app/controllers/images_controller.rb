class ImagesController < ApplicationController
  def show
    @image = Image.includes(:memes).find(params[:id])
    if @image
      render :show
    else
      render json: ["No image!"], status: 404
    end
  end
  
  def create
    @image = current_user.images.create(image_params)
    if @image.save
      render :show
    else
      render json: @image.errors.full_messages, status: 422
    end
  end

  def index
    if params[:sort_by] == "created_at"
      @images = Image.all.order(created_at: params[:order].to_sym)
    elsif params[:sort_by] == "memes_count"
      @images = Image.by_memes_count
    else
      @images = Image.all
    end
    
    per_page = params[:per_page].nil? ? 24 : params[:per_page]
    @images = @images.where(public: true).page(params[:page]).per(per_page)
    paginate @images, per_page: per_page
  end
  
  def destroy
    @image = Image.find(params[:id])
    if @image.user_id == current_user.id
      @image.destroy
      render json: @image
    else
      render json: ["Forbidden"], status: 403
    end
  end
  
  private
  
  def image_params
    params.permit(:title, :image_src, :public)
  end
  
end
