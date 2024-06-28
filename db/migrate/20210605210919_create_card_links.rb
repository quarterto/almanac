class CreateCardLinks < ActiveRecord::Migration[6.1]
  def change
    create_table :card_links do |t|
      t.references :card, null: false
      t.references :to, null: false, foreign_key: { to_table: :cards }
      t.timestamps
    end
  end
end
