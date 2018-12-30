class CreateRecords < ActiveRecord::Migration[5.2]
  def change
    create_table :records do |t|
      t.integer :game_id
      t.integer :user_id
      t.integer :plate_appearance
      t.integer :at_bat
      t.integer :one_base_hit
      t.integer :two_base_hit
      t.integer :three_base_hit
      t.integer :home_run
      t.integer :base_balls
      t.integer :hit_by_pitch
      t.integer :strike_out
      t.integer :get_double_play
      t.integer :sacrifice_fly
      t.integer :sacrifice_hit
      t.integer :stolen_base
      t.integer :base_error
      t.integer :runs_scored
      t.integer :run_batted_in
      t.integer :scoring_position
      t.integer :caught_stealing
      t.integer :ground_out
      t.integer :fly_out

      t.timestamps
    end
  end
end
