# WoAutoSign
Zhy的福建联通V网自动签到Nodejs脚本
<br/>
使用方法:<br/>
⓪cd ~<br/>
①git clone https://github.com/ZhyMC/WoAutoSign.git<br/>
②npm install zhynet //安装支持库<br/>
③cd WoAutoSign<br/>
④nano ZhyAutoSign.js<br/>
⑤填写Wo账号密码<br/>
⑥保存<br/>
⑦crontab -e<br/>
⑧填入 0 1 * * * node ~/WoAutoSign/ZhyAutoSign.js  #每天凌晨1点执行一次自动签到脚本<br/>
⑨保存<br/>
<br/>
随便找个Linux服务器挂一挂,一个月几百M流量自动入账户,甚至可以挂在你的树莓派服务器上,一天一次访问,超级省资源,所以也可以让你的朋友帮忙代挂.
<br/>
# PS:喝水不要忘记挖井人哦
