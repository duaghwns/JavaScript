/*******************************************************************
 * Function Name : mdMessage
 * Description   : Modal 메세지 출력
 * History       : 2020. 08. 26. / 손홍찬 / 최초작성
 *******************************************************************/
(function(jQuery) {

    // modal message
    jQuery.mdMessage = function(options) {
        var settings = jQuery.extend({
                onOk : function() {},
                onCancel : function() {}
            }, 
            jQuery.mdMessage.defaults, options
        ),
        argMessage = jQuery.each(settings.aArg, function(i) {
            settings.message = settings.message.replace("{" + i + "}", settings.aArg[i]);
        }),
        dialogClose = '<button type="button" class="close close-modal-btn" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
        buttonOk = '<button type="button" class="btn btn-secondary" data-confirm="Ok">' + settings.labelOk + '</button>',
        buttonCancel = '<button type="button" class="btn btn-default" data-confirm="Cancel">' + settings.labelCancel + '</button>',
        dialogFooter = '<div class="modal-footer">' + (settings.buttonOk ? buttonOk : '') + (settings.buttonCancel ? buttonCancel : '') + '</div>',
        dialogConfirm = jQuery('<div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">'
                + '<div class="modal-dialog modal-sm" role="document">'
                + '<div class="modal-content">'
                + '<div class="modal-header">'
                + '<h4 class="modal-title">' 
                + '<i class="' + settings.titleIcon + '"></i> ' + settings.title + '</h4>' + ((!settings.buttonOk && !settings.buttonCancel) || settings.dialogClose ? dialogClose : '')
                + '</div>' + '<div class="modal-body">' + settings.message + '</div>'
                + (settings.buttonOk || settings.buttonCancel ? dialogFooter : '') + '</div>' + '</div>');
        
        dialogAlert = jQuery('<div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" id='+ settings.modalId +'>'
                + '<div class="modal-dialog modal-sm">'
                + '<div class="modal-content">'
                + '<div class="modal-header">'
                + '<h4 class="modal-title">' + (!settings.buttonOk && !settings.buttonCancel ? dialogClose : '')
                + '<i class="' + settings.titleIcon + '"></i> ' + settings.title + '</h4>'
                + '</div>' + '<div class="modal-body">' + settings.message + '</div>'
                + (settings.buttonOk || settings.buttonCancel ? dialogFooter : '') + '</div>' + '</div>');

        dialogConfirm.on('hidden.bs.modal', function(event) {
        	if(jQuery(".modal.show").length!=0){
        		jQuery("body").addClass("modal-open");
        	}
            jQuery(this).remove();
        });

        dialogConfirm.on('shown.bs.modal', function(event) {
            jQuery(this).next('.modal-backdrop').css('z-index', 2040);
        });

        dialogAlert.on('hidden.bs.modal', function(event) {
        	if(settings.alertHide!=""){
        		settings.alertHide.call(this);
        	}
        	if(jQuery(".modal.show").length!=0){
        		jQuery("body").addClass("modal-open");
        	}
            jQuery(this).remove();
        });

        dialogAlert.on('shown.bs.modal', function(event) {
            jQuery(this).next('.modal-backdrop').css('z-index', 2040);
        });

        dialogConfirm.find('.modal-header').css({
            '-webkit-border-top-left-radius': '6px',
            '-webkit-border-top-right-radius': '6px',
            '-moz-border-radius-topleft': '6px',
            '-moz-border-radius-topright': '6px',
            'border-top-left-radius': '6px',
            'border-top-right-radius': '6px'
        });

        dialogConfirm.find('button[data-confirm="Ok"]').click(function(event) {
            event.preventDefault();
            dialogConfirm.modal('hide');
            settings.onOk.call(this);
        });

        dialogConfirm.find('button[data-confirm="Cancel"]').click(function(event) {
            event.preventDefault();
            dialogConfirm.modal('hide');
            settings.onCancel.call(this);
        });

        dialogConfirm.css('z-index', 2050);
        dialogAlert.css('z-index', 2050);

        if (settings.type == 'mdConfirm') {
            dialogConfirm.appendTo('body');
            dialogConfirm.modal({
        		backdrop : settings.backdrop,
        		keyboard : settings.keyboard
        	});
            dialogConfirm.modal('show');

        } else if (settings.type == 'mdAlert') {
            dialogAlert.appendTo('body');
            dialogAlert.modal('show');
            if(settings.alertTimeout && settings.alertTimeout > 0) {
                setTimeout(function() {
                    dialogAlert.modal('hide');
                }, settings.alertTimeout);
            }
        }
    };

    jQuery.mdMessage.defaults = {
        type: 'mdConfirm',
        message: 'You message',
        buttonOk: true,
        buttonCancel: true,
        title: '알림',
        titleIcon:"fa fa-bell",
        template: 'danger',
        labelOk: '확인',
        labelCancel: '취소',
        aArg: [],
        backdrop : 'static',
        keyboard : false,
        alertTimeout: 2000        
    };
})(jQuery);

