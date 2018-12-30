require "application_system_test_case"

class StatisticsTest < ApplicationSystemTestCase
  setup do
    @statistic = statistics(:one)
  end

  test "visiting the index" do
    visit statistics_url
    assert_selector "h1", text: "Statistics"
  end

  test "creating a Statistic" do
    visit statistics_url
    click_on "New Statistic"

    fill_in "Ops", with: @statistic.OPS
    fill_in "Risp ba", with: @statistic.RISP_BA
    fill_in "Xr27", with: @statistic.XR27
    fill_in "At bat", with: @statistic.at_bat
    fill_in "Average", with: @statistic.average
    fill_in "Base balls", with: @statistic.base_balls
    fill_in "Base error", with: @statistic.base_error
    fill_in "Batting eye", with: @statistic.batting_eye
    fill_in "Game", with: @statistic.game_id
    fill_in "Get double play", with: @statistic.get_double_play
    fill_in "Hit by pitch", with: @statistic.hit_by_pitch
    fill_in "Home run", with: @statistic.home_run
    fill_in "On base percentage", with: @statistic.on_base_percentage
    fill_in "One base hit", with: @statistic.one_base_hit
    fill_in "Plate appearance", with: @statistic.plate_appearance
    fill_in "Sacrifice fly", with: @statistic.sacrifice_fly
    fill_in "Sacrifice hit", with: @statistic.sacrifice_hit
    fill_in "Slugging percentage", with: @statistic.slugging_percentage
    fill_in "Stolen base", with: @statistic.stolen_base
    fill_in "Strike out", with: @statistic.strike_out
    fill_in "Three base hit", with: @statistic.three_base_hit
    fill_in "Total bases", with: @statistic.total_bases
    fill_in "Two base hit", with: @statistic.two_base_hit
    fill_in "User", with: @statistic.user_id
    fill_in "Woba", with: @statistic.wOBA
    fill_in "Wraa", with: @statistic.wRAA
    click_on "Create Statistic"

    assert_text "Statistic was successfully created"
    click_on "Back"
  end

  test "updating a Statistic" do
    visit statistics_url
    click_on "Edit", match: :first

    fill_in "Ops", with: @statistic.OPS
    fill_in "Risp ba", with: @statistic.RISP_BA
    fill_in "Xr27", with: @statistic.XR27
    fill_in "At bat", with: @statistic.at_bat
    fill_in "Average", with: @statistic.average
    fill_in "Base balls", with: @statistic.base_balls
    fill_in "Base error", with: @statistic.base_error
    fill_in "Batting eye", with: @statistic.batting_eye
    fill_in "Game", with: @statistic.game_id
    fill_in "Get double play", with: @statistic.get_double_play
    fill_in "Hit by pitch", with: @statistic.hit_by_pitch
    fill_in "Home run", with: @statistic.home_run
    fill_in "On base percentage", with: @statistic.on_base_percentage
    fill_in "One base hit", with: @statistic.one_base_hit
    fill_in "Plate appearance", with: @statistic.plate_appearance
    fill_in "Sacrifice fly", with: @statistic.sacrifice_fly
    fill_in "Sacrifice hit", with: @statistic.sacrifice_hit
    fill_in "Slugging percentage", with: @statistic.slugging_percentage
    fill_in "Stolen base", with: @statistic.stolen_base
    fill_in "Strike out", with: @statistic.strike_out
    fill_in "Three base hit", with: @statistic.three_base_hit
    fill_in "Total bases", with: @statistic.total_bases
    fill_in "Two base hit", with: @statistic.two_base_hit
    fill_in "User", with: @statistic.user_id
    fill_in "Woba", with: @statistic.wOBA
    fill_in "Wraa", with: @statistic.wRAA
    click_on "Update Statistic"

    assert_text "Statistic was successfully updated"
    click_on "Back"
  end

  test "destroying a Statistic" do
    visit statistics_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Statistic was successfully destroyed"
  end
end
