class CreateStatistics < ActiveRecord::Migration[5.2]
  def change
    create_table :statistics do |t|
      t.integer :game_id, null: false, comment: "試合のID"
      t.integer :user_id, null: false, comment: "ユーザーのID"
      t.integer :plate_appearance, null: false, comment: "打席の有無"
      t.integer :at_bat, comment: "打数"
      t.integer :one_base_hit, comment: "シングルヒット"
      t.integer :two_base_hit, comment: "ツーベースヒット"
      t.integer :three_base_hit, comment: "スリーベースヒット"
      t.integer :home_run, comment: "ホームラン"
      t.integer :base_balls, comment: "四球"
      t.integer :hit_by_pitch, comment: "死球"
      t.integer :strike_out, comment: "三振"
      t.integer :get_double_play, comment: "併殺打"
      t.integer :sacrifice_fly, comment: "犠牲フライ"
      t.integer :sacrifice_hit, comment: "犠牲バント"
      t.integer :stolen_base, comment: "盗塁"
      t.integer :caught_stealing, comment: "盗塁死"
      t.integer :base_error, comment: "失策出塁"
      t.integer :total_bases, comment: "塁打数"
      t.integer :average, comment: "打率"
      t.integer :on_base_percentage, comment: "出塁率"
      t.integer :slugging_percentage, comment: "長打率"
      t.integer :OPS, comment: "On-base plus slugging 出塁率と長打率とを足し合わせた値"
      t.integer :RISP_BA, comment: "得点圏打率"
      t.integer :batting_eye, comment: "選球眼"
      t.integer :XR27, comment: "eXtrapolated Runs 得点におけるチームへの貢献度 チームの全打者のRCを足すと、チームの総得点とほぼ同じになる"
      t.integer :wOBA, comment: "Weighted On Base Average 打席あたりにどれだけチームの得点増に貢献する打撃をしているか"
      t.integer :wRAA, comment: "Weighted Runs Above Average どれだけチームの得点を増やしたか、平均的な打者であればゼロ"

      t.timestamps
    end
  end
end
