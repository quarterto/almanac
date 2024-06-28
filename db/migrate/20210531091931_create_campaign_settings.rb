class CreateCampaignSettings < ActiveRecord::Migration[6.1]
  def change
    create_table :campaign_settings do |t|
      t.boolean :public
      t.references :campaign, null: false, foreign_key: true

      t.timestamps
    end
  end
end
