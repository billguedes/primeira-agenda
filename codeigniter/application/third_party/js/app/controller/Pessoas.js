Ext.define('Agenda.controller.Pessoas', {
    extend: 'Ext.app.Controller',
    stores: [
        'Pessoas'
    ],
    models: [
        'Pessoa',
        'PessoaApelido'
    ],
    views: [
        'pessoa.JanelaLista',
        'pessoa.Lista',
        'pessoa.Edita',
        'pessoa.apelido.Lista'
    ],
    refs: [
        {
            ref: 'pessoaLista',
            selector: 'grid'
        },
        {
            ref: 'pessoaFiltro',
            selector: 'toolbar textfield'
        }
    ],

    init: function() {
        this.control({
            'pessoalista': {
                itemdblclick: this.editaPessoa
            },
            'pessoaedita button[action=save]': {
                click: this.atualizaPessoa
            },
            'pessoalista button[action=add]': {
                click: this.editaPessoa
            },
            'pessoalista button[action=delete]': {
                click: this.excluiPessoa
            },
            'pessoalista textfield[itemId=filtro]' : {
                change: this.filtraPessoa
            }
        });
    },
    
    onLaunch: function() {
        var me = this;
        
        this.listaPessoa(me);
    },
    
    listaPessoa: function(me) {
        var store = me.getPessoasStore();
        
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
                var leitor = me.getPessoasStore().getProxy().getReader();
                erro = leitor.getMessage(leitor.rawData);
                mensagem = 'Não foi possível listar os registros.';
                mensagem += '<br /><strong>Motivo: ' + erro + '</strong>';
                Ext.Msg.alert(titulo, mensagem);                
            }
        });
    },

    editaPessoa: function(grid, record) {
        var visao = Ext.widget('pessoaedita'),
            listaApelido = visao.down('grid');
        
        if (record.data) {
            var pessoa = record;

            listaApelido.reconfigure(pessoa.apelidos());
            visao.setTitle('Edita Pessoa');
            visao.down('form').loadRecord(record);
        } else {
            visao.setTitle('Nova Pessoa');
            visao.down('displayfield[name=codigo]').setVisible(false);
            visao.down('textfield[name=nome]').focus(false, 1);
        }               
    },
    
    atualizaPessoa: function(button) {
        var janela      = button.up('window'),
            formulario  = janela.down('form'),
            registro    = formulario.getRecord(),
            valores     = formulario.getValues(),
            store       = this.getPessoasStore(),
            novo        = false;

        if (formulario.isValid()) {
            var me          = this,
                titulo      = 'Manipulação de Registro',
                erro        = '',
                mensagem    = '';
            
            if (registro) {
                registro.set(valores);
            } else {
                registro = Ext.create('Agenda.model.Pessoa');
                registro.set(valores);
                store.add(registro);
                novo = true;
            }

            this.getPessoasStore().sync({
                success: function() {
                    if (novo) {
                        mensagem = 'Registro adicionado com sucesso.'
                    } else {
                        mensagem = 'Registro atualizado com sucesso.'
                    }
                    
                    Ext.Msg.alert(titulo, mensagem);
                    
                    if (novo) {
                        var filtro = me.getPessoaFiltro(),
                            valor = filtro.getValue();
                        
                        if (valor == '') {
                            me.listaPessoa(me);
                        } else {
                            me.limpaFiltro();               
                        }
                    }

                    janela.close();
                },
                failure: function() {
                    store.rejectChanges();
                    
                    var leitor = me.getPessoasStore().getProxy().getReader();
                    erro = leitor.getMessage(leitor.rawData);
                    mensagem = 'Não foi possível salvar o registro.';
                    mensagem += '<br /><strong>Motivo: ' + erro + '</strong>';
                    Ext.Msg.alert(titulo, mensagem);
                }
            });
        }
    },    
    
    excluiPessoa: function(button) {
        var me          = this,
            lista       = me.getPessoaLista(),
            modelo      = lista.getSelectionModel(),
            registro    = modelo.getSelection(),
            store       = me.getPessoasStore(),
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
                            me.listaPessoa(me);
                            console.log('Sucesso');
                        },
                        failure: function() {
                            store.rejectChanges();
                    
                            var leitor = me.getPessoasStore().getProxy().getReader();
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
    
    filtraPessoa: function(field) {
        var store = this.getPessoasStore();
        
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
        var filtro = this.getPessoaFiltro();
        
        filtro.reset();
    }
});
