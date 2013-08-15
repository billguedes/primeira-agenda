<?php
class Pessoa_model extends CI_Model {
    private $tabela;
    private $codigo;
    private $nome;
    private $tabela_filha;
    private $campo_ligacao;
    private $chave_filha;
    
    public function __construct() {
        parent::__construct();
        
        $this->tabela = 'pessoa';
        $this->codigo = 'codigo';
        $this->nome = 'nome';
        $this->tabela_filha = 'pessoa_apelido';
        $this->campo_ligacao = 'pessoa_codigo';
        $this->chave_filha = 'apelidos';
    }

    public function lista($filtro = NULL, $limite = NULL, $inicio = NULL) {
        if (isset($filtro)) {
            $this->filtro($filtro);
        }
        
        if (isset($limite) && isset($inicio)) {
            $this->limite($limite, $inicio);
        }

        $query = $this->db->get($this->tabela);

        if (empty($query)) {
            $lista = null;
        } else {
            foreach ($query->result_array() as $chave => $valor) {
                $lista[$chave] = $valor;

                $this->db->select("$this->codigo, $this->nome");
                $this->db->from($this->tabela_filha);
                $this->db->where($this->campo_ligacao, $valor[$this->codigo]);
                $query_children = $this->db->get();
                $lista[$chave][$this->chave_filha] = array();

                foreach($query_children->result_array() as $child){
                    $lista[$chave][$this->chave_filha][] = $child;
                }
            }
        }

        return $lista;
    }
    
    public function listaPorNome($filtro = NULL, $limite = NULL, $inicio = NULL) {
        $this->db->order_by($this->nome);
        $lista = $this->lista($filtro, $limite, $inicio);
        
        return $lista;
    }
    
    private function filtro($filtro) {
        $like = sprintf('%s LIKE', $this->nome);
        
        $this->db->where($this->codigo, $filtro);
        $this->db->or_where($like, "%$filtro%");
    }
    
    private function limite($limite, $inicio) {
        $this->db->limit($limite, $inicio);
    }

    public function adiciona($dados) {
        $sucesso = $this->db->insert($this->tabela, $dados);
        
        return $sucesso;
    }

    public function atualiza($dados, $codigo) {
        $this->db->where($this->codigo, $codigo);
        $sucesso = $this->db->update($this->tabela, $dados);
        
        return $sucesso;
    }

    public function exclui($codigo) {
        $this->db->where($this->codigo, $codigo);
        $sucesso = $this->db->delete($this->tabela);
        
        return $sucesso;
    }
    
    public function totalRegistro() {
        $total = $this->db->count_all($this->tabela);
        
        return $total;
    }
    
    public function mensagemErro() {
        $mensagem = $this->db->_error_message();
        $mensagemTratada = $this->trataMensagemErro($mensagem);
        
        return $mensagemTratada;
    }
    
    private function trataMensagemErro($mensagem) {
        $encontrado = stripos($mensagem, 'Duplicate');
        if ($encontrado !== FALSE) {
            $mensagem = 'Registro duplicado.';
        }
        
        $encontrado = stripos($mensagem, 'Table');
        if ($encontrado !== FALSE) {
            $encontrado = stripos($mensagem, "doesn't exist");
            if ($encontrado !== FALSE) {
                $mensagens = explode("'", $mensagem);
                $tabela = $mensagens[1];
                $mensagem = "Tabela '$tabela' não existe.";
            }
        }
        
        $encontrado = stripos($mensagem, 'Unknown column');
        if ($encontrado !== FALSE) {
            $mensagens = explode("'", $mensagem);
            $coluna = $mensagens[1];
            $mensagem = "Coluna '$coluna' desconhecida.";
        }
        
        $encontrado = stripos($mensagem, 'Cannot delete');
        if ($encontrado !== FALSE) {
            $mensagem = 'Registro sendo utilizado em outra tabela.';
        }
        
        return $mensagem;
    }
}
