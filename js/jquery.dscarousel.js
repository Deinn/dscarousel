(function($){
$.fn.dscarousel = function(configs){
var defaults = {
	visible: 5, //Integer - number of visible itens
	keyboard: true, //Boolean - enable/disable the keyboard shortcuts (left/right)
	navigation: true, //Boolean - show/hide the navigation arrows
	auto: 1000, //Integer - set the time of the auto scroll - set to false if want to disable this
	end: "restart", // "restart" | "none" - set the action when the scroll reaches the last item
	stopOnHover: true //Boolean - enable/disable the auto mode when cursor is over the container of scroller
}
if(configs){$.extend(defaults, configs);}

return this.each(function(){
	var debug = false; //Modo Debug - ativar para registrar logs de eventos
	if(debug){
		console.log("DsCarousel v1.0 iniciado");
	}
	
	var visiveis = defaults.visible;
	var teclado = defaults.keyboard;
	var nav = defaults.navigation;
	var auto = defaults.auto;
	var end = defaults.end;
	var stopOnHover = defaults.stopOnHover;
	
	
	var bt_direita;
	var bt_esquerda;
	var total_itens;
	var largura_itens;
	var container;
	var itens;
	var primeiro_item;
	var ultimo_item;
	var visiveis_l;
	var subcont;
	var auto_anim;
	
	bt_direita = $('<a></a>');
	bt_esquerda = $('<a></a>');
	total_itens = $(this).children('li').length;
	

	
	if(total_itens<visiveis){
		visiveis = total_itens;
	}
	
	container = $(this);
	global_container = $(this).parent().first();
	itens = $(this).children('li');
	total_itens = itens.length;
	primeiro_item = itens.first();
	ultimo_item = itens.last();
	largura_itens = itens.outerWidth(true);
	visiveis_l = (largura_itens) * visiveis;
	container.css({
		'min-width': visiveis_l+'px',
		'max-width': visiveis_l+'px'	
	});
	
	if(debug){
		console.log("DsCarousel: "+total_itens+" iten(s) recebido(s) e "+visiveis+" sendo exibido(s)");
	}
	
	subcont = $('<div></div>').prependTo(container).append(itens);
	
	if(nav){
		var container_nav = $('<div id="dscarousel_nav"></div>').prependTo(global_container);
		bt_direita.attr({
			"href": "#",
			"class": "dscarousel_right"
		}).appendTo(container_nav);
		bt_esquerda.attr({
			"href": "#",
			"class": "dscarousel_left"
		}).prependTo(container_nav);
		if(debug){
			console.log("DsCarousel: setas de navegação criadas e posicionadas");
		}
	}
	


	bt_esquerda.bind('click', function(e){
		e.preventDefault();
		if(auto){
			clearInterval(auto_anim);
		}
		if(debug){
			console.log("DsCarousel: gatilho disparado: esquerda");
		}
		subcont.stop(true, true);
		if(Math.abs(parseInt(subcont.css('margin-left')))>0){
			subcont.animate({
				"margin-left": "+="+largura_itens
			});
		if(debug){
			console.log("DsCarousel: animação concluída - gatilho esquerda");
		}			
		}else{
			if(debug){
				console.log("DsCarousel: gatilho esquerda sem resposta - limite atingido");
			}
			return false;
		}
		if(auto){
			auto_anim = setInterval(function(){
				bt_direita.click();
			}, auto);
		}
	});
	
	bt_direita.bind('click', function(e){
		e.preventDefault();
		if(auto){
			clearInterval(auto_anim);
		}
		if(debug){
			console.log("DsCarousel: gatilho disparado: direita");
		}
		subcont.stop(true, true);
		if(Math.abs(parseInt(subcont.css('margin-left')))<Math.abs((total_itens-visiveis)*(largura_itens))){
			subcont.animate({
				"margin-left": "-="+largura_itens
			});
		if(debug){
			console.log("DsCarousel: animação concluída - gatilho direita");
		}
		}else{
			if(end=="restart"){
				subcont.animate({
					"margin-left": "0"
				});
				if(auto){
					auto_anim = setInterval(function(){
						bt_direita.click();
					}, auto);
				}
				if(debug){
					console.log("DsCarousel: último item alcançado - scroller reiniciado");
				}
			}else{
				if(debug){
					console.log("DsCarousel: gatilho direita sem resposta - limite atingido");
				}
			}
			return false;
		}
		if(auto){
			auto_anim = setInterval(function(){
				bt_direita.click();
			}, auto);
		}
	});
	


	if(teclado){
		if(debug){
			console.log("DsCarousel: modo teclado ativo");
		}
		$('body').keyup(function(e){
			var bt = e.which;
			if(bt==39){
				bt_direita.click();
			}
			if(bt==37){
				bt_esquerda.click();
			}
		});
	}
	
	if(auto){
		if(debug){
			console.log("DsCarousel: modo automático ativo");
		}
		auto_anim = setInterval(function(){
			bt_direita.click();
		}, auto);
		
		if(stopOnHover){
			subcont.mouseover(function(){
				clearInterval(auto_anim);
				if(debug){
					console.log("DsCarousel: cursor sobre o container - modo automático pausado");
				}
			}).mouseleave(function(){
				auto_anim = setInterval(function(){
					bt_direita.click();
				}, auto);
				if(debug){
					console.log("DsCarousel: cursor deixou o container - retomando modo automático");
				}
			});
		}
	}

});
}
})(jQuery);