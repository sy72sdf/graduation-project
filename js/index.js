window.onload = function()
{
/////////////////////////////////////////////////////////标签选中状态
	var oNav = document.getElementById('nav');
	var oNavli = oNav.getElementsByTagName('li');
	//console.log(oNavli[0])
	oNavli[0].style.background = '-webkit-linear-gradient(top,#3A3515,#dacb4c,#3A3515)';
	for (var i=0;i<oNavli.length;i++)
	{
		oNavli[i].onclick = function()
		{
			for (var i=0;i<oNavli.length;i++) 
			{
				oNavli[i].style.background = '';
			};
			this.style.background = '-webkit-linear-gradient(top,#3A3515,#dacb4c,#3A3515)';
			this.style.color = '#fff'
		};
		
	};
/////////////////////////////////////////////////////////模拟用户登录退出	
	var oCount = document.getElementById('count');
	var oPassword = document.getElementById('password');
	var oLogin = document.getElementById('login');
	var oBefore = document.getElementById('beforelog');
	var oAfter = document.getElementById('afterlog');
	var oH3 = document.getElementById('h3');
	var oQuit = document.getElementById('quit1');
	var userData = [{"userName":'songyifei',"passWord":'123456'}]//模拟数据库数据
	oBefore.style.display = 'block';
	oAfter.style.display = 'none';
		oLogin.onclick = function()
		{
			var aCount = oCount.value;
			var aPassword = oPassword.value;
	
			if (aCount == ''|| aPassword =='') 
			{
				alert('请输入账号密码');
				return false
			}
			if (aCount == userData[0]["userName"] && aPassword == userData[0]["passWord"]) 
			{
				oBefore.style.display = 'none';
				oH3.style.display = 'none';
				oAfter.style.display = 'block';
				return false
			}
			else
			{
				alert('账号密码错误');
				return false
			};
		};
		oQuit.onclick = function()
		{
			oBefore.style.display = 'block';
			oH3.style.display = 'block';
			oAfter.style.display = 'none';
		}
/////////////////////////////////////////////////////////轮播图
var oBtn = document.getElementById('oBtn');
var aBtn = oBtn.getElementsByTagName('li');
var oUl = document.getElementById('ul');
var oDiv = document.getElementById('imglogo');
var num = 0;
	aBtn[num].className = 'active';//初始化
	//oUl.innerHTML +=oUl.innerHTML;
	var timer = null;
	timer = setInterval(autoPlay,3000);//自动轮播
	
	oUl.onmouseover = function()//鼠标放上暂停
	{
		clearInterval( timer );
	};
	oUl.onmouseout = function()
	{
		timer = setInterval(autoPlay,3000);
	};
	
	for(var i=0;i<aBtn.length;i++) 
	{
		aBtn[i].index = i;
		aBtn[i].onmouseover = function()
		{
			this.style.cursor = 'pointer';
		};
		aBtn[i].onclick = function()//底部按钮点击事件
		{
			num = this.index;
			switchTab();
		};
	};
	
	function autoPlay()//每次滚动距离的系数
	{
		if(num==aBtn.length)//3
		{
			num=1;
			oUl.style.left = 0;
		}
		else//0
		{
			num++;//1 2 3
		};
		switchTab();
	};
	function switchTab()//底部按钮选中事件
	{
		for(var i=0;i<aBtn.length;i++)
		{
			aBtn[i].className = '';
		};
		if( num==aBtn.length )
		{
			aBtn[0].className = 'active';
		}
		else
		{
			aBtn[num].className = 'active';
		};
		
		sMove(oUl,{"left":-num*660})//封装函数，滚动.(目标、属性、属性值)
	};
/////////////////////////////////////////////////////////首页商店页面切换
var oBefore2 = document.getElementById('beforelog2');
var oAfter2 = document.getElementById('afterlog2');
getId('index').onclick = function()
{
	if (getId('content').style.display=='none'&& oBefore.style.display == 'none') {
		getId('content').style.display = 'block';
		getId('shop-content').style.display = 'none';
		getId('bg2').style.height='200px';
		getId('bg1').style.height='640px';
	} else if(getId('content').style.display=='none'&& oBefore.style.display == 'block'){
		getId('content').style.display = 'block';
		getId('shop-content').style.display = 'none';
		getId('bg2').style.height='200px';
		getId('bg1').style.height='640px';
	};
}
getId('shoplist').onclick = function()
{
	if (getId('shop-content').style.display=='none' &&oBefore.style.display == 'none') {
		getId('content').style.display = 'none';
		getId('shop-content').style.display = 'block';
		getId('bg2').style.height='1020px';
		getId('bg1').style.height='1020px';
	} 
	else{
		alert('请先登录');
		return
	};
}
/////////////////////////////////////////////////////////道具列表页面切换
//var oTag = document.getElementById('tag');
//var oTagspan = oTag.getElementsByTagName('span');
new SwitchTab();
function SwitchTab()
{
	var _this = this;
	this.oTag = document.getElementById('tag');
	this.oTagspan = this.oTag.getElementsByTagName('span');
	this.oItems = document.getElementById('items');
	this.itemsLi = this.oItems.getElementsByTagName('li');
	this.len = this.oTagspan.length
	//console.log(this.itemsLi)
	for (var i=0;i<this.len;i++) {
		this.oTagspan[i].index = i;
		this.oTagspan[i].onclick = function()
		{
			_this.fnClick(this);
		};	
	}
};
SwitchTab.prototype.fnClick = function(bt)
{
	for (var i=0;i<this.len;i++) {
		this.oTagspan[i].style.background = '';
		this.oTagspan[i].style.color = '';
		this.itemsLi[i].style.display = 'none';
	}
	this.oTagspan[bt.index].style.background = '#35ab88';
	this.oTagspan[bt.index].style.color = '#ffffff';
	this.itemsLi[bt.index].style.display = 'block';
};
/////////////////////////////////////////////////////////道具列表滑上特效(整合到添加物品)
//var oItems = document.getElementById('items');
//var oItem = oItems.getElementsByTagName('dd');
//for (var i=0;i<oItem.length;i++) {
//	oItem[i].onmouseover = function()
//	{
//		this.style.background = 'url(img/item.jpg) no-repeat';
//	};
//	oItem[i].onmouseout = function()
//	{
//		this.style.background = 'url(img/item2.jpg) no-repeat';
//	};
//};
/////////////////////////////////////////////////////////添加物品(关键代码一)
var oBuyfixed = document.getElementById('buyfixed');
var oCloseby = document.getElementById('closeby');
var aPrice = document.getElementById('by1price');
oBuyfixed.style.display = 'none';
oCloseby.onclick = function()//弹出框关闭
{
	oBuyfixed.style.display = 'none';
};
oCloseby.onmouseover = function()
{
	oCloseby.style.cursor = 'pointer';
};
//json模拟后台数据
var dl1info=[
{"img":'1',"name":'碎颅锤',"price":'800',"amount":'10'},{"img":'2',"name":'辉煌法杖',"price":'700',"amount":'10'},{"img":'3',"name":'重弩炮',"price":'1000',"amount":'10'},
{"img":'4',"name":'尖刺铠甲',"price":'900',"amount":'10'},{"img":'5',"name":'邪恶头盔',"price":'650',"amount":'10'},{"img":'6',"name":'守护护手',"price":'550',"amount":'10'}
];
var dl2info=[
{"img":'7',"name":'酸性炸弹',"price":'300',"amount":'50'},{"img":'8',"name":'燃烧瓶',"price":'200',"amount":'50'},{"img":'9',"name":'医疗包',"price":'150',"amount":'50'},
{"img":'10',"name":'照明弹',"price":'50',"amount":'50'}
];
var dl3info=[
{"img":'11',"name":'复活卷轴（稀有）',"price":'2500',"amount":'2'},{"img":'12',"name":'雷霆之锤（稀有）',"price":'5000',"amount":'1'}
];
additem('dl1',dl1info);//物品添加
additem('dl2',dl2info);
additem('dl3',dl3info);
function additem(obj,info)//封装物品添加函数
{
	var oDl = document.getElementById(obj);
	
	for (var i=0;i<info.length;i++) 
{
	var oDd = document.createElement('dd');//DOM添加dd
	var oDiv = document.createElement('div');//DOM添加div（购买按钮）  info[i]["img"]
	oDiv.innerHTML = '<a href="javascript:;">点击购买</a>';
	oDd.innerHTML = '<div class="pic"><img src="img/sucai/'+ info[i]["img"] +'.jpg"></div><div class="name">'+ info[i]["name"] +'</div><div class="price">价格：'+ info[i]["price"] +'金币</div><div class="amount" style = "display:none">库存:'+ info[i]["amount"] +'</div>';
//	oDiv.onclick = function()//绑定购买弹出事件
//	{
//		oBuyfixed.style.display = 'block';	
//	};
	oDd.appendChild(oDiv);
	oDd.onmouseover = function()
	{
		this.style.background = 'url(img/item.jpg) no-repeat';
	};
	oDd.onmouseout = function()
	{
		this.style.background = 'url(img/item2.jpg) no-repeat';
	};
oDl.appendChild(oDd);
addClassName(oDiv,'buy');//添加购买按钮样式(目标、class名)

var aDiv = document.getElementsByClassName('buy')//ie9以下不兼容！
var bPrice = document.getElementsByClassName('price');
var oNumber = document.getElementsByClassName('amount');
//aPrice.innerHTML ='价格:'+0+'金币'; 
for (var j=0;j<aDiv.length;j++) 
{
	aDiv[j].index = j;
	aDiv[j].onclick = function()
	{
		oShuliang.innerHTML = '数量：0';
		aPrice.innerHTML =bPrice[this.index].innerHTML;//弹出页获得价格
		oBuyfixed.style.display = 'block';
		oAmount.innerHTML = oNumber[this.index].innerHTML;//弹出页获得库存
		oAllprice.innerHTML = '总价';//初始化
		aShuliang = 0;//初始化
		//console.log(aPrice.innerHTML)
	};
};
};
};
/////////////////////////////////////////////////////////购买功能(关键代码二)
var oJia = document.getElementById('jia');
var oJian = document.getElementById('jian');
var oShuliang = document.getElementById('shuliang');
var oAllprice = document.getElementById('allprice');
var oGet = document.getElementById('getit');
var oMoney1 = document.getElementById('yourmoney1');
var oMoney2 = document.getElementById('yourmoney2');
var oAmount = document.getElementById('amount');
var aShuliang = 0;

oJia.onclick = function()//数量加
{
	aShuliang++;
	if (aShuliang>parseFloat(oAmount.innerHTML.substring(3))) {
		aShuliang=parseFloat(oAmount.innerHTML.substring(3));
		alert('库存不足！')
		return
	};
	if (aShuliang>1) {
		aPrice.innerHTML = '价格：'+ (parseFloat(aPrice.innerHTML.substring(3)) + 50) +'金币';
	}
	oShuliang.innerHTML = '数量：'+ aShuliang;
	oAllprice.innerHTML =  '总价:'+parseFloat(aPrice.innerHTML.substring(3))* parseFloat(oShuliang.innerHTML.substring(3))+'元';
};
oJian.onclick = function()//数量减
{
	aShuliang--;
	if(aShuliang<1)
	{
		aShuliang = 0;
	}else if(aShuliang<=parseFloat(oAmount.innerHTML.substring(3))){
		aPrice.innerHTML = '价格：'+ (parseFloat(aPrice.innerHTML.substring(3)) - 50) +'金币';
		
	};
	oShuliang.innerHTML = '数量：'+ aShuliang;
	oAllprice.innerHTML =  '总价:'+parseFloat(aPrice.innerHTML.substring(3))* parseFloat(oShuliang.innerHTML.substring(3))+'元';

};
oGet.onclick = function()
{
	//console.log(oShuliang.innerHTML);console.log(oAllprice.innerHTML);
	if (parseFloat(oMoney2.innerHTML.substring(3))>=parseFloat(oAllprice.innerHTML.substring(3))&&parseFloat(oShuliang.innerHTML.substring(3))<=parseFloat(oAmount.innerHTML.substring(3))&&parseFloat(oShuliang.innerHTML.substring(3))!=0) {
		alert('购买成功！');
		oAmount.innerHTML ='库存：'+ (parseFloat(oAmount.innerHTML.substring(3))-parseFloat(oShuliang.innerHTML.substring(3)));
		oMoney2.innerHTML = '余额:'+ (parseFloat(oMoney2.innerHTML.substring(3))-parseFloat(oAllprice.innerHTML.substring(3)))//购买页余额
		//console.log(oMoney.innerHTML);
		oMoney1.innerHTML = '余额:'+ (parseFloat(oMoney1.innerHTML.substring(3))-parseFloat(oAllprice.innerHTML.substring(3)))//首页余额
		
		return
	} else if(parseFloat(oShuliang.innerHTML.substring(3))==0){
		alert('请选择数量')
		return
	}else if(parseFloat(oMoney2.innerHTML.substring(3))<parseFloat(oAllprice.innerHTML.substring(3))){
		alert('余额不足！')
		return
	};
};
};
