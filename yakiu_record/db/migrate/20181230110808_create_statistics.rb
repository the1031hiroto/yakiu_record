class CreateStatistics < ActiveRecord::Migration[5.2]
  def change
    create_table :statistics do |t|
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
      t.integer :total_bases
      t.integer :average
      t.integer :on_base_percentage
      t.integer :slugging_percentage
      t.integer :OPS
      t.integer :stolen_base
      t.integer :RISP_BA
      t.integer :batting_eye
      t.integer :XR27
      t.integer :wOBA
      t.integer :wRAA

      t.timestamps
    end
  end
end
