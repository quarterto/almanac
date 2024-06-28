class AddLocationToObjective < ActiveRecord::Migration[6.1]
  def change
    add_reference :card_type_objectives, :location, null: true, foreign_key: { to_table: :card_type_locations }
  end
end
