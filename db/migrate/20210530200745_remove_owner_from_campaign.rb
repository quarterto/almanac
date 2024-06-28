class RemoveOwnerFromCampaign < ActiveRecord::Migration[6.1]
  def change
    remove_reference :campaigns, :owner, null: false, foreign_key: { to_table: :users }
  end
end
