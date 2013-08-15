var estende = '';

switch(PROXY) {
    default:
    case PROXY_TYPE.JSON:
        estende = 'Agenda.store.json.TiposContatos';
    break;
    
    case PROXY_TYPE.XML:
        estende = 'Agenda.store.xml.TiposContatos';
    break;        
}

Ext.define('Agenda.store.TiposContatos', {
    extend: estende
});
