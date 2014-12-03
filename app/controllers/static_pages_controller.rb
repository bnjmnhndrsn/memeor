class StaticPagesController < ApplicationController
  def root
    set_session_token
  end
end
