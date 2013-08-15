Ext.define('Agenda.view.pessoa.JanelaLista', {
    extend: 'Ext.window.Window',
    alias: 'widget.pessoajanelalista',

    title: 'Consulta de Pessoas',
    layout: 'fit',
    autoShow: true,
    height: 460,
    width: 600,    
    closable: false,
    //resizable: false,
    
    initComponent: function() {
        this.items = [
            {
                xtype: 'pessoalista'
            }
        ]
        
        this.callParent(arguments);
    }
    
});