Ext.define('Agenda.store.xml.Pessoas', {
    extend: 'Ext.data.Store',
    model: 'Agenda.model.Pessoa',
    pageSize: 12,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        api: {
            create: 'pessoa/adiciona',
            read: 'pessoa/lista',
            update: 'pessoa/atualiza',
            destroy: 'pessoa/exclui'
        },
        reader: {
            type: 'xml',
            root: 'pessoas',
            record: 'pessoa',
            messageProperty: 'message'
        },
        writer: {
            type: 'xml',
            writeAllFields: true,
            writeRecordId: false,
            encode: true,
            documentRoot: 'pessoas',
            record: 'pessoa',
            nameProperty: 'mapping'
        }
    }    
});