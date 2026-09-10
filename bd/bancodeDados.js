/*CREATE TABLE pessoa (
    pes_id INT AUTO_INCREMENT PRIMARY KEY,
    pes_nome VARCHAR(150) NOT NULL,
    pes_cpf VARCHAR(14) NOT NULL UNIQUE,
    pes_rg VARCHAR(20),
    pes_email VARCHAR(150),
    pes_telefone VARCHAR(20),
    pes_data_nascimento DATE,
    pes_data_cadastro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cargo (
    cargo_id INT AUTO_INCREMENT PRIMARY KEY,
    cargo_nome VARCHAR(100) NOT NULL,
    cargo_status TINYINT(1) NOT NULL DEFAULT 1
);

CREATE TABLE diretoria (
    dir_id INT AUTO_INCREMENT PRIMARY KEY,
    dir_nome VARCHAR(100) NOT NULL,
    dir_status TINYINT(1) NOT NULL DEFAULT 1
);

CREATE TABLE perfil (
    perfil_id INT AUTO_INCREMENT PRIMARY KEY,
    perfil_nome VARCHAR(100) NOT NULL UNIQUE,
    perfil_descricao VARCHAR(255),
    perfil_status TINYINT(1) NOT NULL DEFAULT 1
);

CREATE TABLE permissao (
    perm_id INT AUTO_INCREMENT PRIMARY KEY,
    perm_nome VARCHAR(100) NOT NULL UNIQUE,
    perm_descricao VARCHAR(255),
    perm_status TINYINT(1) NOT NULL DEFAULT 1
);


CREATE TABLE usuario (
    usu_id INT AUTO_INCREMENT PRIMARY KEY,
    pes_id INT NOT NULL UNIQUE,
    perfil_id INT NOT NULL,
    usu_login VARCHAR(100) NOT NULL UNIQUE,
    usu_senha VARCHAR(255) NOT NULL,
    usu_status TINYINT(1) NOT NULL DEFAULT 1,
    usu_data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    usu_ultimo_acesso DATETIME NULL,

    CONSTRAINT fk_usuario_pessoa
        FOREIGN KEY (pes_id)
        REFERENCES pessoa(pes_id),

    CONSTRAINT fk_usuario_perfil
        FOREIGN KEY (perfil_id)
        REFERENCES perfil(perfil_id)
);


CREATE TABLE perfil_permissao (
    perfil_perm_id INT AUTO_INCREMENT PRIMARY KEY,
    perfil_id INT NOT NULL,
    perm_id INT NOT NULL,

    CONSTRAINT uq_perfil_permissao
        UNIQUE (perfil_id, perm_id),

    CONSTRAINT fk_perfil_permissao_perfil
        FOREIGN KEY (perfil_id)
        REFERENCES perfil(perfil_id),

    CONSTRAINT fk_perfil_permissao_permissao
        FOREIGN KEY (perm_id)
        REFERENCES permissao(perm_id)
);

CREATE TABLE membro (
    mem_id INT AUTO_INCREMENT PRIMARY KEY,
    pes_id INT NOT NULL UNIQUE,
    cargo_id INT NOT NULL,
    dir_id INT NOT NULL,
    mem_data_ini DATE NOT NULL,
    mem_data_fim DATE NULL,
    mem_status TINYINT(1) NOT NULL DEFAULT 1,

    CONSTRAINT fk_membro_pessoa
        FOREIGN KEY (pes_id)
        REFERENCES pessoa(pes_id),

    CONSTRAINT fk_membro_cargo
        FOREIGN KEY (cargo_id)
        REFERENCES cargo(cargo_id),

    CONSTRAINT fk_membro_diretoria
        FOREIGN KEY (dir_id)
        REFERENCES diretoria(dir_id)
);

CREATE TABLE categoria (
    cat_id INT AUTO_INCREMENT PRIMARY KEY,
    cat_nome VARCHAR(100) NOT NULL UNIQUE
);


CREATE TABLE projeto (
    proj_id INT AUTO_INCREMENT PRIMARY KEY,
    proj_nome VARCHAR(150) NOT NULL,
    proj_descricao TEXT,
    proj_data_inicio DATE,
    proj_prazo DATE,
    proj_ativo TINYINT(1) NOT NULL DEFAULT 1,
    proj_justificativa_inativacao TEXT,
    cat_id INT NOT NULL,

    CONSTRAINT fk_projeto_categoria
        FOREIGN KEY (cat_id)
        REFERENCES categoria(cat_id)
);

CREATE TABLE projeto_membro (
    proj_memb_id INT AUTO_INCREMENT PRIMARY KEY,
    proj_id INT NOT NULL,
    mem_id INT NOT NULL,

    CONSTRAINT uq_projeto_membro
        UNIQUE (proj_id, mem_id),

    CONSTRAINT fk_projeto_membro_projeto
        FOREIGN KEY (proj_id)
        REFERENCES projeto(proj_id),

    CONSTRAINT fk_projeto_membro_membro
        FOREIGN KEY (mem_id)
        REFERENCES membro(mem_id)
);

CREATE TABLE status_tarefa (
    status_taf_id INT AUTO_INCREMENT PRIMARY KEY,
    status_taf_nome VARCHAR(50) NOT NULL UNIQUE,
    status_taf_ativo TINYINT(1) NOT NULL DEFAULT 1
);

CREATE TABLE prioridade_tarefa (
    prioridade_taf_id INT AUTO_INCREMENT PRIMARY KEY,
    prioridade_taf_nome VARCHAR(50) NOT NULL UNIQUE,
    prioridade_taf_ativo TINYINT(1) NOT NULL DEFAULT 1
);

CREATE TABLE prioridade_tarefa (
    prioridade_taf_id INT AUTO_INCREMENT PRIMARY KEY,
    prioridade_taf_nome VARCHAR(50) NOT NULL UNIQUE,
    prioridade_taf_ativo TINYINT(1) NOT NULL DEFAULT 1
);

CREATE TABLE tarefa (
    taf_id INT AUTO_INCREMENT PRIMARY KEY,
    taf_nome VARCHAR(150) NOT NULL,
    taf_descricao TEXT,
    status_taf_id INT NOT NULL,
    prioridade_taf_id INT NOT NULL,
    taf_prazo DATETIME,
    taf_horas DECIMAL(6,2),
    taf_complexidade VARCHAR(50),
    taf_ativo TINYINT(1) NOT NULL DEFAULT 1,
    taf_justificativa_inativacao TEXT,
    proj_id INT NOT NULL,

    CONSTRAINT fk_tarefa_status
        FOREIGN KEY (status_taf_id)
        REFERENCES status_tarefa(status_taf_id),

    CONSTRAINT fk_tarefa_prioridade
        FOREIGN KEY (prioridade_taf_id)
        REFERENCES prioridade_tarefa(prioridade_taf_id),

    CONSTRAINT fk_tarefa_projeto
        FOREIGN KEY (proj_id)
        REFERENCES projeto(proj_id)
);

CREATE TABLE tarefa_membro (
    taf_memb_id INT AUTO_INCREMENT PRIMARY KEY,
    taf_id INT NOT NULL,
    mem_id INT NOT NULL,

    CONSTRAINT uq_tarefa_membro
        UNIQUE (taf_id, mem_id),

    CONSTRAINT fk_tarefa_membro_tarefa
        FOREIGN KEY (taf_id)
        REFERENCES tarefa(taf_id),

    CONSTRAINT fk_tarefa_membro_membro
        FOREIGN KEY (mem_id)
        REFERENCES membro(mem_id)
);

CREATE TABLE disponibilidade (
    disp_id INT AUTO_INCREMENT PRIMARY KEY,
    mem_id INT NOT NULL,
    disp_data DATE NOT NULL,
    disp_hora_inicio TIME NOT NULL,
    disp_hora_fim TIME NOT NULL,
    disp_status TINYINT(1) NOT NULL DEFAULT 1,

    CONSTRAINT fk_disponibilidade_membro
        FOREIGN KEY (mem_id)
        REFERENCES membro(mem_id),

    CONSTRAINT chk_disponibilidade_horario
        CHECK (disp_hora_inicio < disp_hora_fim)
);

CREATE TABLE status_agendamento (
    age_status_id INT AUTO_INCREMENT PRIMARY KEY,
    age_status_nome VARCHAR(50) NOT NULL UNIQUE,
    age_status_ativo TINYINT(1) NOT NULL DEFAULT 1
);

CREATE TABLE agendamento (
    age_id INT AUTO_INCREMENT PRIMARY KEY,
    mem_id INT NOT NULL,
    taf_id INT NOT NULL,
    age_data DATE NOT NULL,
    age_hora_inicio TIME NOT NULL,
    age_hora_fim TIME NOT NULL,
    age_status_id INT NOT NULL,

    CONSTRAINT fk_agendamento_membro
        FOREIGN KEY (mem_id)
        REFERENCES membro(mem_id),

    CONSTRAINT fk_agendamento_tarefa
        FOREIGN KEY (taf_id)
        REFERENCES tarefa(taf_id),

    CONSTRAINT fk_agendamento_status
        FOREIGN KEY (age_status_id)
        REFERENCES status_agendamento(age_status_id),

    CONSTRAINT chk_agendamento_horario
        CHECK (age_hora_inicio < age_hora_fim)
);

CREATE TABLE documento (
    doc_id INT AUTO_INCREMENT PRIMARY KEY,
    doc_nome VARCHAR(150) NOT NULL,
    doc_descricao TEXT,
    doc_tipo VARCHAR(50),
    doc_data_cadastro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    doc_ativo TINYINT(1) NOT NULL DEFAULT 1
);

CREATE TABLE versao_documento (
    versao_doc_id INT AUTO_INCREMENT PRIMARY KEY,
    doc_id INT NOT NULL,
    versao_numero INT NOT NULL,
    versao_arquivo VARCHAR(500) NOT NULL,
    versao_data DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    versao_observacao TEXT,

    CONSTRAINT uq_documento_versao
        UNIQUE (doc_id, versao_numero),

    CONSTRAINT fk_versao_documento_documento
        FOREIGN KEY (doc_id)
        REFERENCES documento(doc_id)
);

CREATE TABLE formulario (
    form_id INT AUTO_INCREMENT PRIMARY KEY,
    form_nome VARCHAR(150) NOT NULL,
    form_descricao TEXT,
    form_ativo TINYINT(1) NOT NULL DEFAULT 1,
    form_data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pergunta (
    perg_id INT AUTO_INCREMENT PRIMARY KEY,
    form_id INT NOT NULL,
    perg_texto TEXT NOT NULL,
    perg_tipo VARCHAR(50) NOT NULL,
    perg_ordem INT NOT NULL,
    perg_obrigatoria TINYINT(1) NOT NULL DEFAULT 0,
    perg_ativa TINYINT(1) NOT NULL DEFAULT 1,

    CONSTRAINT fk_pergunta_formulario
        FOREIGN KEY (form_id)
        REFERENCES formulario(form_id)
);

CREATE TABLE criterio_avaliacao (
    crit_id INT AUTO_INCREMENT PRIMARY KEY,
    crit_nome VARCHAR(100) NOT NULL,
    crit_descricao TEXT,
    crit_peso DECIMAL(5,2),
    crit_ativo TINYINT(1) NOT NULL DEFAULT 1
);

CREATE TABLE avaliacao (
    aval_id INT AUTO_INCREMENT PRIMARY KEY,
    form_id INT NOT NULL,
    mem_id INT NOT NULL,
    dir_id INT NOT NULL,
    aval_data DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    aval_observacao TEXT,
    aval_status VARCHAR(50) NOT NULL,

    CONSTRAINT fk_avaliacao_formulario
        FOREIGN KEY (form_id)
        REFERENCES formulario(form_id),

    CONSTRAINT fk_avaliacao_membro
        FOREIGN KEY (mem_id)
        REFERENCES membro(mem_id),

    CONSTRAINT fk_avaliacao_diretoria
        FOREIGN KEY (dir_id)
        REFERENCES diretoria(dir_id)
);

CREATE TABLE avaliacao_criterio (
    aval_crit_id INT AUTO_INCREMENT PRIMARY KEY,
    aval_id INT NOT NULL,
    crit_id INT NOT NULL,
    aval_crit_nota DECIMAL(5,2),
    aval_crit_observacao TEXT,

    CONSTRAINT uq_avaliacao_criterio
        UNIQUE (aval_id, crit_id),

    CONSTRAINT fk_avaliacao_criterio_avaliacao
        FOREIGN KEY (aval_id)
        REFERENCES avaliacao(aval_id),

    CONSTRAINT fk_avaliacao_criterio_criterio
        FOREIGN KEY (crit_id)
        REFERENCES criterio_avaliacao(crit_id)
);

CREATE TABLE resposta (
    resp_id INT AUTO_INCREMENT PRIMARY KEY,
    aval_id INT NOT NULL,
    perg_id INT NOT NULL,
    resp_valor TEXT,

    CONSTRAINT uq_resposta_avaliacao_pergunta
        UNIQUE (aval_id, perg_id),

    CONSTRAINT fk_resposta_avaliacao
        FOREIGN KEY (aval_id)
        REFERENCES avaliacao(aval_id),

    CONSTRAINT fk_resposta_pergunta
        FOREIGN KEY (perg_id)
        REFERENCES pergunta(perg_id)
);

CREATE TABLE meta (
    meta_id INT AUTO_INCREMENT PRIMARY KEY,
    meta_nome VARCHAR(150) NOT NULL,
    meta_descricao TEXT,
    meta_valor_planejado DECIMAL(12,2),
    meta_valor_realizado DECIMAL(12,2),
    meta_prazo DATE,
    meta_status VARCHAR(50) NOT NULL,
    dir_id INT NOT NULL,

    CONSTRAINT fk_meta_diretoria
        FOREIGN KEY (dir_id)
        REFERENCES diretoria(dir_id)
);

CREATE TABLE notificacao (
    notif_id INT AUTO_INCREMENT PRIMARY KEY,
    usu_id INT NOT NULL,
    notif_titulo VARCHAR(150) NOT NULL,
    notif_mensagem TEXT NOT NULL,
    notif_tipo VARCHAR(50),
    notif_data DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    notif_lida TINYINT(1) NOT NULL DEFAULT 0,

    CONSTRAINT fk_notificacao_usuario
        FOREIGN KEY (usu_id)
        REFERENCES usuario(usu_id)
);
*/


