class AddVisibilityDefaultsToCard < ActiveRecord::Migration[6.1]
  def change
    change_column_default :cards, :visible, 0
    change_column_default :cards, :editable, 0
  end
end
