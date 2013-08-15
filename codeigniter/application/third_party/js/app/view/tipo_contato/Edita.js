Ext.define('Agenda.view.tipo_contato.Edita', {
    extend: 'Ext.window.Window',
    alias: 'widget.tipocontatoedita',
    title: 'Edita Tipo de Contato',
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
                        emptyText: 'Nome do tipo de contato',
                        allowBlank: false
                    },
                    {
                        xtype: 'textareafield',
                        name : 'observacao',
                        fieldLabel: 'Observação',
                        cols: 50,
                        rows: 7
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