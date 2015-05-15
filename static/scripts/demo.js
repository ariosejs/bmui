$(function(){
	

	function pD(){
		$('.bui a').on('click',function(e){
			e.preventDefault();
		});
	}
	function copy(){
		// 多个复制
		ZeroClipboard.config({ hoverClass: "btn-clipboard-hover" });
		$('i.copyBtn').each(function (i, o) {
			var client = new ZeroClipboard($(o));
			var text = $(o).prev('textarea').val();
			client.on("copy", function (event) {
				var clipboard = event.clipboardData;
				clipboard.setData("text/plain", text);
			}).on("aftercopy",function(event){
				$(event.target).addClass('copyDone');
				setTimeout(function(){
					$(event.target).removeClass('copyDone');
				},5e3);
			});
		});
	}
	pD();
	// copy();

	
	$('.act-dialog').on('click',function(){
		$.dialog({width:200,height:140,maskLayer:0.3,close:false,title:'Title',content:'ariose<br><div class="dialog-foot"></div>'});
	});
	$('.act-dialog-def').on('click',function(){
		$.dialog();
	});
	$('.act-dialog-url').on('click',function(){
		$.dialog({width:800,height:600,url:'http://www.chunbo.com/'});
	});
	$('.act-dialog-focus').on('click',function(){
		var data = $(this).attr('focus-data').split(';');
		$.dialog({focus:true,data:data});
	});

	$('.act-dialog-imgview').on('click',function(){
		var data = $(this).attr('img-data').split(';');
		$.dialog({imgView:true,data:data,close:false});
	});
	

	


});



