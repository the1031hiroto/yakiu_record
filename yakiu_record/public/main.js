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

const db = firebase.database();
const allRawDeffenceData = db.ref("/deffence");
Vue.component('deffence-add', {
    mounted() {
        allRawDeffenceData.on('value', (snapshot) => {
            this.deffenceData = snapshot.val()
        })
    },
    data: function () {
        return {
            positionOptions: [
                { text: 'ピッチャー', value: 'ピッチャー' },
                { text: 'キャッチャー', value: 'キャッチャー' },
                { text: '1塁', value: '1塁' },
                { text: '2塁', value: '2塁' },
                { text: 'ショート', value: 'ショート' },
                { text: '3塁', value: '3塁' },
                { text: 'ライト', value: 'ライト' },
                { text: 'センター', value: 'センター' },
                { text: 'レフト', value: 'レフト' }
            ],
            deffenceData: 0
        }
    },
    methods: {
        subumitDeffence: function () {
            const today = new Date()
            result = {
                "試合日": today.toLocaleDateString(),
                "ポジション": this.position,
                "捕殺": this.deffence.killSupportCount,
                "刺殺": this.deffence.killCount,
                "エラー": this.deffence.errorCount

            }
            const directory = '/deffence/' + this.deffence.name
            const commentsRef = firebase.database().ref(directory)
            commentsRef.push(result)

            this.deffence.killCount = 0
            this.deffence.killSupportCount = 0
            this.deffence.errorCount = 0
        }
    },
    props: ['deffence', 'position'],
    template: `
        <div class="blog-deffence">
            <h3>{{ deffence.name }}</h3>
            <ul>
                <li v-for="data in this.deffenceData[deffence.name]">{{data}}</li>
            </ul>
            <select v-model="position">
                <option v-for="positionOption in this.positionOptions" v-bind:value="positionOption.value">
                    {{ positionOption.text }}
                </option>
            </select>
            <button v-on:click="deffence.killSupportCount++">捕殺 {{ deffence.killSupportCount }} 回</button>
            <button v-on:click="deffence.killCount++">刺殺 {{ deffence.killCount }} 回</button>
            <button v-on:click="deffence.errorCount++">エラー {{ deffence.errorCount }} 回</button>
            <div v-html="deffence.content"></div>
            <button @click="subumitDeffence">submit</button>
        </div>
        `
})

new Vue({
    el: '#deffence-show',
    data: {
        deffences: [
            { id: 1, name: 'ひろと', killSupportCount: 0, killCount: 0, errorCount: 0, },
            { id: 2, name: '大志', killSupportCount: 0, killCount: 0, errorCount: 0, },
            { id: 3, name: '龍', killSupportCount: 0, killCount: 0, errorCount: 0, },
            { id: 4, name: '達也', killSupportCount: 0, killCount: 0, errorCount: 0, },
            { id: 5, name: '三好', killSupportCount: 0, killCount: 0, errorCount: 0, },
            { id: 6, name: 'バタニキ', killSupportCount: 0, killCount: 0, errorCount: 0, },
            { id: 7, name: '隼人', killSupportCount: 0, killCount: 0, errorCount: 0, },
            { id: 8, name: '先生', killSupportCount: 0, killCount: 0, errorCount: 0, },
            { id: 9, name: 'りょーま', killSupportCount: 0, killCount: 0, errorCount: 0, },
            { id: 10, name: '涼', killSupportCount: 0, killCount: 0, errorCount: 0, }
        ],
        position: 0
    }
})
new Vue({
    el: '#offence-add',
    data: {
        batters: [
            { text: 'バッター', value: '' },
            { text: 'ひろと', value: 'ひろと' },
            { text: '大志', value: '大志' },
            { text: '龍', value: '龍' },
            { text: '達也', value: '達也' },
            { text: '三好', value: '三好' },
            { text: '先生', value: '先生' },
            { text: 'バタニキ', value: 'バタニキ' },
            { text: 'りょーま', value: 'りょーま' },
            { text: '涼', value: '涼' },
            { text: '隼人', value: '隼人' }
        ],
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
            { text: 'ピッチャー', value: 'ピッチャー' },
            { text: 'キャッチャー', value: 'キャッチャー' },
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
        recordOptions: [
            { text: '得点', value: '得点' },
            { text: '盗塁', value: '盗塁' },
            { text: '得点圏', value: '得点圏' },
            { text: 'ランナー1塁', value: 'ランナー1塁' },
            { text: '進塁打', value: '進塁打' },
            { text: 'ゲッツー崩れ', value: 'ゲッツー崩れ' }
        ],
        datenOptions: [
            { text: '打点', value: '' },
            { text: '1打点', value: 1 },
            { text: '2打点', value: 2 },
            { text: '3打点', value: 3 },
            { text: '4打点', value: 4 }
        ],
        batter: "",
        hit: "",
        onBall: "",
        out: "",
        optionResult: [],
        daten: 0
    },
    methods: {
        submit: function () {
            const today = new Date()
            result = {
                "試合日": today.toLocaleDateString(),
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
            } else if (this.out) {
                result[this.out] = 1
            }
            //TODO: 条件分岐をちゃんとする
            if ((this.hit != "四球" || this.hit != "死球" || this.out != "三振") && this.onBall) {
                result["打球"] = this.onBall
            }
            if (this.optionResult) {
                for (i in this.optionResult) {
                    result[this.optionResult[i]] = 1
                }
            }
            if (this.daten > 0) {
                result["打点"] = this.daten
            }

            const directory = '/records/' + this.batter +'/records'
            const commentsRef = firebase.database().ref(directory)
            if (this.batter) {
                commentsRef.push(result)
            } else {
                console.log("no batter")
                return
            }
        }
    }
})
new Vue({
    el: '#add-record',
    data: {
        isActive: "add_record_offence"
    },
    methods: {
        changeTabu: function (tabu) {
            this.isActive = tabu
            console.log(this.isActive)
            if (tabu == "current") {
            } else if (tabu == "old") {
            }
        }
    }
})

