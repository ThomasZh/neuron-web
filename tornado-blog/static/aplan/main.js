﻿"use strict";
function pageInit(){
	var t="",
	e=["DFPPOP3W12-GB","DFPTanLiW5-GB","DFPWaWaW5-GB","DFPGangBiW2-GB","DFPJinWenW3-GB","DFPHanziPenW5-GB"],
	h=[];
	
	is_ios&&(
		$("html").addClass("ios"),
		$("body").append('<div id="mask"></div>'),
		$("#mask").on("click",function(t){t.preventDefault(),$(this).hide()})
	);
	
	for(var i=0;i<datalist.length;i++){
		var l=datalist[i];
		if(1==l.type){
			l=l.textList[0];
			var g="normal",r="left",s="",d="";
		
			switch(l.fontName&&(s=e[l.fontName-1],-1==$.inArray(s,h)&&h.push(s)),l.fontColor&&(d="color"+l.fontColor),l.fontSize){
				case 1:g="small";break;
				case 2:g="big";break;
				case 3:g="title"
			}
		
			switch(l.textAlign){
				case 1:r="center";break;
				case 2:r="right"
			}
		
			var p=$("#text-template").html(),c=Handlebars.compile(p),
			f={fontSize:g,textAlign:r,text:l.text,fontName:s,fontColor:d};
			t+=c(f)
		}else if(2==l.type){
			for(var p=$("#photos-template").html(),c=Handlebars.compile(p),y=[],n=0;n<l.mediaList.length;n++){
				var a={photo:l.mediaList[n].image.url,originalPhoto:l.mediaList[n].originalImage.url,
					originalSize:l.mediaList[n].originalImageWidth+"x"+l.mediaList[n].originalImageHeight};
				y.push(a)
			}
			var f={count:y.length,index:l.index,medialist:y};
			t+=c(f)
		}
	}
	$("#skrollr-body").append(t);
		
	for(var o="",i=0;i<h.length;i++)
		o+='@font-face{font-family: "'+h[i]+'";src: url(http://stimgcn1-ppe.s-msn.com/scroll/FontSubSetting/'+uid+"/"+uuid+"_"+h[i]+".ttf);}";
	$("head").append("<style>"+o+"</style>"),initPhotoSwipeFromDOM(".gallery"),galleryReSet();
	var u={reset:!1,vFactor:.3,mobile:!0};
	window.sr=new scrollReveal(u)
}

