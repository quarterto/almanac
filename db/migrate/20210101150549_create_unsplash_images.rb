class CreateUnsplashImages < ActiveRecord::Migration[6.1]
  def change
    create_table :unsplash_images do |t|
      t.string :unsplash_id
      t.jsonb :data
    end
  end
end
