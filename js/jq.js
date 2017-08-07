// JavaScript Document
//通过id的方式选择元素
function getId( str )
{
	return document.getElementById( str );
};

//模拟jquery $
function $( V )
{
	if( typeof V == 'string' )
	{
		return document.getElementById( V );
	}
	else if( typeof V == 'function' )
	{
		window.onload = V;
	}
	else if( typeof V == 'object' )
	{
		return V;
	};
	
};

//通过id class 标签选择( ps通过class找元素不兼容ie 6 7 8  )
/*function getElement(name,tagName)
{
	if( arguments.length == 1 )
	{
		//
		
		if( name.substring(0,1) == '#' )
		{
			console.log( '#' );
			return document.getElementById( name.substring(1) );
		}
		else if( name.substring(0,1) == '.' )
		{
			console.log( '.' );
			return document.getElementsByClassName( name.substring(1) );//不支持IE 6 7 8 
		};
		
	}
	else if( arguments.length == 2 )
	{
		return document.getElementById( name.substring(1) ).getElementsByTagName( tagName );
	};
	
};
*/

//找元素 强化版

function getElement(name,tagClassName)
{
	if( arguments.length == 1 )
	{
		if( name.substring(0,1) == '#' )
		{
			//console.log( '#' );
			return document.getElementById( name.substring(1) );//通过id找元素
		}
	}
	else if( arguments.length == 2 )
	{
		
		if( arguments[1].substring(0,1) == '.' )
		{
			var newClassName = tagClassName.substring(1);
			var aEles = [];
			
			var aEle = document.getElementsByTagName('name');
			
			for(var i=0;i<aEle.length;i++)
			{
				//[li1,li1,li2]
				var sClassName = aEle[i].className;//把每一个元素上的className以空格的形式分割成一个数组 ， 然后判断数组里面有没有和aClassName相同的。如果有，则把当前的这个元素追加到aEles数组。
				console.log( sClassName  );
				
				//[li1,li1,li2]
				for(var j=0;j<sClassName.length;j++)
				{
					if(sClassName[j] == newClassName)
					{
						aEles.push( aEle[i] );
						break;
					};
				};
				
			};
			
			
			return aEles;//通过className找元素
		}
		else
		{
			return document.getElementById( name.substring(1) ).getElementsByTagName( tagClassName );//通过标签找元素
		};
	};
};


//这个方法不建议使用，只能获取行间样式 。模拟css方法，两个参数获取对应元素的样式 ，三个参数 设置元素的样式 。
function css(obj,attr,value)
{
	if( arguments.length == 2 )
	{
		
		return document.getElementById(obj).style[attr];
	}
	else
	{
		document.getElementById(obj).style[attr] = value;
	};

};

//补0操作
function toZero(num)
{
	/*if( num < 10 )
	{
		num = '0' + num;
	}
	else
	{
		num = ''+num;
	};
	*/
	return num < 10 ? '0' + num: ''+num;
};
//获取计算后元素的样式
function getStyle( obj,attr )
{
	/*if( obj.currentStyle )
	{
		return obj.currentStyle[attr]
	}
	else
	{
		return getComputedStyle(obj)[attr]
	};*/
	
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
};

//匀速运动方法
function move(obj,attr,target,endFn)
{
	var dir = target > parseInt( getStyle( obj,attr ) ) ? 10 : -10;
	clearInterval( obj.timer );
	obj.timer = setInterval(function(){
		var speed = parseInt( getStyle( obj,attr ) ) + dir;

		if( speed > target && dir > 0 || speed < target && dir < 0 )
		{
			speed = target;
			clearInterval( obj.timer );
			/*
			if(endFn)
			{
				endFn();
			};*/
			endFn && endFn();
		};
		obj.style[attr] = speed + 'px';
		
	},30);
	
};


//删除className

function removeClassName(obj,aClassName)
{
	
	/*
		1:如果为空，什么也不做
		2：如果不为空。
	*/
	
	if(obj.className!='')
	{
		var newClassName = obj.className.split(' ');
		
		var indexOfNum = _indexOf( newClassName,aClassName )
		
		
		if(indexOfNum!=-1)
		{
			newClassName.splice( indexOfNum,1 );
			obj.className = newClassName.join(' ');
		};
		
	};
	
};

