class UnsplashController < ApplicationController
   helper_method :item_value, :field_name, :label_class

   def search
      render UnsplashImage.search(params[:q]), layout: 'select_wrapper'
   end

   def field_name
      params[:field_name]
   end

   def item_value(assigns)
      assigns[:unsplash_image].photo.id
   end

   def label_class
      'image-select'
   end
end
