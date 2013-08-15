var estende = '';

switch(PROXY) {
    default:
    case PROXY_TYPE.JSON:
        estende = 'Agenda.store.json.Pessoas';
    break;
    
    case PROXY_TYPE.XML:
        estende = 'Agenda.store.xml.Pessoas';
    break;        
}

Ext.define('Agenda.store.Pessoas', {
    extend: estende
});
