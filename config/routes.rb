Rails.application.routes.draw do
  root to: 'static_pages#root'
  
  resources :memes, only: [:show, :create, :update], :defaults => { :format => 'json' }
  resources :captions, only: [:create, :update, :destroy], :defaults => { :format => 'json' }
  resources :images, only: [:create, :index, :show], :defaults => { :format => 'json' }
  
end
