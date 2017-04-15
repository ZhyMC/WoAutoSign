/*
此网络访问模块由Zhy版权所有,支持Promise规范,支持HTTPS和HTTP,支持POST和GET
QQ:854185073
*/
var bufhelper=require("./bufferhelper.js");
var https=require("https");
var http=require("http");
var U=require("url");
var ZhyNet=function(){
this.Cookies=[];


};
ZhyNet.prototype.setCookie=function(name,value){
	this.Cookies[name]=value;
}
ZhyNet.prototype.getCookies=function(){
	let res="";

for(key in this.Cookies)
	if(key!="domain")
	if(key!="path")
	if(key!="expires")
			
	res+=key+"="+this.Cookies[key]+"; ";
//console.log(res.substring(0,res.length-2));
return res.substring(0,res.length-2);
}
ZhyNet.prototype.clearCookies=function(){
this.Cookies=[];
}
ZhyNet.prototype.parseCookies=function(cookiestr){
let ar=cookiestr.split(";");

for(x in ar)
{	let s=ar[x].split('=');
if(typeof s[0]!="undefined" && typeof s[1]!="undefined" )
if((s[0]+"").trim()!="" && (s[1]+"").trim()!="" )
this.Cookies[(s[0].trim())]=(s[1].trim());
}
}
ZhyNet.prototype.parseCookieArr=function(cookiearr){
	for(c in cookiearr){
this.parseCookies(cookiearr[c]);

	}

}
ZhyNet.substr=function(str,start,end){
	var i=str.indexOf(start)+start.length;
	return str.substring(i,str.indexOf(end,i));
}
ZhyNet.substrarr=function(str,start,end){

	var results=[];
	var n=0;
	do{
	
	var i=str.indexOf(start,n)+start.length;
	if(i<=n)break;
	var n=str.indexOf(end,i);

	results.push(str.substring(i,n));
	n+=end.length;

	}while(n<str.length && n>=i);
	return results;
}
ZhyNet.prototype.get=function(url,bin=false){
if(url.indexOf("://")==-1)return;
let pro;
if(url.indexOf("https://")!=-1)
pro=https; else pro=http;
var timeoutID=0;
var options=U.parse(url);
	 options.headers={
	  "Cache-Control": "no-cache",
	  "Connection": "keep-alive",
	    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.98 Safari/537.36",
	   "Content-Type": "application/x-www-form-urlencoded",
	"Accept-Language":"zh-CN,zh;q=0.8",
	
	  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
	
	 }
	
	 options.headers["Cookie"]=this.getCookies();
 var that=this;
return new Promise(function(resolve,reject){
let req=pro.get(options,(res)=>{

let buf=new bufhelper();
res.on("data",(c)=>buf.concat(c));
res.on("error",reject);
//res.setTimeout(2000,()=>reject());
res.on("end",()=>{
	clearTimeout(timeoutID);
	that.parseCookieArr(res.headers['set-cookie']);resolve(bin?buf.toBuffer():(buf.toBuffer().toString()+""));});
});

timeoutID=setTimeout(()=>{req.abort();reject("Timeout");},3000);

req.on("error",(e)=>{
reject(e);
});
//req.write(data);
//req.end();


});

}

ZhyNet.prototype.post=function(url,data,bin=false){
if(url.indexOf("://")==-1)return;
let pro;
if(url.indexOf("https://")!=-1)
pro=https; else pro=http;
var timeoutID=0;
var options=U.parse(url);
options.method="POST";

	 options.headers={
	
	  "Connection": "keep-alive",
	   "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.98 Safari/537.36",
	   "Content-Type": "application/x-www-form-urlencoded",
	 "Cookie":this.getCookies(),
	 "Host":options.host,
"Content-Length":data.length,
	"Accept-Language":"zh-CN,zh;q=0.8",
	"X-Requested-With": "XMLHttpRequest",
	  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
	
	 }
	
 var that=this;
return new Promise(function(resolve,reject){
let req=pro.request(options,(res)=>{
let buf=new bufhelper();
res.on("data",(c)=>buf.concat(c));
res.on("error",reject);
//res.setTimeout(2000,()=>reject());
res.on("end",()=>{
	clearTimeout(timeoutID);
	
	that.parseCookieArr(res.headers['set-cookie']);resolve(bin?buf.toBuffer():(buf.toBuffer().toString()+""));});
});

timeoutID=setTimeout(()=>{req.abort();reject("Timeout");},2000);

req.on("error",(e)=>{
reject(e);
});

req.end(data);

});


}
module.exports=ZhyNet;
