class RemoveDataFromCard < ActiveRecord::Migration[6.1]
  def change
    remove_column :cards, :data, :jsonb
  end
end
