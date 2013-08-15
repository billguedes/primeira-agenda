Ext.define('Agenda.model.PessoaApelido', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'codigo', type: 'int'}, 
        {name: 'pessoa_codigo', type: 'int'},
        {name: 'nome', type: 'string'}
    ],

    belongsTo: {
        model: 'Agenda.model.Pessoa',
        getterName: 'getPessoa'
    }
});