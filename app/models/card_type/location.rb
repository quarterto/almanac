class CardType::Location < ApplicationRecord
  include CardType::Concern

  has_many :children, class_name: 'CardType::Location', foreign_key: :parent_id
  belongs_to :parent, class_name: 'CardType::Location', optional: true
  has_many :objectives, class_name: 'CardType::Objective'
  has_many :quests, class_name: 'CardType::Quest'
  has_many :documents, class_name: 'CardType::Document'

  if_visible :parent
  only_visible :children, :objectives, :quests

  def self.permitted_attributes
    %i[parent_id]
  end

  def self.description
    "A physical location in your world, from a continent down to a house"
  end

  def self.icon
    "ra ra-wooden-sign"
  end

  def image
    acting_as.image || parent&.image
  end
end