const columns = [
    "選手名",
    "三振率",
    "四球率",
    "選球眼",
    "XR",
    "XR27",
    "wOBA",
    "wRAA",
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
    "ランナー1塁",
    "進塁打"
]

const allRawData = db.ref("/records");
allRawData.on('value', function(snapshot) {
    let allData = snapshot.val()
    console.log(allData)
    //console.log(calculation(allData).statisticData)
    const demo = new Vue({
        el: '#demo',
        data: {
            isActive: "current",
            columns: columns,
            mainData: calculation(allData).mainData,
            options: {
                columnsDropdown: true,
                sortable: columns,
                filterByColumn: true,
                dateColumns: ["試合日"],
                datepickerOptions:{ locale: { cancelLabel: 'Clear' } }
                //highlightMatches: true
                //headings: {
                //    選手名: 'id',
                //    試合: '名前',
                //    打席数: 'メールアドレス'
                //},
                //headingsTooltips: {'選手名':'Expanded Title', '試合':'Expanded Title'}
            }
        },
        methods: {
            changeTabu: function (tabu) {
                this.isActive = tabu
                if (tabu == "current") {
                    this.mainData = calculation(allData).mainData
                } else if (tabu == "old") {
                    this.mainData = calculation(allData).oldData
                }
            }
        }
    })
});
function calculation(allData) {
    let mainData = []
    let oldData = []
    let statisticData = {
        "ひろと": {
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
            "ランナー1塁": 0,
            "進塁打": 0
        },
        "大志": {
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
            "ランナー1塁": 0,
            "進塁打": 0
        },"龍": {
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
            "ランナー1塁": 0,
            "進塁打": 0
        },
        "達也": {
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
            "ランナー1塁": 0,
            "進塁打": 0
        },"涼": {
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
            "ランナー1塁": 0,
            "進塁打": 0
        },
        "りょーま": {
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
            "ランナー1塁": 0,
            "進塁打": 0
        },"浅野": {
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
            "ランナー1塁": 0,
            "進塁打": 0
        },
        "三好": {
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
            "ランナー1塁": 0,
            "進塁打": 0
        },"航": {
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
            "ランナー1塁": 0,
            "進塁打": 0
        },"バタニキ": {
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
            "ランナー1塁": 0,
            "進塁打": 0
        },"先生": {
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
            "ランナー1塁": 0,
            "進塁打": 0
        },"隼人": {
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
            "ランナー1塁": 0,
            "進塁打": 0
        }
    }

    Object.keys(allData).forEach(function (k, i) {
        mainData[i] =　{}
        for (x in allData[k].records) {
            if (x == "old") {
                oldData.push(allData[k].records["old"])
            }
            if (x != "old") {
                for (y in allData[k].records[x]) {
                    if (y != "試合日" && y != "打球") {
                        statisticData[k][y] += allData[k].records[x][y]
                    }
                }
            }
        }
        if (statisticData[k]) {
            mainData[i] = statisticData[k]
        }
        mainData[i]["選手名"] =　k
        oldData[i]["選手名"] =　k
        //TODO:こっちの方がいいかな
        //mainData[i]["選手名"] =　allData[k].user_infos["選手名"]
    });
    oldData.splice(2, 1)
    //console.log(oldData)
    console.log(mainData)
    statistic(mainData)
    statistic(oldData)
    return {mainData, oldData}
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
        "ランナー1塁": [],
        "進塁打": [],
        "得点圏": [],
        "打球": [],
        "ゲッツー崩れ": [],
        "試合日": []
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