require 'test_helper'

class RecordsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @record = records(:one)
  end

  test "should get index" do
    get records_url
    assert_response :success
  end

  test "should get new" do
    get new_record_url
    assert_response :success
  end

  test "should create record" do
    assert_difference('Record.count') do
      post records_url, params: { record: { at_bat: @record.at_bat, base_balls: @record.base_balls, base_error: @record.base_error, caught_stealing: @record.caught_stealing, fly_out: @record.fly_out, game_id: @record.game_id, get_double_play: @record.get_double_play, ground_out: @record.ground_out, hit_by_pitch: @record.hit_by_pitch, home_run: @record.home_run, one_base_hit: @record.one_base_hit, plate_appearance: @record.plate_appearance, run_batted_in: @record.run_batted_in, runs_scored: @record.runs_scored, sacrifice_fly: @record.sacrifice_fly, sacrifice_hit: @record.sacrifice_hit, scoring_position: @record.scoring_position, stolen_base: @record.stolen_base, strike_out: @record.strike_out, three_base_hit: @record.three_base_hit, two_base_hit: @record.two_base_hit, user_id: @record.user_id } }
    end

    assert_redirected_to record_url(Record.last)
  end

  test "should show record" do
    get record_url(@record)
    assert_response :success
  end

  test "should get edit" do
    get edit_record_url(@record)
    assert_response :success
  end

  test "should update record" do
    patch record_url(@record), params: { record: { at_bat: @record.at_bat, base_balls: @record.base_balls, base_error: @record.base_error, caught_stealing: @record.caught_stealing, fly_out: @record.fly_out, game_id: @record.game_id, get_double_play: @record.get_double_play, ground_out: @record.ground_out, hit_by_pitch: @record.hit_by_pitch, home_run: @record.home_run, one_base_hit: @record.one_base_hit, plate_appearance: @record.plate_appearance, run_batted_in: @record.run_batted_in, runs_scored: @record.runs_scored, sacrifice_fly: @record.sacrifice_fly, sacrifice_hit: @record.sacrifice_hit, scoring_position: @record.scoring_position, stolen_base: @record.stolen_base, strike_out: @record.strike_out, three_base_hit: @record.three_base_hit, two_base_hit: @record.two_base_hit, user_id: @record.user_id } }
    assert_redirected_to record_url(@record)
  end

  test "should destroy record" do
    assert_difference('Record.count', -1) do
      delete record_url(@record)
    end

    assert_redirected_to records_url
  end
end
