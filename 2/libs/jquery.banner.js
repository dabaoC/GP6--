// 开发一个jquery.banner插件,
// 要求插件实现两种播放方式(slide,fade),
// 带有自动播放功能。
// 参数中可选按钮 调用方式为：
// $.banner({
// 			animate:”slide|fade”,
// 			autoPlay:true,
// 			nextBtn:$(“#next”),
// 			prevBtn:$(“#prev”)
// 		})	

// 1、初始化组件
// 2、渲染元素
// 3、做动画处理


;+function($){
	$.fn.banner = function(param){//参数param
		// 声明图片，按钮
		var banner = param.banner;
		var list = $(banner).children("li");
		var prev = param.prev;
		var next = param.next;
		var autoPlay = param.autoPlay;
		var timing = param.timing;//自动播放间隔
		var animateTime = param.animateTime;//动画时间
		var timer;



		$(list[0]).addClass("on").fadeIn(animateTime);
		// 如果是自动播放
		if(autoPlay){
			startTiming();
			// 鼠标进入所有元素时停止计时，离开时开始计时
			$(banner+","+prev+","+next).on("mouseenter",function(){
				// console.log(1);
				window.clearInterval(timer);
			})
			$(banner+","+prev+","+next).on("mouseleave",function(){
				startTiming();
			});

		}



		// 开始计时
		function startTiming(){
			timer = window.setInterval("$.switchImg();",timing);
		}

		// 点击prev
		$(prev).off("click").on("click",function(){
			var on = $(banner).children(".on");
			// console.log(on);
			on.stop(true,true).fadeOut(animateTime).removeClass("on");
			if(on.prev().is("li")){
				// 如果前面仍有li
				on.prev().stop().addClass("on").fadeIn(animateTime);

			}else{
				$(list[list.length-1]).stop().addClass("on").fadeIn(animateTime);

			}
		})
		// 点击next
		$(next).off("click").on("click",function(){
			var on = $(banner).children(".on");
			// console.log(on);
			on.stop().fadeOut(animateTime).removeClass("on");
			if(on.next().is("li")){
				// 如果前面仍有li
				on.next().stop().addClass("on").fadeIn(animateTime);
			}else{
				// 若是最后一张
				$(list[0]).stop().addClass("on").fadeIn(animateTime);

			}
		})

		// 定时切换图片
		$.extend({switchImg:function(){
			var on = $(banner).children(".on");

			on.stop().fadeOut(animateTime).removeClass("on");

			if(on.next().is("li")){

				on.next().stop().addClass("on").fadeIn(animateTime);

			}else{
				// 轮播一遍后，回到第一张图
				$(list[0]).stop().addClass("on").fadeIn(animateTime);

			}
		}});



	}

}(jQuery);









