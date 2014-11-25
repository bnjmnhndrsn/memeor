class MemesController < ApplicationController
  def show
     @board = Meme.includes(:image).includes(:captions).find(params[:id])
     
     if @board
       render :show
     else
       render json: ["You aren't a member of this board"], status: 403
     end
  end
end
