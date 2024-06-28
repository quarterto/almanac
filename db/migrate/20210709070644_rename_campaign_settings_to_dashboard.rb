class RenameCampaignSettingsToDashboard < ActiveRecord::Migration[6.1]
  def change
    rename_table :campaign_settings, :dashboards
  end
end
