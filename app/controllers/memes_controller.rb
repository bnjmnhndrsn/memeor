class MemesController < ApplicationController
  
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
    params[:meme].permit(:image_id, :title)
  end
end
