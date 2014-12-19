class MemesController < ApplicationController
  def index
    
    @memes = Meme.all.includes(:captions).order('created_at DESC')
    if params[:image_id]
      @memes = @memes.where(image_id: params[:image_id])
    else
      @memes = @memes.includes(:image)
    end

    per_page = params[:per_page].nil? ? 24 : params[:per_page]
    @memes = @memes.where(public: true).page(params[:page]).per(per_page)
    @memes = paginate @memes, per_page: per_page
    @include_images = !params[:image_id]
    render :index
  end
    
  def create
    @meme = current_user.memes.create(meme_params)

    if @meme.save
      render json: @meme
    else
      render json: @meme.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @meme = Meme.find(params[:id]) 
    
    if @meme.user_id != current_user.id
      render json: ["Forbidden"], status: 403
      return
    end
    
    @meme.assign_attributes(meme_params)
    @meme.randomize_file_name
    
    if @meme.save
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
  
  def destroy
    @meme = Meme.find(params[:id])
    
    if @meme && @meme.user_id == current_user.id
      @meme.destroy
      render json: @meme
    else
      render json: ["FORBIDDEN"], status: 403
    end
  end
  
  private
  
  def meme_params
    params[:meme].permit(:styling, :cached_image, :image_id, :title, :id, :public,
      captions_attributes: [:styling, :id, :content])
  end
  
end
