(function() {
    console.log('ok');

    var myChart = echarts.init(document.getElementById('chart'));
    var zeroCount = parseInt(document.getElementById('zeroCount').innerHTML);
    var oneToTen = parseInt(document.getElementById('oneToTen').innerHTML);
    var elToTwo = parseInt(document.getElementById('elToTwo').innerHTML);
    var beyondTwo = parseInt(document.getElementById('beyondTwo').innerHTML); 
    var option = {
        color: ['#3398DB'],
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: ['0', '1~10', '11~20', '大于20'],
            axisTick: {
                alignWithLabel: true
            }
        }],
        yAxis: [{
            type: 'value'
        }],
        series: [{
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [zeroCount, oneToTen, elToTwo, beyondTwo]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);



})();
