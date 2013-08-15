Ext.define('Agenda.model.Pessoa', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'codigo', type: 'int'}, 
        {name: 'nome', type: 'string'},
        {name: 'observacao', type: 'string'}
    ],
    
    hasMany: {
        model: 'Agenda.model.PessoaApelido', 
        name: 'apelidos', 
        associationKey: 'apelidos',
        primaryKey: 'codigo', 
        foreignKey: 'pessoa_codigo'
    }
});