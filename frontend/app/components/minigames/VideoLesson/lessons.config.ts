export interface LessonQuestion {
  id: string;
  pauseAt: number | null;
  timestampNote?: string;
  needsManualCheck?: boolean;
  question: string;
  options: string[];
  correct: number;
  feedback: {
    wrong: string;
    right: string;
  };
}

export interface VideoLessonConfig {
  lessonNumber: number;
  title: string;
  videoUrl: string;
  videoId: string;
  xpPerQuestion: number;
  xpBonus: number;
  questions: LessonQuestion[];
}

export const VIDEO_LESSONS: VideoLessonConfig[] = [
  {
    lessonNumber: 1,
    title: 'Aula 1: Introdução à Lógica',
    videoUrl:
      'https://www.youtube.com/watch?v=8mei6uVttho&list=PLHz_AreHm4dmSj0MHol_aoNYCSGFqvfXV&index=1',
    videoId: '8mei6uVttho',
    xpPerQuestion: 10,
    xpBonus: 30,
    questions: [
      {
        id: 'q1',
        pauseAt: 203,
        timestampNote: 'Após 00:03:05 (definição de Manzano)',
        needsManualCheck: true,
        question:
          'De acordo com o professor, qual é a definição de Algoritmo segundo Manzano?',
        options: [
          'A) Um conjunto de fórmulas matemáticas complexas',
          'B) Passos finitos e ordenados que, ao serem executados, resolvem um determinado problema',
          'C) Um programa de computador criado para jogos',
          'D) Uma sequência aleatória de instruções',
        ],
        correct: 1,
        feedback: {
          wrong:
            'Não foi dessa vez! Lembre-se: um algoritmo é uma sequência ordenada de passos para resolver um problema.',
          right:
            '✅ Correto! Manzano define algoritmos como passos finitos e ordenados para resolver um problema.',
        },
      },
      {
        id: 'q2',
        pauseAt: 420,
        timestampNote: 'Após 00:07:00 (exemplo da travessia fora de ordem)',
        needsManualCheck: true,
        question:
          'O professor mostrou que colocar os mesmos passos em ordem diferente pode fazer o algoritmo não funcionar. Por que a ordem dos passos é importante num algoritmo?',
        options: [
          'A) Porque computadores são lentos e precisam de mais tempo',
          'B) Porque a ordem garante que cada passo seja executado no momento certo para resolver o problema',
          'C) Porque o professor prefere assim',
          'D) A ordem não importa, qualquer sequência funciona',
        ],
        correct: 1,
        feedback: {
          wrong:
            'Quase! Pense no exemplo da travessia: cruzar antes de olhar não funciona, certo?',
          right:
            '✅ Exato! A ordem garante que cada passo aconteça no momento certo — sem ela, o problema não é resolvido.',
        },
      },
      {
        id: 'q3',
        pauseAt: null,
        timestampNote: 'Final da aula (exemplo da equação do 2º grau)',
        needsManualCheck: false,
        question:
          'O professor usou o exemplo de um programa que resolve equações do 2º grau. O que isso demonstra sobre algoritmos?',
        options: [
          'A) Que algoritmos só servem para matemática avançada',
          'B) Que algoritmos permitem automatizar a solução de problemas conhecidos, sem precisar refazê-los manualmente toda vez',
          'C) Que você precisa saber programar antes de aprender algoritmos',
          'D) Que computadores pensam sozinhos',
        ],
        correct: 1,
        feedback: {
          wrong:
            'Reveja: o professor disse que, como já conhecemos a fórmula, podemos criar um algoritmo para resolver automaticamente!',
          right:
            '✅ Perfeito! Algoritmos automatizam soluções de problemas que já sabemos como resolver.',
        },
      },
    ],
  },
  {
    lessonNumber: 2,
    title: 'Aula 2: Primeiro Algoritmo',
    videoUrl:
      'https://www.youtube.com/watch?v=M2Af7gkbbro&list=PLHz_AreHm4dmSj0MHol_aoNYCSGFqvfXV&index=3',
    videoId: 'M2Af7gkbbro',
    xpPerQuestion: 10,
    xpBonus: 30,
    questions: [
      {
        id: 'q1',
        pauseAt: 955,
        timestampNote: 'Após 00:15:54',
        needsManualCheck: false,
        question:
          'Qual é a diferença entre os comandos Escreva e Escreval no VisuAlg?',
        options: [
          'A) Escreva só aceita números, enquanto Escreval aceita textos entre aspas.',
          'B) Escreva funciona apenas no papel, enquanto Escreval executa no computador.',
          'C) Escreva exibe as mensagens uma ao lado da outra, enquanto Escreval escreve e pula para a linha de baixo.',
          'D) Escreval apaga a mensagem anterior antes de mostrar o novo texto na tela.',
        ],
        correct: 2,
        feedback: {
          wrong:
            "Quase! O 'L' em Escreval vem de 'linha': ele escreve a mensagem e pula para a próxima linha, enquanto o Escreva mantém a próxima saída ao lado.",
          right:
            '✅ Exato! O Escreva coloca as mensagens lado a lado, e o Escreval escreve e salta para a linha de baixo.',
        },
      },
      {
        id: 'q2',
        pauseAt: 1395,
        timestampNote: 'Após 00:23:14',
        needsManualCheck: false,
        question:
          'Seguindo as 6 regras para nomes de identificadores no VisuAlg ensinadas na aula, qual dos nomes abaixo é VÁLIDO para uma variável?',
        options: [
          'A) Inicio_Algoritmo',
          'B) 9dade',
          'C) Média',
          'D) algoritmo',
        ],
        correct: 0,
        feedback: {
          wrong:
            'Atenção às 6 regras: identificadores devem começar com letra, não podem ter acentos nem ser palavras reservadas, mas o sublinhado (_) é permitido.',
          right:
            "✅ Mandou bem! 'Inicio_Algoritmo' começa com letra, não tem acento nem espaço, usa apenas '_' e, juntas, essas palavras não formam uma palavra reservada.",
        },
      },
      {
        id: 'q3',
        pauseAt: null,
        timestampNote: 'Final da aula (conceito explicado entre 00:28:40 e 00:30:40)',
        needsManualCheck: false,
        question:
          'Se declararmos a variável msg como Caractere e fizermos a atribuição msg <- "Ola, Mundo!", o que será exibido na tela ao executar Escreva("msg") com aspas?',
        options: [
          'A) O texto Ola, Mundo!, pois o VisuAlg reconhece a variável mesmo dentro das aspas.',
          'B) Uma mensagem de erro, porque não é permitido usar aspas com o nome de uma variável.',
          'C) Nada será exibido, pois faltou usar a vírgula dentro dos parênteses.',
          'D) Literalmente a palavra msg, pois tudo que está entre aspas é tratado como texto fixo e não como o conteúdo da variável.',
        ],
        correct: 3,
        feedback: {
          wrong:
            'Lembre-se: no VisuAlg, tudo entre aspas é uma cadeia de caracteres literal. Para mostrar o conteúdo da variável msg, deve-se escrever Escreva(msg) sem aspas.',
          right:
            "✅ Perfeito! Com aspas, Escreva(\"msg\") imprime o texto 'msg'. Sem aspas, Escreva(msg) mostra o valor guardado na variável ('Ola, Mundo!').",
        },
      },
    ],
  },
  {
    lessonNumber: 3,
    title: 'Aula 3: Comando de Entrada e Operadores',
    videoUrl:
      'https://www.youtube.com/watch?v=RDrfZ-7WE8c&list=PLHz_AreHm4dmSj0MHol_aoNYCSGFqvfXV&index=3',
    videoId: 'RDrfZ-7WE8c',
    xpPerQuestion: 10,
    xpBonus: 30,
    questions: [
      {
        id: 'q1',
        pauseAt: 707,
        timestampNote: 'Após 00:11:46',
        needsManualCheck: false,
        question:
          'Para que serve o comando Leia(N1) no VisuAlg e por que, no exercício da soma, não usamos Leia(S)?',
        options: [
          'A) Leia serve para exibir valores na tela, e S já é mostrado automaticamente.',
          'B) Leia pausa o programa para o usuário digitar um valor e guardá-lo na variável; já S recebe o resultado calculado pelo computador (N1 + N2).',
          'C) Leia só funciona para variáveis do tipo Caractere, por isso não pode ser usado em S.',
          'D) Leia apaga o valor anterior da memória e só pode ser usado no máximo duas vezes por algoritmo.',
        ],
        correct: 1,
        feedback: {
          wrong:
            'Revise: o comando Leia é um comando de entrada que aguarda o usuário digitar um dado para guardar na variável. Como a soma é calculada pelo computador, usamos atribuição (S <- N1 + N2).',
          right:
            '✅ Isso aí! O Leia captura o que o usuário digita e armazena na variável, enquanto o resultado S é calculado pelo próprio algoritmo.',
        },
      },
      {
        id: 'q2',
        pauseAt: 1173,
        timestampNote: 'Após 00:19:32',
        needsManualCheck: false,
        question:
          'Considerando a ordem de precedência dos operadores aritméticos ensinada na aula, qual é o resultado da expressão 3 + 2 / 2 (sem parênteses)?',
        options: [
          'A) 2.5, porque o computador sempre calcula tudo estritamente da esquerda para a direita.',
          'B) 2, porque a barra inclinada para a direita (/) faz divisão inteira.',
          'C) 5, porque a divisão por 2 é ignorada sem parênteses.',
          'D) 4, porque a divisão tem precedência maior que a adição (primeiro 2 / 2 = 1, depois 3 + 1 = 4).',
        ],
        correct: 3,
        feedback: {
          wrong:
            'Cuidado com a ordem de precedência: parênteses vêm primeiro, depois exponenciação, depois multiplicação/divisão e só por último adição/subtração. Por isso 2 / 2 é feito antes da soma!',
          right:
            '✅ Correto! Sem parênteses, a divisão acontece antes da adição: 2 / 2 dá 1, e somado a 3 resulta em 4. Para obter 2.5, seria preciso escrever (3 + 2) / 2.',
        },
      },
      {
        id: 'q3',
        pauseAt: null,
        timestampNote: 'Final da aula (conceito explicado entre 00:23:23 e 00:29:20)',
        needsManualCheck: false,
        question:
          'Ao criar o programa Conversor no final da aula para calcular o seno de um ângulo digitado em graus, por que o professor precisou usar a função GraupRad dentro de Sen?',
        options: [
          'A) Porque no VisuAlg a função Sen só aceita valores em radianos, sendo necessário converter o ângulo de graus para radianos antes.',
          'B) Porque a função Sen só funciona com números inteiros, e GraupRad transforma o ângulo em inteiro.',
          'C) Porque GraupRad calcula a raiz quadrada do ângulo antes de aplicar o seno.',
          'D) Porque sem GraupRad o VisuAlg retorna o valor absoluto negativo do ângulo.',
        ],
        correct: 0,
        feedback: {
          wrong:
            'Lembre-se da tabela de funções aritméticas: Sen, Cos e Tan trabalham com radianos no VisuAlg, por isso usamos GraupRad para converter graus em radianos.',
          right:
            '✅ Acertou! Como Sen, Cos e Tan recebem medidas em radianos no VisuAlg, a função GraupRad faz a conversão de graus para radianos.',
        },
      },
    ],
  },
  {
    lessonNumber: 4,
    title: 'Aula 4: Operadores Lógicos e Relacionais',
    videoUrl:
      'https://www.youtube.com/watch?v=Ig4QZNpVZYs&list=PLHz_AreHm4dmSj0MHol_aoNYCSGFqvfXV&index=5',
    videoId: 'Ig4QZNpVZYs',
    xpPerQuestion: 10,
    xpBonus: 30,
    questions: [
      {
        id: 'q1',
        pauseAt: 466,
        timestampNote: 'Após 00:07:45',
        needsManualCheck: false,
        question:
          'Sobre os operadores relacionais no VisuAlg (como >, <, >=, <=, = e <>), qual afirmação está correta?',
        options: [
          "A) O operador de 'diferente' é escrito como != e o resultado é sempre um número inteiro.",
          'B) Eles só podem comparar duas variáveis entre si, nunca números ou expressões aritméticas.',
          "C) Eles sempre retornam um valor lógico (Verdadeiro ou Falso), e o símbolo <> representa 'diferente de'.",
          'D) O operador >= só retorna Verdadeiro quando o primeiro valor é estritamente maior que o segundo.',
        ],
        correct: 2,
        feedback: {
          wrong:
            "Atenção! No VisuAlg, 'diferente de' é escrito como <> (sem espaço), podemos comparar variáveis, valores e expressões, e o resultado de qualquer operador relacional é sempre lógico (Verdadeiro ou Falso).",
          right:
            '✅ Exatamente! Operadores relacionais sempre geram um resultado lógico (Verdadeiro ou Falso), e no VisuAlg o operador de diferença é <>.',
        },
      },
      {
        id: 'q2',
        pauseAt: 1008,
        timestampNote: 'Após 00:16:47',
        needsManualCheck: false,
        question:
          'Quando uma mesma expressão combina operadores aritméticos, relacionais e lógicos, qual é a ordem geral de precedência executada pelo algoritmo?',
        options: [
          'A) Primeiro os lógicos, depois os relacionais e por último os aritméticos.',
          'B) Primeiro os aritméticos, depois os relacionais e por último os lógicos (E, depois OU, depois NAO).',
          'C) Primeiro os relacionais, depois os aritméticos e por último os lógicos.',
          'D) Todos têm a mesma precedência e são resolvidos apenas da esquerda para a direita.',
        ],
        correct: 1,
        feedback: {
          wrong:
            'Revise a tabela geral de precedência: o computador resolve primeiro as contas (aritméticos), depois as comparações (relacionais) e só no final os operadores lógicos (E, OU, NAO).',
          right:
            '✅ Muito bem! A ordem geral de precedência é: 1º Aritméticos, 2º Relacionais e 3º Lógicos (E, depois OU, e por fim NAO).',
        },
      },
      {
        id: 'q3',
        pauseAt: null,
        timestampNote: 'Final da aula (exercício dos triângulos entre 00:21:40 e 00:24:32)',
        needsManualCheck: false,
        question:
          'No exercício final dos triângulos, qual condição lógica foi usada na variável TRI para verificar se três lados (L1, L2 e L3) podem formar um triângulo?',
        options: [
          'A) Cada lado precisa ser menor que a soma dos outros dois, combinando os três testes com o operador lógico E.',
          'B) Basta que pelo menos um lado seja maior que a soma dos outros dois, usando o operador lógico OU.',
          'C) Os três lados precisam ser obrigatoriamente iguais, como no triângulo equilátero.',
          'D) Basta testar se L1 é diferente de L2 e L2 é diferente de L3, sem precisar somar os lados.',
        ],
        correct: 0,
        feedback: {
          wrong:
            'Lembre-se da regra matemática aplicada em TRI: (L1 < L2 + L3) E (L2 < L1 + L3) E (L3 < L1 + L2). Todas as três condições precisam ser verdadeiras ao mesmo tempo!',
          right:
            '✅ Show! Para formar um triângulo, cada lado deve ser menor que a soma dos outros dois — e como todas as três condições precisam valer juntas, usamos o operador E.',
        },
      },
    ],
  },
  {
    lessonNumber: 5,
    title: 'Aula 5: Introdução ao Scratch',
    videoUrl:
      'https://www.youtube.com/watch?v=GrPkuk1ezyo&list=PLHz_AreHm4dmSj0MHol_aoNYCSGFqvfXV&index=6',
    videoId: 'GrPkuk1ezyo',
    xpPerQuestion: 10,
    xpBonus: 30,
    questions: [
      {
        id: 'q1',
        pauseAt: 484,
        timestampNote: 'Após 00:08:03',
        needsManualCheck: false,
        question:
          "No Scratch, qual é o cuidado importante destacado pelo professor ao escolher entre os blocos 'mude [variável] para' e 'mude [variável] por'?",
        options: [
          "A) 'Mude para' só funciona com textos e 'Mude por' só funciona com números.",
          "B) 'Mude para' apaga a variável da memória, enquanto 'Mude por' cria uma nova variável.",
          'C) Os dois blocos fazem exatamente a mesma coisa, mudando apenas a tradução.',
          "D) 'Mude para' substitui o valor interno da variável sem acrescentar nada, enquanto 'Mude por' adiciona um valor ao que já está guardado nela.",
        ],
        correct: 3,
        feedback: {
          wrong:
            "Fique atento! 'Mude para' define um novo valor diretamente (atribuição), enquanto 'Mude por' soma/adiciona valores ao conteúdo atual da variável.",
          right:
            "✅ Excelente! 'Mude para' troca o valor interno da variável, e 'Mude por' acrescenta valores ao que já existia nela.",
        },
      },
      {
        id: 'q2',
        pauseAt: 1009,
        timestampNote: 'Após 00:16:48',
        needsManualCheck: false,
        question:
          "Quando o personagem José usou o comando 'se tocar na borda, volte' e passou a voltar de cabeça para baixo, como o professor corrigiu esse comportamento?",
        options: [
          "A) Aumentando o tempo de espera do bloco 'espere' para 1 segundo.",
          'B) Alterando a opção de rotação do personagem para girar apenas para a esquerda e para a direita.',
          'C) Removendo todos os 5 trajes de caminhada e deixando apenas o traje A.',
          "D) Trocando o bloco 'sempre' pelo bloco 'diga Olá, Mundo!'.",
        ],
        correct: 1,
        feedback: {
          wrong:
            'Revise os três estilos de rotação mostrados no Scratch: girar para qualquer direção (vira de cabeça para baixo), girar apenas esquerda/direita (solução usada!) ou nunca girar.',
          right:
            '✅ Boa! Ao escolher a opção de girar apenas para a esquerda e direita, o personagem inverte o sentido ao bater na borda sem ficar de cabeça para baixo.',
        },
      },
      {
        id: 'q3',
        pauseAt: null,
        timestampNote: 'Final da aula (mini-jogo do salto e placar entre 00:17:12 e 00:21:58)',
        needsManualCheck: false,
        question:
          "No mini-jogo criado no final da aula, como o programa detecta que José bateu a cabeça no tijolo para tocar o som 'pop' e somar 1 ponto no placar?",
        options: [
          "A) Usando apenas o bloco 'mova 10 passos' fora de qualquer estrutura de controle.",
          'B) Pedindo para o usuário digitar a quantidade de pontos no teclado usando um sensor de pergunta.',
          "C) Usando um bloco condicional 'se' com o sensor 'tocando em tijolo' para reproduzir o som e somar 1 na variável pontos com 'mude pontos por 1'.",
          'D) Trocando o fundo do palco toda vez que a tecla espaço é pressionada.',
        ],
        correct: 2,
        feedback: {
          wrong:
            "Lembre-se de como o placar foi montado: durante o salto, um bloco 'se' testa o sensor 'tocando em tijolo'; quando verdadeiro, toca o som 'pop' e usa 'mude pontos por 1'.",
          right:
            "✅ Perfeito! O mini-jogo combina a condição 'se', o sensor 'tocando em tijolo' e a variável 'pontos' incrementada com 'mude pontos por 1' (zerada ao clicar na bandeira verde).",
        },
      },
    ],
  },
  {
    lessonNumber: 6,
    title: 'Aula 6: Exercícios de Algoritmo Resolvidos',
    videoUrl:
      'https://www.youtube.com/watch?v=v2nCgGSVCeE&list=PLHz_AreHm4dmSj0MHol_aoNYCSGFqvfXV&index=7',
    videoId: 'v2nCgGSVCeE',
    xpPerQuestion: 15,
    xpBonus: 40,
    questions: [
      {
        id: 'q1',
        pauseAt: 559,
        timestampNote: 'Após 00:09:19 (importância da indentação com TAB)',
        needsManualCheck: false,
        question:
          'Segundo Gustavo Guanabara, qual é o papel da indentação (usando a tecla TAB) ao escrever algoritmos no VisuAlg?',
        options: [
          'A) É obrigatória para o programa executar, senão o VisuAlg exibe erro de sintaxe.',
          'B) Indicar visualmente quais comandos estão dentro de outras estruturas, sendo uma boa prática de programação mesmo não sendo obrigatória.',
          'C) Declarar automaticamente todas as variáveis do algoritmo antes do bloco inicio.',
          'D) Substituir o uso de parênteses nas fórmulas matemáticas.',
        ],
        correct: 1,
        feedback: {
          wrong:
            'A indentação não é obrigatória para o código rodar, mas serve para organizar visualmente quais comandos pertencem a cada estrutura (como var e inicio).',
          right:
            '✅ Exato! A indentação com TAB facilita a leitura mostrando o que está dentro de cada bloco e é marca registrada de um bom programador.',
        },
      },
      {
        id: 'q2',
        pauseAt: 1058,
        timestampNote: 'Após 00:17:38 (precedência em C <- (F - 32) / 1.8)',
        needsManualCheck: false,
        question:
          'Na conversão de temperatura C <- (F - 32) / 1.8 no VisuAlg, por que os parênteses em (F - 32) são indispensáveis?',
        options: [
          'A) Porque o VisuAlg não permite subtrair um número de uma variável sem parênteses.',
          'B) Porque os parênteses convertem o valor da variável F de inteiro para real.',
          'C) Porque, pela ordem de precedência, sem parênteses a divisão 32 / 1.8 seria feita antes da subtração.',
          'D) Porque toda atribuição no VisuAlg precisa começar com parênteses para ser válida.',
        ],
        correct: 2,
        feedback: {
          wrong:
            'Lembre-se da ordem de precedência: multiplicação e divisão acontecem antes de soma e subtração, então os parênteses forçam a subtração a ocorrer primeiro.',
          right:
            '✅ Isso mesmo! Os parênteses garantem que F - 32 seja calculado antes de dividir o resultado por 1.8.',
        },
      },
      {
        id: 'q3',
        pauseAt: null,
        timestampNote: 'Final da aula (cálculo de imposto de 60% da Creuza)',
        needsManualCheck: false,
        question:
          'No exercício do imposto de 60% sobre as compras da Creuza, qual fórmula simples Gustavo Guanabara ensina para calcular essa porcentagem sobre o valor (preco)?',
        options: [
          'A) (preco * 60) / 100',
          'B) (preco + 60) / 100',
          'C) (preco / 60) * 100',
          'D) preco - 60 / 100',
        ],
        correct: 0,
        feedback: {
          wrong:
            'Como o próprio nome diz, 60 por cento significa multiplicar o valor por 60 e dividir por 100.',
          right:
            '✅ Correto! Para calcular 60% de um preço, basta multiplicar por 60 e dividir por 100: (preco * 60) / 100.',
        },
      },
    ],
  },
  {
    lessonNumber: 7,
    title: 'Aula 7: Estruturas Condicionais (Parte 1)',
    videoUrl:
      'https://www.youtube.com/watch?v=_g05aHdBAEY&list=PLHz_AreHm4dmSj0MHol_aoNYCSGFqvfXV&index=8',
    videoId: '_g05aHdBAEY',
    xpPerQuestion: 15,
    xpBonus: 40,
    questions: [
      {
        id: 'q1',
        pauseAt: 505,
        timestampNote: 'Após 00:08:25 (condicional simples no exemplo de maioridade)',
        needsManualCheck: false,
        question:
          'Como funciona uma estrutura condicional simples (Se ... entao ... FimSe) no VisuAlg, como a usada no exemplo da maioridade?',
        options: [
          'A) Executa o bloco de comandos internos apenas se a expressão condicional for verdadeira; caso seja falsa, simplesmente pula esse bloco.',
          'B) Executa sempre dois blocos diferentes: um para quando a condição é verdadeira e outro para quando é falsa.',
          'C) Repete o bloco de comandos várias vezes enquanto a condição permanecer verdadeira.',
          'D) Encerra o algoritmo imediatamente com erro quando a condição é falsa.',
        ],
        correct: 0,
        feedback: {
          wrong:
            'Na condicional simples existe apenas um caminho extra: se a condição for verdadeira, o bloco roda; se for falsa, nada além do fluxo normal acontece.',
          right:
            '✅ Perfeito! Na condicional simples, o bloco entre entao e FimSe só é executado quando a expressão testada é verdadeira.',
        },
      },
      {
        id: 'q2',
        pauseAt: 917,
        timestampNote: 'Após 00:15:17 (Par ou Ímpar com condicional composta e %)',
        needsManualCheck: false,
        question:
          'No exercício de Par ou Ímpar no VisuAlg, qual expressão verifica corretamente se um número inteiro N é par?',
        options: [
          'A) N / 2 = 0',
          'B) N % 2 = 1',
          'C) N * 2 = 0',
          'D) N % 2 = 0',
        ],
        correct: 3,
        feedback: {
          wrong:
            'Para saber se um número é par, usamos o operador módulo (%), que calcula o resto da divisão por 2: todo número par deixa resto 0.',
          right:
            '✅ Muito bem! Se o resto da divisão de N por 2 (N % 2) for igual a 0, o número é par; senão, é ímpar.',
        },
      },
      {
        id: 'q3',
        pauseAt: null,
        timestampNote: "Final da aula (faixa de peso ideal no IMC com 'e')",
        needsManualCheck: false,
        question:
          'Na prática do cálculo do IMC, como devemos escrever no VisuAlg a condição para verificar se o IMC está na faixa de peso ideal (de 18.5 até menor que 25)?',
        options: [
          'A) Se (18.5 <= IMC < 25) entao',
          'B) Se (IMC >= 18.5) e (IMC < 25) entao',
          'C) Se (IMC >= 18.5 e < 25) entao',
          'D) Se (IMC >= 18.5) ou (IMC < 25) entao',
        ],
        correct: 1,
        feedback: {
          wrong:
            "Em algoritmos não se pode encadear desigualdades como na matemática nem omitir a variável; é preciso explicitar IMC nas duas comparações ligadas por 'e'.",
          right:
            "✅ Certíssimo! No VisuAlg, usamos o operador lógico 'e' repetindo a variável IMC nos dois testes: (IMC >= 18.5) e (IMC < 25).",
        },
      },
    ],
  },
  {
    lessonNumber: 8,
    title: 'Aula 8: Estruturas Condicionais (Parte 2)',
    videoUrl:
      'https://www.youtube.com/watch?v=7gGFHzqh4d8&list=PLHz_AreHm4dmSj0MHol_aoNYCSGFqvfXV&index=9',
    videoId: '7gGFHzqh4d8',
    xpPerQuestion: 15,
    xpBonus: 40,
    questions: [
      {
        id: 'q1',
        pauseAt: 506,
        timestampNote: 'Após 00:08:26 (boas práticas em condicionais aninhadas)',
        needsManualCheck: false,
        question:
          'Ao criar várias estruturas condicionais aninhadas (um Se dentro do outro), quais duas dicas práticas Gustavo Guanabara recomenda para não se enrolar no código?',
        options: [
          'A) Escrever todas as condições na mesma linha e evitar o comando Senao.',
          'B) Manter o código sempre indentado e, assim que abrir um Se, já fechar imediatamente com o FimSe.',
          'C) Usar apenas variáveis do tipo inteiro e declarar cada Se dentro da área var.',
          'D) Deixar para colocar todos os FimSe apenas depois do comando fimalgoritmo.',
        ],
        correct: 1,
        feedback: {
          wrong:
            'Para não perder o controle em vários Se aninhados, o segredo é manter a indentação alinhada e já digitar o FimSe logo que abrir cada Se.',
          right:
            '✅ Excelente! Indentar corretamente e fechar cada FimSe assim que abrir o Se mantém o código organizado e evita erros.',
        },
      },
      {
        id: 'q2',
        pauseAt: 982,
        timestampNote: 'Após 00:16:22 (limitações do Escolha / Caso no VisuAlg)',
        needsManualCheck: false,
        question:
          'Qual limitação importante da estrutura Escolha / Caso no VisuAlg é destacada pelo professor após o exemplo do Criança Esperança?',
        options: [
          'A) Ela aceita no máximo 3 casos diferentes dentro do mesmo bloco.',
          'B) Ela exige obrigatoriamente o bloco OutroCaso, senão o algoritmo não funciona.',
          'C) Ela só pode ser utilizada dentro de uma condicional Se / Senao aninhada.',
          'D) Ela não serve para testar faixas de valores (como >= ou <), sendo recomendada no VisuAlg apenas para valores inteiros.',
        ],
        correct: 3,
        feedback: {
          wrong:
            'A estrutura Escolha é ótima para opções fixas e inteiras (como menus 1, 2, 3), mas não permite testar intervalos ou faixas com >= e <.',
          right:
            '✅ Isso aí! No VisuAlg, o Escolha testa valores inteiros específicos e não serve para faixas de valores (para faixas, usamos Se aninhado).',
        },
      },
      {
        id: 'q3',
        pauseAt: null,
        timestampNote: 'Final da aula (múltiplos valores no Escolha / Caso)',
        needsManualCheck: false,
        question:
          'Na prática do reajuste salarial por número de dependentes, como o VisuAlg permite testar vários valores inteiros que resultam no mesmo aumento dentro do Escolha?',
        options: [
          "A) Usando o operador lógico 'e' entre os números, como em Caso 1 e 2 e 3.",
          'B) Usando um intervalo com hífen, como em Caso 1 - 3.',
          'C) Separando os valores por vírgula no mesmo Caso, como em Caso 1, 2, 3.',
          'D) Repetindo o comando Escolha antes de cada número.',
        ],
        correct: 2,
        feedback: {
          wrong:
            'No VisuAlg, quando vários valores compartilham o mesmo bloco dentro do Escolha, basta listá-los separados por vírgula no mesmo Caso.',
          right:
            '✅ Perfeito! Em Escolha / Caso você pode agrupar múltiplos valores separando-os por vírgula, como em Caso 1, 2, 3.',
        },
      },
    ],
  },
  {
    lessonNumber: 9,
    title: 'Aula 9: Estruturas de Repetição (Parte 1)',
    videoUrl:
      'https://www.youtube.com/watch?v=U5PnCt58Q68&list=PLHz_AreHm4dmSj0MHol_aoNYCSGFqvfXV&index=10',
    videoId: 'U5PnCt58Q68',
    xpPerQuestion: 15,
    xpBonus: 40,
    questions: [
      {
        id: 'q1',
        pauseAt: 626,
        timestampNote: 'Após 00:10:26 (valor final do contador no Enquanto)',
        needsManualCheck: false,
        question:
          'No exemplo que conta de 0 até 10 usando Enquanto (contador <= 10) faca e somando + 1 a cada repetição, qual é o valor final da variável contador quando o laço termina?',
        options: [
          'A) 0, pois o VisuAlg reinicia o contador automaticamente ao sair do Enquanto.',
          'B) 10, pois esse é o último número exibido na tela.',
          'C) 11, pois o laço só termina quando o contador ultrapassa 10 e a condição <= 10 passa a ser falsa.',
          'D) 9, pois o FimEnquanto descarta a última soma feita na variável.',
        ],
        correct: 2,
        feedback: {
          wrong:
            'Depois de mostrar o 10 na tela, o algoritmo ainda soma +1 ao contador (virando 11); é só ao voltar para o teste <= 10 que a condição falha e o laço encerra.',
          right:
            '✅ Mandou bem! O 10 aparece na tela, mas o contador termina valendo 11, que é justamente o valor que faz a condição <= 10 ficar falsa.',
        },
      },
      {
        id: 'q2',
        pauseAt: 1260,
        timestampNote: 'Após 00:21:00 (acumulador S <- S + N no somador numérico)',
        needsManualCheck: false,
        question:
          'Na prática do somador numérico, por que o professor inicializa a variável S (soma) com 0 antes do laço e usa S <- S + N dentro do Enquanto?',
        options: [
          'A) Porque S precisa começar vazia (0) para ir acumulando o total anterior somado ao novo número N lido em cada repetição.',
          'B) Porque S <- S + N apaga o total anterior para guardar apenas o último valor digitado.',
          'C) Porque o VisuAlg proíbe usar o comando Leia(N) dentro de um Enquanto sem uma variável zerada.',
          'D) Porque S é a variável contadora que define quando o laço vai parar.',
        ],
        correct: 0,
        feedback: {
          wrong:
            'Como ainda nenhum número foi somado no início, S começa em 0; a cada repetição, S <- S + N acumula o novo número N ao que já estava guardado em S.',
          right:
            '✅ Exatamente! A expressão S <- S + N funciona como um acumulador, somando cada novo valor lido ao total que já estava armazenado em S.',
        },
      },
      {
        id: 'q3',
        pauseAt: null,
        timestampNote: 'Final da aula (looping infinito e como interromper)',
        needsManualCheck: false,
        question:
          'Ao remover a linha que soma + 1 no contador (contador <- contador + 1), o programa entra em looping infinito. Por que isso ocorre e como interromper a execução no VisuAlg?',
        options: [
          'A) O contador aumenta rápido demais; basta fechar a janela preta no botão vermelho.',
          'B) O VisuAlg entra em looping sempre que o contador inicia em 0; é necessário desligar o computador.',
          'C) O comando FimEnquanto deixa de existir sem a soma; basta apagar a variável contador durante a execução.',
          'D) Como o contador nunca muda, a condição do Enquanto permanece sempre verdadeira; no VisuAlg, interrompe-se por Algoritmo > Parar, pelo botão Parar ou com CTRL + F2.',
        ],
        correct: 3,
        feedback: {
          wrong:
            'Sem atualizar o contador, o valor continua sempre 0 (menor ou igual a 10) para sempre; fechar só a janela preta não para o algoritmo — use Algoritmo > Parar, o botão Parar ou CTRL + F2.',
          right:
            '✅ Perfeito! Sem atualizar a variável de controle, a condição nunca fica falsa, gerando looping infinito. No VisuAlg, pare com Algoritmo > Parar, botão Parar ou CTRL + F2.',
        },
      },
    ],
  },
  {
    lessonNumber: 10,
    title: 'Aula 10: Estruturas de Repetição 2 (Repita)',
    videoUrl:
      'https://www.youtube.com/watch?v=fP49L1i_-HU&list=PLHz_AreHm4dmSj0MHol_aoNYCSGFqvfXV&index=11',
    videoId: 'fP49L1i_-HU',
    xpPerQuestion: 15,
    xpBonus: 40,
    questions: [
      {
        id: 'q1',
        pauseAt: 590,
        timestampNote: "Após 00:09:50 (teste lógico no final e inversão do 'Enquanto')",
        needsManualCheck: false,
        question:
          "Qual é a principal diferença entre a estrutura de repetição 'Repita' e a estrutura 'Enquanto'?",
        options: [
          "A) O 'Repita' faz o teste lógico no início, antes de executar o bloco pela primeira vez.",
          "B) O 'Repita' faz o teste lógico no final do laço e usa uma condição logicamente inversa à do 'Enquanto'.",
          "C) O 'Repita' só funciona quando existe um contador numérico de 1 até 10.",
          "D) O 'Repita' não permite ler valores do usuário dentro do bloco de repetição.",
        ],
        correct: 1,
        feedback: {
          wrong:
            "Revise a comparação do somador: o 'Repita' executa primeiro, testa só no final ('Até') e inverte a lógica do 'Enquanto'.",
          right:
            "✅ Correto! No 'Repita...Até', o teste lógico fica no final (garantindo ao menos uma execução) e a condição de saída é o inverso lógico da condição do 'Enquanto'.",
        },
      },
      {
        id: 'q2',
        pauseAt: 1095,
        timestampNote: 'Após 00:18:15 (inicialização de F com 1 no cálculo do fatorial)',
        needsManualCheck: false,
        question:
          "No algoritmo que calcula o fatorial de um número, por que a variável acumuladora 'F' deve começar valendo 1 e não 0?",
        options: [
          'A) Porque o VisuAlg não aceita inicializar variáveis inteiras com o valor 0.',
          'B) Porque o fatorial é calculado somando os números, e começar em 1 facilita a contagem.',
          'C) Porque o cálculo usa multiplicação (F <- F * C) e qualquer número multiplicado por 0 resultaria sempre em 0.',
          "D) Porque o laço 'Repita' só para quando o valor de 'F' fica menor do que 1.",
        ],
        correct: 2,
        feedback: {
          wrong:
            'Pense na operação feita dentro do laço: estamos multiplicando (F * C). Se F começasse em 0, o produto ficaria zerado em todas as voltas.',
          right:
            '✅ Correto! Como o fatorial acumula multiplicações (F <- F * C), começar F com 1 evita que o resultado vire 0.',
        },
      },
      {
        id: 'q3',
        pauseAt: null,
        timestampNote: 'Final da aula (verificador de número primo)',
        needsManualCheck: false,
        question:
          'No último exemplo prático da aula (verificador de número primo), como o algoritmo determina se o número N digitado é primo ou não?',
        options: [
          'A) Conta quantos números de 1 até N deixam resto 0 na divisão de N pelo contador; se o total de divisores for maior que 2, não é primo.',
          'B) Verifica apenas se o número N é ímpar; se o resto da divisão por 2 for diferente de 0, ele é sempre primo.',
          'C) Calcula o fatorial de N e verifica se o resultado final é divisível por 2.',
          'D) Verifica se o resto da divisão do contador C por N é igual a 1 em todas as voltas do laço.',
        ],
        correct: 0,
        feedback: {
          wrong:
            'Lembre que números ímpares como o 9 não são primos (9 divide por 1, 3 e 9). O algoritmo conta os divisores de N usando o resto da divisão (N % C = 0).',
          right:
            '✅ Correto! Um número primo só é divisível por 1 e por ele mesmo (2 divisores); por isso, se ContDiv for maior que 2, o número não é primo.',
        },
      },
    ],
  },
  {
    lessonNumber: 11,
    title: 'Aula 11: Estruturas de Repetição 3 (Para)',
    videoUrl:
      'https://www.youtube.com/watch?v=WJQz20i7CyI&list=PLHz_AreHm4dmSj0MHol_aoNYCSGFqvfXV&index=12',
    videoId: 'WJQz20i7CyI',
    xpPerQuestion: 20,
    xpBonus: 50,
    questions: [
      {
        id: 'q1',
        pauseAt: 525,
        timestampNote: "Após 00:08:45 (quando NÃO usar a estrutura 'Para')",
        needsManualCheck: false,
        question:
          "De acordo com o professor, em qual situação NÃO é recomendado usar a estrutura de repetição 'Para'?",
        options: [
          "A) Quando queremos fazer uma contagem regressiva usando passo negativo, como 'passo -1'.",
          "B) Quando queremos pular números de 2 em 2 utilizando o parâmetro 'passo 2'.",
          'C) Quando precisamos ler e somar uma quantidade fixa de 5 valores digitados pelo usuário.',
          "D) Quando não sabemos previamente quantas vezes o laço vai se repetir, como ao perguntar 'Quer continuar? [S/N]'.",
        ],
        correct: 3,
        feedback: {
          wrong:
            "O 'Para' precisa de início e fim definidos. Ele funciona muito bem para contagens fixas, passos de 2 em 2 e regressivas, mas não quando o usuário decide a hora de parar.",
          right:
            "✅ Correto! Quando não sabemos quantas repetições vão ocorrer (como no 'Quer continuar? S/N'), devemos usar 'Enquanto' ou 'Repita', e não o 'Para'.",
        },
      },
      {
        id: 'q2',
        pauseAt: 1020,
        timestampNote: 'Após 00:17:00 (diferença entre contador +1 e acumulador +V)',
        needsManualCheck: false,
        question:
          "No exercício que conta quantos valores estão entre 0 e 10 e soma os ímpares desse intervalo, qual é a diferença entre atualizar 'Tot010' e atualizar 'SImp'?",
        options: [
          "A) 'Tot010' soma + 1 para contar quantos valores entraram na condição, enquanto 'SImp' soma + V para acumular o valor digitado.",
          "B) 'Tot010' soma + V para contar os valores, enquanto 'SImp' soma + 1 para acumular os números ímpares.",
          "C) Ambas as variáveis recebem + 1 a cada repetição do laço 'Para', independentemente da condição.",
          "D) 'Tot010' começa valendo 1 e 'SImp' começa valendo 10, pois o intervalo vai de 0 até 10.",
        ],
        correct: 0,
        feedback: {
          wrong:
            'Lembre a diferença entre contador e acumulador: para contar ocorrências somamos 1; para somar os números em si, somamos o valor digitado (V).',
          right:
            "✅ Correto! 'Tot010 <- Tot010 + 1' conta cada ocorrência no intervalo, enquanto 'SImp <- SImp + V' acumula o valor de cada número ímpar encontrado.",
        },
      },
      {
        id: 'q3',
        pauseAt: null,
        timestampNote: "Final da aula (aninhamento de laços 'Para' para combinações)",
        needsManualCheck: false,
        question:
          "No exemplo de combinações com um laço 'Para' (C2 de 1 até 3) dentro de outro 'Para' (C1 de 1 até 3), como ocorre a execução?",
        options: [
          'A) Os dois laços avançam juntos ao mesmo tempo, exibindo apenas (1, 1), (2, 2) e (3, 3).',
          'B) O laço interno (C2) executa uma única vez no programa inteiro e depois o laço externo (C1) assume.',
          'C) Para cada valor de C1, o laço interno C2 executa completamente de 1 até 3 e é reiniciado na próxima volta de C1.',
          "D) O VisuAlg gera um erro, pois não é permitido colocar uma estrutura 'Para' dentro de outra.",
        ],
        correct: 2,
        feedback: {
          wrong:
            'No aninhamento de laços, o programa só volta ao laço de fora (C1) depois de terminar todas as repetições do laço de dentro (C2).',
          right:
            '✅ Correto! Para cada passo de C1 (1, 2 e 3), o laço interno C2 roda inteiro de 1 até 3, gerando todas as 9 combinações.',
        },
      },
    ],
  },
  {
    lessonNumber: 12,
    title: 'Aula 12: Procedimentos (Rotinas — Parte 1)',
    videoUrl:
      'https://www.youtube.com/watch?v=KoNehy7rn8U&list=PLHz_AreHm4dmSj0MHol_aoNYCSGFqvfXV&index=13',
    videoId: 'KoNehy7rn8U',
    xpPerQuestion: 20,
    xpBonus: 50,
    questions: [
      {
        id: 'q1',
        pauseAt: 798,
        timestampNote: 'Após 00:13:18 (execução passo a passo de Soma(X, Y))',
        needsManualCheck: false,
        question:
          "Quando criamos um procedimento como 'Soma(A, B: Inteiro)' e fazemos a chamada 'Soma(X, Y)' no programa principal, o que acontece durante a execução?",
        options: [
          "A) O procedimento é executado automaticamente assim que o algoritmo começa, antes mesmo do 'Inicio' do programa principal.",
          'B) O programa principal termina imediatamente após entrar no procedimento, sem retornar para as linhas seguintes.',
          "C) O algoritmo desvia para o procedimento copiando os valores de X e Y para A e B e, ao chegar em 'FimProcedimento', retorna para a linha abaixo da chamada.",
          'D) Os nomes dos parâmetros (A e B) precisam ser obrigatoriamente iguais aos nomes das variáveis passadas (X e Y).',
        ],
        correct: 2,
        feedback: {
          wrong:
            'No passo a passo (F8), o VisuAlg pula a definição do procedimento até que ele seja chamado; ao chamar, desvia, copia os valores e depois volta de onde parou.',
          right:
            '✅ Correto! A chamada desvia o fluxo para o procedimento passando os valores para A e B e, ao final, retorna exatamente para a linha seguinte do programa principal.',
        },
      },
      {
        id: 'q2',
        pauseAt: 1260,
        timestampNote: 'Após 00:21:00 (escopo local vs global no ParOuImpar)',
        needsManualCheck: false,
        question:
          "Sobre o conceito de escopo de variáveis explicado pelo professor, por que ocorreu um erro ao tentar exibir 'V' fora do procedimento 'ParOuImpar(V: Inteiro)'?",
        options: [
          'A) Porque variáveis do tipo inteiro não podem ser exibidas no programa principal.',
          "B) Porque o parâmetro 'V' possui escopo local e só existe enquanto o procedimento 'ParOuImpar' está sendo executado.",
          "C) Porque o procedimento 'ParOuImpar' apaga todas as variáveis globais do algoritmo ao terminar.",
          'D) Porque variáveis globais só podem ser usadas dentro de procedimentos e nunca no programa principal.',
        ],
        correct: 1,
        feedback: {
          wrong:
            "Lembre o que aconteceu na lista de variáveis ao sair de 'FimProcedimento': a variável V desapareceu porque ela foi criada apenas para aquele procedimento.",
          right:
            '✅ Correto! Variáveis e parâmetros declarados dentro de um procedimento têm escopo local e deixam de existir quando o procedimento termina.',
        },
      },
      {
        id: 'q3',
        pauseAt: null,
        timestampNote: "Final da aula (passagem de parâmetros por referência com 'var')",
        needsManualCheck: false,
        question:
          "Qual é o efeito de colocar a palavra 'var' antes dos parâmetros de um procedimento (passagem por referência), como em 'Procedimento Soma(var A, B: Inteiro)'?",
        options: [
          'A) Impede que os valores dos parâmetros sejam alterados dentro do procedimento.',
          'B) Transforma o procedimento em uma estrutura de repetição automática.',
          'C) Faz apenas uma cópia independente dos valores, mantendo as variáveis originais intactas.',
          'D) Passa a referência das variáveis originais, fazendo com que alterações em A e B modifiquem também as variáveis passadas na chamada.',
        ],
        correct: 3,
        feedback: {
          wrong:
            "Fazer uma cópia independente sem alterar as variáveis originais é a passagem por valor. Com 'var', os parâmetros ficam ligados às variáveis originais.",
          right:
            "✅ Correto! Na passagem por referência ('var'), o parâmetro aponta para a variável original, então qualquer mudança feita em A ou B altera também X e Y fora do procedimento.",
        },
      },
    ],
  },
  {
    lessonNumber: 13,
    title: 'Aula 13: Funções (Rotinas Parte 2)',
    videoUrl:
      'https://www.youtube.com/watch?v=-nNx7e8GzHQ&list=PLHz_AreHm4dmSj0MHol_aoNYCSGFqvfXV&index=14',
    videoId: '-nNx7e8GzHQ',
    xpPerQuestion: 20,
    xpBonus: 50,
    questions: [
      {
        id: 'q1',
        pauseAt: 610,
        timestampNote: 'Após 00:10:10 (diferença entre procedimento e função)',
        needsManualCheck: false,
        question:
          'Qual é a principal diferença entre uma função e um procedimento no VisuAlg?',
        options: [
          'A) A função não pode receber parâmetros, enquanto o procedimento sempre recebe.',
          'B) A função retorna um resultado ao programa principal por meio do comando retorne, permitindo tratá-lo fora da rotina.',
          'C) O procedimento exige o tipo de retorno no cabeçalho, enquanto a função não usa tipos.',
          'D) A função só funciona com números inteiros, enquanto o procedimento aceita textos.',
        ],
        correct: 1,
        feedback: {
          wrong:
            'Revise a comparação entre procedimento e função: ambos aceitam parâmetros e diferentes tipos, mas somente a função devolve um valor ao programa principal usando retorne.',
          right:
            '✅ Isso mesmo! Diferente do procedimento, a função devolve um valor de retorno para o programa principal, permitindo decidir como exibir ou reutilizar esse resultado.',
        },
      },
      {
        id: 'q2',
        pauseAt: 1460,
        timestampNote: 'Após 00:24:20 (Fibonacci com função e passagem por referência)',
        needsManualCheck: false,
        question:
          'No exemplo da série de Fibonacci feito com função, o que acontece quando colocamos a palavra var antes dos parâmetros no cabeçalho da função?',
        options: [
          'A) Os parâmetros passam a aceitar apenas valores do tipo caractere.',
          'B) A função deixa de precisar do comando retorne no final.',
          'C) A passagem de parâmetros passa a ser por referência, ligando os parâmetros diretamente às variáveis originais.',
          'D) As variáveis locais da função passam a ser visíveis no programa principal após o término dela.',
        ],
        correct: 2,
        feedback: {
          wrong:
            'Lembre-se do que o professor explicou na prática de Fibonacci: sem var a passagem é por valor (cópia), e com var ela se torna por referência.',
          right:
            '✅ Correto! Colocar var na frente dos parâmetros ativa a passagem por referência, fazendo alterações nos parâmetros refletirem nas variáveis originais.',
        },
      },
      {
        id: 'q3',
        pauseAt: null,
        timestampNote: 'Final da aula (funções prontas de texto — Analisador de Nomes)',
        needsManualCheck: false,
        question:
          'No Analisador de Nomes apresentado na parte final da aula, qual é o resultado da função pronta Copia(N, 1, 1) aplicada ao nome armazenado em N?',
        options: [
          'A) Retorna apenas a primeira letra do nome, começando na posição 1 e copiando 1 caractere.',
          'B) Retorna o total de letras existentes na variável N.',
          "C) Retorna a posição em que a letra 'A' aparece pela primeira vez em N.",
          'D) Retorna o código numérico (ASCII) da primeira letra do nome.',
        ],
        correct: 0,
        feedback: {
          wrong:
            'Atenção às funções prontas do VisuAlg: Compr conta letras, Pos busca posição e Asc retorna o código numérico; já Copia extrai um trecho da string.',
          right:
            '✅ Excelente! A função Copia(N, 1, 1) começa na 1ª letra de N e extrai 1 caractere, obtendo exatamente a primeira letra do nome.',
        },
      },
    ],
  },
  {
    lessonNumber: 14,
    title: 'Aula 14: Vetores (Variáveis Compostas Parte 1)',
    videoUrl:
      'https://www.youtube.com/watch?v=j9473xQ39vY&list=PLHz_AreHm4dmSj0MHol_aoNYCSGFqvfXV&index=15',
    videoId: 'j9473xQ39vY',
    xpPerQuestion: 20,
    xpBonus: 50,
    questions: [
      {
        id: 'q1',
        pauseAt: 920,
        timestampNote: 'Após 00:15:20 (vantagem dos vetores na Prática 1)',
        needsManualCheck: false,
        question:
          'Por que um vetor (variável composta homogênea unidimensional) permitiu mostrar as posições dos valores pares depois de ler todos os números, algo impossível com uma única variável simples?',
        options: [
          'A) Porque o vetor aceita misturar números inteiros e textos na mesma posição.',
          'B) Porque o vetor ordena automaticamente os valores digitados antes de salvá-los.',
          'C) Porque o vetor dispensa o uso de estruturas de repetição como o Para.',
          'D) Porque o vetor guarda vários valores do mesmo tipo em espaços identificados por um índice, sem apagar os valores anteriores.',
        ],
        correct: 3,
        feedback: {
          wrong:
            'Na variável simples, cada nova leitura sobrescreve o valor anterior. O vetor mantém todos os valores do mesmo tipo guardados em memória, acessíveis pelo índice entre colchetes.',
          right:
            '✅ Muito bem! Como o vetor mantém cada valor em seu próprio índice sem apagar os anteriores, podemos percorrê-lo novamente depois para consultar valores e posições.',
        },
      },
      {
        id: 'q2',
        pauseAt: 1575,
        timestampNote: "Após 00:26:15 (Prática 3 'Só importa quem começa com C')",
        needsManualCheck: false,
        question:
          "Na prática 'Só importa quem começa com C', o vetor soC foi declarado com 10 posições, mas o segundo laço Para vai de 1 até tot em vez de 1 até 10. Por quê?",
        options: [
          "A) Porque apenas os nomes que começam com 'C' foram armazenados no vetor, então percorrer até tot exibe somente as posições preenchidas.",
          'B) Porque o VisuAlg não permite usar o número 10 em dois laços Para no mesmo algoritmo.',
          'C) Porque o vetor soC diminui automaticamente de tamanho na memória durante a execução.',
          'D) Porque a variável tot guarda o número de letras do último nome digitado.',
        ],
        correct: 0,
        feedback: {
          wrong:
            "Pense no que aconteceu na execução: dos 10 nomes digitados, só os começados com 'C' entraram em soC, deixando as demais posições vazias.",
          right:
            '✅ Exato! A variável tot conta quantos nomes realmente foram guardados em soC, evitando exibir posições vazias na listagem final.',
        },
      },
      {
        id: 'q3',
        pauseAt: null,
        timestampNote: 'Final da aula (ordenação de vetores com variável auxiliar)',
        needsManualCheck: false,
        question:
          'Na técnica de ordenação de vetores ensinada na aula, quando vet[i] > vet[j], por que é necessário usar uma variável auxiliar (aux) para trocar os dois valores de lugar?',
        options: [
          'A) Para contar quantas vezes o vetor já foi percorrido pelo laço Para.',
          'B) Para somar os dois números antes de decidir qual deles é o maior.',
          'C) Para guardar temporariamente o valor de vet[i] antes de sobrescrevê-lo com vet[j], evitando perder o valor original na troca.',
          'D) Para armazenar o índice da última posição do vetor fora dos colchetes.',
        ],
        correct: 2,
        feedback: {
          wrong:
            'Se fizermos vet[i] <- vet[j] diretamente, o conteúdo antigo de vet[i] se perde. A variável aux guarda esse valor temporariamente durante a troca.',
          right:
            '✅ Perfeito! A variável auxiliar (aux) preserva temporariamente o valor de vet[i] para que ele possa ser copiado para vet[j] sem ser perdido.',
        },
      },
    ],
  },
  {
    lessonNumber: 15,
    title: 'Aula 15: Matrizes (Variáveis Compostas Parte 2)',
    videoUrl:
      'https://www.youtube.com/watch?v=hkE9WrjpAAk&list=PLHz_AreHm4dmSj0MHol_aoNYCSGFqvfXV&index=16',
    videoId: 'hkE9WrjpAAk',
    xpPerQuestion: 25,
    xpBonus: 75,
    questions: [
      {
        id: 'q1',
        pauseAt: 755,
        timestampNote: 'Após 00:12:35 (índices [linha, coluna] em matrizes)',
        needsManualCheck: false,
        question:
          'Em uma matriz declarada como m: vetor[1..3, 1..2] de Inteiro, o que faz o comando m[3, 1] <- 8?',
        options: [
          'A) Armazena o valor 8 na 1ª linha e na 3ª coluna da matriz.',
          'B) Armazena o valor 8 na 3ª linha e na 1ª coluna da matriz.',
          'C) Preenche todas as posições entre a linha 3 e a coluna 1 com o valor 8.',
          'D) Cria uma nova dimensão na matriz com 8 elementos.',
        ],
        correct: 1,
        feedback: {
          wrong:
            'Lembre-se da ordem dos dois índices em uma matriz: o primeiro índice indica sempre a linha e o segundo indica a coluna.',
          right:
            '✅ Isso aí! Em uma matriz, o primeiro índice representa a linha (3) e o segundo representa a coluna (1), gravando o 8 exatamente na posição [3, 1].',
        },
      },
      {
        id: 'q2',
        pauseAt: 1488,
        timestampNote: 'Após 00:24:48 (Matriz Identidade e diagonal principal)',
        needsManualCheck: false,
        question:
          'Na construção de uma Matriz Identidade (como a de 3ª ordem vista na aula), qual condição identifica os elementos da diagonal principal que devem receber o valor 1?',
        options: [
          'A) Quando o índice da linha for maior que o índice da coluna (i > j).',
          'B) Quando a soma dos índices da linha e da coluna for um número par.',
          'C) Quando o índice da linha for sempre igual a 1.',
          'D) Quando o índice da linha for igual ao índice da coluna (i = j).',
        ],
        correct: 3,
        feedback: {
          wrong:
            'Observe as posições da diagonal principal mostradas pelo professor: [1, 1], [2, 2] e [3, 3]. O que linha e coluna têm em comum nesses casos?',
          right:
            '✅ Correto! Na diagonal principal, linha e coluna têm o mesmo índice (i = j), recebendo 1 na matriz identidade enquanto todos os demais recebem 0.',
        },
      },
      {
        id: 'q3',
        pauseAt: null,
        timestampNote: 'Final da aula (maior valor da 3ª coluna na matriz 4x4)',
        needsManualCheck: false,
        question:
          'Na última prática da aula (matriz m de 4ª ordem), qual estratégia o professor utiliza para percorrer apenas os elementos da 3ª coluna e encontrar o maior valor?',
        options: [
          'A) Fixa o índice da coluna em 3 e usa um único laço Para variando a linha l de 1 até 4, acessando m[l, 3].',
          'B) Fixa o índice da linha em 3 e varia a coluna c de 1 até 4, acessando m[3, c].',
          'C) Usa dois laços Para aninhados testando se l = c.',
          'D) Acessa m[3] usando apenas um índice, pois uma coluna dispensa o índice de linha.',
        ],
        correct: 0,
        feedback: {
          wrong:
            'Para percorrer uma coluna específica, a coluna permanece fixa e apenas a linha varia. Fixar a linha em 3 percorreria a 3ª linha, e testar l = c percorreria a diagonal principal.',
          right:
            '✅ Mandou bem! Fixando a coluna em 3 e variando somente a linha l de 1 até 4 (m[l, 3]), percorremos exclusivamente a 3ª coluna da matriz.',
        },
      },
    ],
  },
];

export function extractLessonNumber(title: string): number | null {
  const match = title.match(/aula\s*(\d+)/i);
  if (!match) return null;
  const parsed = Number.parseInt(match[1], 10);
  return Number.isNaN(parsed) ? null : parsed;
}

export function findLessonConfig(missionTitle: string): VideoLessonConfig {
  const exact = VIDEO_LESSONS.find(
    (lesson) => lesson.title.toLowerCase() === missionTitle.trim().toLowerCase(),
  );
  if (exact) return exact;

  const lessonNumber = extractLessonNumber(missionTitle);
  if (lessonNumber !== null) {
    const byNumber = VIDEO_LESSONS.find(
      (lesson) => lesson.lessonNumber === lessonNumber,
    );
    if (byNumber) return byNumber;
  }

  return VIDEO_LESSONS[0];
}
