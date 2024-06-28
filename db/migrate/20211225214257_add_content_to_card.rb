class AddContentToCard < ActiveRecord::Migration[6.1]
  def change
    add_column :cards, :content, :jsonb
  end
end
