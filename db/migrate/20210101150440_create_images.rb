class CreateImages < ActiveRecord::Migration[6.1]
  def change
    create_table :images do |t|
      t.actable
      t.references :imageable, polymorphic: true
      t.timestamps
    end
  end
end
