let pets = JSON.parse(localStorage.getItem("pets")) || [];

function renderPets() {
  const petList = document.getElementById("petList");
  petList.innerHTML = "";
  pets.forEach((pet, index) => {
    petList.innerHTML += `
      <div>
        <strong>${pet.nome}</strong> (${pet.tipo})<br>
        Vacinas: ${pet.vacinas}<br>
        Peso: ${pet.peso} kg<br>
        Última consulta: ${pet.consulta}<br>
        <img src="${pet.foto}" alt="Foto do pet" width="100"><br>
        <button onclick="editPet(${index})">Editar</button>
        <button onclick="deletePet(${index})">Excluir</button>
      </div>
    `;
  });
}

document.getElementById("petForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const reader = new FileReader();
  const file = document.getElementById("foto").files[0];

  reader.onloadend = function () {
    const pet = {
      nome: document.getElementById("nome").value,
      tipo: document.getElementById("tipo").value,
      vacinas: document.getElementById("vacinas").value,
      peso: document.getElementById("peso").value,
      consulta: document.getElementById("consulta").value,
      foto: reader.result
    };

    pets.push(pet);
    localStorage.setItem("pets", JSON.stringify(pets));
    renderPets();
    document.getElementById("petForm").reset();
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    alert("Por favor, selecione uma imagem.");
  }
});

function deletePet(index) {
  pets.splice(index, 1);
  localStorage.setItem("pets", JSON.stringify(pets));
  renderPets();
}

function editPet(index) {
  const pet = pets[index];
  document.getElementById("nome").value = pet.nome;
  document.getElementById("tipo").value = pet.tipo;
  document.getElementById("vacinas").value = pet.vacinas;
  document.getElementById("peso").value = pet.peso;
  document.getElementById("consulta").value = pet.consulta;
  pets.splice(index, 1);
  localStorage.setItem("pets", JSON.stringify(pets));
  renderPets();
}

renderPets();