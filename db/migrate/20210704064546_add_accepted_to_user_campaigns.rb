class AddAcceptedToUserCampaigns < ActiveRecord::Migration[6.1]
  def change
    add_column :user_campaigns, :accepted, :boolean, default: false
  end
end
