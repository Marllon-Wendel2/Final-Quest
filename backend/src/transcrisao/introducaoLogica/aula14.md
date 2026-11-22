https://www.youtube.com/watch?v=j9473xQ39vY&list=PLHz_AreHm4dmSj0MHol_aoNYCSGFqvfXV&index=15

# tactiq.io free youtube transcript
# No title found
# https://www.youtube.com/watch/j9473xQ39vY

00:00:04.980 [Música]
00:00:20.680 Olá seja bem-vindo a mais uma aula do seu curso de algoritmo o meu nome é Gustavo Guanabara eu sou seu professor e
00:00:26.320 agora a gente vai entrar na reta final do curso de algoritmo pra gente começar a ver variáveis compostas até o momento
00:00:33.120 a gente só utilizou variáveis simples a partir de agora vamos começar a utilizar as compostas o assunto variáveis
00:00:39.840 compostas vai ser tratado em duas aulas essa é a primeira parte e aí você pode estar se perguntando Mas Guanabara O que
00:00:46.800 seria uma variável composta para isso você vai ter que lembrar o que que é uma variável simples e eu tô aqui para
00:00:52.520 relembrar isso para você você deve se lembrar muito bem que no início desse curso eu mostrei a memória do computador
00:00:58.199 como se fosse um grande armário nesse armário sempre que eu declarar uma variável na área var como por exemplo N1
00:01:05.040 do tipo inteiro um espaço desse armário será reservado para variá N1 se em seguida eu fizer outra declaração por
00:01:11.640 exemplo n2 N3 n4 também inteiros ele vai reservar outros três espaços PR as
00:01:17.240 variáveis n2 N3 e n4 e se você prestou bastante atenção viu que eu coloquei as
00:01:22.520 variáveis fora da ordem elas não estão em posições sequenciais elas estão bagunçadas mesmo e é assim que pode
00:01:28.960 acontecer na memória do seu computador as variáveis Simples que são essas variáveis que a gente viu agora elas são
00:01:34.200 alocadas de acordo com a necessidade do sistema operacional para continuar esse nosso exemplo eu vou propor um corpo de
00:01:40.280 programa com algumas atribuições como por exemplo N1 recebe 3 n2 recebe 5 N3
00:01:46.000 recebe 1 e n4 recebe zer Quando eu fizer essas atribuições automaticamente os valores serão colocados nas respectivas
00:01:52.840 variáveis um por exemplo N1 vai receber 3 depois 5 1 e zer deu uma olhada no
00:01:59.520 lado esquerdo e veja que o valor de cada variável está armazenado do lado direito na memória do computador e esse foi o
00:02:06.600 método que nós utilizamos até agora para armazenar por exemplo quatro valores e eu vou mostrar para você um outro método
00:02:12.920 muito mais simples muito mais rápido que é utilizando variáveis compostas eu vou manter as variáveis N1 n2 N3 n4
00:02:20.040 declaradas mas eu vou mostrar para você um outro tipo de variável no lugar de N1 n2 N3 n4 eu vou declarar uma variável n
00:02:27.920 e essa declaração vai ser um pouco di diferente Pois ela vai utilizar uma variável composta homogênea a linha é a
00:02:34.200 seguinte n é um vetor de 1 a 4 de inteiro entre um e quatro existem apenas
00:02:40.159 dois pontos isso não é uma reticência e logo de cara essa declaração muito grande pode até causar um susto mas fica
00:02:46.319 tranquilo é bem simples o conhecimento de Vetor você vai entender a partir de agora o que que vai acontecer de
00:02:51.879 diferente dessa linha pras linhas de cima quando eu declaro uma variável n como um vetor de 1 a 4 o que ele vai
00:02:58.640 fazer é declarar uma uma variável n com quatro espaços exatamente como você está vendo do lado direito da tela note aí
00:03:05.720 que os quatro espaços estão exatamente um ao lado do outro é assim que funciona num vetor e eu tenho quatro locais para
00:03:12.400 colocar valores e tudo isso relacionado a uma mesma variável que é a variável n
00:03:17.480 Então antes eu tinha quatro variáveis para guardar quatro valores Agora eu tenho uma variável com quatro espaços e
00:03:24.200 aí você pode perguntar mas como é que eu coloco valores nas casas certinhas eu vou mostrar para você você vai ver como
00:03:30.239 é que é simples vamos fazer a primeira atribuição no corpo do programa utilizando n posição 1 recebe TR note aí
00:03:38.519 que é diferente de N1 eu estou fazendo com que a variável n na posição 1 receba
00:03:44.599 o valor 3 automaticamente o valor 3 será colocado na posição um da variável n
00:03:50.760 para complementar o nosso exemplo eu vou fazer outras atribuições n2 = 5 N3 = 1 e
00:03:56.400 n4 = 0 Note que os valores foram ados no vetor Cada um na sua posição Então é
00:04:02.799 assim que funciona com esse tipo de variável eu tenho que indicar o nome dela e entre colchetes eu tenho que
00:04:08.200 colocar o que a gente chama de índice que é a posição que é o endereço dentro da variável e vamos a um conceito muito
00:04:14.799 importante que é o nome que tá escrito lá em cima na tela que a gente ainda não deu devida atenção a ele então se você
00:04:20.440 olhar na área de declaração das variáveis que estão lá em cima nós temos N1 n2 N3 n4 que são variáveis simples e
00:04:27.280 nós temos n que é uma variável composta e o termo composta fica claro agora ele
00:04:32.400 é composto de vários espaços no título desse slide tá escrito variáveis
00:04:37.520 compostas homogêneas homogênea se dá porque todos os espaços dessa variável
00:04:43.479 são do mesmo tipo são inteiros e por isso o nome homogênea logo em seguida eu
00:04:48.919 vou colocar mais um nome para esse tipo de variável que são variáveis compostas
00:04:54.240 homogêneas unidimensionais essa variável que nós acabamos de declarar que a variável n ela é uma variável composta
00:05:01.039 porque ela tem vários espaços ela é homogênea porque todos os espaços são do mesmo tipo e ela é unidimensional porque
00:05:08.560 para identificar cada um dos quadradinhos eu preciso apenas de um endereço por exemplo a segunda casa de n
00:05:14.400 é o n2 para exemplificar eu declarei uma variável n que é uma variável composta homogênea unidimensional que nós damos o
00:05:21.319 nome de Vetor e uma variável simples I que é do tipo inteiro no corpo do meu
00:05:26.639 programa eu posso fazer o seguinte posso criar um para de 1 até 4 que são as
00:05:32.319 posições do meu vetor e fazer um Leia n na posição I esse I vai ser substituído
00:05:39.039 pelo valor da variável que está no laço Então nesse primeiro caso eu vou digitar um número porque tem um Leia n é minha
00:05:45.680 variável composta no início quando o para começa o i recebe 1 então a
00:05:51.160 variável i está com valor 1 o que o usuário digitar vai ser colocado dentro da variável n na posição 1 eu coloquei
00:05:58.720 uma interrogação AL ali para qualquer coisa que o usuário digitar nesse caso vai ser colocado ali logo em seguida vou
00:06:04.840 colocar um fim para E aí você deve lembrar das estruturas de repetição quando eu falei de para o para ele é uma
00:06:11.319 estrutura de repetição isso é ele vai fazer um looping e automaticamente vai fazer o incremento caso você tenha
00:06:16.479 alguma dúvida em relação à estrutura de repetição para clica aqui e você vai acessar um playlist onde nós temos todas
00:06:22.360 as aulas do curso de algoritmo então chegando no fim para ele vai voltar para o para somando mais um na variável I
00:06:30.120 assim a variável I vai deixar de valer um e vai valer dois o próximo layer vai
00:06:35.400 ler um valor qualquer e colocá-lo diretamente na posição dois do vetor logo em seguida o fim para ele vai
00:06:41.560 voltar mais uma vez e o mesmo processo vai se repetir colocando valores nas posições 3 e 4 do vetor quando chegar a
00:06:49.080 quatro o laço vai parar já que o i vai de 1 até 4 e aí ficou um pouco confuso
00:06:54.840 Então vamos direto pro visualg para ver como é que isso funciona na prática então estamos aqui no visualg vamos
00:07:00.560 declarar um vetor que eu vou chamar de V de valores que vai ser um vetor de seis
00:07:07.120 posições Então vou botar um até seis de inteiro Vou declarar aqui uma variável
00:07:15.039 contadora e vamos fazer esse contador começar em um e ir até seis entre o para
00:07:22.199 e o fim para nós vamos ler o valor por exemplo digite o
00:07:31.800 contador valor botar um ozinho aqui para ele
00:07:38.800 fazer o primeiro valor segundo valor terceiro valor e assim sucessivamente Leia o vetor V na posição
00:07:48.560 contador vamos executar você vai ver aqui na tela Digite o primeiro valor vamos digitar o
00:07:55.039 primeiro depois vamos digitar o segundo o terceiro o mesmo pro quarto o quinto e
00:08:00.599 o sexto fim da execução Pois foi só isso
00:08:05.720 que eu coloquei se eu quiser mostrar o vetor na tela eu posso fazer uma outra
00:08:11.360 estrutura utilizando o mesmo c não tem problema nenhum se ele estiver já
00:08:21.319 estourado e vamos fazer o seguinte vou mandar
00:08:28.000 escrever um um colchete o valor de v na posição C
00:08:35.240 depois vou mandar fechar o colchete na tela lugar de colchete vou usar chave só
00:08:41.240 para você não confundir com os colchetes da sintaxe daqui executando o
00:08:46.959 programa nós vamos botar 4 7 6 1 2
00:08:53.000 8 ó lá ó 4 7 6 1 2 e 8 Se você prestar
00:08:59.160 atenção aqui no visualg você tem a área de variáveis nós temos apenas duas variáveis V que é o vetor e c que é o
00:09:06.000 número inteiro aqui na minha área de variáveis eu tenho V só que eu tenho seis espaços da minha variável v e eu
00:09:13.480 tenho a variável c todas elas do tipo inteiro e com Esopo Global Deu para
00:09:18.760 entender o vetor ele facilita muito a nossa vida e o mais legal é que eu não preciso apagar O Valor anterior para
00:09:25.680 colocar um novo eu posso guardar Vários valores dentro de uma mesma é como se fosse salvar dados só que fica
00:09:32.640 na memória do computador e se por acaso eu quiser adaptar esse programa para funcionar com mais números basta alterar
00:09:38.720 aqui ó se eu quiser 10 números vou fazer um para de um até 10 e outro para de um
00:09:44.920 até 10 a partir de agora esse mesmo programa funciona para 10 valores Mas a
00:09:50.399 gente não vai parar na parte básica de Vetor não a gente vai andar um pouco mais e vamos aprender algumas coisas
00:09:55.440 mais avançadas mas logo de cara vamos ao nosso primeiro exemplo a primeira pra que nós teremos é um programa para ler
00:10:01.680 sete valores e mostrar Quantos são pares vamos fazer isso utilizando vetores
00:10:07.240 estou aqui com um novo programa no visual criar vetor Val de valores um
00:10:12.399 vetor de até 7 que o enunciado pediu de inteiro vamos fazer um contador no caso
00:10:20.440 meu índice V chamar de I posso chamar de C posso chamar do que eu quiser na verdade do tipo inteiro vamos agora
00:10:27.920 fazer um para e de 1 até
00:10:33.440 7 e entre para e fim para eu vou ler os
00:10:41.839 valores mesmo jeito que a gente fez anteriormente Digite o primeiro valor
00:10:46.880 Digite o segundo valor e assim sucessivamente Leia meu vetor Val na
00:10:52.680 posição i isso aqui vai fazer com que ele Leia o vetor de cada posição logo
00:10:59.639 depois da Leitura eu posso verificar se ele é par ou ímpar se o Val na posição
00:11:06.440 I dividido por 2 der resto zero nós já
00:11:11.600 vimos isso anteriormente várias vezes na verdade então eu vou ter uma variável
00:11:17.920 pro total de pares que vou chamar de tot par que começa com
00:11:25.760 zero no início do programa E caso o valor que eu acabei de digitar dividido
00:11:31.800 por 2 seja resto zero então eu vou fazer com que totp receba Top Mais
00:11:40.480 um no final eu vou escrever na tela o total de pares foi to
00:11:50.920 par vamos rodar e ver como isso funciona vamos digitar os valores
00:12:00.200 eu digitei sete valores e o total de pares foi três só é eu digitei o número
00:12:05.240 quatro aqui depois o número 6 depois o número oito Esses foram os três valores
00:12:11.959 pares então o programa está funcionando corretamente Mas essa não é a funcionalidade principal dos vetores a
00:12:19.000 principal funcionalidade do vetor é que ele consegue guardar os valores então eu vou propor um aumento nesse exercício
00:12:25.680 vocês vão ver a utilidade desse tipo de variável composta nessa mesma uma prática além de ler os sete valores e
00:12:31.560 mostrar Quantos são pares eu quero adicionar uma coisa que é mostrar as posições desses valores pares e isso não
00:12:37.920 era possível utilizando variáveis simples mas é totalmente possível utilizando vetores vamos fazer algumas
00:12:43.920 alterações aqui no meu projeto do visualg Na verdade eu vou manter o que já tá escrito e vou fazer um outro para
00:12:50.120 agora para varrer o vetor desde o início até o
00:12:55.959 fim e eu vou verificar em que posições esses valores pares foram colocados
00:13:02.839 posso verificar aqui mais uma
00:13:08.360 vez não vou tentar simplificar minha lógica agora não deixar ela um pouquinho maior mas separar em dois
00:13:17.440 momentos botar o mesmo C lá de cima se o valor ele vai voltar pra posição um se o
00:13:23.480 valor for divisível por 2 ele vai escrever
00:13:30.760 valor par na
00:13:36.480 posição I que é o meu
00:13:41.760 índice ele vai fazer isso várias vezes vou colocar lá 4 6 1
00:13:50.160 9 5 6
00:13:58.040 2 o total de pares foi quatro Eu tenho um valor par na posição um outro na posição dois outro na posição se e outro
00:14:05.440 na posição 7ete basta olhar na lista de cima e ver que está tudo funcionando eu
00:14:10.560 posso simplificar ainda mais esse programa fazendo o seguinte eu vou tirar esse Sida
00:14:17.279 aqui vou colocar o totalizador
00:14:24.040 aqui que eu tirei lá de cima e vou escrever o resultado do
00:14:30.320 final depois desse segundo para pause o vídeo altere seu programa e
00:14:36.519 vamos ver o resultado vou digitar sete valores 1 3 5 4
00:14:43.480 6 8 3 eu tenho o valor par na posição 4 na
00:14:49.440 posição 5 na posição 6 e o total de pares foi trê entendeu a grande vantagem
00:14:55.120 dos vetores nas variáveis simples eu tinha que ler um valor e a partir momento em que eu leio o outro ele apaga
00:15:00.639 o valor anterior então eu não consigo voltar no tempo e dizer em que posições foram digitados os valores pares agora
00:15:07.519 com vetores eu tenho vários espaços em uma mesma variável então eu consigo voltar retornar a qualquer momento pra
00:15:14.079 primeira posição e varrendo o vetor normalmente para verificar os valores e as condições que eu tenho para fazer
00:15:20.120 vamos a um outro exemplo prático para mostrar o poder dos vetores para você a segunda prática que eu venho propor é a
00:15:26.360 gestão de uma listagem de uma turma e nós vamos fazer isso utilizando mais de um vetor então basicamente o que eu
00:15:32.519 quero aqui eu vou criar um vetor para guardar o nome de vários alunos botar cinco alunos um
00:15:40.279 vetor botar quatro alunos de
00:15:45.480 caractere vou colocar um vetor pra primeira
00:15:52.519 nota de real vou criar um vetor pra segunda nota que também vai ter quatro
00:16:00.560 posições de real e um vetor paraa
00:16:08.680 média real também vou ter um contador que vai de um a
00:16:17.680 qu porque ele vai ser utilizado na estrutura de repetição de um até
00:16:24.880 4ro aqui dentro eu vou ler as informações do aluno
00:16:30.480 V botar aqui aluno I para ele ficar aluno um
00:16:36.639 aluno 2 aluno 3 e assim vai mandar ali o
00:16:43.880 nome eu vou ler o vetor nome na posição
00:16:50.399 I vai ser o primeiro aluno na primeira passagem vou ler primeira nota
00:17:01.160 vou guardar em N1 na posição
00:17:06.559 I vou ler a segunda nota também vou gravar no vetor n2 na
00:17:15.760 posição I note aqui que eu vou ter três vetores sendo lidos E se eu olhar na
00:17:21.359 posição um o nome a primeira nota e a segunda nota eu tenho nome primeira e
00:17:26.480 segunda nota do Primeiro Aluno para calcular a média é simples vou
00:17:31.720 calcular a média na posição 1 vai ser o N1 na posição I mais o n2 na posição I
00:17:42.440 dividido por 2 o processo de especificação do vetor é exatamente o mesmo processo das especificações das
00:17:48.120 variáveis só que eu tenho que indicar o índice entre colchetes esse índice vai mudar de 1 até 4 pois ele vai repetir
00:17:54.720 isso quatro vezes no final eu vou limpar a tela
00:17:59.760 e vou gerar uma listagem de
00:18:06.280 alunos fazer uma linha aqui para separar nessa listagem de alunos eu vou
00:18:11.960 colocar um para com o mesmo índice de 1 até
00:18:19.880 4 toda vez que eu abro um para eu fecho fim para e vou fazer um
00:18:26.200 escreva onde eu vou mostrar o nome na posição i e a média do aluno que é m na
00:18:33.400 posição I vou fazer isso pros quatro alunos vamos ver
00:18:40.159 aqui eu usei i e declarei C ó ó tu
00:18:46.159 burrinho vamos lá primeiro aluno tirou quatro e
00:18:51.880 sete segundo aluno Maria tirou 9 e
00:18:57.720 o terceiro aluno Paulo tirou 3 e 2 e a
00:19:03.919 quarto aluno Ana tirou 9 e 10 a listagem de alunos eu tenho Gustavo
00:19:10.880 com 5,5 Maria com 8,5 Paulo com 2,5 e Ana com 95 note aqui que as médias estão
00:19:16.919 desalinhadas o ideal seria que eu mostrasse o nome e todas as médias alinhadas aqui nesse espaço todo que vai
00:19:24.080 daqui até aproximadamente aqui eu devo ter aproximadamente uns 15 espos Passos
00:19:29.559 Então vou ensinar um macete para vocês basta colocar aqui ó na hora de escrever o nome eu vou escrever um nome com 15
00:19:36.440 espaços se ele não utilizar os 15 ele vai complementar os espaos em branco vamos rapidamente aqui fazer de
00:19:54.480 novo Agora eu tenho 15 espaços aqui ó note aqui eu mandei mostrar o nome
00:20:01.919 ocupando 15 espaços e a média eles vai alinhar aqui caso aqui o o para ele
00:20:07.840 mostar 8.0 nós já vimos anteriormente eu posso aqui 2.4 2. 1 são quatro casas ao
00:20:15.000 todos e decimal E aí mais vez euon um adicional porque a gente nun fica no
00:20:22.280 básico a tarefa adicional na prática do é colocar Quais são os alunos que estão
00:20:27.400 Acima da Média E para isso vou precisar da Média da turma voltando ao visualg
00:20:32.799 para ter a média da turma eu tenho que ter a soma das médias e a média da
00:20:38.320 turma são do tipo real vou ter que somar as médias soma da Média recebe soma da
00:20:44.440 Média mais a média do aluno no final aqui eu vou ter que calcular a média da
00:20:49.600 turma a média da turma recebe a soma das médias dividido por 4 que é o número de
00:20:55.159 alunos agora aqui eu vou ter também o o total de alunos Acima da Média que eu
00:21:01.360 vou chamar de tote vou verificar aqui no segundo para se a média do aluno for
00:21:09.960 maior do que a média da turma então o tot recebe tot mais um is é mais um
00:21:18.520 aluno que está acima da média no final fora do para eu vou escrever ao todo
00:21:27.520 temos tot alunos Acima da Média da turma que é
00:21:38.200 MT 2 pontos 4 2 pontos 1 vamos executar
00:21:45.039 fazer mais um caso Ana 4 e 8
00:21:50.720 Paula 9 e 10 Gustavo do e TR péssimo
00:21:56.559 aluno e Maria 6 e 4 então a média da turma foi 5.8 eu
00:22:05.039 tenho Ana que está acima Paula que está acima Gustavo e Maria estão abaixo Então
00:22:10.960 eu tenho dois alunos Acima da Média da turma que foi 5.8 e a minha listagem
00:22:16.240 ficou bonitinha inclusive com as médias mesmo as inteiras como 6.0
00:22:21.720 formatadas Ficou claro né E se por acaso foi rápido demais não se esqueça você
00:22:27.080 pode pausar o vídeo ler o código praticar no seu visualg e aprender de uma maneira definitiva nunca se esqueça
00:22:34.799 não adianta Só assistir essa aula acredita em mim você vai ter que abrir o visualg digitar o código para você poder
00:22:41.120 aprender vetores vamos a mais um exemplo pra gente poder fixar ainda mais o conceito de variáveis compostas
00:22:47.360 homogêneas unidimensionais e Eu batizei essa terceira prática de só importa quem
00:22:53.120 Começa com C basicamente o que eu vou querer é o seguinte eu vou ler o nome de várias pessoas mas o que vai importar
00:22:59.679 para mim são apenas pessoas cujo nome comecem com a letra C essas pessoas eu
00:23:04.919 vou armazenar num vetor todas as outras eu vou descartar o nome e ele não vai fazer parte do meu vetor vamos ver como
00:23:12.000 isso funciona o que eu vou fazer aqui vou declarar uma variável nome do tipo
00:23:17.679 caractere normal e vou criar um vetor chamada só C que vai ser um vetor de até
00:23:25.760 10 posições de caracteres vou ter o meu contador e vou fazer um
00:23:31.559 para contador de um até 10 que vai ler esse
00:23:38.200 nome digite seu nome Leia nome agora que
00:23:44.720 eu vou fazer é o seguinte eu vou fazer com que se a primeira letra do nome for
00:23:50.720 C ele vai armazenar esse valor no vetor para pegar a primeira letra nós já vimos
00:23:55.919 numa das aulas anteriores que foi a aula de funções que eu tenho a função cópia
00:24:01.720 nessa função cópia eu vou indicar a variável pegar a maiúscula dele maiúscula do nome vou começar na
00:24:08.279 primeira posição e vou andar uma só se isso aqui for igual a c então é mais uma
00:24:15.440 pessoa se eu vou ter que ter também o total de pessoas que tem C vai começar com zero S eu não tenho nenhuma pessoa
00:24:23.240 com c se for ele vai pegar tot recebe tot mais um e vai fazer com que o vetor
00:24:30.600 só c na posição tot receba o nome da pessoa no final eu
00:24:38.919 vou fazer outro para de um até não 10 eu vou até tot que é o total de pessoas que
00:24:45.320 eu cadastrei com c e vou mostrar s c na posição C limpar a tela
00:24:53.200 aqui listagem final nessa listagem final eu vou querer só ente as pessoas que Ten
00:25:00.440 o nome começado com a letra C pause o vídeo dá uma olhada no código e vamos
00:25:06.559 dar continuidade vou executar são 10 nomes Maria José
00:25:13.480 Cláudia Carlos Gustavo Ana
00:25:19.080 Paulo Catarina Creusa Maria a minha listagem final eu só tenho Cláudia
00:25:26.480 Carlos Catarina e Creusa se você for olhar aqui nas variáveis na
00:25:32.520 área de variáveis do visualg nós temos só c com 10 posições mas apenas as
00:25:39.399 quatro primeiras foram preenchidas que foi Cláudia Carlos Catarina e Creusa
00:25:46.559 Então somente esses valores foram preenchidos e por isso o meu segundo
00:25:52.840 para não vai até 10 ele vai até o total de pessoas no meu aqui total de pessoas
00:26:00.120 são quatro pessoas que foram cadastradas Cláudia Carlos Catarina e
00:26:06.600 Creusa esse Maria aqui não faz parte do vetor ele é o último nome que eu digitei PR minha variável nome e aí tá muito
00:26:14.559 difícil tá muito complicado é sinal de que você não tá praticando o suficiente para de vergonha abre seu visualg digita
00:26:21.240 o código volta essa aula assiste ela de novo digita todos os exercícios no final
00:26:26.399 você vai ter exercício para fazer e o tenho certeza de que você vai conseguir vamos a mais um exemplo mostrando um
00:26:32.840 conceito muito importante que é o de ordenação em vetores Então a nossa última prática dessa aula vai ser como
00:26:40.440 ordenar um vetor e eu vou dar um exemplo aqui para vocês vou criar um vetor com
00:26:45.679 quatro posições esse vetor vai se chamar Vet ele vai ter a posição 1 2 3 e 4 eu
00:26:52.559 vou colocar valores aleatórios dentro do vetor pra gente poder entender 5906
00:26:58.679 5906 são valores que estão totalmente fora de ordem para ordenar o vetor
00:27:03.840 Existem várias técnicas a mais simples de todas é essa que eu vou utilizar agora basicamente a gente vai ter que
00:27:10.120 comparar cada posição do vetor com todas as posições consecutivas todas as posições depois dele por exemplo vamos
00:27:18.039 começar então com a primeira posição essa que está marcada aí na tela eu vou ter que comparar a primeira posição com
00:27:24.760 a segunda a primeira com a terceira e a primeira com a isso é eu vou comparar a primeira com Todas aquelas que vem
00:27:31.640 depois Primeiro eu vou comparar a primeira com a segunda 5 e no já estão
00:27:38.159 em ordem então eu não vou precisar mexer Vamos então comparar a primeira com a terceira 5 e z0 não estão em ordem então
00:27:46.240 eu tenho que realizar uma troca agora eu estou em ordem vamos continuar na
00:27:51.760 primeira posição que agora não é mais c é zer e vamos comparar com a quarta 0 e
00:27:57.360 6 já estão em ordem eu não vou precisar mexer agora vamos partir pra segunda
00:28:03.399 vamos comparar o nove com a terceira posição não é preciso comparar o nove
00:28:09.279 com a primeira pois a primeira depois de fazer todas as repetições com certeza vai estar em ordem Então vou comparar a
00:28:15.360 segunda que é o nove com a terceira que é o cinco nove e cinco ainda não estão
00:28:20.720 em ordem então eu vou ter que realizar mais uma troca vou comparar agora o cinco com o seis que é a quarta posição
00:28:28.440 CCO e se já estão em ordem eu não vou precisar mexer chegamos ao final da comparação da segunda casa vamos partir
00:28:34.880 pra última comparação que é a terceira com a quarta casa 9 e 6 não estão em
00:28:40.440 ordem eu vou ter que realizar uma troca Então o meu vetor que começou com valores totalmente desordenados agora
00:28:47.760 está com vetor ordenado 05 6 9 e essa é
00:28:53.399 exatamente a tarefa que a gente vai ter que cumprir fazer um algoritmo que ordene um vetor independente do tamanho
00:28:59.480 dele eu já comecei meu algoritmo aqui criando um vetor duas variáveis inteiras que vão ser meus contadores e fazendo um
00:29:06.679 para para ler o vetor pause o vídeo digite esse código e já já a gente continua depois de você digitar vamos
00:29:13.799 fazer o programa para ordenar esse vetor para isso eu vou precisar de um para dentro do outro com índices diferentes o
00:29:21.440 primeiro índice vai de 1 até 3 que é o total de casas menos 1 isso é eu vou
00:29:29.360 começar no primeiro e até a terceira casa se você lembra muito bem nós só comparamos até a terceira casa o segundo
00:29:36.399 vai começar do próximo isso é i mais um e vai até a última casa vou fechar os
00:29:42.559 dois paras aqui dentro Eu vou fazer uma comparação se o meu vetor na posição I
00:29:51.120 for maior do que o meu vetor na posição J eu vou realizar a troca isso é vou
00:29:57.399 realizar a troca caso o anterior seja maior que o posterior para realizar a
00:30:03.159 troca eu vou precisar de uma variável auxiliar pois essa troca não pode ser feita automaticamente meu auxiliar vai
00:30:09.799 receber o primeiro valor meu primeiro valor vai receber o segundo valor meu
00:30:16.480 segundo valor vai receber o auxiliar vamos ver se está tudo funcionando no
00:30:22.320 final tem que mostrar o vetor
00:30:29.440 Vou escrever uma chave o vetor na posição I fechar a chave vamos executar
00:30:35.039 direto primeiro mais uma vez eu digo pause o seu vídeo digite esse código e
00:30:41.159 só Então continue a execução vamos executar o programa vamos digitar os valores vou
00:30:47.760 digitar 5 90 6 que foram os mesmos valores que eu
00:30:52.919 digitei anteriormente naquele exemplo pressionando enter meu vetor é
00:30:59.360 Vet Errei aqui mais uma vez burrinho vamos executar 5 9 0 6 e os valores
00:31:08.120 ordenados são 0 5 6 e 9 vamos executar no passo a passo pra gente poder
00:31:14.200 entender vou exibir todas as variáveis aqui vamos começar a execução passo a
00:31:20.320 passo declarei o vetor declarei as variáveis inteiras então meu vetor tem quatro posições e as variáveis inteiras
00:31:29.679 começando vou ler os valores digitar
00:31:36.639 3 2 9 e 5 agora nós vamos começar a minha
00:31:46.360 repetição vou entrar nos dois paras entrei no primeiro entrei no segundo eu
00:31:51.480 estou com i valendo um e o J valendo 2 isso é vou comparar a primeira posição
00:31:56.919 com a segunda ele vai verificar se o vetor na posição 1 for maior que o vetor
00:32:02.559 na posição 2 na posição 1 é 3 na posição 2 É 2 então 3 é maior do que 2 então ele
00:32:10.559 vai realizar a troca auxiliar vai receber Vet na posição 1 só é auxiliar
00:32:17.039 vai receber 3 nota aqui o auxiliar tá com zero vai valer 3 Vet na posição 1
00:32:22.960 vai receber Vet na posição do então aqui de TRS ele vai virar do e aqui a posição 2 vai receber o valor 3 que é o auxiliar
00:32:31.440 Então eu tinha 3 e 2 Agora eu tenho 2 e 3 quando cheg Nesse fim para ele não vai
00:32:38.200 voltar pro I note aqui ó que esse fim para é relativo ao J então o i vai
00:32:43.880 continuar com um eu estou na primeira casa comparei com a segunda agora eu vou pra primeira casa comparar com a
00:32:49.720 terceira vou apertar aqui ó estou comparando a primeira com a terceira a
00:32:54.799 primeira com a terceira 3 e 9 já estão ordenados então ele não vai entrar
00:33:00.080 nesses três comandos vai direto pro fim para vai voltar mais uma vez pro J que
00:33:05.159 vai valer 4 então o J está valendo 4 ele pode valer 4 pois ele vai até esse valor
00:33:11.320 a posição 1 3 e a posição 4 C estão em ordem Então não vai precisar ser
00:33:17.279 alterado F para nesse caso aqui ele vai sair do J saindo do J ele vem pra linha
00:33:25.320 de baixo que é o outro fim para quando chega nesse fim para ele volta pro i o i
00:33:30.679 que estava valendo um passa a valer dois agora o i Vale do o J começa com i + 1
00:33:38.679 já que ele estourou anteriormente ele pode recomeçar então o J vai valer 3
00:33:44.080 Então estou comparando a segunda posição com a terceira posição a segunda posição
00:33:49.960 está com três e a terceira com nove três com nove já estão em ordem não vai precisar executar os três comandos volta
00:33:56.960 pro j o J Vale 4 estou comparando a segunda posição com a quarta a segunda
00:34:03.039 posição está com três a quarta com cinco três e cin estão em ordem ele não vai executar mais uma vez as três linhas
00:34:10.079 chegou nesse fim para o J que já está valendo 4ro vai estourar e eu vou voltar
00:34:16.239 pro I mais uma vez pro último valor o i vai ser TR vou comparar a terceira
00:34:22.280 posição com a quarta posição terceira posição é nove e a quarta é CCO 9 e 5
00:34:29.839 não estão em ordem então ele vai ter que ordenar nessas três linhas auxiliar vai receber o vetor na posição três isso é
00:34:37.280 vai receber nove o auxiliar passa a valer nove note aqui o Vet na posição 3
00:34:44.520 vai receber Vet da posição 4ro Então cinco vai vir pro lugar e o Vet na posição J que é esse daqui vai receber
00:34:52.560 auxiliar que é nove Então essa linha que tá amarela vai receber nove fim para ele
00:34:58.880 estourou o J porque o j já está valendo 4 fim para ele vai estourar o i também
00:35:04.320 porque o i tá valendo 3 e ele vai até três a partir de agora ele vai
00:35:10.079 simplesmente executar o código de mostrar o vetor então ele vai mostrar o primeiro valor que é do era três agora
00:35:19.040 não mais o segundo valor que é três o
00:35:24.119 terceiro valor que é cinco e o quarto valor que é nove a ordenação de vetores
00:35:30.440 não é um processo muito simples então talvez você tenha que assistir essa aula mais de uma vez principalmente esse
00:35:36.240 trecho de ordenação outra coisa que você pode fazer é tentar adaptar esse algoritmo para funcionar com vetores
00:35:41.720 maiores Vamos fazer uma mudança para que ele funciona em vez de vetores com quatro posições vetores com 10 posições
00:35:47.960 para fazer essa alteração deixa eu encerrar o programa eu vou modificar aqui para
00:35:53.400 10 aqui para 10 aqui para 9 aqui para 10
00:36:00.200 e por fim aqui também para 10 vamos executar digitar 10
00:36:07.720 posições e ele vai colocar em ordem 1 2 3 3 4 5 7 8 8 e 9 eu digitei oit duas
00:36:15.240 vezes e três duas vezes mas os valores a sequência está totalmente em ordem e
00:36:21.079 mais uma vez eu digo estamos na reta final do curso de algoritmo então a parte mais difícil eu deixei pro final
00:36:27.680 então isso vai depender da sua dedicação do seu esforço do seu estudo vamos agora
00:36:32.760 aos exercícios que eu quero que você faça para que você possa fixar o conceito de variáveis compostas homas
00:36:38.599 unidimensionais no mundo do cri os vetores o primeiro exercio que eu venho propor chama-se torio de futebol vamos
00:36:45.760 ver ele funcionando e você vai tentar replicar esse comportamento basicamente o que eu quero que esse programa faça é
00:36:52.040 ler o nome de três times Vou colocar aqui Vasco Flamengo
00:36:57.720 e Botafogo o que o programa Vai fazer é uma tabela de jogos que são as combinações que podem existir entre
00:37:04.200 esses três times sem repetições iso é Vasco não pode jogar contra Vasco pressionando enter ele vai mostrar uma
00:37:10.280 tabela Vasco com Flamengo Vasco com Botafogo Flamengo com Vasco Flamengo com Botafogo Botafogo com Vasco Botafogo com
00:37:17.160 Flamengo isso porque existem os jogos de ida de vinda Quem entende de futebol sabe um pouco melhor disso então você
00:37:23.200 vai pensar numa maneira de ler os três nomes dos times e fazer combinações entre esses três nomes considerando que
00:37:29.599 eles não podem jogar o time com ele mesmo E aí gostou do desafio Vamos então
00:37:35.040 ao segundo exercício o segundo exercício proposto é corrigindo provas vamos ver o
00:37:40.800 programa funcionando e você vai entender melhor esse programa é feito em Dois Passos o primeiro eu vou cadastrar o
00:37:47.359 gabarito de uma prova de cinco questões então eu vou botar lá essa questão Um a resposta foi a letra a a questão dois a
00:37:54.560 resposta foi letra b a questão TR a resposta foi letra C A questão 4 letra D
00:38:01.280 e a questão 5 letra A de novo então a b c d e a é o gabarito pressionei enter
00:38:07.800 agora vou começar a cadastrar as provas dos alunos o aluno Gustavo respondeu na
00:38:14.400 questão 1 a na questão 2 A na Quest 3 A na questão 4 a e na questão 5 a o aluno
00:38:21.480 Gustavo Ele é problemático Ele marca a mesma resposta em todas porque ele é burro sendo assim ele acertou a primeira e a última vamos fazer isso para três
00:38:28.599 alunos o segundo aluno é a Maria ela é esperta botou A B C D E errou a última
00:38:38.240 sendo que cada questão para cada aluno vale dois pontos né são cinco questões para aluno tirar 10 ele tem que valer
00:38:44.720 dois pontos cada questão Paulo errou todas então eu tenho Gustavo que tirou
00:38:51.800 quatro porque acertou só a primeira e a última Maria que tirou oito porque acertou só errou uma
00:38:58.000 e Paulo que errou todas e tirou zero e no final eu mostro a média da turma que foi quatro legal esse exercício também
00:39:05.680 né Então tudo isso utilizando vetores e se você olhar lá no site cursoemvideo.com aqui ó
00:39:11.960 www.cursoemvideo.com se cadastrando e vendo as aulas você vai até a aula 14 e
00:39:18.200 vai ver o gabarito dos exercícios 1 2 e do terceiro que nós vamos dar agora o
00:39:24.000 terceiro e último exercício é reservar espaço no cinema você já deve ter ido ao cinema e reserva uma cadeira nós vamos
00:39:30.920 fazer um exemplo menor Vamos considerar uma sala de cinema e vamos fazer a reserva apenas da fileira B Vamos
00:39:37.640 considerar uma fileira B com 10 cadeiras Então esse programa ele vai ter que
00:39:42.960 reservar espaços dentro do cinema vamos ver o programa funcionando Então nesse
00:39:48.640 meu programa ele mostrou lá a fileira B1 B2 B3 B4 até B10 eu quero reservar a
00:39:54.640 cadeira B3 pressionando enter a cadeira 3S foi reservada Ele pergunta se eu
00:40:00.040 quero reservar outra vou dizer que sim automaticamente a B3 vai tá reservada isso é ela não pode ser mais escolhida
00:40:07.000 também vou reservar a B6 a b7 a B1 e a B10 agora nós temos essas cadeiras vamos
00:40:15.720 por exemplo tentar reservar B3 que é uma cadeira que já está ocupada pressionando
00:40:21.000 enter ele vai dizer erro o lugar está ocupado e essas são as três propostas de
00:40:26.280 exercício que eu tenho para fazer fazer para vocês para você praticar o conceito de vetores Eu espero que você tenha
00:40:31.720 entendido vetor é um conceito um pouco mais complexo mas assistindo a aula devagarinho praticando você consegue
00:40:39.440 aprender esse conceito tão complexo e que tanta gente tem medo eu espero que você esteja realmente gostando desse
00:40:45.400 curso nós estamos já na reta final só falta o conceito de variáveis compostas homogêneas multidimensionais que é a
00:40:52.000 última aula e eu espero de coração que você esteja compartilhando essa ideia mostrando esse curso para maior número
00:40:58.240 de pessoas para fazer isso basta você acessar aqui ó cursoemvideo.com você vai ter acesso a todas as aulas e a
00:41:04.240 experiência completa Aqui é onde você vai ter a resposta de todos os exercícios todos os pacotes para baixar
00:41:09.839 todos os arquivos que foram gerados desde a primeira até a última aula clicando aqui você vai ter acesso ao
00:41:15.319 canal aqui você vai assinar o canal e sempre que tiver um vídeo novo você vai ser avisado um vídeo novo do curso de
00:41:20.760 algoritmo ou de qualquer outro curso que a gente vai fazer daqui paraa frente e clicando aqui você vai ter acesso a
00:41:26.000 todas as aulas criadas até hoje uma playlist organizadinha mas nunca se esqueça a experiência completa é só aqui
00:41:32.560 cursoemvideo.com dá uma curtida nesse vídeo compartilha pratique não adianta
00:41:37.920 tentar aprender algoritmo Só assistindo o vídeo só lendo material você tem que abrir o visualg você tem que praticar
00:41:44.280 você tem que botar a mão na massa então eu espero que você tenha estudado até a próxima aula que é a última do curso
00:41:49.760 infelizmente mais um curso em vídeo acabando mas o projeto continua a gente vai ter mais cursos pra frente então
00:41:55.920 bons estudos treine bastante e até a
00:42:09.480 próxima e se você prestou bastante e se você
00:42:14.560 tardado tem problemas bicho você não tem noção de como eu fico
00:42:23.880 suado lá tudo junto n
