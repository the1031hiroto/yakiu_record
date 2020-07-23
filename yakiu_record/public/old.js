
allRawData.on('value', function(snapshot) {
    let allData = snapshot.val()
    const old = new Vue({
        el: '#old',
        data: {
            columns: columns,
            oldData: calculation(allData).oldData,
            options: {
                columnsDropdown: true,
                sortable: columns,
                filterByColumn: true
            }
        }
    })
});

function statistic(oldData) {
    for (i = 0; i < oldData.length; i++) {
        dasu = oldData[i]["打数"]
        anda = oldData[i]["1塁打"] + oldData[i]["2塁打"] + oldData[i]["3塁打"] + oldData[i]["本塁打"]
        shishi = oldData[i]["四球"] + oldData[i]["死球"]
        oldData[i]["塁打数"] = oldData[i]["1塁打"] + oldData[i]["2塁打"] * 2 + oldData[i]["3塁打"] * 3 + oldData[i]["本塁打"]* 4
        oldData[i]["打率"] = (anda / dasu).toFixed(3)
        oldData[i]["出塁率"] = (anda + shishi) / (dasu + shishi + oldData[i]["犠飛"] + oldData[i]["犠打"])
        oldData[i]["長打率"] = oldData[i]["塁打数"] / dasu
        oldData[i]["OPS"] = (oldData[i]["長打率"] + oldData[i]["出塁率"]).toFixed(3)
        oldData[i]["選球眼"] = (shishi / oldData[i]["三振"]).toFixed(3)
        oldData[i]["XR"] = (
            oldData[i]["1塁打"]
            + oldData[i]["2塁打"] * 1.44
            + oldData[i]["3塁打"] * 2.08
            + oldData[i]["本塁打"] * 2.88
            + shishi * 0.68
            + oldData[i]["盗塁"] * 0.36
            + (dasu - anda - oldData[i]["三振"]) * (-0.18)
            + oldData[i]["三振"] * (-0.196)
            + oldData[i]["併殺打"] * (-0.74)
            + oldData[i]["犠飛"] * 0.74
            + oldData[i]["犠打"] * 0.08
            + oldData[i]["牽制死"] * (-0.64)
        ).toFixed(2)

        oldData[i]["XR27"] = (
            oldData[i]["XR"] /
            (dasu -
            anda +
            oldData[i]["牽制死"] +
            oldData[i]["犠飛"] +
            oldData[i]["犠打"] +
            oldData[i]["併殺打"]) * 27
        ).toFixed(2)

        oldData[i]["wOBA"] = (
            0.692 * oldData[i]["四球"] +
            0.73 * oldData[i]["死球"] +
            0.966 * oldData[i]["失策出"] +
            0.865 * oldData[i]["1塁打"] +
            1.334 * oldData[i]["2塁打"] +
            1.725 * oldData[i]["3塁打"] +
            2.065 * oldData[i]["本塁打"]
        ) / (dasu + shishi + oldData[i]["犠飛"])

        oldData[i]["三振率"] = (oldData[i]["三振"] / oldData[i]["打席数"]).toFixed(3)
        oldData[i]["四球率"] = (oldData[i]["四球"] / oldData[i]["打席数"]).toFixed(3)

    }
    calculation_wOBA_avr_old(oldData)
    return oldData
}

function calculation_wOBA_avr_old(oldData) {
    let wOBA_avr = 0
    for (i = 0; i < oldData.length; i++) {
        wOBA_avr += oldData[i]["wOBA"]
    }
    wOBA_avr /= oldData.length
    add_wRAA(oldData, wOBA_avr)
}

function add_wRAA(oldData, wOBA_avr) {
    for (i = 0; i < oldData.length; i++) {
        oldData[i]["wRAA"] = ((oldData[i]["wOBA"]- wOBA_avr) / 1.24 * oldData[i]["打数"]).toFixed(2)
    }
    findMax(oldData)
    return oldData
}

function findMax(oldData) {
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
    for (i in oldData) {
        for (x in oldData[i]) {
            dataList[x].push(oldData[i][x])
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