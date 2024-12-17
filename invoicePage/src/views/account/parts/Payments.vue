<script setup>
import Button from '@/components/Button.vue';
import state from '@/views/state';

</script>
<template>
  <div class="wrapp" v-if="!this.showDetails">
    <div class="payments">
      <div class="filters">
      </div>
      <div class="payment">
        <div class="number ml10 ">№</div>
        <div class="date table ">Дата</div>
        <div class="description table">Призначення платежу</div>
        <div class="status table">Статус платежу</div>
        <div class="amount table mr10">Сума сплати</div>
        <div class="table mr10"></div>
      </div>
      <div class="payment" v-for="(item, index) of this.payments">
        <div class="number ml10">{{ index + 1 }}</div>
        <div class="date table ">{{ new Date(item.date).toISOString().slice(0, 10) }}</div>
        <div class="description table">{{ item.description }}</div>
        <div class="status table"><span :class="item.status.toLowerCase()">{{ item.status }}</span></div>
        <div class="amount table mr10">{{ item.amount }} грн</div>
        <Button @click="detailsPayment(item.description, index + 1)" value="Деталі" :style="{ width: '100px', 'font-size': '16px', height: '40px', padding: 0, margin: '0 10px 0 0' }"></Button>
      </div>
    </div>
  </div>
  <Button @click="downloadReestrPayments" value="Вивантажити звіт" v-if="!this.showDetails"></Button>
  <div class="detailsPayment" v-if="this.showDetails">
    <div @click="back" class="back"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAHLRJREFUeJzt3X3Md3ddH/D33fsubSi0hYIiGjCWQmvcA8Y5H+bDsqgLLLBkU0kwiw5iptP91bGImZnLTHyaCQbnFp2ZGyjNtsQEtz+cQBMjIvI090BTHtSJhXSlU2mLhZuyP35cQnvf7X2d63c+v+/3c36vV/JOKH+d65yT3/t9znXd15UAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbMq50QcArOIZSW5O8tQkNyZ5OMlDSe5J8sHP/DdswYUkX5zkOUmuS3JtkgeTPJDk95J8KMmnRx0cQLUXJHlVkl9N8tHsPvAeL59KcleSn0vysiRPGXC8cFZXJ3lRktckeXeST+SJ7/eHkvxGkh9J8jXxoAtswDVJXpnknXniD8Ar5cEkr0/yFYc9fFjkS5L8dJL7st/9/vtJfijJTQc9eoAVnE/yD5J8OPt9EF4uv5bkLxzuS4ErenaSf5/kYta91x9I8qPxBgxo4i9m/yf+K+WTSX4qu++lwijnkvyjJH+a2vv9Q0lecqCvCeBMvifJx1P7Yfi5eU92P1sAh3ZTkjfmcPf6I9l9e+GaQ3xxAKd1LslP5HAfhp+b/5fk6+q/RPhzz83uh1RH3O9vTnJD/ZcIcGUXsvsBvREfhid5KMnfqv5CIcltSf4oY+/3d2X3z2gBhjmf5HUZ+2F4koeTvLT2y+XIvSDjy/8k/z1GADDITOVvBFBtpvI3AoBhZix/I4AqM5a/EQAc3MzlbwSwtpnL3wgADqZD+RsBrKVD+RsBQLlO5W8EsK9O5X+S98QIAFbWsfyNAM6qY/kbAcDqOpe/EcBSncvfCABWs4XyNwI4rS2UvxEA7O1Ckjdk/AfZ2iPgb655ktiM21Lz1ytH5t3xa4OBhbb05P/YPJjka9Y7VWzAlp78H5s7469mAqe0xSf/x+YjSZ611gmjtS0++T82/3a1swVs1paf/B+bt3zm6+V4bfnJ/7H5jpXOGbBBx1T+J/nuVc4cHR1T+X86yf1JnrnKmQM25Rhe+18u/zfJ01c4f/RyDK/9L5d/vcbJA7bjGJ/8Pzf/Yv9TSCPH9uT/ubmY5Hn7n0JgC469/D+d3avRp+57ImnhmMv/JD+z91kE2jvW1/6Xyyv3PJfM71hf+z82H0ty3Z7nEmjMk/+j86b9TieT8+T/6Lxsv9MJdOXJ/9JcTHLjPieVaXnyvzS/vNcZBVry5P/4efEe55U5efK/fO7Z56SOdNXoA4CmLiR5fZKXjz6QSX316ANgVbdl92twnz34OGb0BUmeO/ogzsIAgOXOJ/l3Sb598HHM7PmjD4DVvCDJr8eve34it4w+gLMwAGAZT/6n8yWjD4BVePI/nZtHH8BZGABwep78T88PAfbnyf/0Wv6Z4AujDwCauJDdD/wp/9Pxy4B6uy3Jm6P8T6vl/e4NAFyZJ//lPjn6ADgzT/7LtbzfDQB4YueT/GJ8z3+pj40+AM7kBdk9+fue/zIt73cDAB6f8j+7D48+ABZT/mfX8n43AODylP9+3jf6AFhE+e/n/aMP4Cz8ECBcyg/87e9/jj4ATs0P/O3nYpK7Rh8EsD+/3ned/KWlJ54h/Hrf/fPbi8/6JLwBgM/y5L+Oe5P8j9EHwRV58l+Hv34JzXnyXy+vXXjuOTxP/uvF2y5ozJ/0XTf+ENDc/Enf9eJNFzTmyX/dvG3Z6efAPPmvm+9cdPaBaXjyXz8vXnQFOCRP/uvm95M8ackFAObgyX/9/LdFV4BD8uS/fr510RUApuDJf/18PMmtSy4CB3NrPPmvHWMXGvLkX5PvWXIROBhP/uvn3iRfuOQiAON58q/JLy25CByMJ//188kk37LkIgDjefKvyVuSXLPgOnAYnvzXzyNJXrHkIgDjefKvyduSXL/gOnAYnvxrcvuSiwCM58m/Ju9I8rQF14HD8ORfk1cvuQjAeMq/Jsp/Tsq/JsofmlH+NVH+c1L+NVH+0Izyr4nyn5Pyr4nyh2aUf02U/5yUf02UPzSj/Gui/Oek/Gui/KEZ5V8T5T8n5V8T5Q/NKP+aKP85Kf+aKH9oRvnXRPnPSfnXRPlDM8q/Jsp/Tsq/JsofmlH+NVH+c1L+NVH+0Izyr4nyn5Pyr4nyh2aUf02U/5yUf02UPzSj/Gui/Oek/Gui/KEZ5V8T5T8n5V8T5Q/NKP+aKP85Kf+aKH9oRvnXRPnPSfnXRPlDM8q/Jsp/Tsq/JsofmlH+NVH+c1L+NVH+0Izyr4nyn5Pyr4nyh2aUf02U/5yUf02UPzSj/Gui/Oek/Gui/KEZ5V8T5T8n5V8T5Q/NKP+aKP85Kf+aKH9oRvnXRPnPSfnXRPlDM8q/Jsp/Tsq/JsofmlH+NVH+c1L+NVH+0Izyr4nyn5Pyr4nyh2aUf02U/5yUf02UPzSj/Gui/Oek/Gui/KEZ5V8T5T8n5V8T5Q/NKP+aKP85Kf+aKH9oRvnXRPnPSfnXRPlDM8q/Jsp/Tsq/JsofmlH+NVH+c1L+NVH+0Izyr4nyn5Pyr4nyh2aUf02U/5yUf02UPzSj/Gui/Oek/Gui/KEZ5V8T5T8n5V8T5Q/NKP+aKP85Kf+aKH9oRvnXRPnPSfnXRPlDM8q/Jsp/Tsq/JsofmlH+NVH+c1L+NVH+0Izyr4nyn5Pyr4nyh2aUf02U/5yUf02UPzSj/Gui/Of0/Cj/iih/aEb510T5z0n510T5QzPKvybKf07KvybKH5pR/jVR/nNS/jVR/tCM8q+J8p+T8q+J8odmlH9NlP+clH9NlD80o/xrovznpPxrovyhGeVfE+U/J+VfE+UPzSj/mij/OSn/mih/aEb510T5z0n510T5QzPKvybKf07KvybKH5pR/jVR/nNS/jVR/tCM8q+J8p+T8q+J8odmlH9NlP+clH9NlD80o/xrovznpPxrovyhGeVfE+U/J+VfE+UPzSj/mij/OSn/mih/aEb510T5z0n510T5QzPKvybKf07KvybKH5pR/jVR/nNS/jVR/tCM8q+J8p+T8q+J8odmlH9NlP+clH9NlD80o/xrovznpPxr8gNLLgIwnvKvifKfk/KvifKHZpR/TZT/nJR/TZQ/NKP8a6L856T8a6L8oRnlXxPlPyflXxPlD80o/5oo/zkp/5oof2hG+ddE+c9J+ddE+UMzyr8myn9Oyr8myh+aUf41Uf5zUv41Uf7QjPKvifKfk/KvifKHZpR/TZT/nJR/TZQ/NKP8a6L856T8a6L8oRnlXxPlPyflXxPlD80o/5oo/zkp/5oof2hG+ddE+c9J+ddE+UMzyr8myn9Oyr8myh+aUf41Uf5zUv41Uf7QjPKvifKfk/KvifKHZpR/TZT/nJR/TZQ/NKP8a6L856T8a6L8oRnlXxPlPyflXxPlD80o/5oo/zkp/5oof2hG+ddE+c9J+ddE+UMzyr8myn9Oyr8myh+aUf41Uf5zUv41Uf7QjPKvifKfk/KvifKHZpR/TZT/nJR/TZQ/NKP8a6L856T8a6L8oRnlXxPlPyflXxPlD80o/5q8Ncn1C64Dh6H8a6L8oRnlXxPlPyflXxPlD80o/5oo/zkp/5oof2hG+ddE+c9J+ddE+UMzyr8myn9Oyr8myh+aUf41Uf5zUv41Uf7QjPKvifKfk/KvifKHZpR/TZT/nJR/TZQ/NKP8a6L856T8a6L8oRnlXxPlPyflXxPlD80o/5oo/zkp/5oof2hG+ddE+c9J+ddE+UMzyr8myn9Oyr8myh+aUf41Uf5zUv41Uf7QjPKvifKfk/KvifKHZpR/TZT/nJR/TZQ/NKP8a6L856T8a6L8oRnlXxPlPyflXxPlD80o/5oo/zkp/5oof2hG+ddE+c9J+ddE+UMzyr8myn9Oyr8myh+aUf41Uf5zUv41Uf7QjPKvifKfk/KvifKHZpR/TZT/nJR/TZQ/NKP8a6L856T8a6L8oRnlXxPlPyflXxPlD80o/5oo/zkp/5oof2hG+ddE+c9J+ddE+UMzyr8myn9Oyr8myh+aUf41Uf5zUv41Uf7QjPKvifKfk/KvifKHZpR/TZT/nJR/TZQ/NKP8a6L856T8a6L8oRnlXxPlPyflXxPlD80o/5oo/zkp/5oof2hG+ddE+c9J+ddE+UMzyr8myn9Oyr8myh+aOZ/kDRn/4bG1vC3Kf0a3JLkn4++PreVVSy4CMIfXZPyHx9Zyd5LPW3IROIhnJ/lgxt8fW8uPLrkIwBxelfEfHlvLfUmeu+QicBDXJnlXxt8fW8sdSc4tuA7ABL4yyScy/gNkS3kkyUuXXAQO5mcy/v7YWj6Q5IYlFwEY79ok78/4D5Ct5eeXXAQO5psz/t7YWh5J8teWXARgDj+U8R8gW8v9SZ655CJwEE9K8t6Mvz+2ll9cchGAOTwzyYMZ/wGytfyTJReBg/mHGX9vbC0PJ/miJRcBmMMPZ/wHyNbyJ0luXHIROIjz8a2uivzCkosAzOHqJPdm/AfI1vLTSy4CB/PSjL83tpgvX3IRYEuuGn0Ae/im+D51hdePPgAu6+WjD2CD7srun1PCUeo8AP7O6APYoD9M8vbRB8Elrk3y4tEHsUH/cfQBwEidB8A3jD6ADbozu9eizOUrkzx59EFs0J2jDwBG6joAnpXk5tEHsUFvHX0AXNbXjj6ADfpUdn/jAo5W1wFw2+gD2Kj/PfoAuKxbRx/ABv1BkodGHwSM1HUAePqv8YHRB8BlPW/0AWyQe52j13UAPGP0AWzUR0cfAJd10+gD2KD7Rh8AjNZ1ADxl9AFs0MUkfzb6ILgs9/v6Hhh9ADBa1wHgJ9UBYA9dB8CDow9ggy5k9+/NmY+n1fV5q8LR6zoAfP+uhp+tmJP7fX3udY5e1wHw/tEHsFH+dcWc/MT6+vzLCo5e1wFw1+gD2Ci/X2FO7x19ABv0nCTXjT4IGKnrAPhIPBVV8Bvn5vSbow9gg84n+arRBwEjdR0ASfKW0QewQd+Y5Nzog+ASb4/fWlfhG0cfAIzUeQD859EHsEFfFE9FM3o4yRtHH8QG/d3RBwAjdR4Av57k3tEHsUH+7vycfmn0AWzQrUm+YvRBwCidB8DFJD87+iA26O8luXH0QXCJ/xL/+qXC948+AOBsnpHdL0n5tKyaH1hyETiY7834e2Nr+UR2/yIAaOifZvyHyNbyJ0meteQicBBXZ/dPAkffH1vL65ZcBGAe1yZ5X8Z/iGwtv7DkInAw35TkkYy/P7aUR5J8/ZKLAMzjr2T3k9KjP0i2lr+95CJwMK/N+Htja/mDJE9fchGAedye8R8iW8tHk3zxgmvAYVyb5J0Zf39sLf8pfg8GtPWajP8Q2Vrel+TzllwEDuKZSe7O+Ptja/mJJRcBmMf5JHdk/IfI1vK2JNcvuA4cxi1J7sn4+2NredWSiwDM43x2P9U7+kNka3lHkqctuA4cxvOT/FHG3x9by6uXXARgHkZATYyAORkBNTECoCkjoCZGwJyMgJoYAdCUEVATI2BORkBNjABoygioiREwJyOgJkYANGUE1MQImJMRUBMjAJoyAmpiBMzJCKiJEQBNGQE1MQLmZATUxAiApoyAmhgBczICamIEQFNGQE2MgDkZATUxAqApI6AmRsCcjICaGAHQlBFQEyNgTkZATYwAaMoIqIkRMCcjoCZGADRlBNTECJiTEVATIwCaMgJqYgTMyQioiREATV1IckfGf4hsLW9Ncv2C60C9q5O8MMk9GX9/bC23L7gOwES8CaiJNwHzuJDkKZ/5394E1MSbAGjKCKiJETDeVUme9Jj/zwioiREATRkBNTECxrlc+Z8wAmpiBEBTRkBNjIDDe6LyP2EE1MQIgKaMgJoYAYdzVXY/9HcaRkBNjABoygioiRFQb0n5nzACamIEQFNGQE2MgDpnKf8TRkBNjABoygioiRGwvn3K/4QRUBMjAJoyAmpiBKxnjfI/YQTUxAiApoyAmhgB+7squ1/0syYjoCZGADRlBNTECDi7ivI/YQTUxAiApoyAmhgBy51LXfmfMAJqYgRAU0ZATYyA0ztE+Z8wAmpiBEBTRkBNjIArO2T5nzACamIEQFNGQE2MgMd3Lrv7bgQjoCZGADRlBNTECLjUyPI/YQTUxAiApoyAmhgBnzVD+Z8wAmpiBEBTRkBNjIC5yv+EEVATIwCaMgJqcswjYMbyP2EE1MQIgKaMgJoc4wiYufxPGAE1MQKgKSOgJsc0AjqU/wkjoCZGADRlBNTkGEZAp/I/YQTUxAiApoyAmmx5BJzL7vf7d2QE1MQIgKaMgJpscQR0Lv8TRkBNjABoygioydZGwLnRB7ASI6AmRgA0ZQTUZCsjYCvlf8IIqIkRAE0ZATXpPgK2Vv4njICaGAHQ1IUkd2T8h8jW8ltJblhwHWax1fI/cWuSezL+/thabl9yEYB5GAE16ToCts4IqIkRAE35dkBNun87YKt8O6Amvh0ATRkBNTEC5mQE1MQIgKaMgJoYAXMyAmpiBEBTRkBNjIA5GQE1MQKgKSOgJkbAnIyAmhgB0JQRUBMjYE5GQE2MAGjKCKiJETAnI6AmRgA0ZQTUxAiYkxFQEyMAmjICamIEzMkIqIkRAE0ZATUxAuZkBNTECICmjICaGAFzMgJqYgRAU0ZATYyAORkBNTECoCkjoCZGwJyMgJoYAdCUEVATI2BORkBNjABoygioiREwJyOgJkYANGUE1MQImJMRUBMjAJoyAmpiBMzJCKiJEQBNGQE1MQLmZATUxAiApoyAmhgBczICamIEQFNGQE2MgDkZATUxAqApI6AmRsCcjICaGAHQlBFQEyNgTkZATYwAaMoIqIkRMCcjoCZGADRlBNTECJiTEVATIwCaMgJqYgTMyQioiREATRkBNTEC5mQE1MQIgKaMgJoYAXMyAmpiBEBTRkBNjIA5GQE1MQKgKSOgJkbAnIyAmhgB0JQRUBMjYE5GQE2MAGjKCKiJETAnI6AmRgA0ZQTUxAiYkxFQEyMAmjICamIEzMkIqIkRAE0ZATUxAuZkBNTECICmjICaGAFzMgJqYgRAU0ZATYyAORkBNTECoCkjoCZGwJyMgJoYAdCUEVATI2BORkBNjABoygioyTuSPH3BdeAwjICaGAHQlBFQk3fGCJiREVATIwCaMgJqYgTMyQioiREATRkBNTEC5mQE1MQIgKaMgJoYAXMyAmpiBEBTRkBNjIA5GQE1MQKgKSOgJkbAnIyAmhgB0JQRUBMjYE5GQE2MAGjKCKiJETAnI6AmRgA0ZQTUxAiYkxFQEyMAmjICamIEzMkIqIkRAE0ZATUxAuZkBNTECICmjICaGAFzMgJqYgRAU0ZATYyAORkBNTECoCkjoCZGwJyMgJoYAdCUEVATI2BORkBNjABoygioiREwJyOgJkYANGUE1MQImJMRUJMfXHIRgHkYATUxAuZkBNTECICmjICaGAFzMgJqYgRAU0ZATYyAORkBNTECoCkjoCZGwJyMgJoYAdCUEVATI2BORkBNjABoygioiREwJyOgJkYANGUE1MQImJMRUBMjAJoyAmpiBMzJCKiJEQBNGQE1MQLmZATUxAiApoyAmhgBczICamIEQFNGQE2MgDkZATUxAqApI6AmRsCcjICaGAHQlBFQEyNgTkZATYwAaMoIqIkRMCcjoCZGADRlBNTECJiTEVATIwCaMgJqYgTMyQioiREATRkBNTEC5mQE1MQIgKaMgJoYAXMyAmpiBEBTRkBNjIA5GQE1MQKgKSOgJkbAnIyAmhgB0JQRUBMjYE5GQE2MAGjKCKiJETAnI6AmRgA0ZQTUxAiYkxFQEyMAmjICamIEzMkIqIkRAE0ZATUxAuZkBNTECICmjICaGAFzMgJqYgRAU0ZATYyAORkBNTECoCkjoCZGwJyMgJoYAdCUEVATI2BORkBNjABoygioiREwJyOgJkYANGUE1MQImJMRUBMjAJo6n+Q/ZPyHyNZiBMzJCKiJEQBNXUjyhoz/ENlafjvJDQuuA4dxa5IPZ/z9sbX84yUXAZiHNwE1uTPJtae/DByINwE1+b4lFwGYhzcBNXlDknMLrgOH4U3A+rmY5EVLLgIwD28CauLJaE7eBKyf+5M8d8lFAObhTcD6+XiSL11yETgYbwLWz5vjrRe05U3A+nnToivAIXkTsH5etugKAFPxJmD9vGTRFeCQvAlYN3+Y5JpFVwCYijcB6+bty04/B+ZNwLp5xbLTD8zGm4B187XLTj8H5k3AevlfC889MCFvAtbLzy489xyeNwHr5csXnntgQt4ErJN7k1y18NxzeN4ErJMfW3rigTl5E7BO/vLSE88Q3gTsn99ZfNYnYaXDo30qyXcluWP0gTT39aMPgFO5O8nfSPKR0QfS2AuTPHX0QZyFAQCXupjk5dn9KWHO5stGHwCndleSb0hyz+gDaep8dt9OaccAgMv7VJLvjBFwVs8bfQAscneSvx4j4KxuGX0AZ2EAwOMzAs7uC0YfAIsZAWf3rNEHcBYGADwxI+BsWn5PFCPgjFre7wYAXJkfDFzu6tEHwJn5wcDlWt7vBgCcjh8MXOZjow+AvfjBwGVa3u8GAJyeNwGn98ejD4C9eRNwei3vdwMAlvEm4HQ+MPoAWIU3AafT8n43AGA5bwKu7O7RB8BqvAm4sveNPgDgsPza4MfPi/Y4r8zJrw2+fLwdgSPlDwhdmotJbtjnpDItf0Do0vzyXmcUaM2bgEfn1/Y7nUzOm4BH59v2O51Ad94EfDav2PNcMj9vAnb5WJIn73kugQ3wJiD5aJKn7HsiacGbgOS1e59FYDOOfQT8s73PIJ0c8wi4mOTm/U8hsCXHOgLuS3LTCuePXo51BPyrNU4esD3HOAJeucqZo6NjGwH3J3nGKmcO2KRjGgFvjl8sduyOaQS8fKVzBmzYMfzrgA8n+fy1ThitHcO/Dvi51c4WsHlbfhPwYJKvWu9UsQFbfhPwliTXrHeqgGOwxTcBDyf5ljVPEpuxxTcB747fcAmc0ZbeBDyc5CXrnh42ZktvAt4TP/QH7GkLI0D5c1pbGAHKH1hN5xGg/Fmq8whQ/sDqOo4A5c9ZdRwByh8o02kEKH/21WkEKH+gXIcRoPxZS4cRoPyBg5l5BCh/1jbzCFD+wMHNOAKUP1VmHAHKHxhmphGg/Kk20whQ/sBwF5K8PmM/DB9K8uLqLxSy+42BH8rY+/2d8WesgUmcS/LjGfNheH+Sr6v/EuHPPTvJ72bM/f6mJNfXf4kAy3x3dk/jh/owfFd2r2Xh0J6W5FdyuHv9kSQ/leTqQ3xxAGfxZUl+J7Ufhp9M8pPxV84Y61yS703yx6m93/9Pkhcd6GsC2MtVSV6Zmu+V/tckX3q4LwWu6POT/HyST2Tde/1Pk/zzJE8+3JcCsI4nJfn72f+NwANJXpfkhYc9fFjkOdm9pr83+93vH0jy6iQ3HvbwAWrckuT2JG9Mcl+e+APwYpL3Jvk3Sb4tyXUDjhfO6kKSb07yL7Mbvw/nygP3ziQ/nOSvHv5w+zg3+gCAVdyU5ObsfqL5adl9SD6Q5J4kH8zudSpswfns3g48J7sxe112r/cfTPJ72f1uAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACOz/8H+nSUzLaJ3YgAAAAASUVORK5CYII="></div>
    <span class="bold fs25">Деталі платежу</span>
    <div class="detail">
      <div class="detail-name">Ідентифікатор платежу</div>
      <div class="detail-value">{{ this.details.id }}</div>
    </div>
    <div class="detail">
      <div class="detail-name">Сума платежу</div>
      <div class="detail-value">{{ this.details.amount }} грн</div>
    </div>
    <div class="detail">
      <div class="detail-name">Комісія</div>
      <div class="detail-value">{{ (Number(this.details.amount.replace(',', '.')) * 0.01).toFixed(2) }} грн</div>
    </div>
    <div class="detail">
      <div class="detail-name">Сума до зарахування</div>
      <div class="detail-value">{{ Number(this.details.amount.replace(',', '.')) - (Number(this.details.amount.replace(',', '.')) * 0.01).toFixed(2) }} грн</div>
    </div>
    <div class="detail">
      <div class="detail-name">Статус платежу</div>
      <div class="detail-value"><span :class="this.details.status.toLowerCase()">{{ this.details.status }}</span></div>
    </div>
    <div class="detail">
      <div class="detail-name">Дата створення інвойсу</div>
      <div class="detail-value">{{ new Date(this.details.date).toISOString() }}</div>
    </div>
    <div class="detail">
      <div class="detail-name">Дата сплати інвойсу</div>
      <div class="detail-value">{{ new Date(new Date(this.details.date).getTime() + 2000).toISOString() }}</div>
    </div>
    <div class="detail">
      <div class="detail-name">Замаскована карта</div>
      <div class="detail-value">{{ this.details.cardMasked }}</div>
    </div>
    <div class="detail">
      <div class="detail-name">Призначення платежу</div>
      <div class="detail-value">{{ this.details.description }}</div>
    </div>
    <div class="detail">
      <div class="detail-name">Призначення реквізитів</div>
      <div class="detail-value">{{ this.details.serviceDestination }}</div>
    </div>
    <div class="detail">
      <div class="detail-name">Реквізити</div>
      <div class="detail-value">{{ this.details.iban }}</div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    const payments = localStorage.getItem('payments');
    if(payments) {
      const parsed = JSON.parse(payments);

      state.payments.push(...parsed);
    }
    localStorage.removeItem('payments');
  },
  data() {
    return {
      payments: state.payments,
      showDetails: false,
      details: null
    };
  },
  methods: { 
    detailsPayment(description, id) {
      this.showDetails = true;
      this.details = {
        ...state.payments.find((p) => p.description === description),
        id
      };
    },
    back() {
      this.showDetails = false;
    },
    downloadReestrPayments() {
      const payments = state.payments;
      const lines = [['id','amount','commission','status','invoiceCreatedAt','destination','serviceDestination','iban'].join(',')];
      const res = payments.reduce((acc, p, index) => {
        console.log(p);
        acc.push([
          index + 1,
          p.amount.replace(',', '.'),
          (Number(p.amount.replace(',', '.')) * 0.01).toFixed(2),
          p.status,
          new Date(p.date).toISOString(),
          new Date(new Date(p.date).getTime() + 2000).toISOString(),
          p.description,
          p.serviceDestination,
          p.iban
        ].join(','));
        return acc;
      }, lines)

      const csv = res.join('\n');
      const base64 = btoa(unescape(encodeURIComponent(csv)));
      const url = `data:text/csv;base64,${base64}`
      const link = document.createElement('a')
      link.href = url
      link.download = `reestrPayment${new Date().toISOString().slice(0, 10)}`
      link.click();
      URL.revokeObjectURL(link.href)
    }
  }
}
</script>

