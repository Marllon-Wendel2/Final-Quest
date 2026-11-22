https://www.youtube.com/watch?v=RDrfZ-7WE8c&list=PLHz_AreHm4dmSj0MHol_aoNYCSGFqvfXV&index=3
# tactiq.io free youtube transcript
# Comando de Entrada e Operadores - Curso de Algoritmos #03 - Gustavo Guanabara
# https://www.youtube.com/watch/RDrfZ-7WE8c

00:00:04.940 ♫Musica de abertura♫
00:00:20.660 Olá, seja bem vindo a mais uma aula do seu curso em vídeo de algoritmo
00:00:24.440 O meu nome é Gustavo Ganabara, eu sou seu professor
00:00:26.520 E essa é a terceira aula do seu curso de algoritmo
00:00:28.640 Na primeira aula nós vimos a evolução, a história, o funcionamento e o que é um algoritmo
00:00:33.640 No segundo a gente viu comandos de saída
00:00:36.740 Que são as coisas mais simples
00:00:38.600 E agora a gente vai começar a trabalhar interatividade e operadores aritméticos
00:00:42.720 Então, mais uma vez você precisa baixar o pacote
00:00:45.780 Então, acesse a área do curso de algoritmo, baixe o seu pacote
00:00:49.140 E você vai ter o VisuAlg, vai ter todas as ferramentas que a gente vai utilizar aqui
00:00:52.520 Então vamos partir logo para o conteúdo que a gente tem programado para hoje
00:00:55.660 Então como eu falei, nós vamos começar a trabalhar interatividade
00:00:58.700 Com os nossos comandos de entrada
00:01:00.960 Na aula passada, a gente viu os comandos de saída que são o "Escreva" e o "Escreval"
00:01:05.459 A função dos comandos de saída é exatamente, como o próprio nome diz,  gerar uma saída
00:01:10.040 Mostrar alguma coisa na tela
00:01:11.940 Seguindo esse mesmo raciocínio
00:01:13.540 Um comando de entrada seria uma forma de você entrar com dados no computador
00:01:18.600 Então, o comando de saída vai mostrar alguma coisa pra você, vai mostrar uma saída
00:01:22.320 E o comando de entrada vai solicitar alguma coisa ao usuário que está utilizando o sistema
00:01:27.300 Vamos começar com um exemplo simples, que você vai conseguir até raciocinar
00:01:30.620 Porque a gente viu isso na aula passada
00:01:32.600 Vamos começar com um exemplo simples utilizando apenas atribuições
00:01:36.180 Então eu vou colocar aqui a estrutura básica de um algoritmo que a gente viu na aula passada
00:01:40.180 Então começa com a palavra algoritmo, entre aspas coloca o nome do algoritmo
00:01:43.860 Eu vou chamar de MeuNome e nós temos duas áreas
00:01:45.860 A área de declaração de variáveis, que fica na parte de cima
00:01:48.700 E o corpo do programa que fica entre Inicio e FimAlgoritmo
00:01:52.360 O que nós vamos fazer aqui, é declarar uma variável "nome" do tipo caractere
00:01:57.240 E apenas lembrando, variáveis são espaços na memória que vão guardar valores
00:02:01.760 Nesse caso aqui, eu estou criando uma variável chamada nome
00:02:04.700 E que vai guardar um valor do tipo caractere, então tudo o que estiver entre aspas, pode ser guardado nessa variável
00:02:10.120 E essa vai ser a única variável que nós vamos trabalhar nesse programa bem simples
00:02:13.920 Logo após o inicio eu vou fazer logo uma atribuição
00:02:17.120 Que é "nome" recebe "Gustavo"
00:02:19.820 Apenas lembrando, o símbolo de atribuição é uma representação de uma seta
00:02:23.540 Que é feita com um sinal de menor e um sinal menos sem espaço entre eles
00:02:27.540 Essa linha que você está vendo agora vai ser lida da seguinte maneira
00:02:30.860 Nome recebe Gustavo
00:02:32.820 E a variável "nome" por ser caractere pode receber o valor "Gustavo" entre aspas
00:02:37.820 Em seguida, vou utilizar um comando de saída que é o "escreva"
00:02:41.720 Coloquei lá, escreva, muito prazer, vírgula nome
00:02:45.220 E ai você deve lembrar isso da aula passada
00:02:47.480 Quando eu coloco o "Escreva" e coloco dois valores separados por vírgula
00:02:51.020 Eu estou solicitando que o VisuAlg me mostre duas coisas
00:02:53.840 Primeiro o "Muito prazer" e logo em seguida o conteúdo da variável Nome
00:02:57.480 Então esse é o programa que eu sugeri aqui
00:02:59.900 No meu caso se eu executar esse programa, ele vai escrever "Muito prazer Gustavo" na tela
00:03:04.120 Só que ai nós temos um grande problema
00:03:06.320 Esse programa vai funcionar apenas mostrando "Muito prazer Gustavo"
00:03:10.500 E não, o nome do usuário que está usando o programa
00:03:13.300 Seria ótimo se a gente tivesse uma maneira de perguntar o nome do usuário logo no início do programa
00:03:17.300 Por exemplo, "Qual o seu nome?" ou "Digite aqui seu nome"
00:03:19.540 E ai o usuário digita o nome dele, por exemplo Glaucio, Glaucio o grande amigo Glaucio Cancion
00:03:24.160 Né? Que colabora ai pra caramba com o crescimento do Curso em vídeo
00:03:27.360 Um abração Glaucio, brigadão!
00:03:29.440 Então Glaucio digita o nome dele e vai aparecer "Muito prazer Glaucio"
00:03:32.420 Então essa é a interatividade que a gente vai criar com os comandos de entrada
00:03:36.920 Existe uma maneira de fazer isso, é muito simples e eu vou mostrar pra você como é que se faz agora
00:03:41.680 Então como eu falei, a gente pode ter um comando, sei lá, "Digite seu nome"
00:03:45.500 Que vai ser feito pelo "escreva", que nós já vimos
00:03:47.320 E logo em seguida, eu quero esperar que o usuário digite um nome
00:03:51.060 Pra isso, eu vou utilizar o comando: Leia
00:03:53.820 E o comando "Leia" é exatamente o motivo dessa aula, são os comandos de entrada
00:03:57.980 O Leia é o comando de entrada que a gente vai utilizar por padrão
00:04:00.940 E todas as linguagens de programação possuem comandos de entrada
00:04:04.340 Pra você poder criar interatividades com usuários
00:04:06.800 vamos entender como funciona sintaxe do comando "leia"
00:04:09.180 considerando que ainda existe aquela variável nome dentro do nosso programa
00:04:12.080 o que eu estou mostrando aqui é apena um trecho
00:04:13.800 Então logo depois do Leia
00:04:15.660 Eu vou colocar entre parenteses a variável "Nome"
00:04:18.399 Variável essa que já foi declarada lá em cima no programa
00:04:21.180 vamos entender como funciona esse procedimento do "Leia"
00:04:23.260 voltando pra nossa famosa e conhecida memória
00:04:26.380 aquele armário que eu coloquei na última aula pra vocês.
00:04:28.620 Basicamente,
00:04:29.620 eu tenho a declaração
00:04:30.880 e eu tenho uma variável definida
00:04:32.520 que é minha variável "Nome" do tipo caractere
00:04:34.980 Quando eu utilizo o comando: Leia(Nome)
00:04:37.320 basicamente o cursor vai começar a piscar na tela
00:04:40.020 e o usuário vai poder digitar alguma coisa
00:04:42.680 Por exemplo aqui, vou digitar o nome mais bonito do mundo Gustavo
00:04:46.260 Eu não preciso digitar entre aspas
00:04:48.420 As aspas são somente pra mostrar que isso é uma string
00:04:51.560 Quando eu digito Gustavo e pressiono "Enter"
00:04:53.820 Automaticamente essa string é colocada na variável Nome
00:04:58.200 Deu pra entender ?
00:04:59.120 A instrução "Leia" é muito simples
00:05:00.640 e funciona pra caracteres, pros tipos numéricos de inteiro e real
00:05:03.460 pra qualquer tipo de dado primitivo
00:05:05.200 que exista na linguagem
00:05:06.400 então eu tenho aqui o comando "leia"
00:05:07.940 e uma variável
00:05:08.820 tudo que for digitado pelo usuário
00:05:10.580 vai ser colocado diretamente na variável referida, dentro dos parenteses
00:05:14.620 então agora a gente pode reescrever aquele programa
00:05:17.200 de uma maneira mais interessante
00:05:19.080 vamos colocar aqui
00:05:20.640 a estrutura básica de um algoritimo, a mesma estrutura que vimos anteriormente
00:05:24.180 e vamo definir uma variável: Nome
00:05:26.180 como fizemos anteriormente também
00:05:28.120 a partir de agora, se você se lembra muito bem
00:05:30.400 a primeira coisa que fizemos no algoritimo anterior
00:05:32.400 foi "Nome" recebe "Gustavo"
00:05:34.040 a partir de agora não vai ser isso, porque se não vai funcionar apenas para um nome
00:05:38.320 O que eu vou fazer aqui é colocar um: Escreva ("Digite seu nome:")
00:05:41.000 e logo em seguida um: Leia (Nome)
00:05:43.240 e a partir dai o usuário vai poder digitar o que quiser
00:05:46.400 Por fim
00:05:47.040 Eu vou utilizar mais um comando escreva
00:05:49.060 pra colocar um ("Muito prazer ",
00:05:50.860 e o nome do usuário
00:05:51.780 ficou claro isso, ou ficou um pouco confuso?
00:05:54.160 Se ficou confuso, abra seu VisuAlg
00:05:56.340 pause o vídeo, na tela aonde tem o código que te mostrei
00:05:59.580 digite esse código
00:06:00.720 e aperte F9, pra executar o programa e ver como funciona
00:06:04.200 como é a primeira aula, eu vou mostrar pra você de uma forma mais interativa
00:06:07.500 como vai funcionar tudo aqui
00:06:08.820 então, acompanha comigo, que agora você vai entender
00:06:11.600 vamos colocar aqui na tela
00:06:13.140 um monitor e a memória
00:06:15.280 no canto direito, vamos ver linha a linha
00:06:17.420 como é que o algoritmo funciona
00:06:19.320 primeira linha do nosso algoritmo é o "MeuNome"
00:06:21.620 então, nada vai acontecer na tela e nem na memória
00:06:24.220 logo em seguida, teremos a área de declaração de váriaveis
00:06:27.120 aonde eu vou ter a variável "Nome" do tipo: Caractere
00:06:29.840 automaticamente, nós vamos ter na memória
00:06:32.820 uma definição de uma variável "Nome" do tipo: caractere
00:06:36.080 vamos começar nosso programa e a primeira instrução é: Escreva("Digite seu nome: ")
00:06:40.420 Como o "Escreva" é um comando de saída
00:06:42.600 ele vai mostrar "Digite seu nome: " na tela.
00:06:45.620 O próximo comando, é o: Leia(Nome)
00:06:48.280 a partir dai, o programa vai ficar parado, esperando que o usuário digite alguma coisa
00:06:53.480 vou digitar meu nome: Gustavo
00:06:56.260 e pressionar "Enter".
00:06:57.780 Quando eu pressionar "Enter"
00:06:59.140 automaticamente a String Gustavo será colocada dentro da variável caractere Nome.
00:07:05.460 Então o que nos temos aqui, é a memória do computador, com uma variável chamada nome
00:07:09.800 e o seu conteúdo, Gustavo.
00:07:11.880 O nosso próximo comando, nos vamos ver em duas partes.
00:07:15.540 Primeira parte é: Escreva "Muito prazer "
00:07:18.420 isso vai gerar uma saída "Muito prazer" na tela, e em seguida ele solicita que mostre,
00:07:23.820 logo após o muito prazer o conteúdo da variável nome.
00:07:27.060 Se você olhar no canto direito da tela, na memória, existe o conteúdo da variável nome.
00:07:30.720 Com o conteúdo Gustavo.
00:07:32.400 Logo, ele vai mostrar "Muito prazer Gustavo".
00:07:35.580 Fala a verdade... Ficou fácil agora né?
00:07:37.640 Então se você já é um usuário que já teve aula de algoritmo, com certeza você já sabe isso
00:07:41.640 Mais você também deve lembrar que teve dificuldade quando começou estudar essas coisas
00:07:45.600 Para exemplificar
00:07:46.600 Nós vamos botar a mão na massa agora e fazer um exercício prático
00:07:50.260 Mais antes de partir pro prático
00:07:51.780 Se você percebe ai o meu algoritmo não terminou falta o FIMALGORITMO
00:07:55.720 Agora sim
00:07:56.520 A gente pode partir para prática
00:07:58.140 E a pratica que eu vou sugerir é bem simples e todo professor faz logo no inicio das aulas
00:08:02.300 Eu quero solicitar dois número para o usuário
00:08:04.700 E eu quero mostrar a soma entre eles
00:08:07.140 Então basicamente o que eu quero é como se eu chegasse pra você e falace assim: Fala dois números pra mim?
00:08:10.980 Ai você me fala 3 e 5
00:08:12.640 Ai eu falo para você: A soma entre 3 e 5 é 8
00:08:14.960 É exatamente isso o que eu quero que o nosso programa faça
00:08:17.360 é bem simples, mais não se esquece a gente está no inicio
00:08:20.520 Então o que nós vamos ter que fazer
00:08:21.960 é partir pro VISUALG
00:08:23.860 Vamos lá, então aqui esta o nosso VISUALG aberto
00:08:26.320 Se ele estiver vazio nós vamos colocar exclamação (!) + CONTROL+ ESPAÇO
00:08:29.980 ele vai criar a estrutura básica do meu algoritmo
00:08:32.860 Nós vamos colocar aqui
00:08:34.500 basicamente, eu quero dois números, então eu vou ter duas variáveis
00:08:38.080 vou chamar de "N1" e "N2"
00:08:40.020 Eu posso fazer a declaração de duas variáveis ao mesmo tempo, fazendo assim(como mostra na 3ª linha)
00:08:44.360 Então eu tenho: Variável N1, a variável N2, que são inteiros
00:08:48.840 Primeira coisa que eu vou fazer, é solicitar que o usuário digite os dois números
00:08:53.000 Eu não vou pedir pra ele digitar dois números direto, eu vou pedir primeiro que ele digite um número,
00:08:56.780 E depois que ele digite outro.
00:08:58.140 Eu vou colocar lá: Escreva("Informe um numero: ")
00:09:10.160 Leia(N1)
00:09:13.020 Escreva("Informe outro número: ")
00:09:19.980 Leia(N2)
00:09:22.840 Então aqui, eu fiz dois "Leias" , um Leia pra preencher a variável N1, e outro Leia pra preencher a variável N2
00:09:28.820 Vamos executar, e ver se até aqui, tudo tá funcionando perfeitamente.
00:09:32.420 Então nós abrimos aqui o programa, e a primeira coisa que ele faz, é solicitar: "Informe um numero:"
00:09:38.580 Note aqui, o cursor piscando é efeito do comando Leia, que é exatamente o comando que está sendo executado
00:09:44.200 E você pode ver aqui, pela seta azul
00:09:46.920 Vamos digitar um número: 3.
00:09:49.760 Vou pressionar "Enter"
00:09:51.300 Quando eu pressionar "Enter", automaticamente você vai ver aqui(onde mostra o cursor),
00:09:55.040 Que nós temos a variável N1, do tipo inteiro, com  valor  3, a N2 , é do tipo inteiro e ainda está com o valor 0
00:10:02.940 Mas agora, a seta azul, está exatamente no Leia N2.
00:10:06.520 Tudo que eu digitar aqui, vai ser  colocado diretamente na variável .
00:10:09.920 Então se eu digitar aqui: 5, quando eu pressionar "Enter" você vai perceber que esse 5, vai passar pra variável N2.
00:10:19.040 Que está na representação da memória aqui(onde mostra o cursor)
00:10:21.100 Vou pressionar "Enter", e ele já mostrou o 5 aqui
00:10:25.820 E obviamente, isso acontece por um motivo, você não mandou somar os números,
00:10:29.260 Você não mandou mostrar os números, você simplesmente usou quatro comandos,
00:10:32.880 Um Escreva, um Leia, um Escreva, um Leia. O que ele fez foi exatamente os quatro comandos.
00:10:37.320 Apesar de parecer que sim, os computadores não fazem nada automaticamente.
00:10:40.740 Ele faz automaticamente pra você que é usuário, pra quem é programador, o computador tem que ser
00:10:45.020 Bem mandado, se você tiver 20 passos pra dar, você tem que especificar claramente quais são
00:10:49.480 Esses vinte passos, e cada um dos subpassos dessa rotina.
00:10:53.560 Então vamos completar o nosso programa mandando somar esses dois números e mostrar o resultado
00:10:58.300 Pra finalizar a execução, ou você fecha no botão vermelho, ou aperta a tecla Esc do teclado,
00:11:03.740 e a gente pode dar continuidade.
00:11:05.580 O que eu vou precisar aqui é somar esses dois números.
00:11:08.420 Eu acho que fica claro que a gente tem que fazer N1 + N2
00:11:12.540 E o resultado dessa expressão tem que ser colocado dentro de uma variável.
00:11:16.340 A primeira coisa que eu vou fazer aqui, é colocar uma variável S , pra guardar a soma,
00:11:20.720 E vou fazer aqui, com que S receba o resultado de N1 e N2.
00:11:26.180 Ficou claro? Eu não vou utilizar o comando leia pra ler a soma.
00:11:29.360 Então se eu solicitei dois números pro usuário, eu não vou precisar solicitar qual é a soma deles
00:11:33.540 O computador é capaz de fazer isso.
00:11:35.180 Então, basicamente, duas variáveis vão ser pra ser utilizadas com o comando Leia,
00:11:39.320 pro usuário digitar.
00:11:40.520 A soma o usuário não vai precisar digitar, então eu não tenho Leia (S)
00:11:44.320 Eu vou ter S 
00:11:46.840 Vamos mandar mostrar S. De maneira simples.
00:11:49.680 Da maneira mais simples possível eu vou colocar aqui:
00:11:53.080 Escreva (S)
00:11:55.840 Vamos rodar o programa e ver como ele se comporta.
00:11:59.360 Vou organizar a tela aqui.
00:12:04.940 Pra você conseguir enxergar os dois
00:12:08.100 Então, em primeiro lugar, ele já mostrou "Informe um número".
00:12:11.080 Ele está parado no Leia (N1).
00:12:12.760 Vou digitar 7
00:12:14.460 Pressionando Enter, ele solicita outro numero,
00:12:17.620 Eu vou colocar 3
00:12:19.400 E, logo em seguida, ele vai somar 7 com 3,
00:12:22.640 e vai mostrar na tela o valor 10,
00:12:24.980 que é o resultado de 7 + 3.
00:12:27.800 Simples, não é mesmo?
00:12:29.140 Então vamos tornar só um pouquinho mais interativo, pra mostrar o que seria aquele 10 pro usuário,
00:12:33.040 É a soma entre os valores que ele digitou.
00:12:35.120 Mais uma vez vamos fechar e eu vou alterar aqui esse Escreva
00:12:40.040 vou colocar aqui entre aspas: "A soma é" vírgula S.
00:12:44.640 Importante notar que esse espaço que eu boto depois do E
00:12:47.740 é muito importante por que senão ele vai colar o número da soma na letra E,
00:12:51.980 e esse espaço tem que ser dado dentro das aspas.
00:12:54.520 Vamos executar de novo,
00:12:56.600 Primeiro número, 9. Outro número, 4.
00:12:59.960 A soma é 13
00:13:01.800 E se você quiser criar a coisa mais interativa ainda tendo um pouquinho mais de trabalho,
00:13:05.440 esclarecendo mais o usuário,
00:13:07.300 você pode fazer uma coisa muito interessante.
00:13:09.520 Vamos dar uma melhorada aqui
00:13:11.900 Vou colocar: A soma entre, fecha aspas, vírgula, N1, vírgula, e, vírgula, N2, abre aspas
00:13:21.380 é igual a S.
00:13:24.280 Então percebe o seguinte aqui ó. Esse Escreva ficou gigante.
00:13:27.760 Ele vai mostrar: "A soma entre",
00:13:29.760 logo em seguida, vai me mostrar o conteúdo de N1,
00:13:32.780 logo em seguida, vai me mostrar mais uma string "e",
00:13:35.940 logo após, o conteúdo de N2,
00:13:38.600 em seguida, vai me mostrar, "é igual a",
00:13:41.520 e, por fim, o conteúdo da variável S.
00:13:44.100 E você pode fazer isso normalmente, sem problema nenhum.
00:13:46.980 Um Escreva aceita vários valores dentro de um mesmo comando.
00:13:50.580 Basta separar eles por vírgula.
00:13:52.700 Vamos ver o funcionamento disso e como ele se comporta.
00:13:55.320 Executando mais uma vez o programa.
00:13:57.580 Digite um número: 5
00:14:00.520 depois: 1
00:14:02.480 O que ele vai me mostrar é: "A soma entre 5 e 1 é igual a 6".
00:14:06.860 E você vai concordar comigo que essa saída é muito mais elegante,
00:14:10.620 é muito mais interativa mesmo te dando mais trabalho.
00:14:13.500 Mas o que eu sempre digo pros meus alunos é:
00:14:15.400 Na área de computação, quem tem que ter trabalho é você, programador, e não o usuário.
00:14:20.220 O usuário não tem que adivinhar o que é um número que apareceu na tela do nada.
00:14:23.620 Você, quando usa alguma coisa, quando você acessa um site, e aparece um número do nada,
00:14:27.760 você fica incomodado, você não sabe o resultado.
00:14:30.140 Então porque você, como programador,
00:14:31.960 não se preocupa com a interatividade do seu programa com os seus usuários?
00:14:35.420 Vamos dar continuidade aqui.
00:14:37.040 Então a prática proposta foi essa daqui, o resultado foi alguma coisa semelhante a isso.
00:14:42.120 Então nós temos o algoritmo de valores
00:14:44.260 As três variáveis
00:14:45.400 N1 N2 e S
00:14:46.760 Temos, dois grupos de Escreva e Leia
00:14:49.080 A soma sendo calculada por uma expressão
00:14:51.320 E por fim um comando pra exibir a soma na tela
00:14:54.940 E se você percebeu, nós utilizamos sem eu explicar, o operador mais (+)
00:14:59.340 Esse operador, ele faz a adição entre duas variáveis  ou dois valores
00:15:03.680 O símbolo de adição é universal, então eu não precisei nem explicar
00:15:07.680 Mas nos algorítimos, existem alguns operadores que não são tão símples
00:15:12.000 E por isso nós precisamos estudar os operadores aritiméticos
00:15:15.960 Os operadores suportados pelo visualg e pela maioria das linguagens são:
00:15:21.380 O operador de adição e o de subtração são universais
00:15:25.900 Você utiliza a + para adição e o - para subtração
00:15:30.160 A multiplicação e a divisão são um pouco diferentes
00:15:33.500 A multiplicação e feita por um *
00:15:35.560 E não por um ponto ou por um x
00:15:37.900 A divisão é feita por uma barra inclinada pra direita (/)
00:15:41.360 Se fizermos essa barra inclinada pra esquerda teremos a divisão inteira
00:15:45.600 A exponenciação é feita através do circunflexo (^),  e por fim o símbolo de porcentagem (%) calcula o módulo
00:15:52.960 Pra exemplificar eu criei uma pequena expressão pra cada um dos operadores aritiméticos
00:15:58.240 Vamos considerar pra essa terceira coluna da tabela
00:16:01.600 os valores de A para 5 e B para 2
00:16:05.180 Então em cada uma delas nós vamos fazer
00:16:07.800 Por exemplo na primeira A + B, sendo A valendo 5  e B valendo 2
00:16:12.280 Vamos repetir isso pra todas as linhas dessa tabela
00:16:15.800 A primeira é simples, 5 + 2 = 7
00:16:18.960 A segunda também sengue a mesma linha de raciocínio
00:16:21.200 5 - 2 = 3
00:16:23.260 Em seguida vamos pra multiplicação, 5 x 2 = 10
00:16:26.940 Depois vamos pra divisão, 5 ÷ 2 = 2.5
00:16:30.620 E aqui cabem duas observações importantes
00:16:33.340 2 e 5 são números inteiros, mas dividindo os dois não necessariamente eu vou ter um resultado inteiro
00:16:39.900 Por isso existe o operador de divisão inteira
00:16:42.480 E a segunda observação que eu quero fazer
00:16:44.300 é que dois e meio não é 2,5 como agente tá acostumado aqui no brasil
00:16:48.360 é 2.5 que é o separador de decimais lá nos Estados Unidos
00:16:53.120 A divisão inteira, ela vai pegar exatamente a divisão de A por B que é 2.5, e pegar apenas a parte inteira
00:17:00.620 Isso é A \ B vai dar 2
00:17:04.060 e note que eu não estou do arredondamento, eu estou falando da parte inteira da divisão
00:17:08.079 A exponenciação também é simples
00:17:09.940 o A valendo 5 e o B valendo 2,  5 elevado a 2, da 25
00:17:15.460 Por fim temos a linha de módulo
00:17:17.520 e o módulo também é conhecido como o resto da divisão
00:17:20.700 Vou montar a divisão aqui pra você ver, se vai entender oque que eu estou falando
00:17:24.099 Vamos montar aqui no cantinho direito 5 dividido por 2
00:17:27.940 5 dividido por 2 vai dar 2 e resta 1
00:17:31.560 Esse 2 que está aparecendo com resultado da divisão
00:17:34.160 É exatamente o uso do operador contra barra (\), que é divisão inteira
00:17:38.300 Você pode ver que na coluna da divisão inteira nos temos o 2 como resultado
00:17:43.260 O módulo é exatamente o resto da divisão
00:17:46.460 Então logo abaixo do 5 nós temos o resto da divisão que é 1
00:17:50.680 Já que 2 x 2 são 4 e pra 5 resta 1
00:17:54.300 Esse resto da divisão é exatamente oque o operador de % retorna
00:17:59.340 E nós vamos fazer o uso desse operador daqui a algumas aulas
00:18:02.580 quando agente for estudar estruturas condicionais
00:18:04.920 Então esse são os sete operadores aritméticos que nós temos no visualg
00:18:08.920 e ai vem uma coisa muito importante que você tem que saber
00:18:11.680 a ordem de precedência
00:18:13.500 a ordem de precedência,
00:18:14.920 indica a ordem que os operadores serão considerados dentro de uma mesma expressão
00:18:19.080 sempre que nós tivermos uma expressão aritmética,
00:18:21.540 oque será considerado em primeiro lugar é os parênteses
00:18:25.100 Logo em seguida os operadores de "exponenciação"
00:18:27.860 depois
00:18:28.820 A multiplicação e a divisão
00:18:30.580 e por fim
00:18:31.540 As adições e subtrações
00:18:33.460 vamos ver dois exemplos aqui, que parecem ser semelhantes
00:18:36.800 mais vão ter resultados diferentes
00:18:38.880 Tanto no exemplo de cima quanto no de baixo nó temos 3 + 2 / 2
00:18:43.260 mas no primeiro exercício note que mesmo a "adição" aparecendo antes
00:18:47.780 se você olhar na tabela da esquerda
00:18:49.700 A "multiplicação" e a "divisão" tem uma ordem de precedência maior
00:18:52.960 neste primeiro caso nós vamos fazer primeiro: 2 / 2 que dá 1
00:18:57.860 e somar esse resultado "1" com "3", o que vai me dar o resultado "4"
00:19:03.520 Já no segundo eu tenho os parênteses, indicando que eu quero que a "soma" seja feita primeiro
00:19:09.020 e se você olhar também na tabela da esquerda
00:19:11.140 você vai ver que os "parênteses" tem a maior ordem de precedência de todas
00:19:14.640 então a primeira coisa que vou fazer é somar 3 + 2 que vai dar "5"
00:19:19.280 e depois dividir o resultado por "2", o que vai me resultar em "2.5"(Dois e meio)
00:19:23.900 Ficou claro ?
00:19:25.080 então sempre que você for criar uma expressão
00:19:27.220 utilize os "parênteses" para guiar a ordem de execução das operações de acordo com aquilo que você quer
00:19:32.540 vamos fazer uma alteração naquele nosso programa de somar dois valores
00:19:35.800 para ele calcular a média, e vocês vão ver o que eu estou falando
00:19:38.800 Então nós temos aqui o nosso algoritmo, que vai tratar os valores aqui
00:19:42.620 vou modificar o nome da minha variável de "S" para "N"
00:19:45.600 e ficar claro que vou calcular uma média
00:19:48.140 Isso não é obrigatória mais fica uma programação mais limpa
00:19:52.320 então eu tenho aqui um número N1 outro número N2, e vou fazer a média entre esses dois números
00:20:01.320 A média entre esses dois número é N1 + N2 / 2
00:20:04.920 colocar aqui:
00:20:05.760 A média entre N1 e N2 é igual a tanto
00:20:09.220 E se você for esperto e está atento, você vai ver que eu acabei de gerar uma declaração errada aqui
00:20:13.860 eu vou executar porque isso acontece com muita frequência
00:20:16.640 Para usuários iniciantes
00:20:17.980 vamos executar esse programa, eu já estou avisando que ele vai dar erro
00:20:20.960 Mais vamos ver o que vai acontecer, e como solucionar isso
00:20:24.100 Logo de inicio você vai executar o programa, ele vai funcionar normalmente "7" foi o primeiro número
00:20:31.000 "3" para o segundo número
00:20:32.960 Quando eu pressionar ENTER ele vai somar "7" com "3" que vai dar "10"
00:20:37.320 e dividir por " / 2" que vai dar "5"
00:20:39.520 Só que quando pressiono ele me da um mensagem de erro
00:20:42.680 ai você pode pode esta se perguntando "7" com "3" dez, dividido por dois "5"
00:20:46.400 Qual problema nisso eu tenho um número inteiro somado com outro número inteiro
00:20:50.500 divido por "2" resultando em outro número inteiro
00:20:52.940 O grande problema é que quando eu uso o operador de divisão
00:20:56.040 automaticamente a linguagem não trabalha mais com valores inteiros
00:20:59.620 e sim apenas com valores REAIS
00:21:01.720 Nós vamos solucionar isso de uma maneira muito simples, declarando EME (M) como um número REAL
00:21:07.060 então vamos clicar aqui em terminar
00:21:09.560 Ele vai me dizer aqui que o erro foi atribuição de valores da variável EME (M)
00:21:14.300 e me indicou que existe um problema de tipo de REAL para INTEIRO
00:21:18.560 Vamos clicar em OK
00:21:19.600 Ele deixa marcado a linha onde ele detectou o erro
00:21:23.000 As vezes o erro não esta nessa linha que ele marcar, e sim na linha anterior
00:21:27.060 Mais fique de olho, neste caso ele acertou
00:21:29.660 Vou tirar a variável EME (M) de INTEIRO
00:21:31.960 Vou declarar em baixo EME (M) como sendo uma variável REAL
00:21:35.920 Lembrando
00:21:36.820 Números REAIS são aqueles números que tem a parte decimal, isso é que tem a VIRGULA (,) ou ponto flutuante
00:21:42.760 Vamos executar novamente
00:21:44.280 Vamos colocar "7" e "3"
00:21:49.180 Ele deu um erro aqui
00:21:50.900 eu ainda estou utilizando a variável "S" aqui no final
00:21:53.200 Obviamente tem que modificar para EME (M)
00:21:57.280 mais uma vez "7" e "3"
00:21:59.140 E agora ele colocou, a média entre "7" e "3" é igual a "5"
00:22:03.220 Fazer um outro exemplo aqui
00:22:06.320 "9" e "7" média "8"
00:22:09.300 vamos fazer um número para dar REAL, "2" e "3" média (2.5) dois e meio
00:22:15.560 Deu para entender ? E agora vou fazer uma alteração retirando os parenteses da  expressão
00:22:20.400 e vocês vão ver que realmente o resultado vai dar errado
00:22:23.480 Vou vir aqui na expressão e vou tirar os parenteses de N1 e N2
00:22:28.240 Vamos executar, vamos colocar os mesmo valores que colocamos no inicio "7" e "3"
00:22:32.640 "7" e "3" vai dar "10" (/2) dividido por dois "5"
00:22:36.040 Se eu apertar ENTER ele vai me dar (8.5) oito e meio
00:22:39.320 Isso acontece por um motivo simples o que ele faz é primeiro colocar (3 / 2) três divido por dois
00:22:45.260 Que vai dar (1.5) um e meio, e esse (1.5) um e meio vai ser somado com "7" resultando em (8.5) oito e meio
00:22:50.580 E isso acontece graças a ordem de precedência.
00:22:53.860 Que isso não é exclusividade dos algoritmos, isso é uma questão matemática
00:22:57.740 E por falar em matemática, aritmética essa coisa toda que você não pode ter medo disso
00:23:02.440 O VISUALG possui algumas funções para tratamento aritmético dos números
00:23:06.940 Vamos ver alguns deles:
00:23:08.740 Algumas funções aritméticas que existem no VISUALG são:
00:23:12.140 ABS que é para valor absoluto
00:23:14.640 EXP para exponenciação
00:23:16.980 INT para valor INTEIRO
00:23:18.720 RAIZQ para raiz quadrada
00:23:20.880 PI para retornar o valor de PI
00:23:23.580 (SEN) seno, (COS) cosseno e (TAN) tangente
00:23:27.040 ambos para valores em RADIANOS
00:23:29.080 Mas como nós estamos acostumados a tratar SENO, COSSENO e TANGENTE com valores em GRAUS
00:23:33.960 existe também uma função (GRAUPRAD) GRAU para RADIANO
00:23:37.800 Que é o GRAU-P-RAD, que é GRAU para RADIANOS
00:23:42.100 de forma análoga eu criei uma coluna aqui com vários exemplos para gente poder trabalhar com eles
00:23:47.360 ABS é o valor absoluto
00:23:49.840 Então por exemplo se eu colocar ABS de "-10" ele vai me retornar o valor "10" que é o valor absoluto
00:23:55.820 É o valor sem o sinal
00:23:57.980 A exponenciação precisa de dois parâmetros
00:24:00.680 o que eu estou colocando ali não é a exponenciação de (3,2) três vírgula dois
00:24:04.260 Até porque números REAIS são representados por ponto
00:24:07.200 O que eu estou dizendo ali é que eu quero  "3" expoente "2", (3²) três ao quadrado "9"
00:24:13.180 você pode utilizar a função EXP
00:24:15.800 Ou o operador de circunflexo que nós vimos anteriormente
00:24:19.420 A função INT vai retornar a parte inteira de um número
00:24:22.260 Por exemplo ali, eu coloquei INT de (3.9)
00:24:25.140 "3.9" é um número REAL o que ele vai fazer é me retornar apenas a parte inteira que é "3"
00:24:30.680 Note! Que eu não falei em arredondamento
00:24:33.040 Falei apenas em parte inteira
00:24:35.420 RAIZQ vai retornar a raiz quadrada de um  número, então se eu colocar lá RAIZQ de "25"
00:24:40.540 É 5.
00:24:42.000 Sempre que eu utilizar Pi sem parênteses nenhum,
00:24:45.040 ele vai me retornar sempre o número Pi: 3.1415... alguma coisa.
00:24:49.660 As funções Seno, Cosseno e Tangente, são as mesmas utilizadas pela matemática.
00:24:54.460 0.523 é aproximadamente em radianos o que nós temos os 30 graus.
00:25:00.000 Sendo assim, Seno de 30 é 0.5.
00:25:03.120 Cosseno de 30 é Raiz de 3 sobre 2.
00:25:06.180 E tangente de 30 é Raiz de 3 sobre 3
00:25:09.600 Se você quiser saber quanto dá em Radianos uma determinada medida em Graus,
00:25:14.340 você pode utilizar, por exemplo, Grau para Radianos de 30.
00:25:18.500 Ele vai me retornar o 0.523,
00:25:21.340 que nós estamos utilizando nos exemplos de cima.
00:25:23.720 Eu queria aqui te pedir um grande favor:
00:25:25.700 Não se assuste com a quantidade de números, expressões
00:25:29.340 e termos utilizados na matemática. A matemática tá na nossa vida,
00:25:32.780 a gente tem uma tendência a ter medo dela de forma errada
00:25:36.080 Vou mostrar aqui pra vocês alguns usos dessas funções que a gente acabou de ver
00:25:39.980 dentro de um algoritmo.
00:25:41.320 Não se esqueça de manter sempre o seu VisuAlg aberto e praticar tudo aquilo que a gente tá fazendo
00:25:46.720 Mais uma vez eu digo: Não se aprende nada na vida sem praticar.
00:25:50.560 Vou iniciar um programa novo.
00:25:52.780 Vou apagar, Exclamação, Ctrl + Espaço,
00:25:56.860 Vou criar uma variável A do tipo Inteiro
00:26:00.140 Vou fazer com que A receba, por exemplo,
00:26:03.640 Abs de -50
00:26:07.060 Logo em seguida, Escreva A
00:26:11.620 Essa atribuição, quando eu executar ele vai me mostrar o valor 50,
00:26:15.700 que é o valor absoluto de -50.
00:26:18.180 Vamos fazer um exemplo aqui de Exponencial.
00:26:22.280 Vamos exponenciar aqui 9 à 5ª potência ,
00:26:26.260 vou mudar aqui de Inteiro pra Real, pra ele não dar problema com números grandes.
00:26:32.160 59.049 é 9 à 5ª potência.
00:26:36.860 Vamos utilizar, por exemplo, aqui, Raiz Quadrada.
00:26:40.840 Quanto é a Raiz Quadrada de 81?
00:26:44.120 Nove!
00:26:46.440 E eu posso também juntar várias expressões como, por exemplo,
00:26:50.960 Eu posso colocar aqui, qual é a Raiz Quadrada de 90
00:26:55.000 Raiz Quadrada de 90 é 9.48... mas eu quero só a parte inteira dessa
00:27:00.220 então eu coloco tudo isso entre parênteses,
00:27:03.540 e utilizo somente a parte inteira.
00:27:06.540 Então, qual é a parte inteira da Raiz de 90?
00:27:10.500 Apenas nove.
00:27:11.640 Posso, também,
00:27:13.340 vamos colocar aqui
00:27:15.820 Conversão de Graus para Radianos de 90 graus
00:27:26.060 Executando: 90 graus para radiano é 1.5707 aproximadamente.
00:27:33.000 Se eu quiser, eu posso colocar qual será o Seno de 90.
00:27:38.060 Então, eu converto 90 pra radianos, e informo isso pra função de Seno,
00:27:44.020 que só aceita valores em radianos
00:27:46.320 E, se você lembra bem daquele círculo lá da matemática, o Seno de 90 é 1.
00:27:51.080 Executando: O resultado do Seno de 90 é 1.
00:27:55.900 Ficou claro? Então agora você tem ferramentas pra brincar com o que você quiser.
00:28:00.160 Quer ver um exemplo? Vamos criar aqui:
00:28:02.140 Então eu to aqui com um programa novo, e eu vou chamar aqui de "Conversor".
00:28:09.040 Vou pedir um angulo, que vai ser Real, e eu vou ter uma variável S também que é pro Seno do angulo
00:28:15.400 E eu vou colocar na tela: Escreva (" Informe um angulo").
00:28:24.840 Leia (angulo).
00:28:28.580 O S vai ser, exatamente,
00:28:31.880 o Seno desse angulo convertido de Grau para Radianos
00:28:41.640 Por fim,
00:28:45.680 Escreva ("O Seno de ", angulo, " é igual a ", S).
00:29:00.520 Pause a sua vídeo-aula, digite isso no VisuAlg e, logo em seguida, execute o programa.
00:29:06.760 Eu vou executar o meu aqui.
00:29:09.160 Vamos colocar: Informe um angulo, 90. O Seno de 90 é igual a 1.
00:29:15.060 Vou executar novamente: 30. O Seno de 30 é 0.5.
00:29:21.080 Deu pra entender? E com isso você pode fazer qualquer coisa
00:29:23.880 Por exemplo fórmula de Bhaskara, cálculo de área de retângulo
00:29:27.380 Área de triângulo, oque você quiser!
00:29:29.680 Agora você conhece os operadores aritméticos e uma série de funções aritméticas dentro do visualg
00:29:35.300 E a unica maneira de aprender é praticando!
00:29:37.620 Então a partir de agora agente está encerrando a aula, mas você tem muito trabalho aqui no visualg
00:29:41.900 Inventa qualquer coisa, pede para o usuário digitar qualquer informação
00:29:45.780 Execute uma expressão qualquer e veja o resultado
00:29:48.580 Não se esqueça de treinar o uso parênteses, o uso de operadores, o uso de funções aritméticas
00:29:53.380 O uso do comando "LEIA", e também o uso de variáveis e seus tipos primitivos
00:29:57.920 Na próxima aula agente vai dar continuidade com formatação de números
00:30:01.820 Alguns outros operadores que são os operadores relacionais e os operadores lógicos
00:30:05.640 E você vai continuar sua caminhada para se tornar um grande programador!
00:30:10.420 Mais uma vez, eu queria convidar você a assinar o canal do CURSO EM VÍDEO
00:30:14.480 Clicando sobre esse botão
00:30:15.980 Você vai ter acesso a todas as aulas
00:30:17.680 Lá no botão assinar, do lado tem uma "engrenagenzinha"
00:30:20.180 Você pode marcar "Quero receber e-mails sempre que sair uma video aula nova"
00:30:23.560 Pode colocar lá, agente só coloca vídeo aula de qualidade
00:30:26.560 Você vai ser avisado por e-mail, não vai perder nenhuma aula
00:30:29.520 Clicando aqui você vai ter acesso a todas as aulas
00:30:32.080 Apenas do curso de algoritmo
00:30:34.120 Então clicando aqui você vai ter a playlist certinha
00:30:37.280 De todas as aulas que agente lançou até agora
00:30:39.280 Essa é a terceira
00:30:40.140 Mas pode ser que você tenha chegado e ja tenha o curso completo de algorítimo aí pra você
00:30:43.940 Assim como nesse momento já existe o curso completo de HTML5
00:30:47.720 Pra você poder criar sites
00:30:49.160 E isso tudo você vai encontrar onde? www.cursoemvideo.com
00:30:53.780 Lá você vai ver todos os cursos que estão sendo criados por nossa equipe
00:30:57.560 Com qualidade e de graça!
00:30:59.760 Você não vai poder ser cobrado de nada em relação as aulas do curso em vídeo
00:31:04.200 Agente pode eventualmente vender algum produto
00:31:06.200 DVD, camiseta, alguma coisa
00:31:08.240 Mas os seus pacotes são gratuitos, as suas aulas são gratuitas!
00:31:11.560 Você só ajuda agente se quiser
00:31:13.820 Então queria mandar um abraço pra todo mundo
00:31:16.080 Pra todo mundo que está compartilhando, pra todo mundo que está agradecendo
00:31:19.000 Os elogios são muito importantes, continuem elogiando
00:31:22.060 Continuem tirando suas dúvidas no nosso canal do facebook
00:31:25.380 Nos nossos comentários, entrando em contato diretamente comigo pra quem me conhece
00:31:29.440 Então mantenha seus estudos em dia
00:31:31.860 Estudar é muito importante
00:31:33.480 Eu quero encontrar você em qualquer lugar aí
00:31:35.600 Em evento, pela rua, em qualquer lugar
00:31:37.740 E você falar: "Olha hoje eu sei programar por sua causa, muito obrigado!"
00:31:41.380 E eu vou ficar muito feliz e muito orgulhoso por isso
00:31:43.900 Um grande abraço, bons estudos, até a próxima aula!
