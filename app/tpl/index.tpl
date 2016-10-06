<html>

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=0.5,minimum-scale=1.0,user-scalable=0" />
    <meta name="format-detection" content="telephone=no, email=no" />
    <title>结果</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>

<body>
    <div style="display: none">
        <div id='zeroCount'>{{zeroCount}}</div>
        <div id='oneToTen'>{{oneToTen}}</div>
        <div id='elToTwo'>{{elToTwo}}</div>
        <div id='beyondTwo'>{{beyondTwo}}</div>
    </div>
    <div class="container">
        <h2>简书程序员专题热门文章900篇代码块统计</h2>
        <div id="chart" class="chart"></div>
        <table>
            <thead>
                <tr>
                    <th>文章名</th>
                    <th>代码块数量</th>
                </tr>
            </thead>
            <tbody>
                {% for item in items %}
                    <tr>
                        <td>{{ item.title }}</td>
                        <td>{{ item.codes }}</td>
                    </tr>
                {% endfor %}
            </tbody>
        </table>
    </div>
    <script type="text/javascript" src="js/echarts.common.min.js"></script>
    <script type="text/javascript" src="js/script.js"></script>
</body>
</html>