/*******************************************************************
 * Function Name : cf_alertModal
 * Description   : Modal 알림 메세지 출력
 * Parameter     : type 템플릿 타입
 * Parameter     : sMsg 메세지
 * Parameter     : aArg 메세지 파라미터 배열
 * Parameter     : to 자동 닫힘 시간(ms)
 * History       : 2020. 08. 26. / 손홍찬 / 최초작성
 *******************************************************************/
function cf_alertModal(type, sMsg, aArg, to) {
    jQuery.mdMessage({
        type: 'mdAlert',
        title: '',
        template: type,
        buttonOk: false,
        buttonCancel: false,
        message: sMsg,
        aArg: aArg,
        alertHide :"",
        alertTimeout: (to ? to : 5000)
    });
}

function cf_alertModalId(modalId, type, sMsg, aArg, to) {
    jQuery.mdMessage({
    	modalId:modalId,
        type: 'mdAlert',
        title: '',
        template: type,
        buttonOk: false,
        buttonCancel: false,
        message: sMsg,
        aArg: aArg,
        alertHide :"",
        alertTimeout: (to ? to : 5000)
    });
}

function numberFormat(inputNumber) {
   if(inputNumber == null){
	   inputNumber = 0;
   }
   return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getTimeStamp() {

    var d = new Date();
    var s =
        leadingZeros(d.getFullYear(), 4) + '-' +
        leadingZeros(d.getMonth() + 1, 2) + '-' +
        leadingZeros(d.getDate(), 2);

    return s;
}

function getDayTimeStamp() {

    var d = new Date();
    var s =
        leadingZeros(d.getFullYear(), 4) + '-' +
        leadingZeros(d.getMonth() + 1, 2) + '-' +
        leadingZeros(d.getDate(), 2) + ' ' +
        leadingZeros(d.getHours(), 2) + ':' +
        leadingZeros(d.getMinutes(), 2);

    return s;
}


function getaddDayStamp(i) {

    var d = new Date();
    d.setDate(d.getDate()+i);
    
    var s =
        leadingZeros(d.getFullYear(), 4) + '-' +
        leadingZeros(d.getMonth() + 1, 2) + '-' +
        leadingZeros(d.getDate() , 2);

    return s;
}


function leadingZeros(n, digits) {

    var zero = '';
    n = n.toString();

    if (n.length < digits) {
        for (i = 0; i < digits - n.length; i++)
            zero += '0';
    }
    return zero + n;
}

function hexToRgb( hexType ){ 

    var hex = hexType.replace( "#", "" ); 
    var value = hex.match( /[a-f\d]/gi ); 


    // 헥사값이 세자리일 경우, 여섯자리로. 
    if ( value.length == 3 ) hex = value[0] + value[0] + value[1] + value[1] + value[2] + value[2]; 


    value = hex.match( /[a-f\d]{2}/gi ); 

    var r = parseInt( value[0], 16 ); 
    var g = parseInt( value[1], 16 ); 
    var b = parseInt( value[2], 16 ); 

    var rgbType = "rgb(" + r + ", " + g + ", " + b + ")"; 

    return rgbType; 
}

function rgbToHex ( rgbType ){ 

    // 컬러값과 쉼표만 남기고 삭제. 
    var rgb = rgbType.replace( /[^%,.\d]/g, "" ); 

    // 쉼표(,)를 기준으로 분리해서, 배열에 담기. 
    rgb = rgb.split( "," ); 

    // 컬러값이 "%"일 경우, 변환하기. 
    for ( var x = 0; x < 3; x++ ) { 
            if ( rgb[ x ].indexOf( "%" ) > -1 ) rgb[ x ] = Math.round( parseFloat( rgb[ x ] ) * 2.55 ); 
    } 

    // 16진수 문자로 변환. 
    var toHex = function( string ){ 
            string = parseInt( string, 10 ).toString( 16 ); 
            string = ( string.length === 1 ) ? "0" + string : string; 

            return string; 
    }; 

    var r = toHex( rgb[ 0 ] ); 
    var g = toHex( rgb[ 1 ] ); 
    var b = toHex( rgb[ 2 ] ); 

    var hexType = "#" + r + g + b; 

    return hexType; 
} 

/*******************************************************************
 * Function Name : modalHtml
 * Description   : Modal html 출력
 * History       : 2020. 08. 21. / 손홍찬 / 최초작성
 *******************************************************************/
(function(jQuery) {

    // modalHtml
    jQuery.modalHtml = function(options) {
    		var settings = jQuery.extend({
                onOk : function() {},
                onCancel : function() {},
                onCs : function() {},
                onRetry : function() {}
            }, 
            jQuery.modalHtml.defaults, options
        ),
        
        
        dialogClose = '<button type="button" class="close close-modal-btn" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">X</span></button>',
        buttonOk = '<button type="button" class="btn btn-primary" data-confirm="Ok">' + settings.labelOk + '</button>',
        buttonCs = '<button type="button" class="btn btn-danger" data-confirm="Cs">' + settings.labelCs + '</button>',
        buttonCancel = '<button type="button" class="btn btn-default" data-confirm="Cancel">' + settings.labelCancel + '</button>',
        dialogFooter = '<div class="modal-footer">' + (settings.customButton ? customButton : '') + (settings.buttonOk ? buttonOk : '') + (settings.buttonCs ? buttonCs : '') + (settings.buttonCancel ? buttonCancel : '') + '</div>',
        dialogHtml = jQuery('<div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true" id="'+settings.modalId+ '">' 
                + '<div class="modal-dialog modal-sm" role="document" style=" max-width:' + settings.width + '; width:' + settings.width + ';overflow : auto">'
                + '<div class="modal-content" >'
                + '<div class="modal-header">'
                + '<h5 class="modal-title">' 
                + '<i class="' + settings.titleIcon + '"></i> ' + settings.title + ((!settings.buttonOk && !settings.buttonCancel && !settings.customButton) || settings.dialogClose ? dialogClose : '') + '</h5>'
                + '</div>' + '<div class="modal-body">' + settings.html + '</div>'
                + (settings.buttonOk || settings.buttonCancel ? dialogFooter : '') + '</div>' + '</div>');

    	dialogHtml.on('hidden.bs.modal', function(event) {
    		if(jQuery(".modal.show").length!=0){
        		jQuery("body").addClass("modal-open");
        	}
            jQuery(this).remove();
        });

    	dialogHtml.on('shown.bs.modal', function(event) {
    		
            jQuery(this).next('.modal-backdrop').css('z-index', 2020);
        });

        

    	dialogHtml.find('.modal-header').css({
            '-webkit-border-top-left-radius': '6px',
            '-webkit-border-top-right-radius': '6px',
            '-moz-border-radius-topleft': '6px',
            '-moz-border-radius-topright': '6px',
            'border-top-left-radius': '6px',
            'border-top-right-radius': '6px'
        });

    	dialogHtml.find('button[data-confirm="Ok"]').click(function(event) {
            event.preventDefault();
            var result = settings.onOk(dialogHtml);
            if(result){
            	dialogHtml.modal('hide');
            }
        });

    	dialogHtml.find('button[data-confirm="Cancel"]').click(function(event) {
            event.preventDefault();
            dialogHtml.modal('hide');
            settings.onCancel(dialogHtml);
        });
    	
    	/*dialogHtml.find('button[data-confirm="Cs"]').click(function(event) {
    		event.preventDefault();
    		settings.onCs(jQuery(this).attr("id"),dialogHtml);
    	});*/
    	
    	dialogHtml.find('button[data-confirm="Retry"]').click(function(event){
    		event.preventDefault();
            dialogHtml.modal('hide');
            settings.onRetry(dialogHtml);
    	});

    	dialogHtml.css('z-index', 2030);
    	dialogHtml.appendTo('body');
        //dialogHtml.appendTo('#mainForm');
    	dialogHtml.modal({
    		backdrop : settings.backdrop,
    		keyboard : settings.keyboard
    	});
    	dialogHtml.modal('show');
    	
    };

    jQuery.modalHtml.defaults = {
        html: '',
        buttonOk: true,
        buttonCs: false,
        buttonCancel: true,
        customButton : false,
        title: '',
        width : "800px",
        titleIcon:"fa fa-info",
        template: 'info',
        labelOk: '확인',
        labelCancel: '취소',
        customButton : '',
        modalId : '',
        backdrop : true,
        keyboard : true
    };
    
    jQuery(document).on("click", "form.ajax button:submit, form.ajax input:submit, form.ajax input:image", function(e) {
        e.preventDefault();
        e.stopPropagation();

        var f  = this.form;
        var $f = jQuery(f);
        var $b = jQuery(this);
        var $t, t;
        var result = true;

        $f.find("input, select, textarea").each(function(i) {
            $t = jQuery(this);

            if($t.prop("required")) {
                if(!jQuery.trim($t.val())) {
                    t = jQuery("label[for='"+$t.attr("id")+"']").text();
                    result = false;
                    $t.focus();
                    alert(t+" 필수 입력입니다.");
                    return false;
                }
            }
        });

        if(!result)
            return false;
    });
    
    /* fiexd*/
    $.fn.tableHeadFixer = function(param) {
		var defaults = {
			head: true,
			foot: false,
			left: 0,
			right: 0
		};

		var settings = $.extend({}, defaults, param);

		return this.each(function() {
			settings.table = this;
//			console.log(settings)
//			settings.parent = $("<div id=\"fixedDiv\"></div>");
			
			if($(settings.table).parent()[0].id != "fixedDiv"){
				settings.parent = $("<div id=\"fixedDiv\"></div>");
				setParent();
			}else{
				settings.parent = $("#fixedDiv");
				var parent = $(settings.parent);
				var table = $(settings.table);
				
				parent.scroll(function() {
					var scrollWidth = parent[0].scrollWidth;
					var clientWidth = parent[0].clientWidth;
					var scrollHeight = parent[0].scrollHeight;
					var clientHeight = parent[0].clientHeight;
					var top = parent.scrollTop();
					var left = parent.scrollLeft();

					if(settings.head)
						this.find("thead tr > *").css("top", top);

					if(settings.foot)
						this.find("tfoot tr > *").css("bottom", scrollHeight - clientHeight - top);

					if(settings.left > 0)
						settings.leftColumns.css("left", left);

					if(settings.right > 0)
						settings.rightColumns.css("right", scrollWidth - clientWidth - left);
				}.bind(table));
			}

			if(settings.head == true)
				fixHead();

			if(settings.foot == true)
				fixFoot();

			if(settings.left > 0)
				fixLeft();

			if(settings.right > 0)
				fixRight();

			// self.setCorner();

			$(settings.parent).trigger("scroll");

			$(window).resize(function() {
				$(settings.parent).trigger("scroll");
			});
		});

		function setTable(table) {

		}


		function setParent() {
			var container = $(settings.table).parent();
			var parent = $(settings.parent);
			var table = $(settings.table);
			
			table.before(parent);
			parent.append(table);
			parent
				.css({
					'width' : '100%',
					'height' : container.css("height"),
					'overflow' : 'auto',
				    'margin-bottom': '10px',
					'max-height' : container.css("max-height"),
					'min-height' : container.css("min-height"),
					'max-width' : container.css('max-width'),
					'min-width' : container.css('min-width')
				});

			parent.scroll(function() {
				var scrollWidth = parent[0].scrollWidth;
				var clientWidth = parent[0].clientWidth;
				var scrollHeight = parent[0].scrollHeight;
				var clientHeight = parent[0].clientHeight;
				var top = parent.scrollTop();
				var left = parent.scrollLeft();

				if(settings.head)
					this.find("thead tr > *").css("top", top);

				if(settings.foot)
					this.find("tfoot tr > *").css("bottom", scrollHeight - clientHeight - top);

				if(settings.left > 0)
					settings.leftColumns.css("left", left);

				if(settings.right > 0)
					settings.rightColumns.css("right", scrollWidth - clientWidth - left);
			}.bind(table));
		}

		function fixHead () {
			var thead = $(settings.table).find("thead");
			var tr = thead.find("tr");
			var cells = thead.find("tr > *");

			setBackground(cells);
			cells.css({
				'position' : 'relative'
			});
		}

		function fixFoot () {
			var tfoot = $(settings.table).find("tfoot");
			var tr = tfoot.find("tr");
			var cells = tfoot.find("tr > *");

			setBackground(cells);
			cells.css({
				'position' : 'relative'
			});
		}

		function fixLeft () {
			var table = $(settings.table);

			var fixColumn = settings.left;

			settings.leftColumns = $();

			for(var i = 1; i <= fixColumn; i++) {
				settings.leftColumns = settings.leftColumns.add(table.find("tr > *:nth-child(" + i + ")"));
			}

			var column = settings.leftColumns;

			column.each(function(k, cell) {
				
//				console.log(cell);
				
				var cell = $(cell);
				
//				console.log(cell);

				setBackgroundTd(cell);
				cell.css({
					'position' : 'relative'
				});
			});
		}

		function fixRight () {
			var table = $(settings.table);

			var fixColumn = settings.right;

			settings.rightColumns = $();

			for(var i = 1; i <= fixColumn; i++) {
				settings.rightColumns = settings.rightColumns.add(table.find("tr > *:nth-last-child(" + i + ")"));
			}

			var column = settings.rightColumns;

			column.each(function(k, cell) {
				var cell = $(cell);

				setBackground(cell);
				cell.css({
					'position' : 'relative'
				});
			});

		}
		
		function setBackgroundTd(elements) {			
			elements.each(function(k, element) {
//				console.log(element);
				var element = $(element);
				var parent = $(element).parent();

				var elementBackground = element.css("background-color");
				elementBackground = (elementBackground == "transparent" || elementBackground == "rgba(0, 0, 0, 0)") ? null : elementBackground;

				var parentBackground = parent.css("background-color");
				parentBackground = (parentBackground == "transparent" || parentBackground == "rgba(0, 0, 0, 0)") ? null : parentBackground;
				
//				console.log(element);
//				console.log(parentBackground);
//				console.log(elementBackground);
				var background = parentBackground ? parentBackground : "white";
//				background = elementBackground ? elementBackground : "white";

				element.css("background-color", background);
			});
		}

		function setBackground(elements) {
			elements.each(function(k, element) {
				var element = $(element);
				var parent = $(element).parent();

				var elementBackground = element.css("background-color");
				elementBackground = (elementBackground == "transparent" || elementBackground == "rgba(0, 0, 0, 0)") ? null : elementBackground;

				var parentBackground = parent.css("background-color");
				parentBackground = (parentBackground == "transparent" || parentBackground == "rgba(0, 0, 0, 0)") ? null : parentBackground;

				var background = parentBackground ? parentBackground : "white";
				background = elementBackground ? elementBackground : "white";

				element.css("background-color", background);
			});
		}
    };
})(jQuery);
