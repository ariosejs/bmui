(function($){

/* 
 * checkbox & radio  
 * Copyright (c) 2015 QianCheng@chunbo http://ariose.me/ 
 * Date: 2015-05-15 
 * 
 */
	var $checkbox = $('.checkbox'),
		$radiobox = $('.radiobox');
	if($checkbox || $radiobox){
		function check_radio(e){
			e.each(function(){
				var $this = $(this),
					$checked = $this.children('input').attr('checked');
				if($checked){
					$this.addClass('checked');
				}else{
					$this.removeClass('checked');
				}
				$this.on('click',function(e){
					e.preventDefault();
					if($(this).hasClass('checked')){
						if($(this).children('input').attr('type') == 'checkbox'){
							$(this).children('input').attr('checked',null);
							$(this).removeClass('checked');
						}
					}else{
						if($(this).children('input').attr('type') == 'radio'){
							$(this).siblings('.radiobox').removeClass('checked');
						}
						$(this).children('input').attr('checked',true);
						$(this).addClass('checked');
					}
					e.stopPropagation();
				});
			});
		}
		check_radio($checkbox);
		check_radio($radiobox);
	}

/* 
 * tabs  
 * Copyright (c) 2015 QianCheng@chunbo http://ariose.me/ 
 * Date: 2015-02-10 
 *  
 */
	var $tabs = $('.tabs'),
		$tabsItem = $tabs.find('li');
	if($tabs){
		$tabsItem.each(function(){
			var tabsThis = $(this);
			if(tabsThis){
				tabsThis.on('click',function(){
					tabsThis.siblings('li').removeClass('on');
					tabsThis.addClass('on');
				});
			}
		});
	}


/* 
 * tips  
 * Copyright (c) 2015 QianCheng@chunbo http://ariose.me/ 
 * Date: 2015-02-10 
 * 遍历dom节点class包含tips且title值不为空，鼠标经过显示tips内容为title内容 
 */ 
	var $tipsElem = $('.tips'),
		$body = $('body'),
		tipsBox;
	if($tipsElem){
		$tipsElem.each(function () {
			var tipsThis = $(this);
			var tipsTitle = tipsThis.attr('title');
			var tipsHtml = '<p class="tipsBox">'+tipsTitle+'<i></i></p>';
			if(tipsTitle){
				tipsThis.hover(function(){
					if($('.tipsBox').length > 0){
						tipsBox.stop();
						$body.find('p.tipsBox').remove();
					}
					$body.append(tipsHtml);
					tipsBox = $('.tipsBox');
					tipsThis.attr('title','');
					tipsBox.css({top:tipsThis.offset().top - tipsBox.outerHeight(),left:tipsThis.offset().left - tipsBox.outerWidth()/2 + tipsThis.outerWidth()/2,'opacity':'0'});
					tipsBox.animate({top:tipsBox.offset().top - 10,opacity:1},200);
				},function(){
					tipsBox.stop();
					tipsThis.attr('title',tipsTitle);
					tipsBox.animate({top:tipsBox.offset().top + 5,opacity:0},100,function(){
						$body.find('p.tipsBox').remove();
					});
				});
			}
		});		
	}


/* 
 * dialog  
 * Copyright (c) 2015 QianCheng@chunbo http://ariose.me/ 
 * Date: 2015-02-10 
 * jQuery 类扩展 focus相关为安心度定制 imgView为图片预览
 */ 
 	$.extend({
		dialog: function(options) {
			var defaults = {
				top: 50,
				width:400,
				height:300,
				maskLayer: 0.6,
				close: true,
				title:'',
				content:'',
				id:'',
				url:'',
				focus:false,
				imgView:false,
				imgView_cur:0,
				closeDialog:false,
				data:[]
			};
			var maskLayer = $('<div class="mask"></div>');
			var dialogLayer = $('<div class="dialog"></div>');
			var dHtml = '<h2></h2>'
						+'<a href="#" class="close icon i-close"></a>'
						+'<div class="dialog-content"></div>'
						+'<div class="dialog-foot"></div>';
			options = $.extend(defaults, options);
			var o = options;
			function show(){
				var scrollTop = $(window).scrollTop();
				$('body').append(maskLayer).append(dialogLayer).addClass('dialogShow');
				$('body').css('margin-top',-scrollTop);
				dialogLayer.append(dHtml);
				dialogLayer.find('h2').text(o.title);
				dialogLayer.find('.dialog-content').html(o.content);
				dialogLayer.attr('id',o.id);
				o.close ? null : dialogLayer.find('.close').remove();
				maskLayer.fadeTo(200, o.maskLayer);
			}
			if(o.closeDialog){
				close_modal($('.dialog'));
			}else{
				show();
			}
			maskLayer.click(function(){
				close_modal(dialogLayer);
			});
			if(o.focus && o.data.length >= 1){
				o.width = 840;
				o.height = 600;
				o.top = 30;
				dialogLayer.attr('id','dialog-focus');
				$._dialogFocus(o.data);
			}else if(o.imgView){
				o.width = 500;
				o.height = 666;
				o.top = $(window).height()/2 - 333;
				dialogLayer.attr('id','dialog-imgview');
				$._dialogImgView(o.data,o.imgView_cur);
				maskLayer.addClass('maskClose');
			}
			if(o.url.length > 5){
				dialogLayer.find('.dialog-content').html('<iframe frameborder="0" width="100%" height="100%" src="'+o.url+'"></iframe>');
				$('.dialog-content iframe').css({'margin':'30px -10px 0','width':o.width,'height':o.height,'overflow':'hidden'});
			}
			dialogLayer.show().css({'width':o.width,'height':o.height,'margin-left':-o.width/2}).animate({top:o.top,opacity:1},300,'linear');
			$('a.close').click(function(e){
				e.preventDefault();
				close_modal(dialogLayer);
			});
			$(window).resize(function(){
				togglePosition($(window).height());
			});
			togglePosition($(window).height());
			function togglePosition(winHeight){
				if(winHeight < dialogLayer.height() + 30){
					dialogLayer.css({'position':'absolute'});
					$('body').removeClass('dialogShow');
				
				}else{
					dialogLayer.css({'position':'fixed'});
					$('body').addClass('dialogShow');
				}
			}
			function close_modal(modal_id) {
				var top = $('body').css('margin-top').replace(/[^0-9]/ig,"");
				$('body').removeClass('dialogShow');
				$('body').attr('style','');
				$(window).scrollTop(+top);
				
				modal_id.prev().fadeOut(200,function(){
					modal_id.prev().remove();
				});
				modal_id.animate({top:0,opacity:0},200,function(){
					modal_id.remove();
				});
			}

		},
		_dialogFocus: function(data){
			var focusHtml = '<div class="testReportList"><ul></ul></div>'
							+'<div class="testReportList-page"></div>'
							+'<a href="#" class="icon i-prev" id="testReport-prev"></a>'
							+'<a href="#" class="icon i-next" id="testReport-next"></a>';
			$('.dialog-content').html(focusHtml);
			
			for (var i = 0; i < data.length; i++) {
				$('.testReportList ul').append('<li><img src="'+data[i]+'"></li>');
			}
			$('body').off('click','#testReport-prev,#testReport-next');
			$('body').off('mouseenter','.testReportList li');
			$('.testReportList-page').html('');
			$('.i-prev').css({'left':-10,'opacity':0});
			$('.i-next').css({'right':-10,'opacity':0});
			$('.testReportList-page').css({'bottom':-8,'opacity':0});
			setTimeout(function(){
				$('.i-prev').animate({left:15,opacity:1},300);
				$('.i-next').animate({right:15,opacity:1},300);
				$('.testReportList-page').animate({bottom:8,opacity:1},300);
			}, 300);
			
			var reportList = $('.testReportList ul');
			var reportItem = $('.testReportList li');
			var movieOnce = reportItem.outerWidth() + 20;
			var listWidth = (reportItem.length*movieOnce)%(movieOnce*2) === 0 ? reportItem.length*movieOnce : reportItem.length*movieOnce+movieOnce;
			var reportPos = 0;
			reportList.css({'width':listWidth,'left':0});
			for(var i = 0; i < reportItem.length / 2; i++){
				$('.testReportList-page').append('<i></i>');
			}
			var pageNum = 0;
			var changePageNum = function (num){
				var pageI = $('.testReportList-page i');
				pageI.removeClass('on');
				pageI.eq(num).addClass('on');
			};
			changePageNum(pageNum);
			var showWidth,showHeight,RatioX,RatioY,
				naturWidth = 827,
				naturHeight = 1168;

			$('body').on('click','#testReport-prev,#testReport-next',function(e){
				e.preventDefault();
				if($(this).hasClass('i-prev')){
					reportPos = reportPos + movieOnce * 2;
					if(reportPos > 0){
						reportPos = -listWidth + movieOnce * 2;
						pageNum = Math.ceil(reportItem.length / 2) - 1;
					}else{
						pageNum--;
					}
				}else{
					reportPos = reportPos - movieOnce * 2;
					if(reportPos > -listWidth){
						pageNum++;
					}else{
						reportPos = 0;
						pageNum = 0;
					}
				}
				reportList.animate({left:reportPos},200);
				changePageNum(pageNum);
			}).on('mouseenter','.testReportList li',function(e){
				showWidth =  $(this).find('img').width();
				showHeight =  $(this).find('img').height();
				RatioX = (naturWidth-showWidth) / showWidth;
				RatioY = (naturHeight-showHeight) / showHeight;
				$(this).attr('class','hover');
				$(this).find('img').css({'width':naturWidth,'height':naturHeight});
			}).on('mouseleave','.testReportList li',function(e){
				$(this).attr('class','');
				$(this).find('img').css({'width':showWidth,'height':showHeight,'margin':0});
			}).on('mousemove','.testReportList li',function(e) {
				var posX = e.pageX - $(this).offset().left,
					posY = e.pageY - $(this).offset().top;
				$(this).find('img').css({'margin-left':-(posX*RatioX),'margin-top':-(posY*RatioY)});
			});
		},
		_dialogImgView: function(data,cur){
			var focusHtml = '<div class="img-view">'
								+'<a href="#" class="close"></a>'
								+'<div class="img-view-page"></div>'
								+'<a href="#" class="comment-img-view-act icon i-prev"></a>'
								+'<a href="#" class="comment-img-view-act icon i-next"></a>'
								+'<div class="img-view-list"><ul></ul></div>'
								
							+'</div>';
			$('.dialog-content').html(focusHtml);
			
			for (var i = 0; i < data.length; i++) {
				$('.img-view-list ul').append('<li><img src="'+data[i]+'"><i></i></li>');
			}
			$('body').off('click','.i-prev,.i-next');
			if(data.length>1){
				$('.img-view-page').html('');
				$('.i-prev').css({'left':-20,'opacity':0});
				$('.i-next').css({'right':-20,'opacity':0});
				$('.img-view-page').css({'bottom':-10,'opacity':0});
				setTimeout(function(){
					$('.i-prev').animate({left:-50,opacity:1},300);
					$('.i-next').animate({right:-50,opacity:1},300);
					$('.img-view-page').animate({bottom:-30,opacity:1},300);
				}, 300);
				var imgViewList = $('.img-view-list ul');
				var imgViewItem = $('.img-view-list li');
				var movieOnce = imgViewItem.outerWidth();
				var listWidth = imgViewItem.length*movieOnce;
				var reportPos = 0;
				imgViewList.css({'width':listWidth,'left':0});
				for(var i = 0; i < imgViewItem.length; i++){
					$('.img-view-page').append('<i></i>');
				}
				var pageNum = 0;
				var changePageNum = function (num){
					var pageI = $('.img-view-page i');
					pageI.removeClass('on');
					pageI.eq(num).addClass('on');
				};
				changePageNum(pageNum);
				var reportPos = 0;
				
				if(cur > 0){
					pageNum = cur;
					changePageNum(pageNum);
					imgViewList.css({'left':-(cur * movieOnce)});
					reportPos = -(cur * movieOnce);
				}
				$('body').on('click','.i-prev,.i-next',function(e){
					e.preventDefault();
					if($(this).hasClass('i-prev')){
						reportPos = reportPos + movieOnce;
						if(reportPos > 0){
							reportPos = -listWidth + movieOnce;
							pageNum = Math.ceil(imgViewItem.length) - 1;
						}else{
							pageNum--;
						}
					}else{
						reportPos = reportPos - movieOnce;
						if(reportPos > -listWidth){
							pageNum++;
						}else{
							reportPos = 0;
							pageNum = 0;
						}
					}
					imgViewList.animate({left:reportPos},200);
					changePageNum(pageNum);
				});

			}

		}

		// TODO iframe & position





	});


})(jQuery);