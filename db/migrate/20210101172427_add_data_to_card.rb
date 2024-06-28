class AddDataToCard < ActiveRecord::Migration[6.1]
  def change
    add_column :cards, :data, :jsonb
    add_column :cards, :card_type, :string
  end
end
