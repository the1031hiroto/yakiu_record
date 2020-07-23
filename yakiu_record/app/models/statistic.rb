class Statistic < ApplicationRecord
    # TODO: 複数カラムに対する集計をArelも生SQLも使わず実行する方法
    def self.summary(user_id, game_id)
        sql = '' '
        SELECT
        SUM(cs.at_bat)              AS at_bat,
        SUM(cs.one_base_hit)        AS one_base_hit,
        SUM(cs.two_base_hit)        AS two_base_hit,
        SUM(cs.three_base_hit)      AS three_base_hit,
        SUM(cs.home_run)            AS home_run,
        SUM(cs.base_balls)          AS base_balls,
        SUM(cs.hit_by_pitch)        AS hit_by_pitch,
        SUM(cs.strike_out)          AS strike_out,
        SUM(cs.get_double_play)     AS get_double_play,
        SUM(cs.sacrifice_fly)       AS sacrifice_fly,
        SUM(cs.sacrifice_hit)       AS sacrifice_hit,
        SUM(cs.stolen_base)         AS stolen_base,
        SUM(cs.caught_stealing)     AS caught_stealing,
        SUM(cs.base_error)          AS base_error,
        SUM(cs.runs_scored)         AS runs_scored,
        SUM(cs.run_batted_in)       AS run_batted_in,
        SUM(cs.ground_out)          AS ground_out,
        SUM(cs.fly_out)             AS fly_out
        FROM       records AS cs
        WHERE cs.user_id = :user_id
            AND cs.game_id = :game_id
        ' ''

        query = ActiveRecord::Base.send(
            :sanitize_sql_array,
            [
                sql,
                user_id: user_id, game_id: game_id
            ]
        )

        ActiveRecord::Base.connection.select_rows(query)
    end
end
