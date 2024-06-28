class AddInviteTokenToCampaignSettings < ActiveRecord::Migration[6.1]
  def change
    add_column :campaign_settings, :invite_token, :string
    add_index :campaign_settings, :invite_token, unique: true
  end
end
