define([
	'dojo/_base/declare',
	"dijit/_Container",
	"dijit/_TemplatedMixin",
	'mxui/widget/_WidgetBase'
], function (declare, _Container, _WidgetBase, _TemplatedMixin) {
	'use strict';

return declare('CurrencyViewer.widget.ndeepcurrencyviewer', [_WidgetBase, _Container, _TemplatedMixin], {
    inputargs  : {
        currencyAttr	: '',
		currencyEntity	: '',
		currencyAssoc	: '',
        currencyType    : '',
		useSeparators	: true
        },
        
    templateString : '<div dojoAttachPoint="divNode" class="divNode"></div>',
    
    //Caches
    divNode 			: '',
	realContext			: null,

    postCreate : function(){
        this.initContext();
        this.actRendered();
    },
    applyContext : function(context, callback){
        if (context)
            mx.processor.getObject(context.getActiveGUID(), dojo.hitch(this, this.checkForPath));
        else
            logger.warn(this.id + ".applyContext received empty context");
        callback && callback();
    },
	checkForPath : function (context) {
		dojo.empty(this.divNode);
		if (context != '' && typeof context != "undefined")	{
			if (this.currencyAssoc) {
				var newAssoc = this.currencyAssoc.replace('[%CurrentObject%]', context.getGUID());
				var pathXpath = '//' + this.currencyEntity + newAssoc;
				mx.processor.get({
					xpath : pathXpath,
					error : function(error) { alert(error);},
					callback : dojo.hitch(this, function(object) {
									this.showCurrency(object[0].get(this.currencyAttr));
									})
				});
			} else {(this.currencyAttr);
			}
		}
	},
	showCurrency : function (currency) {
		dojo.empty(this.domNode);
		currency = mx.parser.formatValue(currency, "currency");
		var container = mendix.dom.label();
		switch(this.currencyType) {
			case 'Dollar':
				container.innerHTML = '&#36 '+currency;
				break;
			case 'Euro':
				container.innerHTML = '&#8364 '+currency;
				break;
			case 'Pound':
				container.innerHTML = '&#163 '+currency;
				break;
			case 'Yen':
				container.innerHTML = '&#165 '+currency;
				break;
			default:
				container.innerHTML = ''+currency;
				break;
		}
		this.divNode.appendChild(container);		
	},
    uninitialize : function(){
    }
});
});
require(['CurrencyViewer/widget/ndeepcurrencyviewer']);
