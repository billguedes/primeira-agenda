Ext.define('Agenda.view.pessoa.apelido.Lista', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.pessoaapelidolista',
    id: 'pessoaapelidolista',
    
    columns: [
        {
            header: 'Nome',
            dataIndex: 'nome',
            flex: 1,
            editor: {
                allowBlank: false
            }
        }
    ],
    
    initComponent: function() {
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 2
        });
        
        Ext.apply(this, {
            plugins: [this.cellEditing],
            tbar: [
                {
                    text: 'Adicionar',
                    scope: this,
                    handler: this.onAddClick
                },
                {
                    text: 'Excluir',
                    scope: this,
                    handler: this.onRemoveClick
                }
            ]
        });
        
        
        this.callParent();
    },
    
    onAddClick: function(){
        console.log('Linha adicionada');
        
        /*
        // Create a model instance
        var rec = new KitchenSink.model.grid.Plant({
            common: 'New Plant 1',
            light: 'Mostly Shady',
            price: 0,
            availDate: Ext.Date.clearTime(new Date()),
            indoor: false
        });

        this.getStore().insert(0, rec);
        this.cellEditing.startEditByPosition({
            row: 0, 
            column: 0
        });        
        */
    },
    
    onRemoveClick: function(grid, rowIndex){
        console.log('Linha excluida');
        
        /*
        this.getStore().removeAt(rowIndex);
        */
    }
});