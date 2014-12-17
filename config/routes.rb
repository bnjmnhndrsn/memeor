Rails.application.routes.draw do
  root to: 'static_pages#root'
  get 'about', to: "static_pages#about"
  
  resources :memes, only: [:index, :show, :create, :update, :destroy], :defaults => { :format => 'json' }
  resources :captions, only: [:create, :update, :destroy], :defaults => { :format => 'json' }
  resources :images, only: [:create, :index, :show, :destroy], :defaults => { :format => 'json' }
  
end
