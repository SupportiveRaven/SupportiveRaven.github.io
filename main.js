const mainCtx = document.getElementById("canvas_mainChart").getContext("2d")

const links = {
    "Julia": "https://raw.githubusercontent.com/SupportiveRaven/OsuBiologyProject/master/Julia.json",
    "Laura": "https://raw.githubusercontent.com/SupportiveRaven/OsuBiologyProject/master/Laura.json",
    "Michal": "https://raw.githubusercontent.com/SupportiveRaven/OsuBiologyProject/master/Michal.json",
    "Bartek": "https://raw.githubusercontent.com/SupportiveRaven/OsuBiologyProject/master/Bartek.json",
    "Adam": "https://raw.githubusercontent.com/SupportiveRaven/OsuBiologyProject/master/Adam.json"
}

const DAYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"]
const COLORS = {
    "Bartek": "rgb(255,0,255, 0.6)",
    "Julia": "rgb(255, 105, 180, 0.6)",
    "Adam": "rgb(141, 182, 0, 0.6)",
    "Laura": "rgb(204,204,0, 0.6)",
    "Michal": "rgb(3, 169, 244, 0.6)"
}

const data = {}
const levels = {}

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
    Chart.defaults.global.elements.line.cubicInterpolationMode = "monotone"
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
                    fontColor: "white"
                },
                {
                    label: "Laura",
                    backgroundColor: COLORS["Laura"],
                    borderColor: COLORS["Laura"],
                    data: levels["Laura"],
                    fontColor: "white"
                },
                {
                    label: "Michal",
                    backgroundColor: COLORS["Michal"],
                    borderColor: COLORS["Michal"],
                    data: levels["Michal"],
                    fontColor: "white"
                },
                {
                    label: "Bartek",
                    backgroundColor: COLORS["Bartek"],
                    borderColor: COLORS["Bartek"],
                    data: levels["Bartek"],
                    fontColor: "white"
                },
                {
                    label: "Adam",
                    backgroundColor: COLORS["Adam"],
                    borderColor: COLORS["Adam"],
                    data: levels["Adam"],
                    fontColor: "white"
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

const renderPage = async function() {
    data["Julia"] = await collectData(links["Julia"])
    data["Laura"] = await collectData(links["Laura"])
    data["Bartek"] = await collectData(links["Bartek"])
    data["Michal"] = await collectData(links["Michal"])
    data["Adam"] = await collectData(links["Adam"])
    
    levels["Julia"] = await getCurrentLevels(data["Julia"].days)
    levels["Laura"] = await getCurrentLevels(data["Laura"].days)
    levels["Bartek"] = await getCurrentLevels(data["Bartek"].days)
    levels["Michal"] = await getCurrentLevels(data["Michal"].days)
    levels["Adam"] = await getCurrentLevels(data["Adam"].days)


    drawLevelsChart()

    
}

renderPage()



