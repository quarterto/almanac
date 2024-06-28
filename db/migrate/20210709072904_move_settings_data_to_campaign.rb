class MoveSettingsDataToCampaign < ActiveRecord::Migration[6.1]
  def up
    Dashboard.find_each do |dashboard|
      dashboard.campaign.update(
        public: dashboard.public,
        invite_token: dashboard.invite_token
      )
    end
  end
end
