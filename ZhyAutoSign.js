var crypto=require("crypto");
var net=require("zhynet");
var Net=new net();
var accountid="";
var token="";

//=================================
var LoginName="";//联通沃用户名
var LoginPass="";//联通沃密码
//==================================

function decode3DES(b64){
var str=new Buffer(b64,"base64");
var key=new Buffer("TcRlEiyjizMOfK4uTquKdQ5x");
var decipher = crypto.createDecipheriv("des-ede3", key, new Buffer(0));
var txt=decipher.update(str,'hex','utf-8');
txt+= decipher.final('utf8');
return txt;
}
function encode3DES(str){
var key=new Buffer("TcRlEiyjizMOfK4uTquKdQ5x");
var Cipheriv = crypto.createCipheriv("des-ede3", key, new Buffer(0));
 Cipheriv.setAutoPadding(true);
var b64=Cipheriv.update(str,'utf8','base64');
b64+= Cipheriv.final('base64');
return b64;
}
function encode(str){
	return "%24xmlmsg="+encodeURIComponent(encode3DES(str));
}
function RandomNum(Min,Max){
   
}

function RandomDeviceID(){
	let deviceid="";
	for(let i=0;i<15;i++)
	deviceid+=Math.round(Math.random()*10)+"";
return deviceid;	
}
var devicename="MI 5";//设备名
var androidver="7.1.1";
var xmlmsg="<Root><BizCode>FA10021</BizCode><ClientType>"+devicename+"</ClientType><ClientOS>"+androidver+"</ClientOS><ClientIP>192.168.1.100</ClientIP><Award>wo-app-award</Award><SessionId></SessionId><SvcContent><![CDATA[<Request> <OperatorID></OperatorID><RegionId></RegionId><CountyId></CountyId><OfficeId></OfficeId><ChannelType></ChannelType><LogType>3</LogType><LoginName>"+LoginName+"</LoginName><Code>"+LoginPass+"</Code><DeviceId>"+RandomDeviceID()+"</DeviceId><DeviceMac>02:00:00:00:00:00</DeviceMac><AppVersion>2.70</AppVersion><RegistrationId></RegistrationId></Request>]]></SvcContent></Root>";
var Nnet=new net();//隔离开两个Net,防止Cookie串在一起
	
Net.post("http://220.250.20.68:7001/FlowAssistantAuthServlet",encode(xmlmsg))

.then((data)=>{
	console.log("登录情况:"+net.substr(data,"<RspInfo>","</RspInfo>"));
	accountid=net.substr(data,"<AccountId>","</AccountId>");
	token=net.substr(data,"<Token>","</Token>");
	Nnet.setCookie("accountId",accountid);
	Nnet.setCookie("accessToken",token);
	return Nnet.post("https://ll.fj10010.com/app/sign!signQuery.action","");//这里是Promise语法
	
})
.then((res)=>{
	//console.log(Nnet.getCookies());  //此时已经获得Cookie,我的Net类能够自动储存它们,继续POST就行
	return Nnet.post("https://ll.fj10010.com/app/sign!sign.action","")//最后一步,签到.这里是Promise语法,直接返回以便于在下个then获得POST结果
	}
	)
.then((res)=>{
	console.log(res);//签到完毕
	
	let querymsg="<Root><BizCode>FA10008</BizCode><ClientType>"+devicename+"</ClientType><ClientOS>"+androidver+"</ClientOS><ClientIP>2.70</ClientIP><Award>wo-app-award</Award><SessionId>"+token+"</SessionId><SvcContent><![CDATA[<Request><AccountId>"+accountid+"</AccountId></Request>]]></SvcContent></Root>";
	return Nnet.post("http://220.250.20.68:7001/FlowAssistantAuthServlet",encode(querymsg));
	})
.then((res)=>{
	let totalNum=net.substr(res,"<TotalFlowNum>","</TotalFlowNum>");
	console.log("\n您当前V网账户总流量总共有"+totalNum+"M");	
})
	
	;
	
	
