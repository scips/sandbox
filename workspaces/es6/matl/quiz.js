
var iteration = 0;
var completeDisplay = []

/**
 * Tu as un afficheur binaire à construire
 * Dès qu'il est construit tu peux lancer le programme
 */
var main = function main() {
  var binaryDisplay = setupBinaryDisplay();
  do{
    var quizcount = ++iteration;
    var quizfound = 0;
    while(quizfound<quizcount){
      var answer = promptQuizz(iteration, quizfound);
      if (valid(iteration, quizfound, answer)) {
        quizfound++;
      } else {
        drink();
      }
    }
    print(giveAHint(iteration));
    var expectedOutput = getExpectedOutput(iteration);
    do {
      var actualOutput = run(ask);
      if (expectedOutput != actualOutput) {
        drink() && reset(binaryDisplay);
      }
    } while (expectedOutput != actualOutput);
    completeDisplay.push(actualOutput);
  } while (!found(completeDisplay));
  reward();
};

/**
 * Pour que cette fonction retourne et que le programme continue
 * il faut trouver des gens pour faire les bits d'un afficheur binaire
 * permettant d'écrire un caractère UTF-8 (1 byte)
 * @return binaryDisplay
 */
var setupBinaryDisplay = function setupBinaryDisplay() {
};

/**
 * Petite questions
 * @param int iteration
 * @param int indiceQuestion
 * @return {[type]} [description]
 */
var promptQuizz = function promptQuizz(iteration, indiceQuestion) {
  var questions = [
    [],
    ["Qui a inventé l'HTML?",],
    [],
    [],
    []
  ];
  var countQ = questions[iteration].length;
  return questions[iteration][indiceQuestion%countQ];
};

/**
 * vérifie si la réponse: answer correspond bien à la réponse pour l'itération et la questionOrder
 * @param  int iteration      le n° de l'itération
 * @param  int questionOrder  le n° de la question de l'itération
 * @param  string answer      la réponse de Mathieu
 * @return bool               l'ensemble des membres trouve la réponse valide
 */
var valid = function valid(iteration, questionOrder, answer) {
  var reponses = [
    [],
    ["Tim Berners-Lee"],
    [],
    [],
    []
  ];
};

/**
 * Donne le nombre à afficher
 * @param  int iteration  le n° de l'itération
 * @return int            la valeur à afficher
 */
var giveAHint = function giveAHint(iteration) {
};

/**
 * récupère l'entier au format binaire (8bits)
 * @param  int iteration  le n° de l'iteration
 * @return bits[8]        un tableau de 8 bits dans l'ordre 1,2,4,8,16,32,64,128
 */
var getExpectedOutput = function getExpectedOutput(iteration) {
};

/**
 * Poser une question à une personne à une position donnée de l'afficheur binaire
 * @param  int indice position de la personne dans l'afficheur binaire
 * @return bit 0 ou 1
 */
var ask = function ask(indice) {
  var reponse = prompt("Une question perso à la personne en position: " + indice);
  var action = 'assise';
  var retour = 0;
  if (reponse == 'oui') {
    action = 'debout';
    retour = 1;
  }
  print('mettre la personne en position: ' + indice + ' ' + action);
  return retour;
};

/**
 * [run forest run]
 * Il suffit de passer de personne en personne pour leur poser une question
 * @param  {[type]} fct [description]
 * @return {[type]}     [description]
 */
var run = function run(fct) {
  var result = [0,0,0,0,0,0,0,0];
  for(var i=0;i<8;i++) {
    result[i] = fct(i);
  }
  return result;
};

/**
 * [drink responsibly or]
 * @return drunk home
 */
var drink = function drink() {
};

/**
 * tu dois courrir autour du display en passant ta main au dessus des gens
 * pour qu'ils soient tous assis (=> remise à 0)
 * @param  array by ref display   array à remettre à zero
 */
var reset = function reset(display) {
  for (var i=0;i<8;i++) {
    display[i] = 0;
  }
};

/**
 * vérifie si la chaîne de caractère est la bonne
 * @param array of array of bit (en fait c'est un tableau de caractères)
 * @return bool
 */
var found = function found(letters) {
};

/**
 * [reward description]
 * @return {[type]} [description]
 */
var reward = function reward() {
};

main();
