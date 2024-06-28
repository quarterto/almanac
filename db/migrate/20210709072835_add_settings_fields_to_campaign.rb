class AddSettingsFieldsToCampaign < ActiveRecord::Migration[6.1]
  def change
    add_column :campaigns, :public, :boolean
    add_column :campaigns, :invite_token, :string
    add_index :campaigns, :invite_token, unique: true
  end
end
