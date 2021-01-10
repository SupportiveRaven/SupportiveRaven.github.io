const mainCtx = document.getElementById("canvas_mainChart").getContext("2d")

const links = {
    "Julia": "https://raw.githubusercontent.com/SupportiveRaven/OsuBiologyProject/master/Julia.json",
    "Laura": "https://raw.githubusercontent.com/SupportiveRaven/OsuBiologyProject/master/Laura.json"
}

const DAYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"]

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
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgb(255, 99, 132)",
                    data: levels["Julia"],
                    fontColor: "white"
                },
                {
                    label: "Laura",
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgb(255, 99, 132)",
                    data: levels["Laura"],
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
                        }
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
    levels["Julia"] = await getCurrentLevels(data["Julia"].days)
    levels["Laura"] = await getCurrentLevels(data["Laura"].days)
    drawLevelsChart()

    
}

renderPage()



