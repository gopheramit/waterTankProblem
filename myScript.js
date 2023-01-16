function inputArr() {
    let fromElement = document.getElementById('input');
    let input = fromElement.value.split(',')
    calulateBrickAndWater(input)
    calculateWater(input)
}

function drawChart(xAxisNamesArr, outputArr, waterArr, id) {
    let dom = document.getElementById(id);
    let myChart = echarts.init(dom, {
        renderer: 'canvas',
        useDirtyRect: false,
    });

    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {},
        grid: {
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: xAxisNamesArr
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Bricks',
                type: 'bar',
                stack: 'Ad',
                color: '#ffffb3',
                emphasis: {
                    focus: 'series'
                },
                data: outputArr,
                barCategoryGap: '0%'
            },
            {
                name: 'Water',
                type: 'bar',
                stack: 'Ad',
                color:'#80d4ff',
                emphasis: {
                    focus: 'series'
                },
                data: waterArr,
                barCategoryGap: '0%'

            },
        ]
    };
    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }
    window.addEventListener('resize', myChart.resize);
  
}

const totalWater = (arr) => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        let ele = arr[i];
        if (ele != '-') {
            sum += +ele;
        }
    };
    return sum;
};

function calulateBrickAndWater(input) {
    let waterArr = []
    let brickArr = []
    let waterHeights = waterHeight(input)
    for (let i = 0; i < input.length; i++) {
        let water = waterHeights[i]
        let brick = input[i]
        waterArr.push({
            value: water,
            itemStyle: {
                color: '#80d4ff'
            }
        })
        brickArr.push({
            value: brick,
            itemStyle: {
                color: '#ffffb3'
            }
        })
    }
    drawChart(input, brickArr, waterArr, 'brick-chart-container')
}


function waterHeight(bricksArr) {
    let waterHeights = []
    let minWaterHeight = []
    minWaterHeight[0] = bricksArr[0]
    let maxWaterHeight = []
    maxWaterHeight[bricksArr.length-1] = bricksArr[bricksArr.length-1]
    for (let i = 1; i < bricksArr.length; i++) {
        minWaterHeight[i] = (minWaterHeight[i-1] > bricksArr[i]) ? minWaterHeight[i-1] : bricksArr[i]
    }
    console.log(minWaterHeight)
    for (let i = bricksArr.length-2; i >= 0; i--) {
        let brick = bricksArr[i]
        maxWaterHeight[i] = (maxWaterHeight[i+1] > bricksArr[i]) ? maxWaterHeight[i+1] : bricksArr[i]
    }
    console.log(maxWaterHeight)
    for (let i = 0; i < bricksArr.length; i++) {
        let brick = bricksArr[i]
        waterHeights[i] = ((minWaterHeight[i] < maxWaterHeight[i]) ? minWaterHeight[i] : maxWaterHeight[i]) - brick

    }
    return waterHeights
}

function calculateWater(input) {
    let waterHeights = []
    let waterArr = []
    let brickArr = []
    waterHeights = waterHeight(input)
    for (let i = 0; i < input.length; i++) {
        let water = waterHeights[i]
        let brick = input[i]
        waterArr.push({
            value: water,
            itemStyle: {
                color: '#80d4ff'
            }
        })
        brickArr.push({
            value: brick,
            itemStyle: {
                color: 'transparent'
            }
        })
    }

    drawChart(input, brickArr, waterArr, 'water-chart-container')
    let outputspan = document.getElementById('finalWater')
    outputspan.innerHTML = `Total : ${totalWater (waterHeights)}`
}


