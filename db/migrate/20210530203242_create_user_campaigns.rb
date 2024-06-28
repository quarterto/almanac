class CreateUserCampaigns < ActiveRecord::Migration[6.1]
  def change
    create_table :user_campaigns do |t|
      t.references :user, null: false, foreign_key: true
      t.references :campaign, null: false, foreign_key: true
      t.integer :access

      t.timestamps
    end
  end
end
