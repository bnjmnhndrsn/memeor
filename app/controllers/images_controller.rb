class ImagesController < ApplicationController
  def show
    @image = Image.find(params[:id])
    if @image
      render json: @image
    else
      render json: ["No image!"], status: 404
    end
  end
  
  def create
    @image = Image.new(image_params)
    if @image.save
      render json: @image
    else
      render json: @image.errors.full_messages, status: 422
    end
  end
  
  def index
    @images = Image.all
    render json: @images
  end
  
  private
  
  def image_params
    params[:image].permit(:id, :title, :src)
  end
  
end
