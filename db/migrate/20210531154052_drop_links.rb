class DropLinks < ActiveRecord::Migration[6.1]
  def change
    drop_table :links
  end
end
