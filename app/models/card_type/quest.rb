class CardType::Quest < ApplicationRecord
  include CardType::Concern
  has_many :objectives, class_name: 'CardType::Objective'
  belongs_to :location, class_name: 'CardType::Location', optional: true

  if_visible :location
  only_visible :objectives

   def self.permitted_attributes
      %i[completed location_id]
   end

   def self.description
    "An overall goal the players are working towards, grouping several objectives together"
   end

   def self.icon
    "ra ra-scroll-unfurled"
   end

   def parent
      nil
   end
end
