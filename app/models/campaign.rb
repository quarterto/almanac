class Campaign < ApplicationRecord
  has_unique_slug subject: :name
  has_secure_token :invite_token
  has_many :pending_invites, -> { where(accepted: false) }, class_name: 'UserCampaign'
  has_many :user_campaigns, -> { where(accepted: true) }
  has_many :users, through: :user_campaigns
  has_many :cards
  has_one :dashboard, required: true
  has_one :image, as: :imageable
  accepts_nested_attributes_for :image, reject_if: proc { |attributes| !Image.valid_params? attributes }

  has_many :quests, source_type: 'CardType::Quest', through: :cards, source: :actable
  has_many :locations, source_type: 'CardType::Location', through: :cards, source: :actable
  has_many :objectives, source_type: 'CardType::Objective', through: :cards, source: :actable
  has_many :documents, source_type: 'CardType::Document', through: :cards, source: :actable

  alias_method :campaign_users, :user_campaigns

  only_visible :cards, :quests, :locations, :objectives

  def visible?(user, _unused_minimum_visibility = "whatever")
    public || editable?(user)
  end

  def editable?(user)
    user && campaign_users.where(user: user).exists?
  end

  def owner?(user)
    campaign_users.where(user: user, access: :owner).exists?
  end

  def specific
    self
  end
end
