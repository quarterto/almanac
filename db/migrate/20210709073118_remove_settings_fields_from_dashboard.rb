class RemoveSettingsFieldsFromDashboard < ActiveRecord::Migration[6.1]
  def change
    remove_column :dashboards, :public, :boolean
    remove_column :dashboards, :invite_token, :string
  end
end
