class RemoveBodyFromCard < ActiveRecord::Migration[6.1]
  def change
    remove_column :cards, :body, :text
  end
end
