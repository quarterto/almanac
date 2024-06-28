class CreateCardTypeDocuments < ActiveRecord::Migration[6.1]
  def change
    create_table :card_type_documents do |t|
      t.references :location, null: true, foreign_key: { to_table: :card_type_locations }

      t.timestamps
    end
  end
end
