require "application_system_test_case"

class RecordsTest < ApplicationSystemTestCase
  setup do
    @record = records(:one)
  end

  test "visiting the index" do
    visit records_url
    assert_selector "h1", text: "Records"
  end

  test "creating a Record" do
    visit records_url
    click_on "New Record"

    fill_in "At bat", with: @record.at_bat
    fill_in "Base balls", with: @record.base_balls
    fill_in "Base error", with: @record.base_error
    fill_in "Caught stealing", with: @record.caught_stealing
    fill_in "Fly out", with: @record.fly_out
    fill_in "Game", with: @record.game_id
    fill_in "Get double play", with: @record.get_double_play
    fill_in "Ground out", with: @record.ground_out
    fill_in "Hit by pitch", with: @record.hit_by_pitch
    fill_in "Home run", with: @record.home_run
    fill_in "One base hit", with: @record.one_base_hit
    fill_in "Plate appearance", with: @record.plate_appearance
    fill_in "Run batted in", with: @record.run_batted_in
    fill_in "Runs scored", with: @record.runs_scored
    fill_in "Sacrifice fly", with: @record.sacrifice_fly
    fill_in "Sacrifice hit", with: @record.sacrifice_hit
    fill_in "Scoring position", with: @record.scoring_position
    fill_in "Stolen base", with: @record.stolen_base
    fill_in "Strike out", with: @record.strike_out
    fill_in "Three base hit", with: @record.three_base_hit
    fill_in "Two base hit", with: @record.two_base_hit
    fill_in "User", with: @record.user_id
    click_on "Create Record"

    assert_text "Record was successfully created"
    click_on "Back"
  end

  test "updating a Record" do
    visit records_url
    click_on "Edit", match: :first

    fill_in "At bat", with: @record.at_bat
    fill_in "Base balls", with: @record.base_balls
    fill_in "Base error", with: @record.base_error
    fill_in "Caught stealing", with: @record.caught_stealing
    fill_in "Fly out", with: @record.fly_out
    fill_in "Game", with: @record.game_id
    fill_in "Get double play", with: @record.get_double_play
    fill_in "Ground out", with: @record.ground_out
    fill_in "Hit by pitch", with: @record.hit_by_pitch
    fill_in "Home run", with: @record.home_run
    fill_in "One base hit", with: @record.one_base_hit
    fill_in "Plate appearance", with: @record.plate_appearance
    fill_in "Run batted in", with: @record.run_batted_in
    fill_in "Runs scored", with: @record.runs_scored
    fill_in "Sacrifice fly", with: @record.sacrifice_fly
    fill_in "Sacrifice hit", with: @record.sacrifice_hit
    fill_in "Scoring position", with: @record.scoring_position
    fill_in "Stolen base", with: @record.stolen_base
    fill_in "Strike out", with: @record.strike_out
    fill_in "Three base hit", with: @record.three_base_hit
    fill_in "Two base hit", with: @record.two_base_hit
    fill_in "User", with: @record.user_id
    click_on "Update Record"

    assert_text "Record was successfully updated"
    click_on "Back"
  end

  test "destroying a Record" do
    visit records_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Record was successfully destroyed"
  end
end
