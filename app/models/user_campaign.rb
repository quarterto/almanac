class UserCampaign < ApplicationRecord
  belongs_to :user
  belongs_to :campaign
  enum access: %i[owner member]
  validates :user_id, uniqueness: { scope: :campaign_id }
end
