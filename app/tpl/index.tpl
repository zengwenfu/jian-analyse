<html>

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=0.5,minimum-scale=1.0,user-scalable=0" />
    <meta name="format-detection" content="telephone=no, email=no" />
    <title>结果</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>

<body>
    <ul>
    {% for item in items %}
      <li>{{ item.title }}: {{ item.codes }}</li>
    {% endfor %}
</ul>
</body>
</html>