# ここには 0 or 1 で保存してstatisticsに試合毎の合計と率系を保存 ※打点は数値
class CreateRecords < ActiveRecord::Migration[5.2]
  def change
    create_table :records do |t|
      t.integer :game_id, null: false, comment: "試合のID"
      t.integer :user_id, null: false, comment: "ユーザーのID"
      t.integer :plate_appearance, null: false, comment: "打席の有無"
      t.integer :at_bat, :null => false, default: 0, comment: "打数"
      t.integer :one_base_hit, :null => false, default: 0, comment: "シングルヒット"
      t.integer :two_base_hit, :null => false, default: 0, comment: "ツーベースヒット"
      t.integer :three_base_hit, :null => false, default: 0, comment: "スリーベースヒット"
      t.integer :home_run, :null => false, default: 0, comment: "ホームラン"
      t.integer :base_balls, :null => false, default: 0, comment: "四球"
      t.integer :hit_by_pitch, :null => false, default: 0, comment: "死球"
      t.integer :strike_out, :null => false, default: 0, comment: "三振"
      t.integer :get_double_play, :null => false, default: 0, comment: "併殺打"
      t.integer :sacrifice_fly, :null => false, default: 0, comment: "犠牲フライ"
      t.integer :sacrifice_hit, :null => false, default: 0, comment: "犠牲バント"
      t.integer :stolen_base, :null => false, default: 0, comment: "盗塁"
      t.integer :caught_stealing, :null => false, default: 0, comment: "盗塁死"
      t.integer :base_error, :null => false, default: 0, comment: "失策出塁"
      t.integer :runs_scored, :null => false, default: 0, comment: "得点"
      t.integer :run_batted_in, :null => false, default: 0, comment: "打点"
      t.integer :scoring_position, :null => false, default: 0, comment: "得点圏であったか否か"
      t.integer :ground_out, :null => false, default: 0, comment: "ゴロアウト"
      t.integer :fly_out, :null => false, default: 0, comment: "フライアウト"

      t.timestamps
    end
  end
end
