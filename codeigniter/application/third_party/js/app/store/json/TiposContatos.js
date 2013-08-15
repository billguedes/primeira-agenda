Ext.define('Agenda.store.json.TiposContatos', {
    extend: 'Ext.data.Store',
    model: 'Agenda.model.TipoContato',
    pageSize: 12,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        api: {
            create: 'tipo_contato/adiciona',
            read: 'tipo_contato/lista',
            update: 'tipo_contato/atualiza',
            destroy: 'tipo_contato/exclui'
        },
        reader: {
            type: 'json',
            root: 'tipos_contatos',
            messageProperty: 'message'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            encode: true,
            root: 'tipos_contatos'
        }
    }    
});