Ext.define('Agenda.view.tipo_contato.JanelaLista', {
    extend: 'Ext.window.Window',
    alias: 'widget.tipocontatojanelalista',

    title: 'Consulta de Tipos de Contatos',
    layout: 'fit',
    autoShow: true,
    height: 460,
    width: 600,    
    closable: false,
    resizable: false,
    
    initComponent: function() {
        this.items = [
            {
                xtype: 'tipocontatolista'
            }
        ]
        
        this.callParent(arguments);
    }
    
});