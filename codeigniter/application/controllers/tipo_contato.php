<?php
require_once(APPPATH.'/third_party/controle/constante.php');

class Tipo_contato extends CI_Controller {
    public function __construct() {
        parent::__construct();
        $this->load->model('tipo_contato_model');
    }

    public function index() {
        $this->load->view('templates/page');
    }

    public function lista() {
        $filtro = $this->input->get('filter');
        
        if (empty($filtro)) {
            $filtro = NULL;
        } else {
            $filtro = $this->decodificaFiltro($filtro);
            $filtro = $filtro[0]->value;
        }
        
        $limite = $this->input->get('limit');
        
        if (empty($limite)) {
            $limite = NULL;
            $inicio = NULL;
        } else {
            $inicio = $this->input->get('start');
        }        
        
        // Lista ordenada pelo código
        //$lista = $this->tipo_contato_model->lista($filtro, $limite, $inicio);        
        
        // Lista ordenada pelo nome
        $lista = $this->tipo_contato_model->listaPorNome($filtro, $limite, $inicio);        
        
        if (isset($lista)) {
            $sucesso = TRUE;
            
            if (isset($filtro)) {
                $total = count($lista);
            } else {
                $total = $this->tipo_contato_model->totalRegistro();
            }            
        } else {
            $lista = array();
            $sucesso = FALSE;
            $total = 0;
        }
        
        $dados = $this->listaCodifica($sucesso, $lista, $total);
        $this->visao($dados);
    }
    
    private function listaCodifica($sucesso, $lista = NULL, $total = NULL) {    
        $mensagem = $this->tipo_contato_model->mensagemErro();
        $dados['tipo_contato'] = $this->codifica($sucesso, $mensagem, $lista, $total);
        
        return $dados;
    }
    
    private function visao($dados) {
        switch (PROXY) {
            default:
            case JSON:
                $this->visaoJson($dados);
            break;
        
            case XML:
                $this->visaoXml($dados);
            break;
        }
    }
    
    private function visaoJson($dados) {
        $this->load->view('tipo_contato/json', $dados);
    }
    
    private function visaoXml($dados) {
        $this->load->view('tipo_contato/xml', $dados);
    }

    private function codifica($sucesso, $mensagem, $lista, $total) {
        switch (PROXY) {
            default:
            case JSON:
                $dados = $this->codificaJson($sucesso, $mensagem, $lista, $total);
            break;
        
            case XML:
                $dados = $this->codificaXml($sucesso, $mensagem, $lista, $total);
            break;
        }
        
        return $dados;
    }   
    
    private function codificaJson($sucesso, $mensagem, $lista, $total) {
        $root = 'tipos_contatos';
        
        $dados = array(
            'success' => $sucesso,
            'message' => $mensagem
        );
        
        if (isset($lista)) {
            $complemento = array(
                $root => $lista,
                'total' => $total
            );
            
            $dados = array_merge($dados, $complemento);
        }
        
        $dados = json_encode($dados);

        return $dados;
    }
    
    private function codificaXml($sucesso, $mensagem, $lista, $total) {
        $root = 'tipos_contatos';
        $record = 'tipo_contato';

        $xml = new SimpleXMLElement("<$root/>");
        
        if ($sucesso) {
            $xml->addChild('success', 'true');
        } else {
            $xml->addChild('success', 'false');
        }
        
        $xml->addChild('message', $mensagem);
        
        if (isset($lista)) {
            $xml->addChild('total', $total);

            foreach ($lista as $registro) {
                $xmlRecord = $xml->addChild($record);

                foreach (array_keys($registro) as $chave) {
                    $xmlRecord->addChild($chave, $registro[$chave]);
                }
            }
        }
        
        $dados = $xml->asXML();
        
        return $dados;
    }

    public function adiciona() {
        $tipos_contatos = $this->capturaEntrada();
        $dados = $this->decodifica($tipos_contatos);
        
        $sucesso = $this->tipo_contato_model->adiciona($dados);
        $dados = $this->listaCodifica($sucesso);
        
        $this->visao($dados);
    }

    public function atualiza() {
        $tipos_contatos = $this->capturaEntrada();
        $dados = $this->decodifica($tipos_contatos);
        $codigo = $dados->codigo;
        
        $sucesso = $this->tipo_contato_model->atualiza($dados, $codigo);
        $dados = $this->listaCodifica($sucesso);
        
        $this->visao($dados);
    }

    public function exclui() {
        $tipos_contatos = $this->capturaEntrada();
        $dados = $this->decodifica($tipos_contatos);
        $codigo = $dados->codigo;
        
        $sucesso = $this->tipo_contato_model->exclui($codigo);
        $dados = $this->listaCodifica($sucesso);
        
        $this->visao($dados);
    }
    
    private function capturaEntrada() {
        switch (PROXY) {
            default:
            case JSON:
                $dados = $this->input->post('tipos_contatos');
            break;
        
            case XML:
                header('Content-type: text/xml');
                $dados = simplexml_load_string(file_get_contents('php://input'));
            break;
        }

        return $dados;
    }
    
    private function decodifica($dados) {
        switch (PROXY) {
            default:
            case JSON:
                $dados = $this->decodificaJson($dados);
            break;
        
            case XML:
                $dados = $this->decodificaXml($dados);
            break;
        }

        return $dados;
    }

    private function decodificaJson($dados) {
        $dados = json_decode($dados);

        return $dados;
    }

    private function decodificaXml($dados) {
        $dados = (object)(array)$dados->tipo_contato;
        
        return $dados;
    }
    
    private function decodificaFiltro($dados) {
        $dados = $this->decodificaJson($dados);
        
        return $dados;
    }
}
