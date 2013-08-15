Ext.Loader.setConfig({
    enabled: true
});

// Correção do bug no ExtJS 4.2.0 da configuração msgTarget: 'side'
delete Ext.tip.Tip.prototype.minWidth;

Ext.application({
    name: 'Agenda',
    appFolder: 'application/third_party/js/app',
    
    controllers: [
        'Pessoas'
    ],
    
    autoCreateViewport: true
});