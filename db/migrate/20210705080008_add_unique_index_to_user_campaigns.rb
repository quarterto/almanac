class AddUniqueIndexToUserCampaigns < ActiveRecord::Migration[6.1]
  def change
    add_index :user_campaigns, [:user_id, :campaign_id], unique: true
  end
end
