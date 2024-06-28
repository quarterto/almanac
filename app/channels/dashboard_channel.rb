class DashboardChannel < ApplicationCable::Channel
  def subscribed
    campaign = Campaign.find_by_slug!(params[:slug])

    stream_for campaign.dashboard
  end
end