<style scoped>
.wrapp {
  width: 900px;
  height: 600px;
  display: flex;
  border: 2px solid rgb(175, 175, 175);
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 5px;
}
.payments {
  width: 900px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.payment {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  border-bottom: 2px solid rgb(175, 175, 175);
}
.table {
  width: 100px;
}
.ml10 {
  margin-left: 10px;
}
.mr10 {
  margin-right: 10px;
}
.finished {
  background-color: rgb(155, 202, 155);
  padding: 6px 15px 6px 15px;
  border-radius: 5px;
}
.rejected {
  background-color: rgb(220, 121, 121);
  padding: 6px 10px 6px 10px;
  border-radius: 5px;
}
.bold {
  font-weight: bold;
}
.fs25 {
  margin-top: 20px;
  font-size: 25px;
}
.detailsPayment {
  width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.detail {
  border-top: 2px solid rgb(225, 225, 225);
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  height: 30px;
}
.detail-name {
  color: rgb(154, 154, 154);
  font-size: 18px;
  font-weight: normal;
  display: flex;
  align-items: center;
  width: 300px;
}
.detail-value {
  font-size: 18px;
  font-weight: normal;
  display: flex;
  align-items: center;
}
img {
  width: 30px;
}
.back {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
}
.back:hover {
  background-color: rgb(201, 201, 201);
  width: 40px;
  cursor: pointer;
  height: 40px;
  border-radius: 50%;
}
</style>
