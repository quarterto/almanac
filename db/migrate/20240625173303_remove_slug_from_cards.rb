class RemoveSlugFromCards < ActiveRecord::Migration[6.1]
  def change
    remove_column :cards, :slug, :string
  end
end
