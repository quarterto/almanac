class AddLocationToQuest < ActiveRecord::Migration[6.1]
  def change
    add_reference :card_type_quests, :location, null: true, foreign_key: { to_table: :card_type_locations }
  end
end
