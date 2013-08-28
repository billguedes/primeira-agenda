Ext.define('Agenda.store.json.Pessoas', {
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
            type: 'json',
            root: 'pessoas',
            messageProperty: 'message'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            writeRecordId: false,
            encode: true,
            root: 'pessoas'
        }
    }    
});