class CreateLinks < ActiveRecord::Migration[6.1]
  def change
    create_table :links do |t|
      t.references :from, null: false
      t.references :to, null: false
      t.integer :link, null: false, default: 0
      t.integer :count, null: false, default: 0
    end

    add_foreign_key :links, :cards, column: :from_id
    add_foreign_key :links, :cards, column: :to_id

    add_index :links, %i[from_id to_id link], name: 'index_on_type_columns', unique: true
    add_index :links, :count, where: 'count = 0'
  end
end
