# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_12_30_110816) do

  create_table "records", force: :cascade do |t|
    t.integer "game_id", null: false
    t.integer "user_id", null: false
    t.integer "plate_appearance", null: false
    t.integer "at_bat", default: 0, null: false
    t.integer "one_base_hit", default: 0, null: false
    t.integer "two_base_hit", default: 0, null: false
    t.integer "three_base_hit", default: 0, null: false
    t.integer "home_run", default: 0, null: false
    t.integer "base_balls", default: 0, null: false
    t.integer "hit_by_pitch", default: 0, null: false
    t.integer "strike_out", default: 0, null: false
    t.integer "get_double_play", default: 0, null: false
    t.integer "sacrifice_fly", default: 0, null: false
    t.integer "sacrifice_hit", default: 0, null: false
    t.integer "stolen_base", default: 0, null: false
    t.integer "caught_stealing", default: 0, null: false
    t.integer "base_error", default: 0, null: false
    t.integer "runs_scored", default: 0, null: false
    t.integer "run_batted_in", default: 0, null: false
    t.integer "scoring_position", default: 0, null: false
    t.integer "ground_out", default: 0, null: false
    t.integer "fly_out", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "statistics", force: :cascade do |t|
    t.integer "game_id", null: false
    t.integer "user_id", null: false
    t.integer "plate_appearance", null: false
    t.integer "at_bat"
    t.integer "one_base_hit"
    t.integer "two_base_hit"
    t.integer "three_base_hit"
    t.integer "home_run"
    t.integer "base_balls"
    t.integer "hit_by_pitch"
    t.integer "strike_out"
    t.integer "get_double_play"
    t.integer "sacrifice_fly"
    t.integer "sacrifice_hit"
    t.integer "stolen_base"
    t.integer "caught_stealing"
    t.integer "base_error"
    t.integer "total_bases"
    t.integer "average"
    t.integer "on_base_percentage"
    t.integer "slugging_percentage"
    t.integer "OPS"
    t.integer "RISP_BA"
    t.integer "batting_eye"
    t.integer "XR27"
    t.integer "wOBA"
    t.integer "wRAA"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "team_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
