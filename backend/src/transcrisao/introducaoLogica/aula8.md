https://www.youtube.com/watch?v=7gGFHzqh4d8&list=PLHz_AreHm4dmSj0MHol_aoNYCSGFqvfXV&index=9

# tactiq.io free youtube transcript
# No title found
# https://www.youtube.com/watch/7gGFHzqh4d8

00:00:05.000 ♫ Música ♫
00:00:20.720 Olá! Seja bem-vindo a mais uma aula do seu curso de algoritmos!
00:00:24.820 O meu nome é Gustavo Guanabara, eu sou seu professor e agora a gente vai dar continuidade
00:00:28.640 ao estudo das estruturas condicionais, vendo os outros dois tipos de condicionais que a gente tem.
00:00:33.820 Então, na aula passada nós vimos condicional simples, condicional composta
00:00:37.860 e agora nós vamos ver mais dois tipos, que são as condicionais aninhadas e as estruturas de escolha.
00:00:43.800 Caso você tenha perdido as aulas anteriores, basta clicar aqui e você terá acesso a todas as aulas
00:00:49.240 desde a primeira até a última.
00:00:51.340 Esta é a aula 8, na aula 7 nós vimos as primeiras estruturas condicionais.
00:00:55.680 Mas é muito importante que você siga esse curso desde o início, criando uma sequência fácil de compreender.
00:01:01.120 Vamos então à aula de hoje!
00:01:03.360 Então vamos às estruturas condicionais parte 2.
00:01:07.260 Na aula passada, nós vimos a seguinte estrutura condicional.
00:01:10.980 Se eu tiver muito dinheiro, então vou fazer uma viagem pra Disney.
00:01:13.600 Senão, vou ficar em casa.
00:01:15.660 Só que infelizmente a vida não é tão simples assim, né?
00:01:19.180 Uma coisa não tem normalmente duas escolhas.
00:01:21.180 Você tem várias possibilidades.
00:01:23.140 Então por exemplo, se eu tiver 10 mil reais ou mais, eu posso ir para a Disney.
00:01:26.960 Se eu não tiver 10 mil reais, eu não necessariamente posso ficar em casa.
00:01:30.520 Se eu tiver por exemplo, uns 2 mil reais, eu posso fazer uma viagem intermediária, não preciso ir à Disney.
00:01:35.040 Mas eu posso fazer uma viagem mais simplesinha.
00:01:37.160 Então eu poderia complementar essa estrutura criando uma situação adversa, que é por exemplo, a seguinte:
00:01:43.420 Se eu tiver muito dinheiro, eu vou para a Disney. Senão, se eu tiver uma graninha,
00:01:47.320 então vou visitar minha cidade natal.
00:01:48.580 Senão, aí sim eu fico em casa.
00:01:50.860 E aí a coisa começa a ficar mais real. Fica mais condizente com o nosso dia a dia.
00:01:54.580 Nós não temos apenas duas opções "ou isso ou aquilo". Às vezes nós temos mais de uma.
00:01:59.180 Nesse caso aqui eu tenho 3.
00:02:00.600 Ou vou para a Disney, ou eu vou visitar minha cidade natal, ou eu fico em casa mesmo.
00:02:04.340 Vamos ver como isso se reflete, na declaração, utilizando o Visualg.
00:02:08.460 Utilizando linguagem formal de algoritmos para descrever essa estrutura
00:02:11.320 que você está vendo na tela agora, ficaria parecido com o código a seguir:
00:02:15.940 Se uma situação 1 ocorrer, então ele executa um Bloco A.
00:02:19.700 Senão, se uma situação 2 ocorrer, então execute um Bloco B. Senão, execute um Bloco C.
00:02:25.940 Note aqui, que nós temos duas estruturas condicionais.
00:02:31.340 Uma condição maior está externa e uma outra situação condicional que está dentro dela.
00:02:37.600 E isso faz com que eu utilize duas estruturas condicionais compostas uma dentro da outra.
00:02:42.800 Vamos ver então a aplicação daquela frase grande
00:02:44.960 dentro de alguma coisa que se pareça mais com um algoritmo.
00:02:48.160 Dessa maneira nós vamos colocar:
00:02:50.300 se o dinheiro for maior ou igual a 10 mil, então escreva "Partiu Disney".
00:02:54.600 Senão, se o dinheiro estiver entre 5 mil e 10 mil, vamos visitar a família na nossa cidade natal.
00:03:00.860 Senão, escreva hashtag chateado (#chateado), porque você vai ficar em casa.
00:03:04.040 O nome que se dá a esse encadeamento de estruturas condicionais compostas é condicional aninhada.
00:03:10.020 E essa expressão "aninhada" vem de ninho, pois eu tenho uma estrutura dentro da outra
00:03:14.720 como se fosse formando um ninho.
00:03:16.880 Vamos então ver alguma situação prática em que se aplique esse tipo de estrutura condicional.
00:03:21.800 O que eu venho propor aqui é verificar se um aluno está aprovado, reprovado ou em recuperação.
00:03:27.120 E se você se lembra muito bem, na aula passada, na aula 7, a gente viu como criar uma estrutura condicional
00:03:32.960 para ver se um aluno estava aprovado ou reprovado.
00:03:35.700 E se você se lembra muito bem, na aula passada que foi a aula 7, ficou como exercício
00:03:40.420 você construir um programa onde seriam digitadas duas notas de um aluno
00:03:44.020 calcular a média e mostrar a situação.
00:03:46.360 Eu recomendo que você tenha feito esse exercício e agora eu vou dar uma solução simples
00:03:50.720 para resolver esse exercício e acrescentar a situação de o aluno estar em recuperação.
00:03:55.860 Vamos começar então o algoritmo solicitando as duas notas do aluno.
00:03:59.460 Vamos escrever...
00:04:00.980 Primeira nota...
00:04:02.360 Vou ler "N1", que é nota 1...
00:04:06.280 Vou ler segunda nota...
00:04:09.960 Leia "N2"...
00:04:11.460 E vou calcular a minha média, que é o N1 + N2 dividido por 2.
00:04:16.860 E se você se lembra muito bem, se eu deixar assim vai dar errado pois a divisão é feita antes,
00:04:22.360 e eu quero realizar primeiro a soma.
00:04:24.480 Vamos mostrar a média do aluno...
00:04:29.260 Vamos mostrar o "M" formatado...
00:04:33.060 Vamos declarar as variáveis, N1, N2 e M...
00:04:37.300 Vamos executar o programa...
00:04:41.020 Primeira nota... 3.
00:04:42.080 Segunda nota... 5.5.
00:04:44.140 A média foi 4.25.
00:04:47.460 Vamos agora fazer a situação do aluno.
00:04:49.980 Para um aluno aprovado, vamos considerar 7 ou mais.
00:04:52.820 Então, se a média do aluno for maior ou igual a 7, então vai escrever na tela "Aluno APROVADO".
00:05:02.680 No exercício que você fez...
00:05:04.540 Senão, escreva "O aluno está REPROVADO".
00:05:08.900 No entanto, nesse caso é o seguinte
00:05:10.060 Se o aluno não estiver reprovado
00:05:11.700 Ele tem outra situação
00:05:12.900 Que se ele estiver em recuperação
00:05:14.700 ou reprovado
00:05:16.340 Então se a média
00:05:17.980 Se for maior ou igual a 5 -> Código Se (M >= 5)
00:05:20.420 E
00:05:21.780 A média for menor do que 7 -> código e (M < 7)
00:05:23.960 Entao -> código entao
00:05:26.280 Então eu vou escrever -> código Escreval("Aluno em RECUPERAÇÃO")
00:05:34.220 -> código Senao
00:05:35.700 Eu escrevo aluno reprovado -> código Escreval ("Aluno REPROVADO")
00:05:40.020 Note que esse último "Se nao", só vai acontecer se a média não for maior ou igual a 7  " >= 7"
00:05:45.040 E não estiver entre 5 e 7
00:05:46.660 Logo, seja menor do que 5
00:05:49.020 Perceba que, no meu código
00:05:51.020 Que a identação foi feita
00:05:52.680 Para deixar que as estruturas sejam exibidas uma dentro da outra
00:05:56.120 Então você vai ver
00:05:57.100 Que esta estrutura "Se" que eu estou marcando
00:05:58.980 Está dentro da estrutura "Se"  de fora
00:06:01.060 Isso é, elas estão aninhadas
00:06:03.120 e agora, o meu Algorítimo funcionará corretamente
00:06:06.380 então, vamos executar
00:06:07.680 vamos ver a primeira situação, um aluno que tirou 3 e 6
00:06:11.240 ele ta com media 4.50 e ele foi reprovado
00:06:14.400 já o aluno que tirou 7 e 5
00:06:18.140 teve media 6 e está em recuperação
00:06:20.640 a ultima situação, é um aluno que tirou 10 e 6, tirou media 8 e está aprovado
00:06:26.780 mais uma vez, aqui está o código caso seja necessário
00:06:30.780 Pause o vídeo, digite no seu visualg, e veja o resultado por conta própia
00:06:34.780 ficou claro?!
00:06:35.880 com isso, eu fiz um estrutura condicional aninhada simples, onde eu tenho apenas uma estrutura dentro da outra
00:06:41.480 porém, existem situações onde eu tenho que aninhar mais estruturas condicionais
00:06:45.680 isso vai tornar mais complicada a visualização do meu código
00:06:48.940 mas a compreensão não é nada difícil
00:06:50.840 vamos ver a nossa situação 2 para estruturas condicionais aninhadas
00:06:54.860 você deve se lembrar que na aula passada, nós fizemos uma pratica para o calculo do IMC
00:06:59.420 que é a massa de uma pessoa  dividida pela altura ao quadrado
00:07:02.140 na aula anterior, nós fizemos apenas o calculo, e mostramos se a pessoa está dentro da faixa ideal ou não
00:07:08.300 porém, nos vimos que existem varias faixas, desde a pessoa que esta muito abaixo do peso,  até a pessoa que está com obesidade morbida
00:07:16.140 que seria o IMC com 40 ou mais
00:07:19.460 vamos resolver esse problema criando uma estrutura condicional aninhada
00:07:23.140 a partir do exercício da aula anterior
00:07:25.780 então eu abri aqui exatamente o algorítimo que nós já fizemos na aula passada
00:07:29.820 caso você não tenha visto a aula 7, acesse o site cursoemvideo.com
00:07:34.160 vá até a aula 7, baixe os arquivos dos exercícios, e você vai ter esse arquivo, ou então você pausa o video agora e digite o seu
00:07:42.360 O que nós vamos fazer, é eliminar apenas a estrutura condicional, e deixar o calculo do IMC
00:07:47.980 que vai ser a partir da onde nós vamos começar
00:07:50.100 Então no meu caso aqui, o calculo do IMC é a massa dividida pela altura ao quadrado
00:07:54.520 nós já vimos isso na aula passada
00:07:56.360 E agora nós vamos fazer as faixas de IMC
00:07:58.900 começando pela faixa de uma pessoa que está muito abaixo do peso
00:08:01.660 que é qualquer IMC abaixo de 17
00:08:04.540 Então nós vamos fazer aqui, se por acaso o IMC for abaixo de 17 [ se (IMC < 17 ) ]
00:08:11.500 [ entao ], nesse caso como eu vou ter muitas estruturas 'se' [se] aninhadas
00:08:15.560 A minha dica 1 é manter o código sempre indentado
00:08:18.600 A minha dica 2, é sempre que você abrir um se [se]
00:08:21.220 automaticamente, feche com um Fim Se  [ fimse ]
00:08:23.660 assim vai evitar que você se enrole no final
00:08:26.840 Então, se meu IMC for menor que 17
00:08:29.520 Escreva ("Muito abaixo do peso")
00:08:33.020 A segunda situação
00:08:34.440 senão
00:08:35.700 vou ter outra situação
00:08:37.080 A segunda situação
00:08:38.179 É quando o IMC está entre 17 e 18.5
00:08:41.360 Que é uma pessoa simplesmente abaixo do peso
00:08:43.919 Então vamos colocar um SE
00:08:46.200 IMC for maior ou igual a 17 e IMC for menor ou igual a 18.5
00:08:53.920 então, mais uma vez já fiz o SE, faço o FIMSE para mim não enrolar
00:08:58.900 Então se o IMC estiver entre 17 e 18.5
00:09:01.700 Lembrando que 18.5 é dezoito ponto cinco
00:09:04.520 Vou escrever
00:09:06.460 ("Abaixo do peso")
00:09:08.680 senão, nos vamos para a terceira situação
00:09:12.180 que é quando a pessoa, está entre 18 e 25
00:09:15.520 que foi a situação que nos fizemos na aula passada do peso ideal
00:09:19.740 Se o IMC, for maior ou igual a dezoito ponto cinco. Vou tirar o igual daqui de cima
00:09:28.360 e IMC for menor do 25
00:09:32.300 então, fim de se
00:09:35.580 Escreva ("Peso ideal")
00:09:41.000 senão, nos vamos ter uma outra condição
00:09:44.000 que é quando ele está entre 25 e 30
00:09:46.160 e isso caracteriza o sobrepeso
00:09:49.500 Se o IMC for maior ou igual a 25
00:09:52.820 e, o IMC for menor que 30
00:09:57.300 então, fim de se
00:10:00.480 Ele vai escrever, ("Sobrepeso")
00:10:03.540 senão, vou fazer a outra situação
00:10:06.960 que é o IMC maior ou igual a 30
00:10:10.040 e o IMC menor do que 35
00:10:13.600 que caracterizaria... a Obesidade
00:10:17.920 senão, nos vamos testar mais uma faixa
00:10:21.600 que é o imc
00:10:23.020 maior ou igual a 35
00:10:25.400 e
00:10:26.560 imc
00:10:27.340 menor que 40
00:10:29.800 esse imc
00:10:31.400 caracteriza um pessoa
00:10:32.900 com obesidade severa
00:10:34.620 senao
00:10:35.740 eu tenho à opção
00:10:36.640 do imc acima de 40
00:10:38.600 como é a última opção
00:10:39.900 e eu alinhei as minhas condições
00:10:41.980 eu não preciso fazer o teste
00:10:43.720 do imc maior igual a 40
00:10:45.900 caso ele não seja nenhum dos anteriores
00:10:47.740 obviamente
00:10:48.860 ele está
00:10:50.080 em obesidade mórbida
00:10:54.040 E aí!
00:10:54.540 Como eu disse anteriormente
00:10:55.820 eu tenho uma estrutura
00:10:56.940 que quando você olha assim, se você olha desavisadamente
00:11:00.180 você vai acabar achando ela complicada
00:11:02.780 mas no fim
00:11:03.640 se você abriu um (se) e automaticamente fechou o (fimse)
00:11:06.480 o seu código
00:11:07.380 vai ficar totalmente alinhado
00:11:09.160 Isso é
00:11:09.680 um (se) dentro do outro
00:11:11.240 e vai funcionar corretamente
00:11:13.160 vamos testar
00:11:15.240 uma pessoa
00:11:16.640 fazer uma pessoa muito magra
00:11:18.080 que pesa 40 quilos e tem 2 metros
00:11:20.440 ela está muito abaixa do peso
00:11:21.820 pois ela tem imc 10
00:11:23.680 uma outra situação
00:11:25.320 vamos clocar uma pessoa muito gorda
00:11:27.560 que pesa 200 quilos e tem 1 metro
00:11:30.420 ela tem imc 200, ela está em obesidade mórbida
00:11:33.280 note 200 não é o peso dela
00:11:35.060 200 é o imc
00:11:37.560 uma pessoa
00:11:38.760 com 85 quilos
00:11:40.500 que tenha dois metros
00:11:42.220 ela está no seu peso ideal
00:11:43.960 vamos ver uma outra situação
00:11:45.480 uma pessoa que tenha 55 quilos e meio
00:11:48.500 e tenha 1 metro e 56
00:11:50.540 ela também está no seu peso ideal
00:11:52.600 faça o teste com seu peso e sua altura
00:11:54.880 e veja qual seria sua faixa de imc
00:11:57.060 Eu espero que você tenha entendido o conceito de estruturas condicionais alinhadas
00:12:01.000 e pratique bastante
00:12:02.380 no final dessa aula
00:12:03.460 existem dois exercícios
00:12:04.920 e você pode fazer eles, utilizando esse tipo de estrutura
00:12:07.520 porém
00:12:08.120 existem algumas situações que eu tenho muitos testes com valores númerios simples
00:12:12.400 e aí
00:12:13.060 existe uma outra estrutura condicional
00:12:15.060 que é muito útil nesses casos
00:12:16.640 é a estrutura condicional
00:12:17.900 escolha caso
00:12:19.140 a estrutura escolha caso
00:12:20.480 tem uma forma muito simples de compreender
00:12:22.480 vamos a ela
00:12:23.360 você vai colocar
00:12:24.560 entre escolha
00:12:25.440 e fim escolha
00:12:26.600 uma variável
00:12:28.340 e um caso
00:12:29.240 pra cada um dos valores
00:12:30.740 de acordo com o valor de cada caso
00:12:32.760 um bloco será executado
00:12:34.800 existe ainda
00:12:35.620 um bloco no final
00:12:37.240 que é o outro caso
00:12:38.860 que é caso nenhum dos valores acima sejam exibidos
00:12:41.980 um (bloco D)
00:12:42.940 será executado
00:12:44.500 ô, outro caso
00:12:45.540 é uma estrutura opicional
00:12:47.120 pode ser usada
00:12:48.220 e tanto pode ser utilizada
00:12:50.080 como ometida
00:12:50.960 vamos ver algum exemplo
00:12:53.040 na nossa prática 3
00:12:54.280 nós vamos fazer um programa que eu batizei de criança esperança
00:12:57.040 e vocês vão entender do que eu tó falando
00:12:59.780 vamos começar o programa
00:13:01.580 vou colocar um....
00:13:02.780 uma estruturazinha aqui
00:13:05.880 coloca um traço
00:13:12.380 mais um traço
00:13:14.120 só pra criar um ambiente aqui
00:13:16.240 e começar meu programa
00:13:18.120 colocar criança esperança centralizado
00:13:21.440 vamos colocar aqui
00:13:24.280 muito obrigado
00:13:25.940 por ajudar
00:13:27.880 vamos colocar
00:13:30.220 1
00:13:31.200 para doar
00:13:32.800 10 reais
00:13:35.720 2
00:13:37.440 para doar
00:13:39.680 25 reais
00:13:41.800 3
00:13:42.880 para doar, 50 reais
00:13:45.380 4, para doar outros valores
00:13:49.180 e 5
00:13:50.620 para cancelar
00:13:52.120 vou ler
00:13:53.580 D de doação
00:13:55.760 vou ter uma variável, D
00:13:58.320 de tipo inteiro
00:13:59.540 e aí para não utilizar uma estrutura condicional alinhada
00:14:02.460 Se o D for 1 faz uma coisa, senão se D for 2, vai fazer uma estrutura muito complicada
00:14:07.820 Eu posso utilizar o escolha
00:14:09.680 Escolha D, vou colocar logo o FimEscolha
00:14:12.600 E aqui posso criar cada caso, como:
00:14:15.800 Caso ele tenha digitado 1
00:14:17.640 Caso ele tenha digitado 2
00:14:19.480 Caso ele tenha digitado 3
00:14:21.820 Caso 4
00:14:23.440 e caso 5
00:14:24.900 Vou digitar também aqui uma variável chamado valor
00:14:28.020 Caso 1
00:14:29.280 o valor recebe 10
00:14:31.740 Caso 2, o valor recebe 25
00:14:35.980 Caso 3, o valor recebe 50
00:14:40.400 Caso 4, vou pedir o valor
00:14:45.120 "Qual o valor da doação? R$"
00:14:47.520 Leia (Valor)
00:14:49.080 Caso, Caso 5
00:14:51.900 Valor recebe 0
00:14:54.820 No final, vai escrever outra linha
00:14:59.380 "Sua doação foi de R$"
00:15:04.080 Valor
00:15:06.620 "Muito obrigado!"
00:15:08.340 e vai finalizar o programa
00:15:10.680 com mais uma linha. E vamos executar
00:15:14.560 Olhe lá...Muito obrigado por ajudar
00:15:16.860 1 para doar 10, 2, 3, 4 ou 5
00:15:19.440 ou doar
00:15:20.360 25 reais
00:15:21.480 Digitei 2. Apertei enter
00:15:23.660 Sua doação foi de R$ 25. Muito Obrigado!
00:15:26.740 Vou fazer uma outra
00:15:28.400 Vou doar R$ 50, vou apertar 3
00:15:31.720 Sua doação foi de R$ 50. Muito Obrigado!
00:15:33.940 Vamos fazer mais uma
00:15:35.880 Vou apertar 4 agora, para doar outros valores
00:15:39.020 Qual o valor da doação? Vou doar R$ 200
00:15:41.900 Sua doação foi de R$ 200. Muito Obrigado!
00:15:44.620 E por fim
00:15:46.400 Vou doar
00:15:47.780 Vou cancelar, apertando o 5
00:15:49.800 Sua doação foi de R$ 0. Mesmo assim, muito obrigado!
00:15:52.840 E se você for olhar o seu código, vai ver que a estrutura escolha é muito mais simples
00:15:56.700 do que ficar alinhando muitas estruturas condicionais
00:15:59.180 porém, existe uma observação importante aqui.
00:16:01.460 A estrutura escolha não serve para testar faixa de valores, isso é
00:16:05.080 se ele estiver maior ou igual, menor que outra coisa
00:16:07.740 isso não é possível
00:16:08.860 e ela só funciona basicamente
00:16:10.760 para valores inteiros
00:16:12.000 algumas linguagens aceitam o escolha
00:16:14.200 que seria o Switch
00:16:15.440 para dados do tipo caracter
00:16:17.420 mas no caso do Visualg aqui
00:16:18.940 é recomendado apenas utilizar para valores inteiros
00:16:21.680 então, o escolha não é uma estrutura condicional que você pode utilizar em todas as situações
00:16:25.980 mas existem algumas que você pensa que não pode utilizar
00:16:28.580 e acaba podendo. Vamos ver mais um exemplo.
00:16:31.300 A minha quarta prática dessa aula
00:16:33.140 seria a quantidade de dependentes de um funcionário
00:16:35.720 vamos fazer um algoritmo simples aqui
00:16:38.100 Vamos fazer um programa que escreva na tela
00:16:40.880 "Qual o nome do funcionário?"
00:16:43.900 Vai ler o nome
00:16:45.800 Vai ler
00:16:47.660 "Qual o salário do funcionário?"
00:16:50.280 Vai ler
00:16:52.140 O (Sal)
00:16:53.720 A variável do salário
00:16:55.260 e no final
00:16:56.540 vai pedir
00:16:57.780 para ler, "Qual e a quantidade de dependentes?"
00:17:03.000 são pessoas que dependem dele
00:17:04.960 Leia
00:17:06.220 chamar de (Dep)
00:17:07.400 Então vou ter nome que é do tipo caractere
00:17:10.500 Vou ter salário que é do tipo real
00:17:13.460 e vou ter dependentes
00:17:16.220 que é do tipo inteiro
00:17:17.660 e vou ter aqui, um novo salário do funcionário
00:17:20.480 O novo salário, vai ser dado de acordo com o número de dependentes
00:17:24.000 Então, vou escolher
00:17:26.240 pelo dependentes
00:17:27.599 FimEscolha
00:17:28.660 Aqui
00:17:30.100 Caso o funcionário não tenha nenhum dependente
00:17:33.360 o novo salário
00:17:34.620 vai receber o salário anterior dele mais
00:17:38.300 apenas 5% de aumento
00:17:40.300 então vai ser, salário vezes 5 dividido por 100
00:17:44.560 nos já vimos como que se faz o cálculo de porcentagem em aulas anteriores
00:17:48.940 Caso ele tenha 1, 2 ou 3 dependentes
00:17:52.380 Essa estrutura totalmente válida
00:17:54.460 O novo salário dele vai ser o salário mais 10%
00:18:01.160 Caso seja 4, 5 ou 6
00:18:05.440 O novo salário vai ser 15% de aumento
00:18:13.260 E em outro caso
00:18:14.640 Isso é, caso ele tenha mais de 6 dependentes
00:18:18.080 O novo salário vai ser o salário mais 18%
00:18:24.620 Vamos fazer um caso aqui, todos os funcionários ganhando R$ 1000 para facilitar a conta
00:18:29.560 Então eu tenho o funcionário José
00:18:31.600 que tem o salário de R$ 1000
00:18:33.620 e tem 3 dependentes
00:18:36.060 se você olhar aqui no código, para 3 dependentes ele vai ter 10% de aumento
00:18:40.800 Logo, o novo salário dele vai ter que ser R$ 1100
00:18:44.140 Eu não mostrei o salário né
00:18:46.020 Tem que escrever aqui
00:18:47.900 "O novo salário de" vou colocar o nome dele
00:18:53.100 será de R$, sal
00:18:57.100 Configurado com 5 casas ao todo, sendo 2 decimais
00:19:01.380 Colocar aqui para ele ler o salário, colocar o R$ aqui para
00:19:04.420 o usuário não sentir vontade de digitar
00:19:07.080 Vamos executar mais uma vez José
00:19:09.780 Ganha R$ 1000
00:19:11.380 e tem 3 dependentes
00:19:12.840 isso daria 10% de aumento
00:19:15.640 Eu mandei mostrar salário e não o novo salário né
00:19:18.140 Mais uma vez José
00:19:19.960 Ganha R$ 1000
00:19:21.520 e tem 3 dependentes, o novo salário de José é R$ 1100
00:19:25.220 Vamos fazer aqui, Maria
00:19:27.880 Que ganha R$ 1000 e não tem nenhum dependente
00:19:30.560 Ela só vai ter 5% de aumento
00:19:33.100 Aqui no caso, se eu tiver 5 dependentes é 15% de aumento
00:19:38.100 Então vamos colocar lá
00:19:40.140 André
00:19:41.560 Ganha R$ 1000
00:19:43.200 e tem 5 dependentes
00:19:45.180 R$ 1150 é o novo salário dele
00:19:47.600 O maior aumento que é de 18% e para quem tem mais de 6 dependentes
00:19:51.880 Vamos fazer um exemplo, Cláudia
00:19:55.600 Ganha R$ 1000
00:19:57.120 e tem 9 dependentes
00:19:58.960 Ela vai ter um aumento de 18% e vai ganhar R$ 1180
00:20:04.140 Então é muito importante saber que escolha caso
00:20:06.900 Existe a possibilidade de você testar vários valores
00:20:10.160 separando eles por vírgula
00:20:11.620 Eu espero que você tenha entendido todas as estruturas condicionais, que nós colocamos nesse curso
00:20:15.840 São as estruturas condicionais simples, as compostas, as alinhadas e o escolha caso
00:20:20.500 Agora, para finalizar o seu estudo de estruturas condicionais, principalmente essas duas últimas
00:20:25.280 Vamos ver dois exemplos funcionando
00:20:27.440 e eu quero que agora você faça esses exercícios
00:20:30.060 e mostre que você aprendeu essas duas estruturas
00:20:32.600 O primeiro exercício proposto é o seguinte:
00:20:35.040 O Aproveitamento de um aluno e formos recorrer ao Wikipédia
00:20:38.200 Vamos ter a seguinte informação
00:20:40.020 Se formos dar uma olhada no verbete Nota Escolar na Wikipédia
00:20:43.660 Você tem as avaliações de A a E
00:20:46.120 Aqui é o seguinte
00:20:47.080 Nos vamos considerar a média de um aluno
00:20:49.340 Se a média for entre 9 e 10, a classificação é A.
00:20:53.460 Entre 8 e 9, a classificação é B.
00:20:56.220 Entre 7 e 8, C.
00:20:58.980 Entre 6 e 7, D.
00:21:01.280 Entre 5 e 6, E.
00:21:03.440 E abaixo de 5, classificação F.
00:21:06.320 Então, esse é o objetivo do nosso exercício
00:21:08.480 Eu quero calcular a média do aluno
00:21:10.560 E de acordo com a nota dele, eu vou mostrar a classificação
00:21:14.120 A, B, C, D, E ou F
00:21:16.560 Vamos ver isso funcionando
00:21:18.160 Vamos colocar aqui por exemplo, o aluno 5 e 8.
00:21:21.780 A média é 6,5. O aproveitamento é D.
00:21:24.340 Pois ele está entre 6 e 7.
00:21:27.160 Vamos ver mais um exemplo
00:21:28.840 Para a nota
00:21:30.000 10 e 7
00:21:32.560 A média é 8,5. O aproveitamento é B.
00:21:35.080 Fazendo mais uma vez
00:21:36.580 10 e 9
00:21:37.700 Média 9,5. O aproveitamento é A.
00:21:40.620 De forma análoga
00:21:42.100 4 e 2
00:21:43.720 A média é 3. E o aproveitamento é F.
00:21:46.220 Então, essa é a sua missão.
00:21:48.140 E não se esqueça, como estamos trabalhando com números reais
00:21:51.460 Isso não vai poder se aplicar a estrutura escolha caso.
00:21:54.420 O segundo exercício dessa aula, é o seguinte:
00:21:57.140 Nos vamos analisar uma partida de futebol.
00:22:00.100 De acordo com a quantidade de gols feita por cada time.
00:22:03.580 A situação é o seguinte: Vamos ver uma partida hipotética entre Bangu e Madureira.
00:22:08.060 Eu vou perguntar quantos gols o Bangu fez. 3.
00:22:11.340 Quantos gols o Madureira fez?
00:22:13.340 6
00:22:14.380 A diferença entre gols entre Madureira e Bangu foi de 3.
00:22:17.880 Isso é uma partida normal.
00:22:19.300 Vamos ver outra situação se Bungu fez 3 gols.
00:22:22.220 E Madureira 3.
00:22:23.760 A diferença é 0.
00:22:24.980 E houve um empate.
00:22:26.460 Agora, se por acaso o Bungu fez 1 gol.
00:22:28.960 E o Madureira fez 6 gols.
00:22:30.620 A diferença de 5 gols. Caracteriza uma goleada.
00:22:34.080 Então, de acordo com a execução que mostrei aqui, você vai ser capaz de criar o seu próprio algoritmo.
00:22:39.880 Para análise de jogos de futebol.
00:22:41.920 E lembrando que agora nos estamos trabalhando com valores inteiros
00:22:45.300 É possível sim, usar a estrutura escolha
00:22:47.720 Caso seja necessário, caso você prefira utilizar o escolha.
00:22:50.620 Eu recomendo que você faça utilizando o SE e também utilizando o escolha. Duas situações diferentes.
00:22:56.740 Espero você tenha entendido, essa aula finaliza o conceito de estruturas condicionais.
00:23:01.220 Na próxima aula, nos já vamos partir para laços interativos, que são as estruturas de repetição.
00:23:06.020 E você vai aprender a fazer um código repetir mais de uma vez.
00:23:09.340 Mais uma vez, eu queria agradecer a visita de todo mundo, todos os elogios que nos estamos recebendo
00:23:13.440 pelas redes sociais, pelo YouTube, pelo Facebook, por todo lugar
00:23:17.040 E queria pedir mais uma vez se você não se inscreveu, clica aqui, se inscreve
00:23:21.420 Configura para você receber emails sempre quando estivermos aulas novas
00:23:24.620 Então, clicando aqui no inscrever e depois na engrenaginha do lado do Inscreva-se
00:23:28.400 Você autoriza o recebimento de emails e clicando aqui
00:23:31.640 você tem acesso a todas as aulas organizadas numa Playlists toda bonitinha
00:23:36.100 E sempre lembrando, acessando o site cursoemvideo.com
00:23:39.360 Você poderá se inscrever no curso de Algoritmo
00:23:41.600 E ter acesso as respostas desse algoritmo
00:23:44.160 que sai apenas uma semana depois que essa aula foi disponibilizada
00:23:47.980 Você tem uma semana para praticar e eu não dar a resposta antes de você tentar
00:23:52.340 Então, quando sair a aula 8
00:23:54.240 Sai também as respostas da aula 7
00:23:56.800 Nunca sai antes, por que senão os alunos que estão acompanhando semanalmente
00:24:01.340 vão ter uma facilitação muito grande
00:24:03.080 Então, eu recomendo antes de olhar a resposta
00:24:06.220 Tente fazer
00:24:07.300 Eu queria pedir também como sempre, para você curtir esse vídeo
00:24:09.980 Compartilhar nas redes sociais, mostrar o link para seus amigos
00:24:13.180 Mostre, divulgue o site do Curso em Vídeo
00:24:15.640 Pois ele é totalmente gratuito, ele é totalmente para você
00:24:18.620 Um forte abraço, bons estudos e até a próxima!
