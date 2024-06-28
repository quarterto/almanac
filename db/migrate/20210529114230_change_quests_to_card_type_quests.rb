class ChangeQuestsToCardTypeQuests < ActiveRecord::Migration[6.1]
  def change
    rename_table :quests, :card_type_quests
  end
end
