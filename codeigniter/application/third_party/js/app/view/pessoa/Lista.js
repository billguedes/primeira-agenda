Ext.define('Agenda.view.pessoa.Lista', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.pessoalista',
    store: 'Pessoas',
    
    initComponent: function() {
        this.columns = {
            defaults: {
                menuDisabled: true,
                resizable: false,
                draggable: false,
                flex: 1
            },
            
            items: [
                {
                    header: '#',  
                    dataIndex: 'codigo',  
                    maxWidth: 55,
                    align: 'right'
                },
                {
                    header: 'Nome', 
                    dataIndex: 'nome'
                },
                {
                    header: 'Observação', 
                    dataIndex: 'observacao', 
                    sortable: false
                }
            ]
        }
        
        this.dockedItems = [{
            xtype: 'toolbar',
            items: [
                {
                    itemId: 'adicionar',
                    text: 'Adicionar',
                    tooltip: 'Adiciona novo registro',
                    action: 'add'
                }, {
                    itemId: 'excluir',
                    text: 'Excluir',
                    tooltip: 'Exclui registro selecionado',
                    action: 'delete'
                }, 
                '->', {
                    itemId: 'filtro',
                    xtype: 'textfield',
                    emptyText: 'O que você procura?'
                }
            ]
        },
        {
            xtype: 'pagingtoolbar',
            dock: 'top',
            store: 'Pessoas',
            displayInfo: true
        }]

        this.callParent(arguments);
    }
});