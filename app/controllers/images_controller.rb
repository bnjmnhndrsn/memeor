class ImagesController < ApplicationController
  def show
    @image = Image.find(params[:id])
    if @image
      render json: @image
    else
      render json: ["No image!"], status: 404
    end
  end
  
  def index
    @images = Image.all
    render json: @images
  end
end
