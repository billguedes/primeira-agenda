Ext.define('Agenda.controller.TiposContatos', {
    extend: 'Ext.app.Controller',
    stores: [
        'TiposContatos'
    ],
    models: [
        'TipoContato'
    ],
    views: [
        'tipo_contato.JanelaLista',
        'tipo_contato.Lista',
        'tipo_contato.Edita'
    ],
    refs: [
        {
            ref: 'tipoContatoLista',
            selector: 'grid'
        },
        {
            ref: 'tipoContatoFiltro',
            selector: 'toolbar textfield'
        }
    ],

    init: function() {
        this.control({
            'tipocontatolista': {
                itemdblclick: this.editaTipoContato
            },
            'tipocontatoedita button[action=save]': {
                click: this.atualizaTipoContato
            },
            'tipocontatolista button[action=add]': {
                click: this.editaTipoContato
            },
            'tipocontatolista button[action=delete]': {
                click: this.excluiTipoContato
            },
            'tipocontatolista textfield[itemId=filtro]' : {
                change: this.filtraTipoContato
            }
        });
    },
    
    onLaunch: function() {
        var me = this;
        
        this.listaTipoContato(me);
    },
    
    listaTipoContato: function(me) {
        var store = me.getTiposContatosStore();
        
        store.load(function(records, operation, success) {
            var titulo      = 'Manipulação de Registro',
                erro        = '',
                mensagem    = '';
                
            if (success) {
                /*
                mensagem = 'Registros listados com sucesso.';
                Ext.Msg.alert(titulo, mensagem);
                */
            } else {
                var leitor = me.getTiposContatosStore().getProxy().getReader();
                erro = leitor.getMessage(leitor.rawData);
                mensagem = 'Não foi possível listar os registros.';
                mensagem += '<br /><strong>Motivo: ' + erro + '</strong>';
                Ext.Msg.alert(titulo, mensagem);                
            }
        });
    },

    editaTipoContato: function(grid, record) {
        var visao = Ext.widget('tipocontatoedita');
        
        if (record.data) {
            visao.setTitle('Edita Tipo de Contato');
            visao.down('form').loadRecord(record);
        } else {
            visao.setTitle('Novo Tipo de Contato');
            visao.down('displayfield[name=codigo]').setVisible(false);
            visao.down('textfield[name=nome]').focus(false, 1);
        }               
    },
    
    atualizaTipoContato: function(button) {
        var janela      = button.up('window'),
            formulario  = janela.down('form'),
            registro    = formulario.getRecord(),
            valores     = formulario.getValues(),
            store       = this.getTiposContatosStore(),
            novo        = false;

        if (formulario.isValid()) {
            var me          = this,
                titulo      = 'Manipulação de Registro',
                erro        = '',
                mensagem    = '';
                
            if (registro) {
                registro.set(valores);
            } else {
                registro = Ext.create('Agenda.model.TipoContato');
                registro.set(valores);
                store.add(registro);
                novo = true;
            }

            this.getTiposContatosStore().sync({
                success: function() {
                    if (novo) {
                        mensagem = 'Registro adicionado com sucesso.'
                    } else {
                        mensagem = 'Registro atualizado com sucesso.'
                    }
                    
                    Ext.Msg.alert(titulo, mensagem);
                    
                    if (novo) {
                        var filtro = me.getTipoContatoFiltro(),
                            valor = filtro.getValue();
                        
                        if (valor == '') {
                            me.listaTipoContato(me);
                        } else {
                            me.limpaFiltro();               
                        }
                    }

                    janela.close();
                },
                failure: function() {
                    store.rejectChanges();
                    
                    var leitor = me.getTiposContatosStore().getProxy().getReader();
                    erro = leitor.getMessage(leitor.rawData);
                    mensagem = 'Não foi possível salvar o registro.';
                    mensagem += '<br /><strong>Motivo: ' + erro + '</strong>';
                    Ext.Msg.alert(titulo, mensagem);
                }
            });
        }
    },    
    
    excluiTipoContato: function(button) {
        var me          = this,
            lista       = me.getTipoContatoLista(),
            modelo      = lista.getSelectionModel(),
            registro    = modelo.getSelection(),
            store       = me.getTiposContatosStore(),
            selecionado = (registro.length > 0),
            titulo      = 'Manipulação de Registro',
            mensagem    = '';
            
        if (selecionado) {
            mensagem = 'Deseja realmente excluir esse registro?';
            
            Ext.Msg.confirm(titulo, mensagem, function(button) {
                if (button === 'yes' ) {
                    store.remove(registro);
                    store.sync({
                        success: function() {
                            /*
                            mensagem = 'Registro excluído com sucesso.'
                            Ext.Msg.alert(titulo, mensagem);
                            */
                            me.listaTipoContato(me);
                            console.log('Sucesso');
                        },
                        failure: function() {
                            store.rejectChanges();
                    
                            var leitor = me.getTiposContatosStore().getProxy().getReader();
                            erro = leitor.getMessage(leitor.rawData);
                            mensagem = 'Não foi possível excluir o registro.';
                            mensagem += '<br /><strong>Motivo: ' + erro + '</strong>';
                            Ext.Msg.alert(titulo, mensagem);
                            console.log('Deu merda');
                        }                        
                    });
                }
            });
        } else {
            mensagem = 'Selecione um registro e tente novamente.';
            Ext.Msg.alert(titulo, mensagem);
        }
    },
    
    filtraTipoContato: function(field) {
        var store = this.getTiposContatosStore();
        
        if (field.value == '') {
            store.clearFilter();
        } else {
            store.remoteFilter = false;
            store.clearFilter();
            store.remoteFilter = true;
            store.filter('filtro', field.value);
        }
    },
    
    limpaFiltro: function() {
        var filtro = this.getTipoContatoFiltro();
        
        filtro.reset();
    }
});