function galleryReSet(){
	var t=($(window).width(),20),
	e=10,
	h=$(".gallery").width(),
	i=h-2*t,
	l=(i-e)/2,
	g=(i-2*e)/3;
	$(".gallery").height(i),
	$(".gallery1.type0").height(i/2),
	$(".gallery2.type0").height(l),
	$(".gallery3.type6").height(g),
	$(".gallery6.type0").height(2*g+e),
	$(".gallery1.type0 figure:nth-child(1)").css({top:0,left:t,width:i,height:i/2}),
	$(".gallery1.type1 figure:nth-child(1)").css({top:0,left:t,width:i,height:i}),
	$(".gallery2.type0 figure:nth-child(1)").css({top:0,left:t,width:l,height:l}),
	$(".gallery2.type0 figure:nth-child(2)").css({top:0,left:l+e+t,width:l,height:l}),
	$(".gallery2.type1 figure:nth-child(1)").css({top:0,left:t,width:i,height:l}),
	$(".gallery2.type1 figure:nth-child(2)").css({top:l+e,left:t,width:i,height:l}),
	$(".gallery2.type2 figure:nth-child(1)").css({top:0,left:t,width:l,height:i}),
	$(".gallery2.type2 figure:nth-child(2)").css({top:0,left:l+e+t,width:l,height:i}),
	$(".gallery3.type0 figure:nth-child(1)").css({top:0,left:t,width:l,height:i}),
	$(".gallery3.type0 figure:nth-child(2)").css({top:0,left:l+e+t,width:l,height:l}),
	$(".gallery3.type0 figure:nth-child(3)").css({top:l+e,left:l+e+t,width:l,height:l}),
	$(".gallery3.type1 figure:nth-child(1)").css({top:0,left:t,width:l,height:l}),
	$(".gallery3.type1 figure:nth-child(2)").css({top:l+e,left:t,width:l,height:l}),
	$(".gallery3.type1 figure:nth-child(3)").css({top:0,left:l+e+t,width:l,height:i}),
	$(".gallery3.type2 figure:nth-child(1)").css({top:0,left:t,width:l,height:l}),
	$(".gallery3.type2 figure:nth-child(2)").css({top:0,left:l+e+t,width:l,height:l}),
	$(".gallery3.type2 figure:nth-child(3)").css({top:l+e,left:t,width:i,height:l}),
	$(".gallery3.type3 figure:nth-child(1)").css({top:0,left:t,width:i,height:l}),
	$(".gallery3.type3 figure:nth-child(2)").css({top:l+e,left:t,width:l,height:l}),
	$(".gallery3.type3 figure:nth-child(3)").css({top:l+e,left:l+e+t,width:l,height:l}),
	$(".gallery3.type4 figure:nth-child(1)").css({top:0,left:t,width:g,height:i}),
	$(".gallery3.type4 figure:nth-child(2)").css({top:0,left:t+g+e,width:g,height:i}),
	$(".gallery3.type4 figure:nth-child(3)").css({top:0,left:t+2*(g+e),width:g,height:i}),
	$(".gallery3.type5 figure:nth-child(1)").css({top:0,left:t,width:i,height:g}),
	$(".gallery3.type5 figure:nth-child(2)").css({top:g+e,left:t,width:i,height:g}),
	$(".gallery3.type5 figure:nth-child(3)").css({top:2*(g+e),left:t,width:i,height:g}),
	$(".gallery3.type6 figure:nth-child(1)").css({top:0,left:t,width:g,height:g}),
	$(".gallery3.type6 figure:nth-child(2)").css({top:0,left:t+g+e,width:g,height:g}),
	$(".gallery3.type6 figure:nth-child(3)").css({top:0,left:t+2*(g+e),width:g,height:g}),
	$(".gallery4.type0 figure:nth-child(1)").css({top:0,left:t,width:l,height:l}),
	$(".gallery4.type0 figure:nth-child(2)").css({top:0,left:t+l+e,width:l,height:l}),
	$(".gallery4.type0 figure:nth-child(3)").css({top:l+e,left:t,width:l,height:l}),
	$(".gallery4.type0 figure:nth-child(4)").css({top:l+e,left:t+l+e,width:l,height:l}),
	$(".gallery4.type1 figure:nth-child(1)").css({top:0,left:t,width:i,height:l}),
	$(".gallery4.type1 figure:nth-child(2)").css({top:l+e,left:t,width:g,height:l}),
	$(".gallery4.type1 figure:nth-child(3)").css({top:l+e,left:t+g+e,width:g,height:l}),
	$(".gallery4.type1 figure:nth-child(4)").css({top:l+e,left:t+2*(g+e),width:g,height:l}),
	$(".gallery4.type2 figure:nth-child(1)").css({top:0,left:t,width:g,height:l}),
	$(".gallery4.type2 figure:nth-child(2)").css({top:0,left:t+g+e,width:g,height:l}),
	$(".gallery4.type2 figure:nth-child(3)").css({top:0,left:t+2*(g+e),width:g,height:l}),
	$(".gallery4.type2 figure:nth-child(4)").css({top:l+e,left:t,width:i,height:l}),
	$(".gallery4.type3 figure:nth-child(1)").css({top:0,left:t,width:l,height:i}),
	$(".gallery4.type3 figure:nth-child(2)").css({top:0,left:t+l+e,width:l,height:g}),
	$(".gallery4.type3 figure:nth-child(3)").css({top:g+e,left:t+l+e,width:l,height:g}),
	$(".gallery4.type3 figure:nth-child(4)").css({top:2*(g+e),left:t+l+e,width:l,height:g}),
	$(".gallery4.type4 figure:nth-child(1)").css({top:0,left:t,width:l,height:g}),
	$(".gallery4.type4 figure:nth-child(2)").css({top:g+e,left:t,width:l,height:g}),
	$(".gallery4.type4 figure:nth-child(3)").css({top:2*(g+e),left:t,width:l,height:g}),
	$(".gallery4.type4 figure:nth-child(4)").css({top:0,left:t+l+e,width:l,height:i}),
	$(".gallery4.type5 figure:nth-child(1)").css({top:0,left:t,width:i,height:g}),
	$(".gallery4.type5 figure:nth-child(2)").css({top:g+e,left:t,width:l,height:g}),
	$(".gallery4.type5 figure:nth-child(3)").css({top:2*(g+e),left:t,width:l,height:g}),
	$(".gallery4.type5 figure:nth-child(4)").css({top:g+e,left:t+l+e,width:l,height:2*g+e}),
	$(".gallery4.type6 figure:nth-child(1)").css({top:0,left:t,width:i,height:g}),
	$(".gallery4.type6 figure:nth-child(2)").css({top:g+e,left:t,width:l,height:2*g+e}),
	$(".gallery4.type6 figure:nth-child(3)").css({top:g+e,left:t+l+e,width:l,height:g}),
	$(".gallery4.type6 figure:nth-child(4)").css({top:2*(g+e),left:t+l+e,width:l,height:g}),
	$(".gallery4.type7 figure:nth-child(1)").css({top:0,left:t,width:l,height:g}),
	$(".gallery4.type7 figure:nth-child(2)").css({top:g+e,left:t,width:l,height:g}),
	$(".gallery4.type7 figure:nth-child(3)").css({top:0,left:t+l+e,width:l,height:2*g+e}),
	$(".gallery4.type7 figure:nth-child(4)").css({top:2*(g+e),left:t,width:i,height:g}),
	$(".gallery4.type8 figure:nth-child(1)").css({top:0,left:t,width:l,height:2*g+e}),
	$(".gallery4.type8 figure:nth-child(2)").css({top:0,left:t+l+e,width:l,height:g}),
	$(".gallery4.type8 figure:nth-child(3)").css({top:g+e,left:t+l+e,width:l,height:g}),
	$(".gallery4.type8 figure:nth-child(4)").css({top:2*(g+e),left:t,width:i,height:g}),
	$(".gallery4.type9 figure:nth-child(1)").css({top:0,left:t,width:g,height:i}),
	$(".gallery4.type9 figure:nth-child(2)").css({top:0,left:t+g+e,width:g,height:l}),
	$(".gallery4.type9 figure:nth-child(3)").css({top:0,left:t+2*(g+e),width:g,height:l}),
	$(".gallery4.type9 figure:nth-child(4)").css({top:l+e,left:t+g+e,width:2*g+e,height:l}),
	$(".gallery4.type10 figure:nth-child(1)").css({top:0,left:t,width:g,height:l}),
	$(".gallery4.type10 figure:nth-child(2)").css({top:0,left:t+g+e,width:g,height:l}),
	$(".gallery4.type10 figure:nth-child(3)").css({top:l+e,left:t,width:2*g+e,height:l}),
	$(".gallery4.type10 figure:nth-child(4)").css({top:0,left:t+2*(g+e),width:g,height:i}),
	$(".gallery4.type11 figure:nth-child(1)").css({top:0,left:t,width:2*g+e,height:l}),
	$(".gallery4.type11 figure:nth-child(2)").css({top:l+e,left:t,width:g,height:l}),
	$(".gallery4.type11 figure:nth-child(3)").css({top:l+e,left:t+g+e,width:g,height:l}),
	$(".gallery4.type11 figure:nth-child(4)").css({top:0,left:t+2*(g+e),width:g,height:i}),
	$(".gallery4.type12 figure:nth-child(1)").css({top:0,left:t,width:g,height:i}),
	$(".gallery4.type12 figure:nth-child(2)").css({top:0,left:t+g+e,width:2*g+e,height:l}),
	$(".gallery4.type12 figure:nth-child(3)").css({top:l+e,left:t+g+e,width:g,height:l}),
	$(".gallery4.type12 figure:nth-child(4)").css({top:l+e,left:t+2*(g+e),width:g,height:l}),
	$(".gallery4.type13 figure:nth-child(1)").css({top:0,left:t,width:i,height:g}),
	$(".gallery4.type13 figure:nth-child(2)").css({top:g+e,left:t,width:i,height:g}),
	$(".gallery4.type13 figure:nth-child(3)").css({top:2*(g+e),left:t,width:l,height:g}),
	$(".gallery4.type13 figure:nth-child(4)").css({top:2*(g+e),left:t+l+e,width:l,height:g}),
	$(".gallery4.type14 figure:nth-child(1)").css({top:0,left:t,width:i,height:g}),
	$(".gallery4.type14 figure:nth-child(2)").css({top:g+e,left:t,width:l,height:g}),
	$(".gallery4.type14 figure:nth-child(3)").css({top:g+e,left:t+l+e,width:l,height:g}),
	$(".gallery4.type14 figure:nth-child(4)").css({top:2*(g+e),left:t,width:i,height:g}),
	$(".gallery4.type15 figure:nth-child(1)").css({top:0,left:t,width:l,height:g}),
	$(".gallery4.type15 figure:nth-child(2)").css({top:0,left:t+l+e,width:l,height:g}),
	$(".gallery4.type15 figure:nth-child(3)").css({top:g+e,left:t,width:i,height:g}),
	$(".gallery4.type15 figure:nth-child(4)").css({top:2*(g+e),left:t,width:i,height:g}),
	$(".gallery4.type16 figure:nth-child(1)").css({top:0,left:t,width:g,height:i}),
	$(".gallery4.type16 figure:nth-child(2)").css({top:0,left:t+g+e,width:g,height:i}),
	$(".gallery4.type16 figure:nth-child(3)").css({top:0,left:t+2*(g+e),width:g,height:l}),
	$(".gallery4.type16 figure:nth-child(4)").css({top:l+e,left:t+2*(g+e),width:g,height:l}),
	$(".gallery4.type17 figure:nth-child(1)").css({top:0,left:t,width:g,height:i}),
	$(".gallery4.type17 figure:nth-child(2)").css({top:0,left:t+g+e,width:g,height:l}),
	$(".gallery4.type17 figure:nth-child(3)").css({top:l+e,left:t+g+e,width:g,height:l}),
	$(".gallery4.type17 figure:nth-child(4)").css({top:0,left:t+2*(g+e),width:g,height:i}),
	$(".gallery4.type18 figure:nth-child(1)").css({top:0,left:t,width:g,height:l}),
	$(".gallery4.type18 figure:nth-child(2)").css({top:l+e,left:t,width:g,height:l}),
	$(".gallery4.type18 figure:nth-child(3)").css({top:0,left:t+g+e,width:g,height:i}),
	$(".gallery4.type18 figure:nth-child(4)").css({top:0,left:t+2*(g+e),width:g,height:i}),
	$(".gallery5.type0 figure:nth-child(1)").css({top:0,left:t,width:l,height:l}),
	$(".gallery5.type0 figure:nth-child(2)").css({top:l+e,left:t,width:l,height:l}),
	$(".gallery5.type0 figure:nth-child(3)").css({top:0,left:t+l+e,width:l,height:g}),
	$(".gallery5.type0 figure:nth-child(4)").css({top:g+e,left:t+l+e,width:l,height:g}),
	$(".gallery5.type0 figure:nth-child(5)").css({top:2*(g+e),left:t+l+e,width:l,height:g}),
	$(".gallery5.type1 figure:nth-child(1)").css({top:0,left:t,width:l,height:g}),
	$(".gallery5.type1 figure:nth-child(2)").css({top:g+e,left:t,width:l,height:g}),
	$(".gallery5.type1 figure:nth-child(3)").css({top:2*(g+e),left:t,width:l,height:g}),
	$(".gallery5.type1 figure:nth-child(4)").css({top:0,left:t+l+e,width:l,height:l}),
	$(".gallery5.type1 figure:nth-child(5)").css({top:l+e,left:t+l+e,width:l,height:l}),
	$(".gallery5.type2 figure:nth-child(1)").css({top:0,left:t,width:g,height:l}),
	$(".gallery5.type2 figure:nth-child(2)").css({top:0,left:t+g+e,width:g,height:l}),
	$(".gallery5.type2 figure:nth-child(3)").css({top:0,left:t+2*(g+e),width:g,height:l}),
	$(".gallery5.type2 figure:nth-child(4)").css({top:l+e,left:t,width:l,height:l}),
	$(".gallery5.type2 figure:nth-child(5)").css({top:l+e,left:t+l+e,width:l,height:l}),
	$(".gallery5.type3 figure:nth-child(1)").css({top:0,left:t,width:l,height:l}),
	$(".gallery5.type3 figure:nth-child(2)").css({top:0,left:t+l+e,width:l,height:l}),
	$(".gallery5.type3 figure:nth-child(3)").css({top:l+e,left:t,width:g,height:l}),
	$(".gallery5.type3 figure:nth-child(4)").css({top:l+e,left:t+g+e,width:g,height:l}),
	$(".gallery5.type3 figure:nth-child(5)").css({top:l+e,left:t+2*(g+e),width:g,height:l}),
	$(".gallery5.type4 figure:nth-child(1)").css({top:0,left:t,width:g,height:i}),
	$(".gallery5.type4 figure:nth-child(2)").css({top:0,left:t+g+e,width:g,height:l}),
	$(".gallery5.type4 figure:nth-child(3)").css({top:l+e,left:t+g+e,width:g,height:l}),
	$(".gallery5.type4 figure:nth-child(4)").css({top:0,left:t+2*(g+e),width:g,height:l}),
	$(".gallery5.type4 figure:nth-child(5)").css({top:l+e,left:t+2*(g+e),width:g,height:l}),
	$(".gallery5.type5 figure:nth-child(1)").css({top:0,left:t,width:g,height:l}),
	$(".gallery5.type5 figure:nth-child(2)").css({top:l+e,left:t,width:g,height:l}),
	$(".gallery5.type5 figure:nth-child(3)").css({top:0,left:t+g+e,width:g,height:i}),
	$(".gallery5.type5 figure:nth-child(4)").css({top:0,left:t+2*(g+e),width:g,height:l}),
	$(".gallery5.type5 figure:nth-child(5)").css({top:l+e,left:t+2*(g+e),width:g,height:l}),
	$(".gallery5.type6 figure:nth-child(1)").css({top:0,left:t,width:g,height:l}),
	$(".gallery5.type6 figure:nth-child(2)").css({top:l+e,left:t,width:g,height:l}),
	$(".gallery5.type6 figure:nth-child(3)").css({top:0,left:t+g+e,width:g,height:l}),
	$(".gallery5.type6 figure:nth-child(4)").css({top:l+e,left:t+g+e,width:g,height:l}),
	$(".gallery5.type6 figure:nth-child(5)").css({top:0,left:t+2*(g+e),width:g,height:i}),
	$(".gallery5.type7 figure:nth-child(1)").css({top:0,left:t,width:i,height:g}),
	$(".gallery5.type7 figure:nth-child(2)").css({top:g+e,left:t,width:l,height:g}),
	$(".gallery5.type7 figure:nth-child(3)").css({top:g+e,left:t+l+e,width:l,height:g}),
	$(".gallery5.type7 figure:nth-child(4)").css({top:2*(g+e),left:t,width:l,height:g}),
	$(".gallery5.type7 figure:nth-child(5)").css({top:2*(g+e),left:t+l+e,width:l,height:g}),
	$(".gallery5.type8 figure:nth-child(1)").css({top:0,left:t,width:l,height:g}),
	$(".gallery5.type8 figure:nth-child(2)").css({top:0,left:t+l+e,width:l,height:g}),
	$(".gallery5.type8 figure:nth-child(3)").css({top:g+e,left:t,width:l,height:g}),
	$(".gallery5.type8 figure:nth-child(4)").css({top:g+e,left:t+l+e,width:l,height:g}),
	$(".gallery5.type8 figure:nth-child(5)").css({top:2*(g+e),left:t,width:i,height:g}),
	$(".gallery5.type9 figure:nth-child(1)").css({top:0,left:t,width:l,height:g}),
	$(".gallery5.type9 figure:nth-child(2)").css({top:0,left:t+l+e,width:l,height:g}),
	$(".gallery5.type9 figure:nth-child(3)").css({top:g+e,left:t,width:i,height:g}),
	$(".gallery5.type9 figure:nth-child(4)").css({top:2*(g+e),left:t,width:l,height:g}),
	$(".gallery5.type9 figure:nth-child(5)").css({top:2*(g+e),left:t+l+e,width:l,height:g}),
	$(".gallery5.type10 figure:nth-child(1)").css({top:0,left:t,width:g,height:i}),
	$(".gallery5.type10 figure:nth-child(2)").css({top:0,left:t+g+e,width:g,height:i}),
	$(".gallery5.type10 figure:nth-child(3)").css({top:0,left:t+2*(g+e),width:g,height:g}),
	$(".gallery5.type10 figure:nth-child(4)").css({top:g+e,left:t+2*(g+e),width:g,height:g}),
	$(".gallery5.type10 figure:nth-child(5)").css({top:2*(g+e),left:t+2*(g+e),width:g,height:g}),
	$(".gallery5.type11 figure:nth-child(1)").css({top:0,left:t,width:g,height:i}),
	$(".gallery5.type11 figure:nth-child(2)").css({top:0,left:t+g+e,width:g,height:g}),
	$(".gallery5.type11 figure:nth-child(3)").css({top:g+e,left:t+g+e,width:g,height:g}),
	$(".gallery5.type11 figure:nth-child(4)").css({top:2*(g+e),left:t+g+e,width:g,height:g}),
	$(".gallery5.type11 figure:nth-child(5)").css({top:0,left:t+2*(g+e),width:g,height:i}),
	$(".gallery5.type12 figure:nth-child(1)").css({top:0,left:t,width:g,height:g}),
	$(".gallery5.type12 figure:nth-child(2)").css({top:g+e,left:t,width:g,height:g}),
	$(".gallery5.type12 figure:nth-child(3)").css({top:2*(g+e),left:t,width:g,height:g}),
	$(".gallery5.type12 figure:nth-child(4)").css({top:0,left:t+g+e,width:g,height:i}),
	$(".gallery5.type12 figure:nth-child(5)").css({top:0,left:t+2*(g+e),width:g,height:i}),
	$(".gallery5.type13 figure:nth-child(1)").css({top:0,left:t,width:i,height:g}),
	$(".gallery5.type13 figure:nth-child(2)").css({top:g+e,left:t,width:i,height:g}),
	$(".gallery5.type13 figure:nth-child(3)").css({top:2*(g+e),left:t,width:g,height:g}),
	$(".gallery5.type13 figure:nth-child(4)").css({top:2*(g+e),left:t+g+e,width:g,height:g}),
	$(".gallery5.type13 figure:nth-child(5)").css({top:2*(g+e),left:t+2*(g+e),width:g,height:g}),
	$(".gallery5.type14 figure:nth-child(1)").css({top:0,left:t,width:g,height:g}),
	$(".gallery5.type14 figure:nth-child(2)").css({top:0,left:t+g+e,width:g,height:g}),
	$(".gallery5.type14 figure:nth-child(3)").css({top:0,left:t+2*(g+e),width:g,height:g}),
	$(".gallery5.type14 figure:nth-child(4)").css({top:g+e,left:t,width:i,height:g}),
	$(".gallery5.type14 figure:nth-child(5)").css({top:2*(g+e),left:t,width:i,height:g}),
	$(".gallery5.type15 figure:nth-child(1)").css({top:0,left:t,width:i,height:g}),
	$(".gallery5.type15 figure:nth-child(2)").css({top:g+e,left:t,width:g,height:g}),
	$(".gallery5.type15 figure:nth-child(3)").css({top:g+e,left:t+g+e,width:g,height:g}),
	$(".gallery5.type15 figure:nth-child(4)").css({top:g+e,left:t+2*(g+e),width:g,height:g}),
	$(".gallery5.type15 figure:nth-child(5)").css({top:2*(g+e),left:t,width:i,height:g}),
	$(".gallery6.type0 figure:nth-child(1)").css({top:0,left:t,width:g,height:g}),
	$(".gallery6.type0 figure:nth-child(2)").css({top:0,left:t+g+e,width:g,height:g}),
	$(".gallery6.type0 figure:nth-child(3)").css({top:0,left:t+2*(g+e),width:g,height:g}),
	$(".gallery6.type0 figure:nth-child(4)").css({top:g+e,left:t,width:g,height:g}),
	$(".gallery6.type0 figure:nth-child(5)").css({top:g+e,left:t+g+e,width:g,height:g}),
	$(".gallery6.type0 figure:nth-child(6)").css({top:g+e,left:t+2*(g+e),width:g,height:g}),
	$(".gallery6.type1 figure:nth-child(1)").css({top:0,left:t,width:l,height:g}),
	$(".gallery6.type1 figure:nth-child(2)").css({top:0,left:t+l+e,width:l,height:g}),
	$(".gallery6.type1 figure:nth-child(3)").css({top:g+e,left:t,width:l,height:g}),
	$(".gallery6.type1 figure:nth-child(4)").css({top:g+e,left:t+l+e,width:l,height:g}),
	$(".gallery6.type1 figure:nth-child(5)").css({top:2*(g+e),left:t,width:l,height:g}),
	$(".gallery6.type1 figure:nth-child(6)").css({top:2*(g+e),left:t+l+e,width:l,height:g}),
	$(".gallery6.type2 figure:nth-child(1)").css({top:0,left:t,width:g,height:g}),
	$(".gallery6.type2 figure:nth-child(2)").css({top:0,left:t+g+e,width:g,height:g}),
	$(".gallery6.type2 figure:nth-child(3)").css({top:0,left:t+2*(g+e),width:g,height:g}),
	$(".gallery6.type2 figure:nth-child(4)").css({top:g+e,left:t,width:2*g+e,height:2*g+e}),
	$(".gallery6.type2 figure:nth-child(5)").css({top:g+e,left:t+2*(g+e),width:g,height:g}),
	$(".gallery6.type2 figure:nth-child(6)").css({top:2*(g+e),left:t+2*(g+e),width:g,height:g}),
	$(".gallery6.type3 figure:nth-child(1)").css({top:0,left:t,width:2*g+e,height:2*g+e}),
	$(".gallery6.type3 figure:nth-child(2)").css({top:0,left:t+2*(g+e),width:g,height:g}),
	$(".gallery6.type3 figure:nth-child(3)").css({top:g+e,left:t+2*(g+e),width:g,height:g}),
	$(".gallery6.type3 figure:nth-child(4)").css({top:2*(g+e),left:t,width:g,height:g}),
	$(".gallery6.type3 figure:nth-child(5)").css({top:2*(g+e),left:t+g+e,width:g,height:g}),
	$(".gallery6.type3 figure:nth-child(6)").css({top:2*(g+e),left:t+2*(g+e),width:g,height:g}),
	$(".gallery6.type4 figure:nth-child(1)").css({top:0,left:t,width:g,height:g}),
	$(".gallery6.type4 figure:nth-child(2)").css({top:0,left:t+g+e,width:g,height:g}),
	$(".gallery6.type4 figure:nth-child(3)").css({top:0,left:t+2*(g+e),width:g,height:g}),
	$(".gallery6.type4 figure:nth-child(4)").css({top:g+e,left:t,width:g,height:g}),
	$(".gallery6.type4 figure:nth-child(5)").css({top:2*(g+e),left:t,width:g,height:g}),
	$(".gallery6.type4 figure:nth-child(6)").css({top:g+e,left:t+g+e,width:2*g+e,height:2*g+e}),
	$(".gallery6.type5 figure:nth-child(1)").css({top:0,left:t,width:g,height:g}),
	$(".gallery6.type5 figure:nth-child(2)").css({top:g+e,left:t,width:g,height:g}),
	$(".gallery6.type5 figure:nth-child(3)").css({top:0,left:t+g+e,width:2*g+e,height:2*g+e}),
	$(".gallery6.type5 figure:nth-child(4)").css({top:2*(g+e),left:t,width:g,height:g}),
	$(".gallery6.type5 figure:nth-child(5)").css({top:2*(g+e),left:t+g+e,width:g,height:g}),
	$(".gallery6.type5 figure:nth-child(6)").css({top:2*(g+e),left:t+2*(g+e),width:g,height:g}),
	$(".gallery6.type6 figure:nth-child(1)").css({top:0,left:t,width:g,height:g}),
	$(".gallery6.type6 figure:nth-child(2)").css({top:0,left:t+g+e,width:g,height:g}),
	$(".gallery6.type6 figure:nth-child(3)").css({top:0,left:t+2*(g+e),width:g,height:g}),
	$(".gallery6.type6 figure:nth-child(4)").css({top:g+e,left:t,width:l,height:g}),
	$(".gallery6.type6 figure:nth-child(5)").css({top:g+e,left:t+l+e,width:l,height:g}),
	$(".gallery6.type6 figure:nth-child(6)").css({top:2*(g+e),left:t,width:i,height:g}),
	$(".gallery6.type7 figure:nth-child(1)").css({top:0,left:t,width:g,height:g}),
	$(".gallery6.type7 figure:nth-child(2)").css({top:0,left:t+g+e,width:g,height:g}),
	$(".gallery6.type7 figure:nth-child(3)").css({top:0,left:t+2*(g+e),width:g,height:g}),
	$(".gallery6.type7 figure:nth-child(4)").css({top:g+e,left:t,width:i,height:g}),
	$(".gallery6.type7 figure:nth-child(5)").css({top:2*(g+e),left:t,width:l,height:g}),
	$(".gallery6.type7 figure:nth-child(6)").css({top:2*(g+e),left:t+l+e,width:l,height:g}),
	$(".gallery6.type8 figure:nth-child(1)").css({top:0,left:t,width:i,height:g}),
	$(".gallery6.type8 figure:nth-child(2)").css({top:g+e,left:t,width:g,height:g}),
	$(".gallery6.type8 figure:nth-child(3)").css({top:g+e,left:t+g+e,width:g,height:g}),
	$(".gallery6.type8 figure:nth-child(4)").css({top:g+e,left:t+2*(g+e),width:g,height:g}),
	$(".gallery6.type8 figure:nth-child(5)").css({top:2*(g+e),left:t,width:l,height:g}),
	$(".gallery6.type8 figure:nth-child(6)").css({top:2*(g+e),left:t+l+e,width:l,height:g}),
	$(".gallery6.type9 figure:nth-child(1)").css({top:0,left:t,width:i,height:g}),
	$(".gallery6.type9 figure:nth-child(2)").css({top:g+e,left:t,width:l,height:g}),
	$(".gallery6.type9 figure:nth-child(3)").css({top:g+e,left:t+l+e,width:l,height:g}),
	$(".gallery6.type9 figure:nth-child(4)").css({top:2*(g+e),left:t,width:g,height:g}),
	$(".gallery6.type9 figure:nth-child(5)").css({top:2*(g+e),left:t+g+e,width:g,height:g}),
	$(".gallery6.type9 figure:nth-child(6)").css({top:2*(g+e),left:t+2*(g+e),width:g,height:g}),
	$(".gallery6.type10 figure:nth-child(1)").css({top:0,left:t,width:l,height:g}),
	$(".gallery6.type10 figure:nth-child(2)").css({top:0,left:t+l+e,width:l,height:g}),
	$(".gallery6.type10 figure:nth-child(3)").css({top:g+e,left:t,width:i,height:g}),
	$(".gallery6.type10 figure:nth-child(4)").css({top:2*(g+e),left:t,width:g,height:g}),
	$(".gallery6.type10 figure:nth-child(5)").css({top:2*(g+e),left:t+g+e,width:g,height:g}),
	$(".gallery6.type10 figure:nth-child(6)").css({top:2*(g+e),left:t+2*(g+e),width:g,height:g}),
	$(".gallery6.type11 figure:nth-child(1)").css({top:0,left:t,width:l,height:g}),
	$(".gallery6.type11 figure:nth-child(2)").css({top:0,left:t+l+e,width:l,height:g}),
	$(".gallery6.type11 figure:nth-child(3)").css({top:g+e,left:t,width:g,height:g}),
	$(".gallery6.type11 figure:nth-child(4)").css({top:g+e,left:t+g+e,width:g,height:g}),
	$(".gallery6.type11 figure:nth-child(5)").css({top:g+e,left:t+2*(g+e),width:g,height:g}),
	$(".gallery6.type11 figure:nth-child(6)").css({top:2*(g+e),left:t,width:i,height:g}),
	$(".gallery6.type12 figure:nth-child(1)").css({top:0,left:t,width:g,height:i}),
	$(".gallery6.type12 figure:nth-child(2)").css({top:0,left:t+g+e,width:g,height:l}),
	$(".gallery6.type12 figure:nth-child(3)").css({top:l+e,left:t+g+e,width:g,height:l}),
	$(".gallery6.type12 figure:nth-child(4)").css({top:0,left:t+2*(g+e),width:g,height:g}),
	$(".gallery6.type12 figure:nth-child(5)").css({top:g+e,left:t+2*(g+e),width:g,height:g}),
	$(".gallery6.type12 figure:nth-child(6)").css({top:2*(g+e),left:t+2*(g+e),width:g,height:g}),
	$(".gallery6.type13 figure:nth-child(1)").css({top:0,left:t,width:g,height:l}),
	$(".gallery6.type13 figure:nth-child(2)").css({top:l+e,left:t,width:g,height:l}),
	$(".gallery6.type13 figure:nth-child(3)").css({top:0,left:t+g+e,width:g,height:i}),
	$(".gallery6.type13 figure:nth-child(4)").css({top:0,left:t+2*(g+e),width:g,height:g}),
	$(".gallery6.type13 figure:nth-child(5)").css({top:g+e,left:t+2*(g+e),width:g,height:g}),
	$(".gallery6.type13 figure:nth-child(6)").css({top:2*(g+e),left:t+2*(g+e),width:g,height:g}),
	$(".gallery6.type14 figure:nth-child(1)").css({top:0,left:t,width:g,height:l}),
	$(".gallery6.type14 figure:nth-child(2)").css({top:l+e,left:t,width:g,height:l}),
	$(".gallery6.type14 figure:nth-child(3)").css({top:0,left:t+g+e,width:g,height:g}),
	$(".gallery6.type14 figure:nth-child(4)").css({top:g+e,left:t+g+e,width:g,height:g}),
	$(".gallery6.type14 figure:nth-child(5)").css({top:2*(g+e),left:t+g+e,width:g,height:g}),
	$(".gallery6.type14 figure:nth-child(6)").css({top:0,left:t+2*(g+e),width:g,height:i}),
	$(".gallery6.type15 figure:nth-child(1)").css({top:0,left:t,width:g,height:g}),
	$(".gallery6.type15 figure:nth-child(2)").css({top:g+e,left:t,width:g,height:g}),
	$(".gallery6.type15 figure:nth-child(3)").css({top:2*(g+e),left:t,width:g,height:g}),
	$(".gallery6.type15 figure:nth-child(4)").css({top:0,left:t+g+e,width:g,height:l}),
	$(".gallery6.type15 figure:nth-child(5)").css({top:l+e,left:t+g+e,width:g,height:l}),
	$(".gallery6.type15 figure:nth-child(6)").css({top:0,left:t+2*(g+e),width:g,height:i}),
	$(".gallery6.type16 figure:nth-child(1)").css({top:0,left:t,width:g,height:g}),
	$(".gallery6.type16 figure:nth-child(2)").css({top:g+e,left:t,width:g,height:g}),
	$(".gallery6.type16 figure:nth-child(3)").css({top:2*(g+e),left:t,width:g,height:g}),
	$(".gallery6.type16 figure:nth-child(4)").css({top:0,left:t+g+e,width:g,height:i}),
	$(".gallery6.type16 figure:nth-child(5)").css({top:0,left:t+2*(g+e),width:g,height:l}),
	$(".gallery6.type16 figure:nth-child(6)").css({top:l+e,left:t+2*(g+e),width:g,height:l}),
	$(".gallery6.type17 figure:nth-child(1)").css({top:0,left:t,width:g,height:i}),
	$(".gallery6.type17 figure:nth-child(2)").css({top:0,left:t+g+e,width:g,height:g}),
	$(".gallery6.type17 figure:nth-child(3)").css({top:g+e,left:t+g+e,width:g,height:g}),
	$(".gallery6.type17 figure:nth-child(4)").css({top:2*(g+e),left:t+g+e,width:g,height:g}),
	$(".gallery6.type17 figure:nth-child(5)").css({top:0,left:t+2*(g+e),width:g,height:l}),
	$(".gallery6.type17 figure:nth-child(6)").css({top:l+e,left:t+2*(g+e),width:g,height:l})
}

