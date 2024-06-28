class AddActableToCard < ActiveRecord::Migration[6.1]
  def change
    change_table :cards do |t|
      t.actable
    end
  end
end
