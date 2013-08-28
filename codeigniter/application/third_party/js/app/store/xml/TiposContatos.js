Ext.define('Agenda.store.xml.TiposContatos', {
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
            type: 'xml',
            root: 'tipos_contatos',
            record: 'tipo_contato',
            messageProperty: 'message'
        },
        writer: {
            type: 'xml',
            writeAllFields: true,
            writeRecordId: false,
            encode: true,
            documentRoot: 'tipos_contatos',
            record: 'tipo_contato',
            nameProperty: 'mapping'
        }
    }    
});