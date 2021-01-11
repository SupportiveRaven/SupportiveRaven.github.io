const links = {
    "Julia": "https://raw.githubusercontent.com/SupportiveRaven/OsuBiologyProject/master/Julia.json",
    "Laura": "https://raw.githubusercontent.com/SupportiveRaven/OsuBiologyProject/master/Laura.json",
    "Michal": "https://raw.githubusercontent.com/SupportiveRaven/OsuBiologyProject/master/Michal.json",
    "Bartek": "https://raw.githubusercontent.com/SupportiveRaven/OsuBiologyProject/master/Bartek.json",
    "Adam": "https://raw.githubusercontent.com/SupportiveRaven/OsuBiologyProject/master/Adam.json",
    "GK1": "https://raw.githubusercontent.com/SupportiveRaven/OsuBiologyProject/master/GK1.json",
    "GK2": "https://raw.githubusercontent.com/SupportiveRaven/OsuBiologyProject/master/GK2.json"
}

const DAYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"]
const COLORS = {
    "Bartek": "rgb(255,0,255, 0.6)",
    "Julia": "rgb(255, 105, 180, 0.6)",
    "Adam": "rgb(0,100,0, 0.6)",
    "Laura": "rgb(204,204,0, 0.6)",
    "Michal": "rgb(3, 169, 244, 0.6)",
    "GK": "rgb(139,0,0)"
}

const data = {}
const levels = {}
const accuracies = {}

const collectData = async function(link) {
    const response = await fetch(link)
    const jsonData = await response.json();
    return jsonData
}

const getCurrentLevels = async function(days) {
    const lvl = []

    for (let day of days) {
        const dayKeys = Object.keys(day)

        for (let i in dayKeys) {
            dayKeys[i] = Number(dayKeys[i])

            if (isNaN(dayKeys[i])) {
                dayKeys[i] = 0
            }
        }

        if (Object.keys(day).includes("currentLevel")) {
            lvl.push(day["currentLevel"])
        }

        else {
            let max = Math.max(...dayKeys)
            max = Number(max.toString().charAt(0))
            lvl.push(max)
        }
    }
    return lvl
}

const drawLevelsChart = function () {
    const ctx = document.getElementById("canvas_mainChart").getContext("2d");

    //Chart.defaults.global.elements.line.cubicInterpolationMode = "monotone"
    Chart.defaults.global.elements.line.fill = "false"

    let chart = new Chart(ctx, {
        type: "line",

        data: {
            labels: DAYS,
            datasets: [
                {
                    label: "Julia",
                    backgroundColor: COLORS["Julia"],
                    borderColor: COLORS["Julia"],
                    data: levels["Julia"],
                    fontColor: "white",
                    lineTension: 0
                },
                {
                    label: "Laura",
                    backgroundColor: COLORS["Laura"],
                    borderColor: COLORS["Laura"],
                    data: levels["Laura"],
                    fontColor: "white",
                    lineTension: 0
                },
                {
                    label: "Michal",
                    backgroundColor: COLORS["Michal"],
                    borderColor: COLORS["Michal"],
                    data: levels["Michal"],
                    fontColor: "white",
                    lineTension: 0
                },
                {
                    label: "Bartek",
                    backgroundColor: COLORS["Bartek"],
                    borderColor: COLORS["Bartek"],
                    data: levels["Bartek"],
                    fontColor: "white",
                    lineTension: 0
                },
                {
                    label: "Adam",
                    backgroundColor: COLORS["Adam"],
                    borderColor: COLORS["Adam"],
                    data: levels["Adam"],
                    fontColor: "white",
                    lineTension: 0
                },
                {
                    label: "forest00",
                    backgroundColor: COLORS["GK"],
                    borderColor: COLORS["GK"],
                    data: [{
                        x: "1",
                        y: levels["GK1"][0]
                    }, 
                    {
                        x: "13",
                        y: levels["GK1"][1]
                    }],
                    fontColor: "white",
                    lineTension: 0
                },
                {
                    label: "GK2",
                    backgroundColor: COLORS["GK"],
                    borderColor: COLORS["GK"],
                    data: [{
                        x: "1",
                        y: levels["GK2"][0]
                    }, 
                    {
                        x: "13",
                        y: levels["GK2"][1]
                    }],
                    fontColor: "white",
                    lineTension: 0
                }
            ]
        },

        options: {
            scales: {
                yAxes: [
                    {
                        scaleLabel: {
                            display: true,
                            labelString: "Poziom trudności",
                            fontColor: "white"
                        },
                        ticks: {
                            fontColor: "white",
                            stepSize: 1
                        },
                    }
                ],
                xAxes: [
                    {
                        scaleLabel: {
                            display: true,
                            labelString: "Dzień",
                            fontColor: "white"
                        },
                        ticks: {
                            fontColor: "white",
                            stepSize: 1
                        }
                    }
                ]
            },
            legend: {
                position: "top",
                labels: {
                    fontColor: "white"
                }
            }
        }
    })
}

