## a) Fluxo (Workflow)
ID do Fluxo: Identificador único.
Nome/Descrição: Para identificação e exibição.
Usuário/Proprietário: Se houver controle de acesso por usuário.
Metadata: Data de criação, última atualização, status (ativo/inativo) etc.
Lista de Steps: Pode ser armazenada de forma ordenada (ou por referência a outra entidade).

## b) Step (Template ou Definição)
ID do Step: Identificador único.
Tipo do Step: Por exemplo, “HTTP Request”, “Execução de Script”, etc.
Parâmetros Padrão: Configurações e parâmetros padrão para o step.
Descrição/Metadata: Informações adicionais.
Observação: Essa entidade pode representar a definição geral de um step disponível para uso.

## c) FluxoStep ou WorkflowStep (Instância do Step em um Fluxo)
ID: Identificador único para essa associação.
Fluxo_ID: Referência ao fluxo.
Step_ID: Referência à definição do step.
Ordem/Posição: Define a sequência de execução.
Configurações Específicas: Parâmetros ou configurações customizadas para esse fluxo em particular.
Em muitos casos, essa configuração pode ser armazenada em formato JSON, permitindo flexibilidade.

## d) Execução (Execution)
ID da Execução: Identificador único.
Fluxo_ID: Referência ao fluxo que está sendo executado.
Status: Em andamento, concluído, falhou etc.
Data/Horário: Marcas de início e fim.
Resultado/Output: Logs ou resultados da execução.


## e) ExecuçãoStep (Step Execution)
ID: Identificador único para o registro da execução do step.
Execução_ID: Relacionamento com a execução do fluxo.
FluxoStep_ID ou Step_ID: Referência ao step específico.
Status: Resultado da execução desse step (sucesso, erro, tempo de execução, etc).
Logs/Output: Informações detalhadas, se necessário.
