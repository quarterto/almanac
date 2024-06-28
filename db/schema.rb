# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2024_06_26_105718) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "campaigns", force: :cascade do |t|
    t.string "name"
    t.string "tagline"
    t.string "slug"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "public"
    t.string "invite_token"
    t.index ["invite_token"], name: "index_campaigns_on_invite_token", unique: true
  end

  create_table "card_links", force: :cascade do |t|
    t.bigint "card_id", null: false
    t.bigint "to_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["card_id"], name: "index_card_links_on_card_id"
    t.index ["to_id"], name: "index_card_links_on_to_id"
  end

  create_table "card_type_documents", force: :cascade do |t|
    t.bigint "location_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["location_id"], name: "index_card_type_documents_on_location_id"
  end

  create_table "card_type_locations", force: :cascade do |t|
    t.bigint "parent_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["parent_id"], name: "index_card_type_locations_on_parent_id"
  end

  create_table "card_type_objectives", force: :cascade do |t|
    t.boolean "completed"
    t.bigint "quest_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "location_id"
    t.index ["location_id"], name: "index_card_type_objectives_on_location_id"
    t.index ["quest_id"], name: "index_card_type_objectives_on_quest_id"
  end

  create_table "card_type_quests", force: :cascade do |t|
    t.boolean "completed"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "location_id"
    t.index ["location_id"], name: "index_card_type_quests_on_location_id"
  end

  create_table "cards", force: :cascade do |t|
    t.string "title"
    t.bigint "campaign_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "actable_type"
    t.bigint "actable_id"
    t.string "card_type"
    t.integer "visible", default: 0
    t.integer "editable", default: 0
    t.bigint "owner_id", null: false
    t.string "description"
    t.jsonb "content"
    t.index ["actable_type", "actable_id"], name: "index_cards_on_actable"
    t.index ["campaign_id"], name: "index_cards_on_campaign_id"
    t.index ["owner_id"], name: "index_cards_on_owner_id"
  end

  create_table "dashboards", force: :cascade do |t|
    t.bigint "campaign_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "current_location_id"
    t.index ["campaign_id"], name: "index_dashboards_on_campaign_id"
    t.index ["current_location_id"], name: "index_dashboards_on_current_location_id"
  end

  create_table "images", force: :cascade do |t|
    t.string "actable_type"
    t.bigint "actable_id"
    t.string "imageable_type"
    t.bigint "imageable_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["actable_type", "actable_id"], name: "index_images_on_actable"
    t.index ["imageable_type", "imageable_id"], name: "index_images_on_imageable"
  end

  create_table "unsplash_images", force: :cascade do |t|
    t.string "unsplash_id"
    t.jsonb "data"
  end

  create_table "user_campaigns", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "campaign_id", null: false
    t.integer "access"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "accepted", default: false
    t.index ["campaign_id"], name: "index_user_campaigns_on_campaign_id"
    t.index ["user_id", "campaign_id"], name: "index_user_campaigns_on_user_id_and_campaign_id", unique: true
    t.index ["user_id"], name: "index_user_campaigns_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "username"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "card_links", "cards", column: "to_id"
  add_foreign_key "card_type_documents", "card_type_locations", column: "location_id"
  add_foreign_key "card_type_locations", "card_type_locations", column: "parent_id"
  add_foreign_key "card_type_objectives", "card_type_locations", column: "location_id"
  add_foreign_key "card_type_objectives", "card_type_quests", column: "quest_id"
  add_foreign_key "card_type_quests", "card_type_locations", column: "location_id"
  add_foreign_key "cards", "campaigns"
  add_foreign_key "cards", "users", column: "owner_id"
  add_foreign_key "dashboards", "campaigns"
  add_foreign_key "dashboards", "card_type_locations", column: "current_location_id"
  add_foreign_key "user_campaigns", "campaigns"
  add_foreign_key "user_campaigns", "users"
end
