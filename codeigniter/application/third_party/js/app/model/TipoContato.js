Ext.define('Agenda.model.TipoContato', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'codigo', type: 'int'}, 
        {name: 'nome', type: 'string'},
        {name: 'observacao', type: 'string'}
    ]
});