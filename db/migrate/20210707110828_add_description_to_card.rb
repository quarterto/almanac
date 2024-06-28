class AddDescriptionToCard < ActiveRecord::Migration[6.1]
  def change
    add_column :cards, :description, :string
  end
end
