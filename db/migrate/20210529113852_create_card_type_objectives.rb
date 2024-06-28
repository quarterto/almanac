class CreateCardTypeObjectives < ActiveRecord::Migration[6.1]
  def change
    create_table :card_type_objectives do |t|
      t.boolean :completed
      t.references :quest, null: false, foreign_key: true

      t.timestamps
    end
  end
end
