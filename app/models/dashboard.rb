class Dashboard < ApplicationRecord
  belongs_to :campaign
  belongs_to :current_location, class_name: 'CardType::Location', optional: true

  after_save :broadcast

  def broadcast
    DashboardChannel.broadcast_to(self, {
      campaign: campaign.slug,
      location: current_location&.slug
    })
  end
end