const calculateDaysMeanAccuracy = async function (days, levels) {
    const accTable = []

    for (let i in days) {
        currLevel = levels[i]
        accModifier = currLevel * 100

        let songIndexes = []

        for (let i = 1; i <= 6; i++) {
            songIndexes.push(currLevel.toString() + i.toString())
        }

        let accuracy = 0

        for (let songKey of songIndexes) {
            let tempAccuracy = 0
            let song = days[i][songKey]

            if (song == undefined) {
                tempAccuracy += 0
            }
            else {
                for (let play of song) {
                    tempAccuracy += Number(play["accuracy"])
                }

                tempAccuracy = tempAccuracy / song.length
            }

            accuracy += tempAccuracy
        }
        
        accuracy = accuracy / 6
        accuracy += accModifier
        accTable.push(accuracy)
    }

    return accTable
}

const drawAccuracyChart = function() {
    const ctx = document.getElementById("canvas_accuracyChart")

    let chart = new Chart(ctx, {
        type: "line",

        data: {
            labels: DAYS,
            datasets: [
                {
                    label: "Julia",
                    backgroundColor: COLORS["Julia"],
                    borderColor: COLORS["Julia"],
                    data: accuracies["Julia"],
                    fontColor: "white",
                    lineTension: 0
                },
                {
                    label: "Laura",
                    backgroundColor: COLORS["Laura"],
                    borderColor: COLORS["Laura"],
                    data: accuracies["Laura"],
                    fontColor: "white",
                    lineTension: 0
                },
                {
                    label: "Michal",
                    backgroundColor: COLORS["Michal"],
                    borderColor: COLORS["Michal"],
                    data: accuracies["Michal"],
                    fontColor: "white",
                    lineTension: 0
                },
                {
                    label: "Adam",
                    backgroundColor: COLORS["Adam"],
                    borderColor: COLORS["Adam"],
                    data: accuracies["Adam"],
                    fontColor: "white",
                    lineTension: 0
                },
                {
                    label: "forest00",
                    backgroundColor: COLORS["GK"],
                    borderColor: COLORS["GK"],
                    data: [{
                        x: "1",
                        y: accuracies["GK1"][0]
                    }, 
                    {
                        x: "13",
                        y: accuracies["GK1"][1]
                    }],
                    fontColor: "white",
                    lineTension: 0
                },
                {
                    label: "GK2",
                    backgroundColor: COLORS["GK"],
                    borderColor: COLORS["GK"],
                    data: [{
                        x: "1",
                        y: accuracies["GK2"][0]
                    }, 
                    {
                        x: "13",
                        y: accuracies["GK2"][1]
                    }],
                    fontColor: "white",
                    lineTension: 0
                }
            ]
        },

        options: {
            scales: {
                yAxes: [
                    {
                        scaleLabel: {
                            display: true,
                            labelString: "Celność",
                            fontColor: "white"
                        },
                        ticks: {
                            fontColor: "white",
                            //stepSize: 1
                        },
                    }
                ],
                xAxes: [
                    {
                        scaleLabel: {
                            display: true,
                            labelString: "Dzień",
                            fontColor: "white"
                        },
                        ticks: {
                            fontColor: "white",
                           // stepSize: 1
                        }
                    }
                ]
            },
            legend: {
                position: "top",
                labels: {
                    fontColor: "white"
                }
            }
        }
    })
}


