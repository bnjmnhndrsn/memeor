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
    @images = (params[:memes_count]) ?  Image.by_memes_count : Image.all.order(:created_at)
    if params[:limit]
      @images = @images.limit(params[:limit])
    end
    render :index
  end
  
  private
  
  def image_params
    params.permit(:title, :image_src)
  end
  
end
