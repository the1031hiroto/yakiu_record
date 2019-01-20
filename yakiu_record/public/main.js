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
/*
            const message = new Vue({
                el: '#test',
                data: {
                    statisticData: calculation(allData).statisticData,
                    searchQuery: '',
                    columns: columns,
                    options: {
                        columnsDropdown: true,
                        filterByColumn: true,
                        sortable: columns,
                    },
                }
            })
*/
            const demo = new Vue({
                el: '#demo',
                data: {
                    allData: allData,
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
                    batter: "",
                    hit: "",
                    out: ""
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
            for (i in allData) {
                for (x in allData[i].records) {
                    if (x == "old") {
                        mainData.push(allData[i].records["old"])
                    }
                    if (x != "old") {
                        for (y in allData[i].records[x]) {
                            statisticData[y] += allData[i].records[x][y]
                        }
                    }
                }

                

                //mainData[i]["選手名"] =　allData[i].user_infos["選手名"]
            }
            mainData[0]["選手名"] = "hiroto"
            console.log(mainData[0])
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
            console.log(maxData)
            //console.log(minData)
            return maxData
        }

        function addBatter(test) {
            this.batter = test
        }

        function addHit(test, world) {
            this.hit = {}
            this.out = {}
            this.hit["打席数"] = 1
            this.hit[test] = 1
// なんか文法おかしい気がする
            if (!test == "四球" || !test == "死球") {
                this.hit["打数"] = 1
            }
        }

        function addOut(test) {
            this.out = {}
            this.hit = {}
            this.out["打席数"] = 1
            this.out["打数"] = 1
            this.out[test] = 1
        }

        function submit() {
            hello = this.hit
            const directory = '/records/' + this.batter +'/records'
            var commentsRef = firebase.database().ref(directory)
            commentsRef.push(hello)
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