const drawRadarChart = function (canvasID, day1, day2, level, day1String, day2String, color1 = COLORS["Laura"], color2 = COLORS["Michal"]) {
    const ctx = document.getElementById(canvasID).getContext("2d")

    const day1Data = []
    const day2Data = []

    const indexes = []
    for (let i = 1; i <= 6; i++) {
        indexes.push(level.toString() + i.toString())
    }

    for (let i of indexes) {
        if (day1[i] == undefined) {
            day1Data.push(0)
        } 

        else {
            const max = day1[i].reduce(function (prev, current) {
                return (prev.accuracy > current.accuracy) ? prev : current
            })

            day1Data.push(max.accuracy)
        }

        if (day2[i] == undefined) {
            day2Data.push(0)
        } 
        
        else {
            const max2 = day2[i].reduce(function (prev, current) {
                return (prev.accuracy > current.accuracy) ? prev : current
            })
            day2Data.push(max2.accuracy)
        }
    }


    let chart = new Chart(ctx, {
        type: "radar",

        data: {
            labels: indexes,
            datasets: [
                {
                    label: day1String,
                    backgroundColor: color1,
                    borderColor: color1,
                    data: day1Data,
                    fontColor: "white",
                    fill: true
                },
                {
                    label: day2String,
                    backgroundColor: color2,
                    borderColor: color2,
                    data: day2Data,
                    fontColor: "white",
                    fill: true
                }
            ]
        },

        options: {
            scale: {
              angleLines: {
                  color: "rgb(255, 255, 255)"
              },
              pointLabels: {
                  fontColor: "white",
                  fontSize: 12
              },
              gridLines: {
                  color: "rgba(255, 255, 255)"
              },
              ticks: {
                  suggestedMin: 80
              }
            },
            legend: {
                position: "top",
                labels: {
                    fontColor: "white"
                }
            },
            tooltips: {
                enabled: true,
                callbacks: {
                    label: function(tooltipItem, data) {
                        return data.datasets[tooltipItem.datasetIndex].label + ' : ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] ;
                    }
                }
            }
        }
    })
}

const createExamComparison = function (days, container) {

    for (let key in days[0]) {
        if (key != "currentLevel") {
            const map = document.createElement("div")
            map.className = "songData"
            const song = document.createElement("p")
            if (days[12][key][0].accuracy != undefined) {
                song.innerText = key + ". " + lookupTable[key] +  " Accuracy: " + days[12][key][0].accuracy + "%"
            }

            
            map.appendChild(song)
            container.querySelector(".day1").appendChild(map)
        }
    }

    for (let key in days[12]) {
        if (key != "currentLevel") {
            const map = document.createElement("div")
            map.className = "songData"
            const song = document.createElement("p")
            if (days[12][key][0].accuracy != undefined) {
                song.innerText = key + ". " + lookupTable[key] +  " Accuracy: " + days[12][key][0].accuracy + "%"
            }

            map.appendChild(song)
            container.querySelector(".day13").appendChild(map)
        }
    }
}

const renderPage = async function() {

    for (let name of ["Julia", "Laura", "Bartek", "Michal", "Adam", "GK1", "GK2"]) {
        data[name] = await collectData(links[name])
    }

    for (let name of ["Julia", "Laura", "Bartek", "Michal", "Adam", "GK1", "GK2"]) {
        levels[name] = await getCurrentLevels(data[name].days)
    }
    
    for (let name of ["Julia", "Laura", "Michal", "Adam", "GK1", "GK2"]) {
        accuracies[name] = await calculateDaysMeanAccuracy(data[name].days, levels[name])
    }
    
    drawLevelsChart()
    drawAccuracyChart()

    drawRadarChart("radar1", data["Julia"].days[2], data["Julia"].days[4], levels["Julia"][2], "Dzień 3 Julia", "Dzień 5 Julia")    ///(canvasID, day1, day2, level, day1String, day2String, color1, color2)
    drawRadarChart("radar2", data["Laura"].days[0], data["Laura"].days[2], levels["Laura"][0], "Dzień 1 Laura", "Dzień 3 Laura")
    drawRadarChart("radar3", data["Laura"].days[11], data["Michal"].days[11], "4", "Dzień 12 Laura", "Dzień 12 Michał")
    drawRadarChart("radar4", data["Adam"].days[5], data["Adam"].days[12], "9", "Dzień 6 Adam", "Dzień 13 Adam")

    
    for (let name of ["Julia", "Laura", "Bartek", "Michal", "Adam"]) {
        createExamComparison(data[name].days, document.getElementById(name.toLowerCase()))
    }
}

renderPage()



