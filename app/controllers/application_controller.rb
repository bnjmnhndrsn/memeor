class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user
  
  def set_session_token
    user = User.find_by(session_token: session[:session_token])
    if user.nil?
      session[:session_token] = SecureRandom::urlsafe_base64
      user = User.new(session_token: session[:session_token], anon: true)
      debugger;
      user.save!
    end
  end
  
  def current_user
    user = User.find_by(session_token: session[:session_token])
  end
  
end
