Vue.use(VueTables.ClientTable);

    // Initialize Firebase
    const config = {
        apiKey: "AIzaSyAfY3sQefndqAkiaNvtY7552r189oaLTsk",
        authDomain: "yakiu-test.firebaseapp.com",
        databaseURL: "https://yakiu-test.firebaseio.com",
        projectId: "yakiu-test",
        storageBucket: "yakiu-test.appspot.com",
        messagingSenderId: "370663517286"
    };
    firebase.initializeApp(config);

    const columns = [
        "選手名",
        "試合",
        "打席数",
        "打数",
        "1塁打",
        "2塁打",
        "3塁打",
        "本塁打",
        "打点",
        "得点",
        "四球",
        "死球",
        "三振",
        "併殺打",
        "犠飛",
        "犠打",
        "盗塁",
        "牽制死",
        "失策出",
        "塁打数",
        "打率",
        "出塁率",
        "長打率",
        "OPS",
        "得点圏打率",
        "三振率",
        "四球率",
        "選球眼",
        "XR",
        "XR27",
        "wOBA",
        "wRAA",
        ]

    const db = firebase.database();
        const allRawData = db.ref("/records");
        allRawData.on('value', function(snapshot) {
            let allData = snapshot.val()
            console.log(allData)

            const demo = new Vue({
                el: '#demo',
                data: {
                    searchQuery: '',
                    columns: columns,
                    mainData: calculation(allData).mainData,
                    options: {
                        columnsDropdown: true,
                        filterByColumn: true,
                        sortable: columns,
                        highlightMatches: true
                        //headings: {
                        //    選手名: 'id',
                        //    試合: '名前',
                        //    打席数: 'メールアドレス'
                        //},
                        //headingsTooltips: {'選手名':'Expanded Title', '試合':'Expanded Title'}
                    },
                    hitOptions: [
                        { text: '出塁', value: '' },
                        { text: '1塁打', value: '1塁打' },
                        { text: '2塁打', value: '2塁打' },
                        { text: '3塁打', value: '3塁打' },
                        { text: '本塁打', value: '本塁打' },
                        { text: '四球', value: '四球' },
                        { text: '死球', value: '死球' },
                        { text: '失策出', value: '失策出' }
                    ],
                    outOptions: [
                        { text: 'アウト', value: '' },
                        { text: 'ゴロアウト', value: 'ゴロアウト' },
                        { text: 'フライアウト', value: 'フライアウト' },
                        { text: '三振', value: '三振' },
                        { text: '犠打', value: '犠打' },
                        { text: '犠飛', value: '犠飛' }
                    ],
                    onBallOptions: [
                        { text: '打球', value: '' },
                        { text: '1塁', value: '1塁' },
                        { text: '1,2塁間', value: '2塁間' },
                        { text: '2塁', value: '2塁' },
                        { text: '2遊間', value: '2遊間' },
                        { text: 'ショート', value: 'ショート' },
                        { text: '3遊間', value: '3遊間' },
                        { text: '3塁', value: '3塁' },
                        { text: 'ライト', value: 'ライト' },
                        { text: '右中間', value: '右中間' },
                        { text: 'センター', value: 'センター' },
                        { text: '左中間', value: 'ラ左中間イト' },
                        { text: 'レフト', value: 'レフト' }
                    ],
                    options: [
                        { text: '得点圏', value: '得点圏' },
                        { text: 'ランナー1塁', value: 'ランナー1塁' },
                        { text: '進塁打', value: '進塁打' },
                        { text: 'ゲッツー崩れ', value: 'ゲッツー崩れ' }
                    ],
                    batter: "",
                    hit: "",
                    onBall: "",
                    out: "",
                    optionResult: []
                },
                methods: {
                    submit: function () {
                        console.log("this.batter")
                        console.log(this.batter)
                        result = {
                            "打席数": 1
                        }
                        //TODO: game_id
                        //TODO: 条件分岐をちゃんとする
                        if (this.hit == "四球" || this.hit == "死球" || this.out == "犠打" || this.out == "犠飛") {
                            result["打数"] = 0
                        } else {
                            result["打数"] = 1
                        }
                        if (this.hit) {
                            result[this.hit] = 1
                        } else {
                            result[this.out] = 1
                        }
                        //TODO: 条件分岐をちゃんとする
                        //result[this.onBall] = 1
                        console.log(this.onBall)
                        for (i in this.optionResult) {
                            result[this.optionResult[i]] = 1
                        }

                        const directory = '/records/' + this.batter +'/records'
                        console.log(result)
                        console.log(directory)
                        var commentsRef = firebase.database().ref(directory)
                        commentsRef.push(result)
                    }
                }
            })
        });

        function calculation(allData) {
            mainData = []
            let statisticData = {
                "試合": 0,
                "打席数": 0,
                "打数": 0,
                "1塁打": 0,
                "2塁打": 0,
                "3塁打": 0,
                "本塁打": 0,
                "打点": 0,
                "得点": 0,
                "四球": 0,
                "死球": 0,
                "三振": 0,
                "併殺打": 0,
                "犠飛": 0,
                "犠打": 0,
                "盗塁": 0,
                "牽制死": 0,
                "失策出": 0,
                "塁打数": 0,
            }
            let a = 0
            Object.keys(allData).forEach(function (k, i) {
                for (x in allData[k].records) {
                    if (x == "old") {
                        mainData.push(allData[k].records["old"])
                    }
                    if (x != "old") {
                        for (y in allData[k].records[x]) {
                            statisticData[y] += allData[k].records[x][y]
                        }
                    }
                }
                mainData[i]["選手名"] =　k
                //TODO:こっちの方がいいかな
                //mainData[i]["選手名"] =　allData[k].user_infos["選手名"]
            });
            console.log(statisticData)
            statistic(mainData)
            return {mainData, statisticData}
        }

        function statistic(mainData) {
            for (i = 0; i < mainData.length; i++) {
                dasu = mainData[i]["打数"]
                anda = mainData[i]["1塁打"] + mainData[i]["2塁打"] + mainData[i]["3塁打"] + mainData[i]["本塁打"]
                shishi = mainData[i]["四球"] + mainData[i]["死球"]
                mainData[i]["塁打数"] = mainData[i]["1塁打"] + mainData[i]["2塁打"] * 2 + mainData[i]["3塁打"] * 3 + mainData[i]["本塁打"]* 4
                mainData[i]["打率"] = (anda / dasu).toFixed(3)
                mainData[i]["出塁率"] = (anda + shishi) / (dasu + shishi + mainData[i]["犠飛"] + mainData[i]["犠打"])
                mainData[i]["長打率"] = mainData[i]["塁打数"] / dasu
                mainData[i]["OPS"] = (mainData[i]["長打率"] + mainData[i]["出塁率"]).toFixed(3)
                mainData[i]["選球眼"] = (shishi / mainData[i]["三振"]).toFixed(3)
                mainData[i]["XR"] = (
                    mainData[i]["1塁打"]
                    + mainData[i]["2塁打"] * 1.44
                    + mainData[i]["3塁打"] * 2.08
                    + mainData[i]["本塁打"] * 2.88
                    + shishi * 0.68
                    + mainData[i]["盗塁"] * 0.36
                    + (dasu - anda - mainData[i]["三振"]) * (-0.18)
                    + mainData[i]["三振"] * (-0.196)
                    + mainData[i]["併殺打"] * (-0.74)
                    + mainData[i]["犠飛"] * 0.74
                    + mainData[i]["犠打"] * 0.08
                    + mainData[i]["牽制死"] * (-0.64)
                ).toFixed(2)

                mainData[i]["XR27"] = (
                    mainData[i]["XR"] /
                    (dasu -
                    anda +
                    mainData[i]["牽制死"] +
                    mainData[i]["犠飛"] +
                    mainData[i]["犠打"] +
                    mainData[i]["併殺打"]) * 27
                ).toFixed(2)

                mainData[i]["wOBA"] = (
                    0.692 * mainData[i]["四球"] +
                    0.73 * mainData[i]["死球"] +
                    0.966 * mainData[i]["失策出"] +
                    0.865 * mainData[i]["1塁打"] +
                    1.334 * mainData[i]["2塁打"] +
                    1.725 * mainData[i]["3塁打"] +
                    2.065 * mainData[i]["本塁打"]
                ) / (dasu + shishi + mainData[i]["犠飛"])

                mainData[i]["三振率"] = (mainData[i]["三振"] / mainData[i]["打席数"]).toFixed(3)
                mainData[i]["四球率"] = (mainData[i]["四球"] / mainData[i]["打席数"]).toFixed(3)

            }
            calculation_wOBA_avr(mainData)
            return mainData
        }

        function calculation_wOBA_avr(mainData) {
            let wOBA_avr = 0
            for (i = 0; i < mainData.length; i++) {
                wOBA_avr += mainData[i]["wOBA"]
            }
            wOBA_avr /= mainData.length
            add_wRAA(mainData, wOBA_avr)
        }

        function add_wRAA(mainData, wOBA_avr) {
            for (i = 0; i < mainData.length; i++) {
                mainData[i]["wRAA"] = ((mainData[i]["wOBA"]- wOBA_avr) / 1.24 * mainData[i]["打数"]).toFixed(2)
            }
            findMax(mainData)
            return mainData
        }

        function findMax(mainData) {
            let dataList = {
                "game_id": [],
                "選手名": [],
                "試合": [],
                "打席数": [],
                "打数": [],
                "1塁打": [],
                "2塁打": [],
                "3塁打": [],
                "本塁打": [],
                "安打": [],
                "打点": [],
                "得点": [],
                "四球": [],
                "死球": [],
                "三振": [],
                "併殺打": [],
                "犠飛": [],
                "犠打": [],
                "盗塁": [],
                "盗死": [],
                "牽制死": [],
                "失策出": [],
                "塁打数": [],
                "打率": [],
                "出塁率": [],
                "長打率": [],
                "OPS": [],
                "得点圏打率": [],
                "三振率": [],
                "四球率": [],
                "選球眼": [],
                "XR": [],
                "XR27": [],
                "wOBA": [],
                "wRAA": [],
                "ゴロアウト": [],
                "フライアウト": [],
                "打球": [],
            }
            for (i in mainData) {
                for (x in mainData[i]) {
                    dataList[x].push(mainData[i][x])
                }
            }

//TODO:何故かdataListが上書きされる

            let maxData = dataList
            //let minData = dataList
            for (i in dataList) {
                try{
                    maxData[i] = Math.max.apply(null, maxData[i])
                    //minData[i] = Math.min.apply(null, minData[i])
                } catch(e){
                    maxData[i] = null
                    //minData[i] = null
                }
            }
            //console.log(maxData)
            //console.log(minData)
            return maxData
        }

/*
        function changeData(){
            //var text = document.getElementById("my_text").value;
            allData.push({test: "test"})
        }

        allData.on("value", function(snapshot) {
            document.getElementById("chatText").innerText = snapshot.val().text;
        });
*/