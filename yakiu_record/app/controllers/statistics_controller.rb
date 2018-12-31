class StatisticsController < ApplicationController
  before_action :set_statistic, only: [:show, :edit, :update, :destroy]

  # GET /statistics
  # GET /statistics.json
  def index
    @statistics = Statistic.where(user_id: 3, game_id: 1)

  end

  def create_statistics(user_id, game_id)
    #@test = Statistic.summary(user_id, user_id)
    @test = Statistic.summary(3, 1)
    pp @test
    @test.each do |at_bat, one_base_hit, two_base_hit, three_base_hit, home_run, base_balls, hit_by_pitch, strike_out, get_double_play, sacrifice_fly, sacrifice_hit, stolen_base, caught_stealing, base_error, runs_scored, run_batted_in, ground_out, fly_out|
      @at_bat         = at_bat
      @one_base_hit   = one_base_hit
      @two_base_hit   = two_base_hit
      @three_base_hit = three_base_hit
      @home_run       = home_run
      @base_balls     = base_balls
      @hit_by_pitch   = hit_by_pitch
      @strike_out     = strike_out
      @get_double_play = get_double_play
      @sacrifice_fly   = sacrifice_fly
      @sacrifice_hit   = sacrifice_hit
      @stolen_base     = stolen_base
      @caught_stealing = caught_stealing
      @base_error     = base_error
      @runs_scored    = runs_scored
      @run_batted_in  = run_batted_in
      @ground_out     = ground_out
      @fly_out        = fly_out
    end

    @statistic_data = Record.where(user_id: 3, game_id: 1)

    @statistic_data.each do |statistic|
      anda = statistic.one_base_hit.to_f + statistic.two_base_hit.to_f + statistic.three_base_hit.to_f + statistic.home_run.to_f
      shishi = statistic.base_balls.to_f + statistic.hit_by_pitch.to_f
      @total_bases = statistic.one_base_hit.to_i + statistic.two_base_hit.to_i * 2 + statistic.three_base_hit.to_i * 3 + statistic.home_run.to_i * 4
      @average = anda / statistic.at_bat.to_f
      @on_base_percentage = (anda + shishi) / (statistic.at_bat.to_f + shishi + statistic.sacrifice_fly.to_f + statistic.sacrifice_hit.to_f)
      @slugging_percentage = @total_bases / statistic.at_bat.to_f
      @OPS = @on_base_percentage + @slugging_percentage
      @batting_eye = shishi / statistic.strike_out.to_f
      @xr = statistic.one_base_hit.to_f
        + statistic.two_base_hit.to_f * 1.44
        + statistic.three_base_hit.to_f * 2.08
        + statistic.home_run.to_f * 2.88
        + shishi.to_f * 0.68
        + statistic.stolen_base.to_f * 0.36
        + (statistic.at_bat.to_f - anda.to_f - statistic.strike_out.to_f) * (-0.18)
        + statistic.strike_out.to_f * (-0.196)
        + statistic.get_double_play.to_f * (-0.74)
        + statistic.sacrifice_fly.to_f * 0.74
        + statistic.sacrifice_hit.to_f * 0.08
        #+ statistic.caught_stealing * (-0.64)
      #@xr27 = xr / (statistic.at_bat - anda + statistic.caught_stealing + statistic.sacrifice_fly + statistic.sacrifice_hit + statistic.get_double_play) * 27
      @xr27 = @xr / (statistic.at_bat - anda + statistic.sacrifice_fly + statistic.sacrifice_hit + statistic.get_double_play) * 27
      @wOBA = (
        0.692 * statistic.base_balls
        + 0.73 * statistic.hit_by_pitch
        +0.966 * statistic.base_error
        +0.865 * statistic.one_base_hit
        +1.334 * statistic.two_base_hit
        +1.725 * statistic.three_base_hit
        +2.065 * statistic.home_run) / (statistic.at_bat + shishi + statistic.sacrifice_fly)
      #@wRAA＝(@wOBA - @wOBA_avr) / 1.24 * statistic.at_bat

      end

      @param1 = {
        "game_id"=>"1",
        "user_id"=>"3",
        "plate_appearance"=>"1",
        "at_bat"=>@at_bat,
        "one_base_hit"=>"0",
        "two_base_hit"=>"0",
        "three_base_hit"=>"0",
        "home_run"=>"1",
        "base_balls"=>"0",
        "hit_by_pitch"=>"0",
        "strike_out"=>"0",
        "get_double_play"=>"0",
        "sacrifice_fly"=>"0",
        "sacrifice_hit"=>"0",
        "stolen_base"=>"0",
        "base_error"=>"0",
        "caught_stealing"=>"0"
      }
      Statistic.create(@param1)
  end

  # GET /statistics/1
  # GET /statistics/1.json
  def show
  end

  # GET /statistics/new
  def new
    @statistic = Statistic.new
  end

  # GET /statistics/1/edit
  def edit
  end

  # POST /statistics
  # POST /statistics.json
  def create
    @statistic = Statistic.new(statistic_params)

    respond_to do |format|
      if @statistic.save
        format.html { redirect_to @statistic, notice: 'Statistic was successfully created.' }
        format.json { render :show, status: :created, location: @statistic }
      else
        format.html { render :new }
        format.json { render json: @statistic.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /statistics/1
  # PATCH/PUT /statistics/1.json
  def update
    respond_to do |format|
      if @statistic.update(statistic_params)
        format.html { redirect_to @statistic, notice: 'Statistic was successfully updated.' }
        format.json { render :show, status: :ok, location: @statistic }
      else
        format.html { render :edit }
        format.json { render json: @statistic.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /statistics/1
  # DELETE /statistics/1.json
  def destroy
    @statistic.destroy
    respond_to do |format|
      format.html { redirect_to statistics_url, notice: 'Statistic was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_statistic
      @statistic = Statistic.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def statistic_params
      params.require(:statistic).permit(:game_id, :user_id, :plate_appearance, :at_bat, :one_base_hit, :two_base_hit, :three_base_hit, :home_run, :base_balls, :hit_by_pitch, :strike_out, :get_double_play, :sacrifice_fly, :sacrifice_hit, :stolen_base, :base_error, :total_bases, :average, :on_base_percentage, :slugging_percentage, :OPS, :stolen_base, :RISP_BA, :batting_eye, :XR27, :wOBA, :wRAA)
    end
end
