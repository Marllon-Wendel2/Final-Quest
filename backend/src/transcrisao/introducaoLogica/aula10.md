https://www.youtube.com/watch?v=fP49L1i_-HU&list=PLHz_AreHm4dmSj0MHol_aoNYCSGFqvfXV&index=11

# tactiq.io free youtube transcript
# No title found
# https://www.youtube.com/watch/fP49L1i_-HU

00:00:04.980 ♫ Música de apresentação ♫
00:00:20.840 Olá, seja bem vindo a mais uma aula do seu Curso de Algoritmo
00:00:23.840 o meu nome é Gustavo Guanabara eu sou seu professor
00:00:26.120 e agora nós vamos à segunda parte da aula de estruturas
00:00:28.320 de repetição.
00:00:29.540 Na aula passada se você se lembra muito bem,
00:00:31.540 que foi a aula nove, a gente viu a estrutura enquanto
00:00:34.540 que foi a primeira estrutura de repetição que a gente abordou.
00:00:36.940 E agora , a gente vai partir pra segunda
00:00:38.920 e você pode me perguntar...poxa, mas se eu já aprendi uma
00:00:41.060 para que vou aprender outra?
00:00:42.380 Na verdade a gente vai aprender três e cada uma serve para uma situação diferente
00:00:45.700 vou tentar exemplificar isso para vocês.
00:00:47.920 Bem , como eu disse essa é a segunda parte da aula de estrutura de repetição,
00:00:52.000 e agora , nós vamos ver o comando repita.
00:00:54.000 Vamos ver a estrutura dele.
00:00:55.820 Repita um bloco, até que a expressão ocorra.
00:00:58.200 E o modo de funcionamento da função "Repita", é bem semelhante ao moda de funcionamento do "Escolha"...
00:01:02.660 só que a expressão ela é logicamente inversa.
00:01:05.940 A gente vai entender já já como é que funciona.
00:01:07.980 Vamos primeiro dar uma olhada em um exemplo, que a gente já fez na aula passada
00:01:11.680 com o "Enquanto" e vamos altera-lo pro "Repita"
00:01:14.420 e vamos ver qual a utilidade principal dessa estrutura.
00:01:17.360 Então eu coloquei aqui já um algoritmo para somar cinco números.
00:01:21.460 Então eu recomendo que você dê uma pausa nesse vídeo
00:01:23.580 e analise com mais calma, a gente vai analisar aqui rapidamente.
00:01:26.560 Então tem uma variável pra soma
00:01:28.600 ela vai somar os números.
00:01:30.220 Um contador que vai começar em 1 e vai até 5.
00:01:33.160 Enquanto o meu contador for menor ou igual a 5
00:01:35.420 ele vai somando mais 1 no contador.
00:01:37.980 Então, a estrutura de repetição ela vai ocorrer
00:01:40.500 Começando em 1 e terminando em 5
00:01:42.600 Então isso aqui vai acontecer 5 vezes.
00:01:44.280 O que vai acontecer 5 vezes?
00:01:46.100 Ele vai ler um número
00:01:47.720 E vai somar, acumular esse número na variável S.
00:01:51.240 No final ele vai mostrar a variável S com a soma.
00:01:54.380 Vamos ver funcionando só para você compreender melhor.
00:01:58.020 Ele vai pedir qual o primeiro valor, 1, segundo, 3.
00:02:01.240 Eu falei 3 e digitei 4. =P
00:02:02.880 ♪ ♫ ♩ ♫ ♭ ♪
00:02:03.480 7, 3, 2.
00:02:05.800 Entre 1... e aí a soma entre 1, 4, 7, 3 e 2 dá 17.
00:02:11.080 Essa é a estrutura.
00:02:12.640 E isso vai ocorrer, como a gente viu, 5 vezes.
00:02:15.100 E se você ainda está com duvida estrutura de repetição "Enquanto"
00:02:17.860 Volta na aula anterior
00:02:19.420 Assiste ela de novo
00:02:20.620 Exercita, vai lá no site do Curso em Vídeo, aqui ó
00:02:23.840 cursoemvideo.com
00:02:25.280 Você vai lá, faz a inscrição no seu curso
00:02:27.640 Você vai ter o acesso a aula 9
00:02:29.360 Na aula 9 você vai ter acesso aos algoritmos, na lateral
00:02:32.840 Os algoritmos você não tem acesso no Youtube
00:02:35.340 Então se você está assistindo no Youtube
00:02:37.340 Corre lá no site Cursoemvideo.com
00:02:39.340 Da uma olhadinha nas aulas
00:02:40.480 Porque junto com a aula tem os exercícios
00:02:43.080 Então é uma experiência muito mais enriquecedora.
00:02:45.440 E o cadastro é simples
00:02:46.300 Você vai lá, se cadastra, é tudo gratuito.
00:02:48.420 Vai lá, se cadastra, se inscreve no curso.
00:02:49.800 Fala: "Quero me inscrever no curso de algoritmo".
00:02:52.160 E você vai ter acesso a todas as aulas
00:02:54.120 E aos exercícios referidos.
00:02:55.540 E aí eu quero propor uma mudança nesse algoritmo.
00:02:58.000 Eu fiz para 5 números
00:02:59.140 Se eu quisesse fazer para 10 era só alterar o 5 para 10.
00:03:01.560 Mas eu não sei quanto eu quero fazer
00:03:03.400 Eu vou deixar o usuário escolher quanto ele vai quer fazer
00:03:06.180 Então, eu vou adicionar uma pergunta... vocês vão entender o que eu vou fazer aqui.
00:03:10.040 Então voltando ao algoritmo aqui
00:03:12.300 Eu vou remover todas as referências ao contador
00:03:14.860 Porque agora eu não quero mais um contador
00:03:17.240 Eu não vou contar quantas vezes porque eu não quero 5 vezes
00:03:20.820 Então vou eliminar o contador aqui
00:03:22.520 Obviamente vou ter que eliminar a minha expressão do "Enquanto"
00:03:26.100 Vamos fazer o seguinte
00:03:28.080 Vou criar uma variável "resp" de Resposta
00:03:30.760 Que vai ser caractere
00:03:32.920 Vou botar aqui ó
00:03:34.960 Enquanto a minha Resposta
00:03:37.380 For igual a Sim
00:03:39.640 Ele vai somar e vai perguntar, ó
00:03:43.980 "Você quer continuar?"
00:03:46.460 Vou botar assim "S/N"
00:03:49.240 Só pro usuário saber o que ele tem que digitar.
00:03:51.500 e vou ler, a minha resposta.
00:03:54.740 Quando eu executar, ele já termina o programa
00:03:58.580 Isso porque eu fiz o 'Enquanto (resp = "S")'
00:04:01.560 E esse problema ocorre porque a primeira coisa que ele faz é testar a resposta
00:04:05.560 e eu nem dei a resposta ainda
00:04:07.260 Para isso eu vou fazer uma gambiarra aqui,
00:04:09.320 e vou, jogar a minha resposta
00:04:11.180 valendo "S" logo de cara.
00:04:13.140 Isso é, se o usuário começou a executar o programa
00:04:15.620 a primeira resposta obviamente é sim, quer continuar sim.
00:04:18.800 Vamos executar de novo
00:04:20.700 ah ele... esqueci de remover uma referência aqui
00:04:25.000 o "Cont" que não existe mais
00:04:27.520 Vou digitar o valor. Quer continuar? Sim.
00:04:30.980 Vai digitar outro valor. Quer continuar? Sim.
00:04:33.680 Vai digitar outro valor. Quer continuar? Não.
00:04:35.940 Aí ele para, e soma.
00:04:37.500 Ficou claro a diferença né?
00:04:38.900 Então, antes eu estava fazendo 5 interações
00:04:41.360 Agora não sei quantas vão ocorrer
00:04:43.380 Deixo o usuário a selecionar se ele quer ou não respondendo sim ou não
00:04:47.140 E aí a gente teve um pequeno desconforto
00:04:49.200 que foi o uso da palavra resposta que é testado antes de tudo
00:04:52.940 Isso acontece, porque o enquanto é uma estrutura de repetição com teste lógico no início
00:04:57.300 E como o teste lógico foi feito antes de testar a resposta, que é dada no final,
00:05:01.020 isso gerou um desconforto na hora de programar
00:05:03.200 A solução para isso é utilizar uma estrutura onde o teste lógico seja feito no final
00:05:07.740 Isso porque, a primeira vez que você irá fazer, você vai querer fazer de qualquer maneira
00:05:11.600 Então, você quer fazer o teste quando terminar a primeira repetição
00:05:14.880 E não quando começar ela
00:05:16.720 Então o "Repita" é exatamente isso
00:05:18.720 Ele é a opção ao "Enquanto"
00:05:20.720 só que ao invés de fazer o teste no início, ele vai fazer o teste no final
00:05:24.060 Vamos voltar aqui pro quadro, para você entender a diferença
00:05:27.420 Se você se lembra muito bem
00:05:28.860 essa foi a estrutura que a gente tinha na aula passada
00:05:31.860 que é o "Enquanto você não arrumar o seu quarto, você fica de castigo"
00:05:35.100 Esse "Enquanto" ele vai se repetir
00:05:37.360 e somente vai sair quando o "arrumar o quarto" for verdadeiro
00:05:41.260 e aí ele vai pro comando "liberado", que é o último.
00:05:44.560 Reescrevendo essa mesma lógica, utilizando o comando "Repita"
00:05:47.460 ela ficaria dessa seguinte maneira:
00:05:49.360 Repita "castigo" até "arrumar o quarto"
00:05:52.440 Note que para este caso, ficou até mais fácil de compreender
00:05:55.740 Então, a partir de agora, ele repete "castigo"
00:05:58.680 isto é, já começa com "castigo"
00:06:00.440 até "arrumar o quarto"
00:06:02.100 Quando chegar no "arrumar o quarto"
00:06:03.720 o teste lógico é feito, e caso ele não seja atendido, ele volta
00:06:07.380 A partir do momento em que ele atingir a expressão, que é "arrumar o quarto"
00:06:11.660 ele vai sair, e assim a execução continua
00:06:15.040 com você "liberado" do castigo até "arrumar o quarto"
00:06:18.820 E aí se você prestar bastante atenção
00:06:20.920 o uso da expressão que fica em rosa, que eu já vou mostrar pra você,
00:06:24.520 é o inverso lógico uma da outra
00:06:26.800 Enquanto no "Enquanto", você usa "não arrumar o quarto" como expressão,
00:06:30.940 no "Repita" você vai repetir "até arrumar o quarto"
00:06:34.100 É uma questão, inclusive, de construção frasal
00:06:36.240 Você vai ficar de castigo "enquanto não arrumar o quarto"
00:06:39.220 Você vai ficar de castigo "até você arrumar o quarto"
00:06:42.180 Então há uma inversão lógica nessa expressão
00:06:44.280 Preste bastante atenção nas expressões que estão em rosa
00:06:47.820 Então você vê que na primeira lá em cima
00:06:49.620 é preciso utilizar o operador lógico "não"
00:06:52.760 e na segunda, não é necessário
00:06:54.860 Isso é uma questão de raciocínio lógico
00:06:56.980 e você vai ter que praticar isso, pra poder entender direito
00:06:59.860 Vamos fazer o seguinte
00:07:01.760 eu vou alterar aquele nosso programa anterior
00:07:04.080 pra que ao invés dele usar o "Enquanto", utilize o "Repita"
00:07:07.240 Vou manter as mesmas variáveis
00:07:09.460 vou remover essa gambiarra que a gente fez aqui
00:07:12.980 Vou remover esse "Enquanto"
00:07:14.840 e vou substituir pelo "Repita"
00:07:17.080 Vou tirar o "FimEnquanto"
00:07:19.280 e vou colocar "Até" e uma expressão
00:07:22.820 Então vou fazer o seguinte
00:07:23.760 eu vou repetir isso tudo
00:07:25.900 até que a resposta seja "não"
00:07:28.200 "Quer continuar?" Não
00:07:29.920 "Até" que a resposta seja igual a não (resp = "N")
00:07:34.020 Vamos executar
00:07:36.280 e note que agora ele está executando a primeira vez
00:07:38.740 independente da variável resposta (resp) estar vazia ou não
00:07:41.880 Primeiro valor. Quer continuar? Sim.
00:07:44.500 Segundo valor. Quer continuar? Sim.
00:07:46.960 Terceiro valor... e assim ele vai fazer enquanto eu tiver dizendo que sim
00:07:51.260 Certo? Estou colocando lá que "sim"
00:07:54.780 Vou digitar o último, e vou digitar que "não"
00:07:57.720 Então ele vai somar: 1+5+6+8+3+5+6
00:08:03.800 que vai dar "34"
00:08:05.900 Ficou clara a diferença?
00:08:07.320 Se por acaso você se enrolar um pouco, nunca se esqueça
00:08:10.060 você pode pausar o vídeo
00:08:11.440 voltar um pouco
00:08:12.660 reassistir a aula
00:08:14.080 e não se esqueça nunca de praticar
00:08:16.820 De pausar o vídeo, digitar no seu VisuAlg, e ver o resultado funcionando
00:08:20.680 Vamos agora à alguns exercícios práticos resolvidos
00:08:24.240 para você poder reforçar o estudo das estruturas de repetição
00:08:27.320 com a estrutura "Repita"
00:08:29.000 O primeiro exemplo prático proposto
00:08:31.020 vai ser a utilização de um mesmo código que nós já vimos anteriormente
00:08:34.840 que é contar de 1 até 10,
00:08:36.080 só que agora nós vamos fazer com a estrutura  "Repita"
00:08:39.200 Eu já estou aqui com um algoritmo novo
00:08:41.400 vou fazer um programa pra contar de 1 até 10
00:08:43.400 Pra isso vou precisar de um contador,
00:08:45.260 obviamente,
00:08:46.400 começando com 1
00:08:47.820 Vou declarar a variável contador
00:08:50.280 como Inteiro
00:08:52.600 Vamos agora à repetição. Vou colocar o "Repita"
00:08:56.160 "Até"
00:08:57.480 que esse meu contador seja maior que 10
00:09:01.380 Note que isso é o inverso no "Enquanto"
00:09:03.380 seria "Enquanto o contador for menor igual a 10"
00:09:06.220 Aqui é "Até que o contador seja maior que 10"
00:09:09.340 Eu vou somar mais 1 no contador
00:09:12.140 "Cont recebe Cont mais 1"
00:09:14.840 Tudo que eu colocar aqui dentro, vai ser repetido 10 vezes
00:09:17.720 no meu caso aqui simples, um "Escreva"
00:09:21.680 com o contador.
00:09:22.620 Vou executar com o timer
00:09:26.500 pra ele exemplificar
00:09:28.260 Começou com 1
00:09:29.700 2...
00:09:30.440 3...
00:09:32.020 e assim vai... até o número 10
00:09:35.260 Note: o laço de repetição,
00:09:37.360 o teste lógico sendo feito no final,
00:09:39.880 e aqui embaixo, a variável "Cont"
00:09:42.480 alterando seu valor, até chegar
00:09:45.020 na minha contagem que eu escolhi fazer
00:09:47.800 E nesse caso eu não tenho nem muito mais o que explicar
00:09:50.400 É porque a estrutura "Repita", ela é simples, se você entendeu o "Enquanto"
00:09:53.460 Se você está tendo problema com o "Repita"
00:09:55.400 provavelmente é porque você teve problemas com o "Enquanto"
00:09:57.940 E se você não teve problemas com o "Enquanto", e não entendeu direito o "Repita"
00:10:00.840 não tem problema
00:10:01.620 você pode fazer todos os programas que você faz com o "Repita"
00:10:04.060 usando o "Enquanto"
00:10:05.100 Mas vamos aprimorar um pouco mais esse exemplo
00:10:07.100 porque isso nós já fizemos
00:10:08.460 Eu vou propor um exemplo dentro do exemplo
00:10:11.120 vamos lá
00:10:12.480 Botar um item adicional
00:10:13.980 que é exibir a tabuada de um número qualquer
00:10:16.540 E a tabuada, é basicamente contar de 1 à 10,
00:10:19.340 só que multiplicando com um valor
00:10:21.160 Então, por exemplo,
00:10:22.300 vamos supor que eu quero um número...
00:10:24.620 o número da tabuada é 7
00:10:26.840 Deixa eu declarar essa variável N aqui
00:10:30.280 Né?! Com 7
00:10:31.860 Em vez de escrever somente o contador
00:10:33.740 eu vou escrever um número, depois vou escrever um x,
00:10:36.820 depois eu vou escrever o contador
00:10:39.440 Executando, olha
00:10:40.900 Ele vai fazer: "7x1", "7x2", "7x3"... até "7x10"
00:10:45.020 Então basicamente o que eu fiz
00:10:46.500 foi adicionar um número, e mostrar esse número,
00:10:49.740 um " x ", e um contador, pra ficar semelhante à uma tabuada
00:10:52.900 Depois do contador vou botar um símbolo de igual na tela
00:10:55.400 entre aspas, óbvio, para ele escrever
00:10:57.440 Então tá lá, olha: "7x1", "7x2"...
00:10:59.560 Falta uma variável pra o resultado
00:11:02.120 que seria, pra cada um dos passos
00:11:04.680 o resultado seria:
00:11:06.880 o N, que é 7, vezes o Cont, que é o valor
00:11:12.040 que no final vou mandar mostrar o resultado ("R")
00:11:14.520 Executando...
00:11:15.880 "7x1=7", "7x2=14"...
00:11:18.220 até "7x10=70"
00:11:20.520 Caso você queira a tabuada de um outro número
00:11:22.380 por exemplo, do número 9
00:11:24.780 Basta mudar aqui pra 9 ( N <- 9) e executar
00:11:27.780 Caso você queira deixar o usuário interagir com isso,
00:11:30.660 você pode ao invés de fazer a atribuição do N valendo 9
00:11:33.620 você pode fazer um "Escreva ("Quer ver a tabuada de qual número? ")
00:11:41.540 "Leia (N)"
00:11:44.000 E a partir de agora o usuário vai digitar qual tabuada ele quer ver
00:11:47.240 Quero ver a tabuada de 5...
00:11:48.860 Ele mostrou
00:11:50.500 Vou executar de novo
00:11:52.280 Quero ver a tabuada de 2
00:11:54.060 E ele mostrou...
00:11:55.180 Ficou claro?
00:11:56.340 Então é assim que a gente faz
00:11:57.840 A gente faz exercícios mais simples
00:11:59.560 e acaba aumentando a dificuldade,
00:12:01.680 isso também nem é tão difícil,
00:12:03.140 mas aprimorando mais a nossa lógica
00:12:05.340 nós conseguimos fazer qualquer coisa
00:12:07.140 Vamos ao nosso segundo exemplo prático pra a gente não perder o pique
00:12:10.240 e entender um pouco mais sobre a estrutura "Repita"
00:12:12.920 A segunda proposta prática que eu tenho é ler vários números
00:12:16.120 e no final, mostrar quantos deles são negativos
00:12:19.680 Vamos fazer esse programa. Botar aqui...
00:12:21.820 "ContaNegativos"
00:12:24.760 É o nome do meu programa
00:12:26.260 Vou ter sempre um número pra ler
00:12:28.760 então eu tenho que ler um número
00:12:34.160 Vou ler esse número várias vezes
00:12:35.620 Então esse "Leia" tem que estar dentro do "Repita"
00:12:38.580 É importante que você entenda
00:12:41.480 o momento em ler dentro de um laço e fora de um laço
00:12:45.880 No meu caso aqui, como eu quero ler várias vezes,
00:12:48.600 ele tem que estar dentro do "Repita"
00:12:50.280 No caso anterior da tabuada, se você voltar no vídeo,
00:12:52.660 você vai ver que a leitura foi feita fora do "Repita"
00:12:54.800 Isto porque
00:12:55.580 Mais uma vez
00:12:56.460 Não existe fórmula
00:12:57.980 Não existe uma receita
00:12:59.980 Que, fora de repita tem escreva
00:13:01.980 Dentro de repita não tem escreva
00:13:03.560 Isso pode ser utilizado qualquer comando pode ser utilizado em qualquer momento
00:13:07.460 Vamos fazer isso ocorrer 5 vezes
00:13:09.440 Para isso vou criar um contador, vou chamar de C
00:13:12.160 Vai começar com 1
00:13:14.540 E vai ser, até o C for maior que 5
00:13:19.080 Então,
00:13:20.340 Ele vai repetir até que C seja maior do que 5
00:13:23.560 Vai ler vários números
00:13:25.040 Preciso
00:13:26.140 incrementar o valor de C
00:13:28.060 a cada laço
00:13:29.780 Vamos ver se ele vai ler...
00:13:32.700 2, 3, 4, 5 números
00:13:35.220 e ele para a execução
00:13:37.480 Agora eu quero saber quantos números são negativos
00:13:40.580 Então eu vou chamar variável "TotN", total de negativos
00:13:45.040 No início do programa, total de negativos é 0,
00:13:47.920 isto é, não tem nenhum número negativo
00:13:50.320 Após ler um número, eu vou verificar
00:13:52.580 Se esse número, pra ele ser negativo,
00:13:55.460 for menor do que zero
00:13:58.640 Se o número for menor do que zero
00:14:00.940 TotN recebe TotN mais 1 (TotN <- TotN + 1)
00:14:04.860 Como eu não vou ter a cláusula "Senão",
00:14:06.660 isto é, se o número for positivo eu não quero fazer nada
00:14:08.880 "FimSe"
00:14:10.220 No final do programa, vamos escrever na tela o resultado
00:14:15.280 "Foram digitados", TotN, "valores negativos"
00:14:22.420 Vamos ver?
00:14:24.420 Dê uma olhada no código
00:14:25.780 Pause o vídeo
00:14:26.820 Digite a sua própria versão
00:14:28.840 E vamos executar junto comigo
00:14:31.940 Vamos digitar 3
00:14:33.780 Menos 1
00:14:35.340 oito
00:14:36.520 Menos 7
00:14:38.140 seis
00:14:39.200 Digitamos 5 valores
00:14:41.060 Quando pressionar enter, ele tem que mostrar que desses 5 valores, dois são negativos.
00:14:46.800 Foram digitados 2 valores negativos
00:14:49.420 e minha lógica está funcionando corretamente
00:14:52.200 E aí acaba, que você fez a aula anterior, com todos os exercícios tudo bonitinho
00:14:56.420 Essa aula está sendo muito fácil né?
00:14:58.040 A ideia é exatamente essa, os algoritmos
00:15:00.420 Conforme a gente for aumentando a quantidade de informação
00:15:03.280 Se você praticar, ele não vai ficando mais difícil, ele vai ficando mais fácil
00:15:06.940 E já que a prática leva a facilidade
00:15:08.840 Vamos a mais um exemplo prático
00:15:10.900 A terceira parte prática é calcular o fatorial de um número
00:15:14.920 E aí, pode bater um certo desespero
00:15:17.300 Porque vê fatorial, matemática, não sei matemática
00:15:20.280 Fatorial é bem simples, por exemplo fatorial de 5 é 5 vezes 4 vezes 3 vezes 2 e vezes 1.
00:15:26.600 É basicamente uma contagem regressiva
00:15:28.520 E nós já fizemos contagem regressiva na aula anterior
00:15:31.160 Vamos refazer agora, só que agora usando repita.
00:15:34.520 Vamos criar aqui, mais um algoritmo, algoritmo de fatorial
00:15:39.960 Vamos começar nossa contagem regressiva
00:15:42.340 Vou criar aqui uma variável contadora de tipo inteiro
00:15:45.340 e o número que quero fatorial
00:15:47.140 e vamos perguntar aqui, fazero usuário digitar
00:15:50.080 Qual o número que ele quer calcular o fatorial
00:15:52.520 Então vamos colocar
00:15:53.740 Digite um número
00:15:55.400 e esse número vai servir para calcular o fatorial
00:15:58.720 Então Leia
00:16:00.120 (N)
00:16:01.520 Para fazer uma contagem regressiva de N até 1
00:16:05.080 O meu contador começa com N. Que é o primeiro valor
00:16:09.260 Ele vai repetir
00:16:11.640 Até
00:16:13.000 que o contador
00:16:14.260 Seja igual a 1
00:16:15.680 No caso aqui não, menor do que 1
00:16:17.760 E cada interação, ele vai tirar um valor do contador
00:16:20.960 Contador, recebe contador menos 1 (C<- C -1)
00:16:24.400 Vamos escrever o valor de C aqui
00:16:28.440 Só para exemplificar
00:16:33.340 Número 6
00:16:34.800 Ele vai fazer 5, 4, 3, 2, 1
00:16:37.800 Então o fatorial, é basicamente isso
00:16:40.720 O valor
00:16:42.080 um simbolo
00:16:43.460 de vezes "x"
00:16:44.720 e outro valor
00:16:46.900 Vamos ver aqui
00:16:48.040 5 é 5 vezes 4 vezes 3 vezes 2 vezes 1 (5 x 4 x 3 x 2 x 1)
00:16:52.440 Note aqui,
00:16:53.260 ele ficou com um X a mais
00:16:54.880 Depois até podemos remover isso. Mas esse,
00:16:57.180 é o calculo que será feito para mostrar um fatorial de um número
00:16:59.820 5 vezes 4 vezes 3 vezes 2 vezes 1 (5 X 4 X 3 X 2 1) é o calculo fatorial de 5.
00:17:04.500 Então,
00:17:05.619 Vamos criar uma variável F de fatorial
00:17:08.579 E o fatorial vai começar com 1
00:17:12.700 Isso porque,  se ele começar com zero, já que se trata de uma multiplicação
00:17:16.540 qualquer número vezes zero é zero
00:17:19.460 vamos fazer o seguinte
00:17:21.020 Fatorial
00:17:21.960 recebe
00:17:22.859 fatorial
00:17:24.020 vezes "C"
00:17:25.160 no final da repetição
00:17:27.420 nós vamos escrever
00:17:30.760 valor do fatorial de
00:17:34.720 "N"
00:17:36.840 é igual à
00:17:39.260 "F"
00:17:40.780 vamos ver aqui
00:17:42.140 número é "cinco"
00:17:43.260 fatorial de "cinco"
00:17:44.520 é igual à "120"
00:17:46.100 note aqui
00:17:47.340 vou tirar esse...
00:17:48.760 esse escreva, para ele não ter a contagem
00:17:51.900 vou botar "cinco"
00:17:53.140 o valor do fatorial de cinco
00:17:54.660 é igual à "120"
00:17:56.540 vou fazer o teste com outro número
00:17:58.700 por exemplo: Fatorial de "um" é "um"
00:18:03.360 E o fatorial de  "dez"
00:18:04.680 é igual a 3.628.800
00:18:08.480 mais uma vez
00:18:09.720 eu exibo aqui o código, para você pausar o vídeo
00:18:12.560 e fazer seus próprios testes em casa
00:18:15.280 E agora você que já fez o seu
00:18:16.880 Eu venho propor mais uma alteração, mais um adicional a esse programa
00:18:20.420 porque aqui a gente tá fazendo um fatorial para um número só
00:18:23.620 e se eu quiser fazer um fatorial para vários números
00:18:26.040 independente de quantas vezes o usuário vai decidir, quer continuar? sim ou não?
00:18:29.740 ai você vai me falar: aí poxa! Você não está utilizando uma estrutura de repetição?
00:18:33.080 E, aí eu vou mostrar uma coisa adicional, que é colocar uma estrutura de repetição dentro da outra
00:18:38.580 vamos ver isso funcionando na prática
00:18:40.220 e com certeza, você vai entender
00:18:42.340 então basicamente
00:18:43.280 fazendo assim:
00:18:44.380 ele vai fazer isso
00:18:45.480 para uma vez só
00:18:46.640 vamos criar a nossa
00:18:47.800 variável resposta aqui embaixo
00:18:50.360 vamos chamar de "R" dessa vez?
00:18:52.520 do tipo "caractere"
00:18:54.340 então eu vou fazer
00:18:55.580 tudo isso
00:18:57.360 repetir
00:18:58.980 até
00:19:00.400 que a minha resposta
00:19:02.080 seja igual
00:19:03.200 a "não"
00:19:04.060 quer continuar?  "não"
00:19:06.420 antes do até
00:19:07.700 eu vou fazer a pergunta denovo
00:19:10.200 vou botar "escrevaL" aqui
00:19:12.240 aqui um "Escreva"
00:19:14.600 quer continuar?
00:19:16.980 sim
00:19:18.000 ou não
00:19:19.280 leia "R"
00:19:21.940 e vou limpar a tela
00:19:24.440 vamos ver isso funcionando
00:19:26.540 digite um número
00:19:28.120 "quatro"
00:19:29.740 o valor do fatorial de "4" é "24"
00:19:31.860 Quer continuar? "sim"
00:19:33.380 agora quero fazer o fatorial de "3"
00:19:35.600 é igual à "6"
00:19:36.580 quer continuar? Sim, quero fazer mais uma vez
00:19:38.580 Quanto que é o fatorial de "7"?
00:19:40.600 É 5.040
00:19:42.120 Quer continuar? Não, já estou satisfeito
00:19:45.000 E ele terminou a execução do programa
00:19:47.520 viu como foi simples?
00:19:48.880 então antes eu tinha um código para fazer o fatorial de um número
00:19:52.220 e agora eu tenho um código pra fazer, adicionando apenas duas ou três linhas
00:19:55.740 um código, pra fazer o fatorial de vários números
00:19:58.440 e ainda perguntar pro usuário, se ele quer continuar ou não
00:20:00.700 e vamos continuar
00:20:01.760 pois tem mais um exemplo prático pra gente exercitar durante essa aula
00:20:05.680 A última prática dessa aula
00:20:07.360 é verificar se um número é ou não "primo"
00:20:10.340 lá vem o Guanabara com mais matemática
00:20:12.720 gente, algoritmo é matemática
00:20:14.580 algoritmo é vida, matemática é vida
00:20:16.860 o quê que é um número "primo"?
00:20:18.100 um número primo, é um número que é divisível
00:20:20.440 apenas por "um" e por ele mesmo
00:20:22.900 então por exemplo:
00:20:23.860 o número "três"
00:20:24.800 ele divisível por "um"
00:20:26.060 não é divisível por "dois"
00:20:27.480 e é divisível por "três"
00:20:28.800 por ser divisível por "um" e por "três"
00:20:30.960 ele é um número primo
00:20:32.080 número "cinco" por exemplo:
00:20:33.720 ele é divisível por "um"
00:20:35.580 não é por "dois
00:20:36.760 não é por "três"
00:20:37.800 não é por "quatro"
00:20:38.680 e é por "cinco"
00:20:39.700 por estar sendo dividido pelas duas extremidades
00:20:42.060 ele é primo
00:20:43.020 o número "quatro" por exemplo:
00:20:44.360 ele é divisível por "um"
00:20:45.660 é divisível por "dois"
00:20:46.920 não é por "três"
00:20:48.080 e é por ele mesmo, "quatro"
00:20:49.900 aqui ele é divisível por 3 números
00:20:51.860 então
00:20:52.440 ele não é primo
00:20:53.600 então um número primo
00:20:54.580 é um número que tem na contagem de 1 até ele
00:20:57.300 apenas 2 números divisíveis
00:20:59.300 então vamos começar
00:21:00.140 a fazer um programa de contagem
00:21:01.620 simples dessa maneira
00:21:02.960 então eu vou digitar um número
00:21:04.320 ele vai contar de 1, até esse número
00:21:07.060 então, estou estou aqui com um program de número primo
00:21:09.140 então, como a gente entrou num acordo, aqui
00:21:10.880 primeiro  a gente tem que fazer uma contagem
00:21:12.760 de "1"
00:21:13.260 até um número que o usuário vai digitar
00:21:15.040 então eu vou ter um contador
00:21:16.340 e um número
00:21:17.400 que são do tipo "inteiro"
00:21:19.740 vamos começar a contagem
00:21:21.920 "C" começa com "1"
00:21:23.680 e, repita
00:21:25.180 até que "C"
00:21:28.020 seja maior
00:21:29.620 do que o número
00:21:31.300 que número?
00:21:32.320 um número que eu vou digitar aqui em cima
00:21:37.540 vou lê um número
00:21:39.120 comecei a contagem: vai de "1" até "N"
00:21:42.400 sendo que a cada interação
00:21:44.760 Ele vai fazer que "C" receba "C+1"
00:21:48.260 isso é um contagem simples, então vamos escrever aqui
00:21:51.760 o "C"
00:21:53.340 deixa eu tirar esse "L" daqui, para ele escrever só tudo na mesma linha
00:21:57.100 então basicamente eu vou digitar "7"
00:21:58.860 ele vai contar de "1" até "7"
00:22:00.820 vou digitar "9"
00:22:02.020 ele vai contar de "1" até "9"
00:22:04.100 eu vou digitar "3"
00:22:06.380 ele vai contar de "1" até "3"
00:22:08.660 mas não é essa contagem que eu quero
00:22:11.320 a contagem vai me ajudar
00:22:12.800 mas o que eu quer saber
00:22:13.780 é se esse número
00:22:14.780 cada um deles
00:22:15.680 é divisível
00:22:16.860 pelo número digitado
00:22:18.900 então nós vamos verificar
00:22:20.520 se o "C" é divisível por "N"
00:22:23.000 como nós vamos fazer isso?
00:22:24.520 vamos utillizar um "Se"
00:22:26.100 se o número do contador
00:22:27.700 for divisável pelo número
00:22:29.440 "N"
00:22:30.700 "divisível" é o resto da divisão
00:22:33.080 do contador pelo número
00:22:34.520 igual a "zero", nós já vimos isso anteriormente
00:22:37.380 então, isso é
00:22:38.820 se esse número for divisível
00:22:40.340 se o contador
00:22:41.560 que é 1, 2, 3... até chegar o número
00:22:43.360 for divisível
00:22:45.940 eu vou fazer o seguinte:
00:22:47.640 eu vou ter uma variável
00:22:48.900 "ContDiv" (nome da variável)
00:22:50.420 que é o contador de divisísíveis
00:22:52.260 no meu caso "ContDiv"
00:22:54.260 vai começar com "zero"
00:22:56.320 e, acada vez que ele for divisível
00:22:58.320 meu "ContDiv"
00:23:00.080 vai receber mais "um" (+1)
00:23:02.300 ContDiv mais "um"
00:23:05.280 no final, vamos exibir esse "ContDiv"
00:23:09.120 ao todo
00:23:10.560 existem
00:23:12.880 "ContDiv"
00:23:15.740 valores divisíveis
00:23:19.840 vamos ver funcionando
00:23:21.240 então, por exemplo:
00:23:23.240 número "4"
00:23:24.360 número "4":
00:23:26.100 ele é divisível por "1",
00:23:27.780 por "2 e por "4"
00:23:29.380 vamos fazer uma inversão aqui
00:23:31.380 troquei o negócio
00:23:32.880 é "N" aqui e "C" aqui
00:23:34.880 perdão!
00:23:36.440 eu vou verificar
00:23:37.520 se o "N"
00:23:38.680 o número é divisível
00:23:40.620 pelo contador
00:23:41.880 não o contador divisível pelo número
00:23:43.660 vamos exemplificar aqui
00:23:45.280 digite um número: "4"
00:23:46.880 ele vai mostrar uma contagem até "4"
00:23:49.240 então, o "4", ele divisível por "1"
00:23:51.240 por "2" e por "4"
00:23:52.720 não é divisível por "3"
00:23:54.340 assim
00:23:55.320 ao todo existem três valores divisíveis
00:23:57.780 vamos ver o exemplo de um "número primo"
00:23:59.780 por exemplo: "7" é um número primo
00:24:01.740 ele é divisível apenas por "1"
00:24:03.640 e por "7"
00:24:04.440 então, ele vai mostrar a contagem
00:24:06.460 então existem dois valores divisíveis, isto é
00:24:09.200 é o "1" e o "7"
00:24:10.440 e aí, se você raciocinar um pouco, você vai entender
00:24:12.820 se o contador de divisível for igual a "2"
00:24:14.920 o número é primo
00:24:15.820 se ele for maior que isso
00:24:17.160 ele não é primo
00:24:18.020 vamos então resolver esse problema
00:24:19.700 mostrando o finalzinho
00:24:21.000 que identifica se um número é ou não primo
00:24:23.460 então, aqui no final ao invés de exibir
00:24:25.340 o total de divisores
00:24:26.880 nós vamos fazer o seguinte:
00:24:28.460 Se, o total de divisores, que é o "ContDiv"
00:24:32.060 for maior do que "2"
00:24:34.160 então
00:24:35.640 ele vai escrever
00:24:40.580 o valor
00:24:42.180 "N"
00:24:43.800 se ele for maior do que "2"
00:24:45.260 ele não é primo
00:24:48.480 se não
00:24:50.240 isso é, se ele for "2" ou menos
00:24:53.340 ele vai escrever o valor
00:24:56.480 "N" é primo
00:24:58.900 Fim de "se" (FimSe)
00:25:00.500 E vamos executar
00:25:01.740 como eu falei:
00:25:03.260 número "3", é um número primo
00:25:05.260 número "3" é primo
00:25:06.760 vamos retirar a contagem aqui
00:25:09.280 ela já não se faz mais necessária
00:25:12.160 vamos executar
00:25:13.980 número "3"
00:25:15.360 "3" é primo
00:25:16.880 vamos ver outro exemplo
00:25:18.200 "7" que eu falei que é primo
00:25:19.660 é realmente primo
00:25:21.580 número "10", por exemplo
00:25:23.720 "10" é divisível por "1", por "10"
00:25:25.520 mas também é divisível por "2"
00:25:27.460 e por "5"
00:25:28.460 então, ele não é primo
00:25:30.460 não é primo
00:25:32.360 o "9"
00:25:33.600 ele é divisível por "1", por "3"
00:25:36.020 e por "9"
00:25:37.260 então ele não é primo
00:25:39.880 mas o número "5"
00:25:41.420 que é divisível por ele e por "5"
00:25:43.400 é um valor primo
00:25:45.140 e aí?
00:25:46.080 compreendeu tudo direitinho?
00:25:47.460 não compreendeu?
00:25:48.420 assiste a aula de novo
00:25:49.680 abre seu visualG
00:25:50.980 pratique
00:25:51.700 é só assim que você vai aprender
00:25:53.440 e como já é de costume
00:25:55.100 antes de eu ir embora
00:25:56.180 eu vou deixar dois exemplos pra você fazer
00:25:58.180 dois exercícios
00:25:59.300 pra você praticar
00:26:00.340 sozinho
00:26:01.140 olhando apenas a aula
00:26:02.200 e tentando fazer o seu
00:26:03.480 primeiro exercício que eu proponho
00:26:05.400 é o "super contador"
00:26:06.840 vamos ver ele funcionando
00:26:08.160 você vai entender o que estou falando
00:26:09.820 basicamente quando eu executar esse programa
00:26:11.980 eu vou querer que seja exibido esse menu
00:26:13.920 pressione "1"
00:26:14.820 pra contar de "1" à "10"
00:26:15.960 pressione "2"
00:26:16.940 pra contar de "10" à "1"
00:26:17.960 e "3" para sair
00:26:19.120 ficou simples, né?
00:26:20.120 então vamos ver o resultado
00:26:21.120 pressionei "1"
00:26:22.060 ele vai contar
00:26:23.100 de "1" até "10"
00:26:24.000 pressionei "2"
00:26:25.320 ele vai contar...
00:26:26.580 de "10" até "1"
00:26:27.820 se eu pressionar "3"
00:26:30.000 ele sai do programa
00:26:31.560 Esse é bem fácil
00:26:33.040 Então tenta fazer
00:26:34.100 Bota a mão na massa aí, e tenta fazer essa contagem
00:26:36.620 Vamos ao segundo exercício que eu quero deixar para você fazer em casa
00:26:39.660 Depois do super contador
00:26:41.380 Vamos fazer o Escolhendo Pessoas
00:26:43.580 Vamos selecionar pessoas
00:26:45.420 De acordo com sua categoria
00:26:46.980 Vamos ver o programa funcionando
00:26:48.980 Então começamos o seletor de pessoas.
00:26:50.760 E pergunta primeiro, qual o sexo? Masculino ou Feminino?
00:26:53.320 Vou colocar lá masculino
00:26:54.640 Qual a idade?
00:26:55.620 Vinte de dois
00:26:56.920 Cor do cabelo?
00:26:57.900 1 é preto, 2 é castanho, 3 é loiro, 4 é ruivo. Há cabelo preto.
00:27:03.000 Quer continuar? Sim.
00:27:05.600 Vai perguntar de novo. Qual é o sexo? Feminino.
00:27:08.360 Idade, doze.
00:27:10.620 Cabelo, loiro.
00:27:13.040 Quer continuar? Sim
00:27:14.620 E aí, o que eu quero selecionar é o seguinte:
00:27:17.600 Vou digitar várias pessoas.
00:27:19.500 E no final quero saber, quantos homens com mais de 18 anos tem cabelo castanho.
00:27:24.820 E quantas mulheres estão entre 25 e 30 anos e são loiras.
00:27:29.020 Vamos ver algum exemplo aqui.
00:27:30.580 funcionando no nosso programa.
00:27:32.500 Eu vou cadastar
00:27:33.660 Um homem.
00:27:35.420 Mais de dezoito, ele tem dezenove
00:27:38.040 Ele tem cabelo castanho
00:27:40.400 Quer continuar? Sim
00:27:42.100 Vou cadastrar agora uma mulher
00:27:43.740 Entre 25 e 30 anos
00:27:45.340 Tem 27
00:27:46.740 Tem cabelo loiro
00:27:49.160 Então, eu tenho um de cada
00:27:51.040 Vou colocar mais uma mulher
00:27:52.720 Que se encaixe na categoria
00:27:54.360 Então mulher, com 29 anos.
00:27:58.040 Cabelo loiro também.
00:28:00.680 Cadastrar mais uma, só que essa não vai é uma mulher
00:28:04.420 Com 29 anos
00:28:06.120 Mas o cabelo dela é ruivo
00:28:08.020 Quer continuar? Não
00:28:09.960 E aí o que eu quero de resposta é:
00:28:12.060 até o momento eu cadastrei um homem, que satisfaz a necessidade lá da escolha e duas mulheres
00:28:17.540 Vamos ver o resultado final disso, e ver se eu acertei
00:28:20.360 Quer continuar? Não
00:28:22.060 E aí vou disparar o resultado final
00:28:24.020 Que é
00:28:24.600 O total de homens com mais de 18 anos e cabelos castanhos
00:28:27.580 Um só
00:28:28.400 O total de mulher entre 25 e 30 anos e com cabelos loiros. Duas
00:28:32.840 E agora é com você
00:28:34.100 O seu trabalho, o seu esforço
00:28:36.200 Vai fazer você aprender mais ainda sobre algoritmo
00:28:39.380 Mias ainda sobre estrutura de repetição
00:28:41.580 Espero que essa aula seja de grande utilidade
00:28:43.680 Por que muita gente se enrola bastante com estrutura de repetição
00:28:47.240 Mais uma vez
00:28:48.100 Queria que você se você gostou do projeto
00:28:50.160 E quer incentivar a fazer mais aulas, mais cursos, mais novidades para dentro do site Curso em Vídeo
00:28:55.140 Não se esqueça, clicando aqui, você assina o canal
00:28:58.060 Aqui você recebe informações sempre que estiver uma aula nova
00:29:01.460 Aqui em cima você tem o cursoemvideo.com e aqui que você vai ver
00:29:04.960 realmente todas as aulas, realmente todos os exercícios
00:29:08.020 baixar os pacotes, baixar o Visualg, baixar apostila, baixar tudo que seja necessário
00:29:12.360 Clicando aqui
00:29:13.300 você vai ter acesso a todas as aulas do inicio ao fim
00:29:16.680 Numa playlists do YouTube
00:29:18.200 Mas não se esqueça, aqui em cima é o mais importante, esse é o site, é aqui que você tem que entrar
00:29:23.120 Para poder ver todos os exercícios, ver tudo o que está se passando
00:29:26.360 dentro do Curso em Vídeo, tudo o que está sendo criado
00:29:28.860 Então nos já temos o Curso de HTML5, estamos criando o Curso de Algoritmo
00:29:32.940 Vem mais outros cursos por aí pela frente
00:29:34.900 Não se esqueça de compartilhar
00:29:36.400 dá joinha no vídeo, comentar
00:29:38.680 Entrar em contato com a gente no Facebook é facebook.com/cursosemvideo
00:29:43.080 Então, entre em contato com a gente, compartilha essa ideia, mostra para seus amigos
00:29:46.740 e o curso só cresce por conta de vocês. Um forte abraço! Bons estudos e até a próxima!
00:29:52.840 Que foi a primeira estrutura, que foi a primeira, que foi a primeira... Ehhh...
