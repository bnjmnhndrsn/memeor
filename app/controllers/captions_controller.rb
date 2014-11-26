class CaptionsController < ApplicationController
  
  def create
    @caption = Caption.new(caption_params)
    if @caption.save
      render json: @caption
    else
      render json: @caption.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  def update
    @caption = Caption.find(params[:id])
    if @caption.update(caption_params)
      render json: @caption
    else
      render json: @caption.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  def caption_params
    params[:caption].permit(:content, :meme_id, :styling)
  end
end
