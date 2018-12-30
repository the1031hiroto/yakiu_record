require 'test_helper'

class StatisticsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @statistic = statistics(:one)
  end

  test "should get index" do
    get statistics_url
    assert_response :success
  end

  test "should get new" do
    get new_statistic_url
    assert_response :success
  end

  test "should create statistic" do
    assert_difference('Statistic.count') do
      post statistics_url, params: { statistic: { OPS: @statistic.OPS, RISP_BA: @statistic.RISP_BA, XR27: @statistic.XR27, at_bat: @statistic.at_bat, average: @statistic.average, base_balls: @statistic.base_balls, base_error: @statistic.base_error, batting_eye: @statistic.batting_eye, game_id: @statistic.game_id, get_double_play: @statistic.get_double_play, hit_by_pitch: @statistic.hit_by_pitch, home_run: @statistic.home_run, on_base_percentage: @statistic.on_base_percentage, one_base_hit: @statistic.one_base_hit, plate_appearance: @statistic.plate_appearance, sacrifice_fly: @statistic.sacrifice_fly, sacrifice_hit: @statistic.sacrifice_hit, slugging_percentage: @statistic.slugging_percentage, stolen_base: @statistic.stolen_base, strike_out: @statistic.strike_out, three_base_hit: @statistic.three_base_hit, total_bases: @statistic.total_bases, two_base_hit: @statistic.two_base_hit, user_id: @statistic.user_id, wOBA: @statistic.wOBA, wRAA: @statistic.wRAA } }
    end

    assert_redirected_to statistic_url(Statistic.last)
  end

  test "should show statistic" do
    get statistic_url(@statistic)
    assert_response :success
  end

  test "should get edit" do
    get edit_statistic_url(@statistic)
    assert_response :success
  end

  test "should update statistic" do
    patch statistic_url(@statistic), params: { statistic: { OPS: @statistic.OPS, RISP_BA: @statistic.RISP_BA, XR27: @statistic.XR27, at_bat: @statistic.at_bat, average: @statistic.average, base_balls: @statistic.base_balls, base_error: @statistic.base_error, batting_eye: @statistic.batting_eye, game_id: @statistic.game_id, get_double_play: @statistic.get_double_play, hit_by_pitch: @statistic.hit_by_pitch, home_run: @statistic.home_run, on_base_percentage: @statistic.on_base_percentage, one_base_hit: @statistic.one_base_hit, plate_appearance: @statistic.plate_appearance, sacrifice_fly: @statistic.sacrifice_fly, sacrifice_hit: @statistic.sacrifice_hit, slugging_percentage: @statistic.slugging_percentage, stolen_base: @statistic.stolen_base, strike_out: @statistic.strike_out, three_base_hit: @statistic.three_base_hit, total_bases: @statistic.total_bases, two_base_hit: @statistic.two_base_hit, user_id: @statistic.user_id, wOBA: @statistic.wOBA, wRAA: @statistic.wRAA } }
    assert_redirected_to statistic_url(@statistic)
  end

  test "should destroy statistic" do
    assert_difference('Statistic.count', -1) do
      delete statistic_url(@statistic)
    end

    assert_redirected_to statistics_url
  end
end
