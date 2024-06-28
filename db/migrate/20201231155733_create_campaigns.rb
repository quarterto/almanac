class CreateCampaigns < ActiveRecord::Migration[6.1]
  def change
    create_table :campaigns do |t|
      t.string :name
      t.string :tagline
      t.string :slug
      t.references :owner, null: false, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
