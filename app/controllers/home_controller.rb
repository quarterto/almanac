class HomeController < ApplicationController
  def index
    redirect_to campaigns_path if current_user
  end
end
