Ext.define('Agenda.view.Viewport', {
    extend: 'Ext.Viewport',    
    layout: 'fit',
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    xtype: 'pessoajanelalista'
                }
            ]
        });
                
        me.callParent(arguments);
    }
});