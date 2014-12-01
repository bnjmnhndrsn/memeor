class MemesController < ApplicationController
  def index
    @memes = Meme.all.includes(:image).includes(:captions)
    render 'index'
  end
    
  def create
    @meme = Meme.new(meme_params)

    if @meme.save
      render json: @meme
    else
      render json: @meme.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @meme = Meme.find(params[:id])
    
    
    if @meme.update(meme_params)
      render json: @meme
    else
      render json: @meme.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  def show
     @meme = Meme.includes(:image).includes(:captions).find(params[:id])
     
     if @meme
       render :show
     else
       render json: ["No meme!"], status: 404
     end
  end
  
  def meme_params
    params[:meme].permit(:styling, :cached_image, :image_id, :title, :id, captions_attributes: [:styling, :id, :content])
  end
  
end
