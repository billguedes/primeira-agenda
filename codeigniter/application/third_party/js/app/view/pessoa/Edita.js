Ext.define('Agenda.view.pessoa.Edita', {
    extend: 'Ext.window.Window',
    alias: 'widget.pessoaedita',
    title: 'Edita Pessoa',
    layout: 'fit',
    autoShow: true,
    width: 366,    
    resizable: false,

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                padding: '5 5 0 5',
                
                fieldDefaults: {
                    labelAlign: 'top',
                    enforceMaxLength: true,
                    labelSeparator: '',
                    labelStyle: 'font-weight: bold',
                    margin: '7 0',
                    msgTarget: 'under',
                    allowOnlyWhitespace: false
                },
                
                items: [
                    {
                        xtype: 'displayfield',
                        name : 'codigo',
                        fieldLabel: 'Código',
                        submitValue: true,
                        labelSeparator: ':',
                        labelAlign: 'left',
                        margin: '0 0 -5 0',
                        labelWidth: 55
                    },
                    {
                        xtype: 'textfield',
                        name : 'nome',
                        fieldLabel: 'Nome',
                        maxLength: 50,
                        size: 50,
                        emptyText: 'Nome da pessoa',
                        allowBlank: false
                    },
                    {
                        xtype: 'tabpanel',
                        margin: '15 0',
                        columnWidth: '100%',
                        plain: true,
                        
                        defaults: {
                            margin: '5 0'
                        },
                        
                        items: [
                            {
                                title: 'Contatos',
                                html: 'Lista de contatos'
                            }, 
                            {
                                title: 'Apelidos',
                                /*
                                html: 'Lista de apelidos'
                                */
                               items: [
                                   {
                                       xtype: 'pessoaapelidolista'
                                   }
                               ]
                            }, 
                            {
                                title: 'Observação',
                                
                                items: [
                                    {
                                        xtype: 'textareafield',
                                        name : 'observacao',
                                        margin: '0', // fieldDefaults
                                        cols: 49,
                                        rows: 7
                                    }
                                ]
                            }
                        ]                                
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text: 'Salvar',
                action: 'save'
            },
            {
                text: 'Cancelar',
                scope: this,
                handler: this.close
            }
        ]

        this.callParent(arguments);
    }
});