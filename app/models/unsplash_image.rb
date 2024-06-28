class UnsplashImage < ApplicationRecord
  acts_as :image
  before_save :load_photo

  def load_photo
    return unless !data || (data['id'] != unsplash_id)

    photo = Unsplash::Photo.find(unsplash_id)
    photo.track_download
    self.data = photo.to_h
  end

  def photo
    load_photo
    Unsplash::Photo.new data
  end

  def user
    load_photo
    # idk
    Unsplash::User.new data["user"]["attributes"]["table"]
  end

  def self.valid_params?(params)
    !params[:unsplash_id].blank?
  end

  def self.search(query)
    Unsplash::Photo.search(query, 1, 24, 'landscape').map { self.new(data: _1.to_h, unsplash_id: _1.id) }
  end

  def self.brand_image
    UnsplashImage.new(unsplash_id: 'rPkC3viHxug')
  end
end
