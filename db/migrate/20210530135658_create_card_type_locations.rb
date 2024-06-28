class CreateCardTypeLocations < ActiveRecord::Migration[6.1]
  def change
    create_table :card_type_locations do |t|
      t.references :parent, null: true, foreign_key: { to_table: :card_type_locations }
      t.timestamps
    end
  end
end
