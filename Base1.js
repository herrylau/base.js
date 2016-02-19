

/*var base = {
	getId : function(id){
		return document.getElementById(id);
	},
	getName : function(name){
		return document.getElementsByName(name);
	},
	getTagName : function(tag){
		return document.getElementsByTagName(tag);
	}
}*/

var $ = function(){
	return new Base();
}

function Base(){
	this.elements = [];
	
	this.getId = function(id){
		this.elements.push(document.getElementById(id));
		return this;
	};
	
	this.getName = function(name){
		var names = document.getElementsByName(name);
		for(var i = 0; i < names.length; i++){
			this.elements.push(names[i]);
		}
		return this;
	};
	
	this.getTagName = function(tag){
		var tags = document.getElementsByTagName(tag);
		for(var i = 0; i < tags.length; i++){
			this.elements.push(tags[i]);
		}
		return this;
	};
}

//设置css样式
Base.prototype.css = function(attr,val){
	for(var i = 0; i < this.elements.length; i++){
		this.elements[i].style[attr] = val;
	}
	return this;
}

//设置html
Base.prototype.html = function(str){
	for(var i = 0; i < this.elements.length; i++){
		this.elements[i].innerHTML = str;
	}
	return this;
}

//设置onclick点击事件
Base.prototype.click = function(fn){
	for(var i = 0; i < this.elements.length; i++){
		this.elements[i].onclick = fn;
	}
	return this;
}

//获取某一个节点
Base.prototype.eq = function(num){
	var el = this.elements[num];
	this.elements = [];
	this.elements[0] = el;
	return this;
}























