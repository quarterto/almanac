require 'tip_tap'

module TipTap
	module Nodes
	  class Gallery < Node
		 self.type_name = 'mention'

		 def to_html
			ActionController::Base.helpers.link_to '@' + attrs["label"], attrs["id"]
		 end
	  end
	end
 end


class Card < ApplicationRecord
  actable
  belongs_to :campaign
  belongs_to :owner, class_name: 'User'
  has_one :image, as: :imageable
  has_many :card_links
  has_many(
    :related,
    through: :card_links,
    class_name: 'Card',
    source: :to
  )
  accepts_nested_attributes_for :actable
  accepts_nested_attributes_for :image, reject_if: proc { |attributes| !Image.valid_params? attributes }

  default_scope { includes :owner }

  enum visible: %i[only_me me_and_gm campaign public], _prefix: true
  enum editable: %i[only_me me_and_gm campaign], _prefix: true

  validate :visibility_greater_than_editablility

  only_visible :related, :card_links

  after_save :link_mentions

  def visibility_greater_than_editablility
    unless Card.visibles[visible] >= Card.editables[editable]
      errors.add(:visible, "A card must be visible to the users that can edit it")
    end
  end

  def has_access?(attr, user)
    case attr
    when "only_me"
      user == owner
    when "me_and_gm"
      campaign.owner?(user) || user == owner
    when "campaign"
      campaign.editable?(user)
    when "public"
      campaign.public
    else
      false
    end
  end

  def editable?(user)
    has_access?(editable, user)
  end

  def visible?(user, minimum_visibility = nil)
    minimum_visibility ||= "only_me"
    visibility_value = Card.visibles[visible]
    minimum_visibility_value = Card.visibles[minimum_visibility]
    return false if visibility_value < minimum_visibility_value

    has_access?(visible, user)
  end

  def owner?(user)
    user == owner
  end

  def build_actable(params)
    self.actable = actable_type.constantize.new(params)
  end

  def tiptap_document
    @document ||= TipTap::Document.from_json(content || { "type": "doc", "content": [] })
  end

  def content_html
    ActionController::Base.helpers.safe_join(tiptap_document.map(&:to_html))
  end

  def excerpt
    return "" unless content
    return @excerpt if @excerpt

    first_paragraph_index = content["content"].find_index { |block| block["type"] == "paragraph" }

    return "" unless first_paragraph_index

    until_first_paragraph = content["content"].take(first_paragraph_index + 1)

    document = TipTap::Document.from_json({
      "type": "doc",
      "content": until_first_paragraph
    })

    @excerpt = ActionController::Base.helpers.safe_join(document.map(&:to_html))
  end

  def self.search(query)
    where('lower(title) LIKE :search', search: "%#{query}%")
  end

  def self.types
    CardType.constants
      .map { ('CardType::' + _1.to_s).constantize }
      .select { _1 < ApplicationRecord }
  end

  def icon
    specific.icon
  end

  def friendly_title
    if title.blank?
      "Unnammed #{specific.model_name.human}"
    else
      title
    end
  end

  def link_mentions
    def walk_tree(tree, &block)
      yield tree

      if tree["content"]
        tree["content"].each { walk_tree(_1, &block) }
      end

      return tree
    end

    return unless content

    walk_tree(content) do |node|
      if node["type"] == "mention"
        params = Rails.application.routes.recognize_path(node["attrs"]["id"])
        CardLink.find_or_create_by(card_id: id, to_id: params[:id])
      end
    end
  end
end
