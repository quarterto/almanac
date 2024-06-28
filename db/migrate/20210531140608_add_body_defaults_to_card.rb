class AddBodyDefaultsToCard < ActiveRecord::Migration[6.1]
  def change
    change_column_default :cards, :body, ''
  end
end
