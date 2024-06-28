class CreateQuests < ActiveRecord::Migration[6.1]
  def change
    create_table :quests do |t|
      t.boolean :completed

      t.timestamps
    end
  end
end
