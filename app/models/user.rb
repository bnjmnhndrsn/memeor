class User < ActiveRecord::Base
  validates :session_token, presence: true
end
