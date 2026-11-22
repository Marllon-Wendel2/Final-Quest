https://www.youtube.com/watch?v=-nNx7e8GzHQ&list=PLHz_AreHm4dmSj0MHol_aoNYCSGFqvfXV&index=14

# tactiq.io free youtube transcript
# No title found
# https://www.youtube.com/watch/-nNx7e8GzHQ

00:00:04.980 [Música]
00:00:20.880 Olá seja bem-vindo a mais uma aula do seu curso de algoritmo o meu nome é Gustavo Guanabara eu sou seu professor e
00:00:26.560 agora a gente vai dar continuidade a nossos estudos e algoritmo vendo mais um tipo de rotina na aula passada nós vimos
00:00:32.320 a primeiro tipo de rotina que é o procedimento e agora nós vamos passar para rotinas parte dois vendo funções e
00:00:38.680 é muito importante deixar duas coisas Claras aqui a primeira delas é que existem só dois tipos de rotina os
00:00:43.960 procedimentos e as funções e a segunda coisa que eu quero deixar bem claro é que você precisa ter visto a aula 12 que
00:00:50.160 é a aula de procedimentos e ter praticado bastante então o que eu sugeri no final da aula 12 foi que você
00:00:55.879 praticasse os conceitos dos procedimentos as passagens de parâmetro tanto tanto por referência quanto por
00:01:01.120 valor por isso é muito importante pro aprendizado de rotinas então se você não praticou o suficiente você vai ter algum
00:01:07.280 tipo de dificuldade para aprender funções é importante deixar isso claro porque muitos conceitos eu vou passar
00:01:12.439 por cima porque eu já expliquei isso na aula 12 então Talvez você encontre uma grande dificuldade para entender essa
00:01:18.479 aula 13 porque você não assistiu direito a aula 12 então fique bem claro fique isso na sua cabeça se você quer assistir
00:01:24.240 a aula 13 assista caso você tenha alguma dificuldade uma boa dica é voltar pra aula 12 e refazer o conceito refazer os
00:01:31.280 exercícios e praticar então apenas dando uma relembrada a gente viu na aula passada um procedimento simples eu vou
00:01:37.560 replicá-lo aqui para você poder entender melhor o conceito de funções Então isso que tá aparecendo na sua tela é um
00:01:43.640 procedimento para somar dois valores Eu tenho um procedimento chamado soma que recebe dois parâmetros A e B do tipo
00:01:49.560 inteiro tem uma variável S que vai somar esses dois valores e dentro do procedimento o valor de S vai ser
00:01:55.079 exibido eu tenho aqui o programa principal que vai fazer chamada a essa função soma que acabamos de criar a onde
00:02:00.360 N1 recebe 5 n2 recebe 4 e eu vou somar esses dois valores de N1 e de n2 então
00:02:06.119 eu vou somar 5 com 4 naquela aula eu expliquei que a passagem de parâmetro é feito da seguinte maneira o N1 com 5 n2
00:02:12.800 com 4 quando eu chamo soma N1 e n2 o valor de N1 vai ser colocado dentro da
00:02:18.040 variável a ou melhor dizendo dentro do parâmetro a e o n2 vai ser colocado
00:02:23.680 dentro do parâmetro B sendo assim a fica valendo 5 e B fica valendo 4 como você
00:02:28.800 está vendo na sua tela dessa maneira o 5 e o 4 serão somados na linha que está sendo indicada e no final
00:02:35.720 a soma Vale 9 que é o valor da soma entre 5 e 4 e até então tudo simples
00:02:41.080 Tudo Fácil de compreender e aí entra o conceito de função funções são rotinas
00:02:46.599 assim como os procedimentos só que ela tem uma grande diferença elas podem retornar um resultado então se você
00:02:52.480 prestar atenção no código que a gente acabou de mostrar aí na tela o procedimento ele tem que receber os valores fazer suas contas e mostrar os
00:02:59.319 resultados porque ele não consegue dar resposta ao meu programa principal as funções sim as funções vão poder
00:03:05.080 retornar coisas e aí sim eu vou tratar no código principal o que que vai ser feito com o resultado dessa função vamos
00:03:11.879 ver o funcionamento na mesma tela vou deixar o procedimento e logo embaixo vamos fazer tudo isso em forma de função
00:03:18.879 Vamos então fazer tudo com função agora para criar uma função a linha se parece muito qu linha para criar um
00:03:24.400 procedimento com uma pequena diferença preste bem atenção essa linha que eu acabei de escrever vai estar função soma
00:03:31.080 recebendo a e b do tipo inteiro e existe um inteiro a mais no final que indica o valor de retorno que essa função dará eu
00:03:38.599 vou declarar a variável S exatamente como eu fiz anteriormente e vou começar a minha função vou fazer com que S
00:03:45.799 receba a + b exatamente igual a procedimento Então vou pegar o valor da chamada vou jogar em a vou pegar o
00:03:51.840 segundo valor vou jogar em B vou somar os dois e o resultado da soma vai ficar guardado em S se você comparar com o
00:03:57.879 procedimento de cima a próxima linha seria seriam escreva L mas no meu caso aqui eu não vou precisar escrever dentro
00:04:03.360 da função eu vou utilizar o comando retorne E aí eu vou colocar retorne s e
00:04:08.760 fim de função o retorne S vai fazer com que tenha um retorno pro documento principal Por falar em algoritmo
00:04:15.640 principal vamos a ele Note que existe uma pequena diferença e essa diferença está na linha
00:04:22.919 logo abaixo das atribuições primeira linha é o N1 recebe 5 logo em seguida o n2 recebe 4 na terceira linha eu tenho
00:04:30.080 uma chamada paraa soma mas soma é uma função Então ela retorna um valor esse valor vai ser armazenado na variável
00:04:36.680 rest de resultado então eu faço com que R receba o resultado de retorno da soma
00:04:42.479 de N1 para n2 quando eu executo essa linha R recebe soma de N1 para n2 o valor de N1 vai ser jogado em a o valor
00:04:49.800 de n2 vai ser jogado em B eu vou fazer a soma que no caso aqui vai dar o mesmo
00:04:55.240 9ve e a linha de retorno vai fazer com que retorne o valor 9 para variável rest
00:05:01.400 logo em seguida eu vou escrever a soma e rest que é minha variável de resultado e
00:05:06.639 essa é a principal diferença entre utilizar funções e procedimentos nos procedimentos você não pode retornar um
00:05:13.080 valor durante uma função Você tem o valor de retorno e aí ficou fácil ficou
00:05:18.280 confuso aí é a base que eu tô te falando se você não entendeu bem a aula 12 você não vai entender a aula 13 Então se
00:05:24.639 ficou muito confuso para você pense na possibilidade de rever a aula 12 mas Aguarda um pouquinho que eu vou fazer na
00:05:30.639 prática isso que eu acabei de fazer e talvez com essa segunda explicação você entenda melhor então vamos PR nossa
00:05:36.199 primeira prática que é somar dois valores só que dessa vez nós vamos fazer utilizando funções vamos visual então no
00:05:44.319 meu visual eu tenho soma função que eu V declarar dois números vamar de v1 para
00:05:50.400 valor 1 V2 para valor 2 do tipo inteiro meu programa principal eu vou pedir para
00:05:56.560 que o usuário digite os valores Digite o primeiro valor Leia
00:06:05.720 v1 vou escrever de novo Digite o segundo
00:06:14.479 valor e leia V2 vou criar uma variável aqui pra soma
00:06:21.880 vou chamar de s e s vai receber o resultado da soma entre v1 e V2 essa
00:06:29.720 função soma não existe então eu tenho que criá-la logo após a minha área de variáveis Então vamos lá vou criar uma
00:06:36.639 função Não tem acento em função chamada a soma que vai receber dois valores vou
00:06:42.319 determinar aqui como x e y do tipo inteiro a minha função também vai ter
00:06:49.120 que ter um retorno somando dois valores inteiros eu vou ter um resultado inteiro vai ter o início da
00:06:55.639 função e o fim da função também sem acento essa minha função eu posso fazer
00:07:02.599 direto não como eu fiz no exercício anterior eu vou fazer com que retorne o
00:07:07.720 valor de X + Y esse parênteses não é necessário ele é opcional Vamos colocar
00:07:14.240 retorne o valor de X + Y vamos executar o programa entre 4 e 5 ele vai somar mas
00:07:23.400 eu esqueci de mostrar o resultado né escreva a soma hein
00:07:31.080 entre v1 e
00:07:37.800 V2 é igual a
00:07:43.479 S 3 e 4 a soma entre 3 e 4 é ig a 7 tudo
00:07:48.720 funcionou normalmente vamos no passo a passo para você entender melhor pressione F8 aí no seu teclado e vamos
00:07:57.560 começar primeiro passo ele vai criar as variáveis v1 V2 e s Então fique de olho
00:08:03.159 aqui na parte de baixo Acabei de criar três variáveis vazias próximo passo ele vai pular a
00:08:09.560 minha função Lembrando que a rotina ela só é executada quando for chamada então ele vai pular diretamente pra linha
00:08:15.800 início pulou ele vai pedir o primeiro valor eu vou digitar C pressionando
00:08:22.759 Enter o valor 5 foi dentro da variável v1 continuando vamos pedir para ele
00:08:29.680 digitar o segundo valor 7 vou dar enter e o 7 também foi paraa variável V2 Então
00:08:36.599 eu tenho v1 com 5 V2 com 7 agora eu vou dizer que S vai receber a soma entre v1
00:08:44.000 e V2 S Por enquanto ainda está com zero executando ele vai chamar a função soma
00:08:50.000 e já vai transferir o valor de v1 para x e o valor de V2 para Y pressionar aqui
00:08:55.880 ele já criou x e y x com valor de V1 Y com valor de V2 minha rotina é simples
00:09:02.560 Eu simplesmente vou retornar x + y 5 + 7 é igual a 12 por enquanto a minha
00:09:09.480 variável S está com zero mas assim que eu pressionar F8 Note que ela vai mudar
00:09:14.560 para 12 pressionei a minha variável de retorno está aqui ó meu retorno tá sendo
00:09:22.399 como 12 note aqui que Ele criou uma área de retorno pressionando F8 novamente a
00:09:27.800 variável S vai receber esse valor 12 Então agora eu tenho S que é a soma
00:09:35.000 entre 5 e 7 que é 12 agora basta mostrar na tela o resultado que a soma entre 5 e
00:09:41.640 7 É iG a 12 e finalizamos o nosso algoritmo entender o mecanismo de programação com funções é bem semelhante
00:09:48.399 com programação com procedimentos mas a função ela tem a grande vantagem de poder retornar um resultado e eu poder
00:09:54.279 tratar da maneira que eu quiser nos procedimentos O Retorno O resultado é mostrado na tela de uma maneira
00:09:59.959 padronizada as funções permitem que você trate a formatação e a exibição o tratamento do resultado diretamente no
00:10:06.760 seu programa principal vamos a mais um exercício para fixar um pouco mais esse conceito de funções Então vamos à
00:10:12.360 prática dois que vai ser verificar se um número é par o ímpar e nós já fizemos isso anteriormente mas agora vamos fazer
00:10:18.959 utilizando funções aqui no meu visualg vamos fazer o seguinte criar uma variável n que é inteira e vamos criar
00:10:27.200 uma variável R de resultado que vai ser caractere vamos fazer o seguinte Vamos
00:10:33.760 ler o número digite um
00:10:39.680 número Vamos ler n vai ser guardado meu resultado vai ser
00:10:48.079 para o ímpar uma função que eu vou criar passando n como parâmetro então O
00:10:54.839 resultado vai ser R no final vai ser o número
00:11:04.079 n é um valor R que vai ser par ou ímpar Então
00:11:10.720 eu tenho que escrever a função par ou ímpar que eu já sei de cara que é uma função porque ela vai ter um retorno que
00:11:16.839 vai ser guardado na variável R de resultado então eu vou criar uma função
00:11:22.200 que vai ser para o ímpar vai receber um valor V
00:11:29.519 inteiro e vai retornar um valor caractére vamos
00:11:36.000 começar e fim da função vamos fazer o seguinte se o v
00:11:44.040 resto da divisão por 2 for igual a zero nós já Vimos que os números pares t o
00:11:49.279 resto da divisão por 2 igual a zero caso tenha alguma dúvida Verifica a aula em que nós falamos sobre operadores
00:11:57.240 aritméticos então se o resto for zero
00:12:02.920 retorne par senão
00:12:10.000 retorne ímpar E aí o valor de retorno vai ser
00:12:15.600 jogado diretamente na variável R vamos ver a execução 5 5 é um valor ímpar
00:12:21.519 executar de novo 8 8 é um valor par vamos ver funcionando passo a
00:12:27.880 passo estar a janela aqui pro lado vamos começar vai criar uma variável n do tipo
00:12:33.279 inteiro uma variável R do tipo caracter Então eu tenho I com zero e c vazio ele
00:12:39.160 vai pular a função vai começar no início do programa onde ele vai pedir para digitar um número eu vou digitar
00:12:47.079 set E aqui nessa linha que está marcada ele vai chamar a função para verificar
00:12:52.519 se ele é par ou ímpar ele vai passar paraa minha função Agora eu tenho n que é7 Que que foi digitado foi jogado
00:13:00.720 pro parâmetro V então V recebeu o valor de n Eu tenho o r que ainda está vazio e
00:13:07.240 aqui eu tenho o valor de retorno que da última execução foi com par nós vamos ver agora e vai verificar se V por 2 = 0
00:13:16.519 V que é 7 por 2 que é 7 di 2 dá 3 e
00:13:22.160 Resta 1 então 1 é o resultado de V
00:13:27.760 por2 então ele não é igual a zero ele vai vir pro sinão e a linha que será
00:13:33.360 executada vai ser o retorne ímpar na hora que eu pressionar o valor de retorno aqui está ímpar e esse valor de
00:13:40.680 retorno vai ser jogado como essa linha aqui está indicando dentro da variável R
00:13:45.920 vamos apertar F8 mais uma vez agora Note que a variável R que é caractere está
00:13:51.920 com o valor ímpar executando a linha ele vai executar que o número sete é um
00:13:57.040 valor ímpar e por por fim termino o meu algoritmo Deu para entender melhor agora
00:14:02.600 né a gente ainda vai fazer mais um exemplo um terceiro exemplo para reviver uma novo exercício que foi o exercício
00:14:08.320 de cálculo de fatorial e dessa vez eu vou Relembrar os conceitos de escopo que ainda funcionam dentro das funções a
00:14:14.920 terceira prática que eu venho sugerir aqui é a prática para cálculo de um fatorial de um número que nós já vimos
00:14:20.240 nas aulas anteriores quando estávamos vendo o conceito de estruturas de repetição Vamos criar agora um algoritmo
00:14:25.920 que calcule o fatorial de um número mas por conta de uma função Vamos então criar um algoritmo para cálculo de
00:14:31.800 fatorial eu vou criar uma variável n pro número e uma variável F para
00:14:38.279 fatorial vamos começar lendo o
00:14:46.920 número Leia n e vamos fazer com que F receba o valor
00:14:53.320 de fatorial de n Escreva na tela
00:15:01.759 o valor de n fatorial o símbolo de fatorial é uma exclamação é igual a
00:15:10.399 f pronto Esse é o meu programa programa ficou simples F recebe o fatorial de n
00:15:16.240 mas como eu não tenho o comando fatorial eu tenho que criar minha função que calcule o fatorial Esse é o
00:15:24.959 conceito de rotina vou receber um valor inteiro e vou retornar no valor
00:15:31.279 inteiro isso por O Retorno de fatorial de n vai ser jogado em f f é uma
00:15:36.720 variável inteira vamos fazer o corpo da função aqui não se
00:15:43.639 esqueça de criar sempre o corpo das estruturas assim que você escrevê-las e vamos fazer o seguinte dentro da minha
00:15:50.480 função eu vou ter uma variável que é um contador do tipo
00:15:55.720 inteiro esse meu contador vai ser usado na variável de controle de uma estrutura
00:16:00.759 de repetição com teste de variável de controle vai de 1 até V que é o valor
00:16:07.120 que eu quero fatorial vou criar também dentro das
00:16:14.199 variáveis um resultado que vai ser
00:16:20.120 inteiro declarar essa variável R na mesma linha né fica mais
00:16:25.759 fácil vou fazer com que r receba R vees C começando R com 1 para
00:16:35.079 não estragar a multiplicação isso vai fazer com que o fatorial seja criado no
00:16:40.279 final retorne R para retornar o valor do fatorial vamos executar fatorial de 5
00:16:48.480 que é 120 fatorial de 3 que é se vamos fazer a
00:16:55.079 repetição utilizando o passo a passo do visual Começando o meu programa ele vai criar
00:17:01.480 as variáveis n e f que são do escopo Global isso é vão funcionar durante todo
00:17:07.880 o meu programa que foi exatamente o que eu selecionei aqui continuando ele foi pro início do
00:17:14.919 programa vai escrever digite um número vai solicitar vou digitar três
00:17:20.720 pressionar enter F vai receber o fatorial de n então ele vai chamar a função fatorial
00:17:27.760 então ção Vai ser desviada lá para cima e agora eu vou criar c e r note aqui que
00:17:34.799 a variável de retorno V que é o parâmetro c e r que são variáveis locais
00:17:40.400 Todas estão com escopo fatorial isso é um escopo local eu tenho as variáveis
00:17:45.760 com escopo global que são n f nesse caso aqui v c e r tem escopo local Então vão
00:17:53.520 funcionar somente nessa área que eu selecionei lembrando que na aula passada eu expliquei mais mais detalhadamente o
00:17:59.360 que quer Esopo vamos continuar e aqui ele vai fazer com que R receba 1 e vai
00:18:04.600 fazer o c variar de 1 até v e calcular o fatorial então R aqui que está valendo 1
00:18:10.400 vai receber 1 ve 1 vai continuar com 1 volta agora ele vai com o c valendo 2 1
00:18:17.799 x 2 o r foi para 2 volta mais uma vez
00:18:22.840 vai até V que é 3 então ele vai fazer 3 x 2 que é
00:18:29.480 se agora mais uma interação o c Valeria 4 então ele não pode ele vai estourar e
00:18:36.240 vai retornar R que é o fatorial de 3 então R está com o valor do fatorial de
00:18:42.320 3 que é 6 e o meu valor de retorno também está para 6 vamos retornar o valor então o valor
00:18:50.559 de F é 6 note agora que eu não tenho mais as variáveis locais isso porque eu
00:18:56.280 não estou mais dentro da função esse conceito de escopo como eu disse anteriormente foi melhor visto na aula
00:19:02.159 12 caso você tenha dúvida dê uma olhadinha lá por fim mostrei o resultado
00:19:08.200 E meu algoritmo foi encerrado e outra coisa que funciona normalmente com as funções assim como nos procedimentos são
00:19:14.640 as passagens de parâmetros por valor e por referência vamos dar uma relembrada dando uma olhada na da aula passada O
00:19:21.320 que foi feito para calcular uma série Fibonacci utilizando procedimentos Então vamos ver agora a passagem de parâmetros
00:19:27.720 que funciona por valor e por referência também utilizando funções na aula
00:19:32.880 passada nós vimos esse algoritmo para cálculo da série de fibon utilizando procedimentos alterar essa rotina para
00:19:39.360 utilizar função é muito simples eu simplesmente vou retirar essa palavra procedimento vou mudar para função tem
00:19:46.280 que ter o valor de retorno que vai ser inteiro vou tirar o fim do procedimento vai ser o fim da
00:19:52.799 função e aqui vou fazer com que T3 receba o próximo Fibonacci note aqui
00:20:01.600 que eu estou utilizando a passagem de valor por referência todos os outros exercícios que nós fizemos nessa aula
00:20:08.039 até agora foram passagens de parâmetro por valor isso é não fazem uma referência à variável original colocando
00:20:14.440 o var na frente dos parâmetros fazemos com que haja uma passagem de parâmetros por referência então vou fazer aqui com
00:20:22.039 que N3 recebe N1 mais n2 que são os parâmetros N1 recebe n2 n2 recebe N3 e
00:20:27.559 retorna N3 que no caso ele faz com que T3 receba
00:20:33.679 o próximo Fibonacci Escreva na tela T3 lembre-se que ao utilizar função o ideal
00:20:39.919 é que você não escreva nada dentro do corpo da função e sim retorne para algoritmo principal para que ele possa
00:20:45.440 escrever da maneira que achar melhor vamos executar botar só um escrevar l
00:20:51.840 aqui e aqui eu tenho a série de Fibonacci calculada por uma função e não
00:20:57.799 por um procedimento utilizando a passagem de valor por referência vamos executar o passo a
00:21:04.320 passo só que eu vou fazer o passo a passo do terceiro termo ao quinto
00:21:11.640 termo parar o algoritmo até o quinto vamos
00:21:19.279 executar começou o meu procedimento ele vai criar as variáveis
00:21:25.720 I T1 T2 e T3
00:21:30.799 e vai pular a função vai começar T1 com z0 vai escrever zero T2 com 1 vai
00:21:37.799 escrever T2 e vai começar o i de 3 até 5 começou de três porque os dois primeiros
00:21:43.880 termos Eu já escrevi Então vou começar do terceiro termo e vou até o quinto
00:21:49.000 próxima linha vai fazer a chamada função T3 recebe o próximo Fibonacci passando como parâmetro o primeiro e o segundo
00:21:55.640 termo que são zero e 1 então ele vai passar pra função Então eu tenho aqui T3 que é a
00:22:03.640 variável Global temos as outras variáveis na parte de cima temos as variáveis I T1 e T2 e T3 que são globais
00:22:12.159 abaixo delas temos todas as variáveis locais Inclusive a que eu vou criar agora o N3 então eu tenho o valor de
00:22:20.480 retorno N1 que está relacionado a T1 n2 que está relacionado a T2 e o N3 que vai
00:22:26.919 ser o valor de retorno N3 recebe N1 + n2 o N1 tá com 0 o n2 tá
00:22:33.000 com 1 então 0 mais 1 é 1 vou fazer com que o N1 receba n2 então N1 vai passar a
00:22:41.520 valer 1 vou passar fazer com que n2 vale L3 que também é 1 ele vai retornar N3
00:22:48.559 então ele vai retornar o valor 1 então note lá em cima o valor de retorno agora é um então ele vai retornar e vai jogar
00:22:54.720 um na variável T3 quando eu pressionar aqui ele vai sumir todas as variáveis
00:23:00.039 locais fique de olho na parte de baixo da tela sumiram Agora eu tenho somente
00:23:05.919 T1 T2 e T3 vou escrever o valor de
00:23:12.080 T3 escrever o 1 na tela fim para quando
00:23:17.120 ele voltar para lá vai virar qu a variável i passou para qu e agora nós
00:23:23.120 vamos de novo chamar o próximo Fibonacci
00:23:28.840 Vamos repetir o procedimento ele vai somar o valor de retorno dessa vez será
00:23:34.360 2 então ele vai mostrar dois na tela e mais uma vez vai voltar vai chamar o
00:23:40.919 próximo Fibonacci pela última vez já que agora é a quinta vez que eu estou
00:23:45.960 fazendo ele vai fazer o mesmo procedimento somou retornou dessa vez o
00:23:52.840 valor 3 então o valor 3 vai ser jogado para dentro da variável T3
00:23:58.400 então a variável T3 agora está com três eu mostro três na última vez no fim para
00:24:04.279 ele vai executar agora já que o valor da variável i já está com c ele vai
00:24:10.960 finalizar o programa e aqui está uma série Fibonacci
00:24:17.679 composta de cinco termos e mais uma vez eu digo se por acaso você tiver tendo alguma dificuldade para compreender isso
00:24:24.440 eu recomendo fortemente que você assista de novo a aula 12 e a aula 13 logo na sequência e eu tenho certeza que você
00:24:30.880 vai entender melhor outra coisa que você precisa fazer é praticar não existe aprendizado em algoritmo sem prática não
00:24:37.440 adianta você assistir esse vídeo você só vai se frustrar porque você não vai conseguir fazer logo em seguida Então
00:24:42.799 você tem que Pausar a aula executar as rotinas testar baixar os arquivos então
00:24:48.320 ó aqui ó cursoemvideo.com você vai poder baixar os arquivos os pacotes por aula
00:24:54.120 então você vai lá na aula 13 vai na aula 12 na aula 13 baixa os pacote com os exercícios da aula dá uma olhadinha Mas
00:25:00.440 faça o seu não baixe o pacote olhe e considere que você aprendeu o ideal na
00:25:05.720 hora de aprender algoritmos é praticar é digitar é exercitar vamos ao último
00:25:11.200 conceito dessa aula que são algumas funções que já vem prontas dentro do visualg e que eu vou mostrar que são
00:25:16.240 muito interessantes para você o próximo passo dessa aula é ver algumas funções prontas e existem no visualg uma série
00:25:22.640 de funções prontas para tratamento de valores de caractére vamos entender melhor como funciona isso toda linguagem
00:25:30.000 de programação ela permite a crição de funções personalizadas mas a maioria das linguagens já vem também com algumas
00:25:36.320 funções já pré-definidas o Java é um exemplo de linguagem que vem com uma série de funções já pré-definidas dentro
00:25:42.559 das suas bibliotecas no caso do visualg Existem algumas funções de tratamento de string vamos ver como que funciona isso
00:25:49.200 vendo um exemplo prático e como se aplica cada função a cada situação Vamos considerar aqui que eu tenho uma
00:25:55.080 variável string chamada site dentro dessa variável string chamada site eu coloquei um valor string curso
00:26:02.000 em vídeo o valor entre aspas é meramente para eu mostrar que ele é um string ou
00:26:07.679 cadeia de caracteres e as aspas não serão consideradas em nenhum dos exemplos a partir daqui a primeira
00:26:13.279 função que veremos é a função compr Se eu colocar compr esse site que é a
00:26:18.840 variável caractere compre é de comprimento então ele vai me dizer qual é o comprimento da variável site se você
00:26:26.360 contar aí dentro da variável site existem 12 letras que compõem a frase
00:26:31.440 curso em vídeo logo comprimento de site vai te retornar 12 outra função interna
00:26:37.840 é a cópia essa variável cópia ela recebe três parâmetros O primeiro é a variável
00:26:44.440 caractere no meu caso ali é o site O segundo é um número que indica em que letra eu vou começar a contar no nosso
00:26:51.640 caso aí c é a primeira letra u é a segunda R é a terceira s qua o é a qua e
00:27:00.120 é a sexta então eu comear da sex letra ele vaiar na letra e o Tero parmetro é um outroo que indica
00:27:08.919 quantas cas eu mostar no Meo ali mostar dois então vai comear na se letra que
00:27:15.080 letra e e vai mostrar então vai mostar naa e e m a terceir função é ausk que
00:27:23.000 ela vai fazer com que toda essa string seja colocada em letras maiúsculas
00:27:28.039 em seguida vamos ver a função minusc que faz o contrário joga todas as letras para
00:27:33.760 minúsculas importante dizer que as funções maiusc e menus não funcionam para variáveis caracteres dentro do
00:27:40.399 visualg a próxima função é a função pós essa função indica a posição de
00:27:46.640 determinada string ou letra dentro de uma string maior no meu caso aqui eu
00:27:51.760 tenho pós vídeo site O que que ele vai fazer ele vai procurar a palavra vídeo dentro da var S eu tenho a palavra vídeo
00:27:59.640 dentro da variável site e ele vai me dizer que ele está na posição o então vídeo começa Na oitava letra da variável
00:28:07.760 site por fim as últimas duas a função Ask ela me dá o código de cada letra
00:28:13.960 Você deve saber que cada vez que você pressiona uma tecla no seu teclado O que é passado pro computador não é uma letra
00:28:20.480 e sim um número a letra c é correspondente ao número 67 existe
00:28:25.640 também a função kak ess função kak faz o contrário da função ASC você passa o
00:28:30.880 código que é 67 por exemplo e ele vai te retornar a letra correspondente a ele
00:28:36.320 ficou confuso Então vamos a uma prática que mostra a utilização de todas essas funções num exercício só então a quinta
00:28:43.880 e última prática dessa aula é o analisador de nomes vamos ao visual o
00:28:49.080 que eu vou fazer aqui é criar uma variável n que é de nome do tipo
00:28:54.960 caractere vou pedir que o usuário de digite o nome Leia n e vamos fazer o seguinte
00:29:04.080 vamos escrever na tela primeiro quantas letras tem o nome da pessoa total de letras do seu
00:29:11.679 nome Vamos colocar aqui o comprimento de n
00:29:17.080 executando meu nome é Gustavo total de letras do seu nome é sete então meu nome
00:29:22.720 tem sete letras vamos ver aqui para mostrar meu nome todo em letras maiúsculas seu nome
00:29:30.519 em maiúsculas é maiusc
00:29:37.679 n e ele vai mostrar meu nome todo em maiúsculos o mesmo ocorre com o
00:29:47.840 minusc Ok vamos fazer agora uma forma de
00:29:53.360 pegar a primeira letra do nome por exemplo a primeira
00:29:58.399 letra do seu nome é vamos colocar uma
00:30:04.279 cópia de nome Começando na primeira letra e pegando somente uma
00:30:09.760 Então a primeira letra do seu nome é G de fazer alguns exemplos aqui se eu
00:30:15.320 colocar dois ele vai pegar as duas primeiras letras do meu nome note aqui
00:30:20.840 que ele pegou Gu que são as duas primeiras letras se eu começar da segunda letra pegar três letras ele vai
00:30:28.640 começar do u e vai pegar três letras então ele começou do u e pegou três
00:30:34.880 letras Então essa é a forma de utilizar a função cópia no meu caso aqui vou
00:30:40.039 deixar um e um para pegar a última letra no meu caso aqui do meu
00:30:46.399 nome seria cópia n a sétima letra Vamos pegar uma só então ele funcionaria
00:30:53.799 perfeitamente pro meu nome a última letra é o caso você você queira que essa última letra fique em maiúscula você
00:30:59.399 pode unir duas funções e utilizar maiusc aqui e ele
00:31:07.279 retornaria o o mas essa função tem um problema se por acaso eu digitar o nome
00:31:13.440 Ana ele não mostra a última letra do nome isso porque Ana não tem a sétima letra isso só funcionaria para nomes com
00:31:20.760 sete letras se você raciocinar sete também é o número de letras do nome então a última letra é
00:31:27.679 número de letras do nome então posso usar o comprimento aqui no lugar do Set comprimento do nome para pegar a última
00:31:34.519 letra Independente se for Gustavo ou
00:31:43.039 Ana outra coisa que eu posso fazer é verificar posições de
00:31:48.799 coisas por exemplo tem letra A
00:31:54.799 Nai euer most tem a letra A vou usar o pós letra A que é a string a dentro do
00:32:02.639 nome então eu quero saber a posição da letra A dentro do nome vamos Gustavo
00:32:08.480 Gustavo tem um a na posição zero ele deu um erro aqui porque o a Que Eu Estou
00:32:15.200 verificando é o a maiúsculo e o a que eu botei no meu nome é um a minúsculo vamos resolver isso colocando a maiúscula
00:32:26.080 dele aqui eu tenho o meu nome a letra A na
00:32:31.840 posição 5 é aqui na quinta letra eu tenho uma letra A caso eu esteja fazendo
00:32:38.440 uma busca por uma letra que não existe por exemplo x meu nome não tem letra x então ele vai me retornar a posição Zero
00:32:46.320 Isso indica que a letra não foi encontrada vamos manter o a e por fim
00:32:53.919 vamos fazer o uso das funções o código da letra A é
00:33:03.440 Asque da letra A executando o código da letra A é
00:33:12.279 65 a letra de código 65
00:33:18.600 é carque de
00:33:24.399 65 a letra do código 65 é a letra A para finalizar vou fazer um nome ser
00:33:31.760 escrito de trás para frente Vou criar uma variável c aqui do tipo inteiro vou fazer um para para
00:33:38.320 repetir esse c da última letra que é o comprimento do nome até o primeiro
00:33:46.159 primeira letra e vou fazer um passo menos
00:33:51.880 1 vamos fechar a estrutura e vamos fazer com que ele escreva na na
00:33:57.720 tela uma cópia de n fazer uma cópia do maiúsculo de
00:34:04.840 n começando da letra c e andando apenas uma letra vamos executar meu nome
00:34:12.119 Gustavo ao contrário é o Vuk posso também colocar nome e sobrenome ele vai
00:34:18.879 inverter da mesma maneira viu como é Simples então você pode utilizar as
00:34:24.320 funções pré-definidas do visualg para pular caracteres sem precisar criar funções Note que aqui em todos os casos
00:34:31.879 são como funções só que eu não preciso reescrever o código dessas funções pois Elas já estão incorporadas ao código do
00:34:37.918 visual Eu espero que você tenha entendido o conceito de funções e eu espero que você esteja acompanhando o
00:34:43.199 curso de algoritmo e eu espero de coração que você esteja mostrando essas aulas para todo mundo que você conhece é
00:34:48.679 uma coisa muito difícil de se entender é algoritmo principalmente para iniciantes Então esse projeto é justamente para
00:34:55.320 mostrar para pessoas que não sabem sabem programar que sim é possível aprender uma linguagem de programação partindo do
00:35:01.920 conceito de algoritmo partindo do conceito mais abstrato conceito de lógica de programação ou Portugal e mais
00:35:07.839 uma vez eu queria pedir que você curtisse Nossos Vídeos curtisse a nossa página do Facebook que é facebook.com
00:35:13.640 bar cursos em vídeo e também assinasse o canal do YouTube clicando aqui você faz a assinatura do canal aqui você vai ter
00:35:20.880 uma lista de todas as aulas de algoritmo criadas até aqui e aqui no meio é que o cursoemvideo.com Você vai no seu
00:35:27.480 navegador acessa o site faz a sua inscrição a inscrição é gratuita os cursos até então são todos gratuitos tem
00:35:33.920 cursos de html tem curso de algoritmo tem vários cursos lá disponíveis então acessa o curso em vídeo faz a sua
00:35:39.839 inscrição gratuita inscreva-se no curso dê uma olhada lá cada aula tem um pacote cada aula tem os seus exercícios então
00:35:47.640 estude pratique senta digita pausa o vídeo volta é assim que você vai assistir a aula não é comendo biscoito
00:35:54.520 vendo televisão d o Play e achar que no final você aprendeu algoritmo não é assim ele precisa do meu esforço para
00:36:00.000 fazer a aula mas precisa muito mais do seu esforço para assistir e praticar um
00:36:05.040 grande abraço Bons estudos e até a próxima
