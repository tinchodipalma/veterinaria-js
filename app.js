'use strict';

const newMascotaEvent = new Event('newMascota');

const PetsMap = {
  'p': Perro,
  'g': Gato,
  'c': Conejo,
};

const veterinariaDWI = new Veterinaria('Veterinaria DWI', 'Castelar 750', []);

function startApp() {
  document.querySelector('form').addEventListener(
    'submit',
    onFormSubmit
  );


  document.querySelector('body').addEventListener(
    'newMascota',
    updatePetsList
  );
}

function onFormSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const newMascotaData = {
    name: data.get('name'),
    color: data.get('color'),
    birthdate: data.get('birthdate'),
    weight: data.get('weight'),
    type: data.get('type'),
  };

  let ObjConstructor = PetsMap[newMascotaData.type];
  const newMascotaObj = new ObjConstructor(newMascotaData.name, newMascotaData.birthdate, newMascotaData.color, newMascotaData.weight);

  veterinariaDWI.addMascota(newMascotaObj);

  document.querySelector('body').dispatchEvent(newMascotaEvent);
}

function updatePetsList() {
  const pets = veterinariaDWI.pets;

  const petsNames = pets.map(pet => pet.name);

  const petsContainerElement = document.querySelector('.pets_container');

  const ulElement = document.createElement('ul');

  petsNames.forEach(function (petName, index) {
    const liElement = document.createElement('li');
    liElement.setAttribute('data-index', index);
    liElement.innerText = petName;
    liElement.addEventListener(
      'click',
      removePetFromList
    );

    ulElement.appendChild(liElement);
  });

  petsContainerElement.innerHTML = '';
  petsContainerElement.appendChild(ulElement);

}

function removePetFromList(event) {
  const liElement = event.target;

  veterinariaDWI.removeMascota(liElement.dataset.index);

  updatePetsList();
}




/** Clases **/
function Veterinaria(name, address, pets) {
  this.name = name;
  this.address = address;
  this.pets = pets; // Array => []
}

Veterinaria.prototype.addMascota = function (mascota) {
  this.pets.push(mascota);
}

Veterinaria.prototype.removeMascota = function (index) {
  this.pets.splice(index, 1);
}


function Mascota(name, birthdate, color, weight, sound) {
  this.name = name;
  this.birthdate = birthdate;
  this.color = color;
  this.weight = weight;
  this.sound = sound;
}

Mascota.prototype.emitirSonido = function () {
  return this.sound;
}


function Perro(name, birthdate, color, weight) {
  Mascota.call(this, name, birthdate, color, weight, 'guau guau');
}
Perro.prototype = Object.create(Mascota.prototype);
Perro.prototype.constructor = Perro;


function Gato(name, birthdate, color, weight) {
  Mascota.call(this, name, birthdate, color, weight, 'miauuu');
}
Gato.prototype = Object.create(Mascota.prototype);
Gato.prototype.constructor = Gato;


function Conejo(name, birthdate, color, weight) {
  Mascota.call(this, name, birthdate, color, weight, 'crunch (mordisco)');
}
Conejo.prototype = Object.create(Mascota.prototype);
Conejo.prototype.constructor = Conejo;
