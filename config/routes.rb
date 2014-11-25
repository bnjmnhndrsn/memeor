Rails.application.routes.draw do
  root to: 'static_pages#root'
  
  resources :memes, only: [:show], :defaults => { :format => 'json' }
  
end