var ua=navigator.userAgent.toLowerCase(),
is_ios=/iPod|iPhone|iPad/i.test(ua),
is_weixin=/MicroMessenger/i.test(ua),
is_android=/Android/i.test(ua),
is_mobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua),
datalist=[],

initPhotoSwipeFromDOM=function(t){
	for(var e=function(t){
		for(var e,h,i,l,g=t.childNodes,r=g.length,s=[],d=0;r>d;d++)
			e=g[d],
			1===e.nodeType&&(h=e.children[0],
			i=h.getAttribute("data-size").split("x"),
			l={
				src:h.getAttribute("href"),
				w:parseInt(i[0],10),
				h:parseInt(i[1],10)},
				e.children.length>1&&(l.title=e.children[1].innerHTML),
				h.children.length>0&&(l.msrc=h.children[0].getAttribute("src")),
				l.el=e,s.push(l)
			);
			return s
		},
		h=function c(t,e){
			return t&&(e(t)?t:c(t.parentNode,e))
		},
		i=function(t){
			t=t||window.event,
			t.preventDefault?t.preventDefault():t.returnValue=!1;
			var e=t.target||t.srcElement,i=h(e,function(t){
				return"FIGURE"===t.tagName}
			);
			if(i){
				for(var l,r=i.parentNode,s=i.parentNode.childNodes,d=s.length,p=0,c=0;d>c;c++)
					if(1===s[c].nodeType){
						if(s[c]===i){
							l=p;
							break
						}
					p++
				}
				return l>=0&&g(l,r),!1
			}
		},
		l=function(){
			var t=window.location.hash.substring(1),e={};
			if(t.length<5)
				return e;
			for(var h=t.split("&"),i=0;i<h.length;i++)
				if(h[i]){
					var l=h[i].split("=");
					l.length<2||(e[l[0]]=l[1])
				}
			return e.gid&&(e.gid=parseInt(e.gid,10)),e.hasOwnProperty("pid")?(e.pid=parseInt(e.pid,10),e):e
		},
		g=function(t,h,i){
			var l,g,r,s=document.querySelectorAll(".pswp")[0];
			r=e(h),
			g={
				index:t,
				galleryUID:h.getAttribute("data-pswp-uid"),
				getThumbBoundsFn:function(t){
					var e=r[t].el.getElementsByTagName("img")[0],
					h=window.pageYOffset||document.documentElement.scrollTop,
					i=e.getBoundingClientRect();
					return{x:i.left,y:i.top+h,w:i.width
				}
			},
			historyEnabled:!1,focus:!1,barsSize:{top:0,bottom:0},
			captionEl:!1,fullscreenEl:!1,shareEl:!1,bgOpacity:.85,
			tapToClose:!0,tapToToggleControls:!1},
			i&&(g.showAnimationDuration=0),
			l=new PhotoSwipe(s,PhotoSwipeUI_Default,r,g),l.init()
		},
		r=document.querySelectorAll(t),
		s=0,
		d=r.length;
		d>s;
		s++
	)
		
	r[s].setAttribute("data-pswp-uid",s+1),
	r[s].onclick=i;
	var p=l();
	p.pid>0&&p.gid>0&&g(p.pid-1,r[p.gid-1],!0)
};

	
$(window).resize(function(){
	galleryReSet()
});