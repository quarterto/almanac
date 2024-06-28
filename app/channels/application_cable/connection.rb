module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = User.find(session[:user_id]) if session[:user_id]
      Current.user = self.current_user
    end

    def session
      @request.session
    end
  end
end
