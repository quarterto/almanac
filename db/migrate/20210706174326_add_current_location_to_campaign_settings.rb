class AddCurrentLocationToCampaignSettings < ActiveRecord::Migration[6.1]
  def change
    add_reference :campaign_settings, :current_location, null: true, foreign_key: { to_table: :card_type_locations }
  end
end