//添加className
function addClassName(obj,aClassName)
{
	/*
	1：如果所选元素className为空，则直接添加aClassName
	2：如果所选元素className不为空，
		1）如果所选元素上没有aClassName，则添加
		2）如果所选元素上有aClassName，则不添加*/
		
	
	if(obj.className == '')
	{
		obj.className = aClassName;
	}
	else
	{
		var newClassName = obj.className.split(' ');
		var indexOfNum = _indexOf(newClassName,aClassName);
		if(indexOfNum == -1)
		{
			obj.className += ' ' + aClassName
		};
		
	};
	
};

function _indexOf( newClassName,aClassName )//在数组里面查找有无相同的元素
{
	for(var i=0;i<newClassName.length;i++)
	{
		if(newClassName[i]==aClassName)
		{
			return i;
		};
	};
	return -1;
};

//缓冲运动
function sMove(obj,json,endFn)
{
	clearInterval( obj.timer );
	obj.timer = setInterval( function(){
		
		var isStop = true;//如果所有属性都到达目标位置，则为true。
		
		for( var attr in json )
		{
			if( attr == 'opacity' )
			{
				var cur = Math.round(parseFloat(getStyle( obj,'opacity' ))*100);
			}
			else
			{
				var cur = parseInt(getStyle(obj,attr));
			};
			
			var speed = (json[attr]-cur)/10;
			
			speed = speed > 0 ? Math.ceil(speed) : Math.floor( speed );
			
			if( cur!=json[attr] )//如果为真，则代表相应的属性值没有到达目标位置
			{
				isStop = false;
			};
			
			cur += speed;
			if( attr == 'opacity' )
			{
				obj.style.opacity = cur/100;
				obj.style.filter = 'alpha(opacity:'+ cur +')';
			}
			else
			{
				obj.style[attr] = cur + 'px';
			};
		};
		
		if(isStop)
		{
			clearInterval( obj.timer );
			endFn && endFn();
		};
	
	
	},30 );
	
};

//设置cookie
function setCookie( name,value,iDay )
{
	var oTime = new Date;
	
	oTime.setDate( oTime.getDate() + iDay );
	
	document.cookie = name + '='+ value +';expires='+oTime;
	
};
//删除cookie
function removeCookie( iName )
{
	setCookie( iName,'adf',-1 )
};
//获取cookie
function getCookie( iName )
{
	var arr = document.cookie.split( '; ' );
	for(var i=0;i<arr.length;i++)
	{
		var arr2 = arr[i].split('=');
		
		if( arr2[0] == iName )
		{
			return arr2[1];
		}
	};
	return '';
};

function drag( obj )//拖动
{
	obj.onmousedown = function(ev)
	{
		var ev = ev || event;
		
		var disX = ev.clientX - obj.offsetLeft;
		var disY = ev.clientY - obj.offsetTop;
		
		//console.log( disX +":"+disY );
		
		if(obj.setCapture)
		{
			obj.setCapture();
		};
		
		
		document.onmousemove = function(ev)
		{
			var ev = ev || event;
			
			
			var L = ev.clientX - disX;
			var T = ev.clientY - disY;
			
			if( L < 0 )
			{
				L = 0;
			}
			else if( L > document.documentElement.clientWidth - obj.offsetWidth )
			{
				L = document.documentElement.clientWidth - obj.offsetWidth;
			};
			
			
			if( T < 0 )
			{
				T = 0;
			}
			else if( T > document.documentElement.clientHeight - obj.offsetHeight )
			{
				T = document.documentElement.clientHeight - obj.offsetHeight;
			};
			
			
			
			obj.style.left = L + 'px';
			obj.style.top = T + 'px';
			
		};
		
		document.onmouseup = function()
		{
			document.onmousemove = document.onmouseup = null;
			
			if(obj.setCapture)
			{
				obj.releaseCapture();
			};
			
		};
		
		return false;
		
	};
};