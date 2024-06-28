class AddVisibilityFieldsToCard < ActiveRecord::Migration[6.1]
  def change
    add_column :cards, :visible, :integer
    add_column :cards, :editable, :integer
    add_reference :cards, :owner, null: true, foreign_key: { to_table: :users }

    up_only do
      Card.reset_column_information
      Card.update_all(owner_id: User.first.id) if User.first
    end

    change_column_null :cards, :owner_id, false
  end
end
