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
