const addnewworker = document.getElementById('addnewworker');
const formulaire = document.getElementById('formulaire');
const btnanuler = document.getElementById('btnanuler');
const btnajouter = document.getElementById('btnajouter');
const staffList = document.getElementById('staffList');


const assing = document.getElementById("assing");
const assignList = document.getElementById("assignList");
const closeAssign = document.getElementById("closeAssign");


const fiche = document.getElementById("fiche");
const closeFiche = document.getElementById("closeFiche");

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);   
}

function validatePhone(tel) {
    return /^[0-9+\-\s()]{10,}$/.test(tel);
}


addnewworker.addEventListener('click', () => {
  formulaire.style.display = 'flex';
});


btnanuler.addEventListener('click', () => {
  formulaire.style.display = 'none';
});


btnajouter.addEventListener('click', () => {

  let img = document.getElementById("inp_img").value;
  const nom   = document.getElementById('inp_nom').value.trim();
  const role  = document.getElementById('inp_role').value.trim();
  const email = document.getElementById('inp_email');
  const tel   = document.getElementById('inp_tel');
  const exp   = document.getElementById('inp_exp').value.trim();
  const local = document.getElementById('inp_local').value.trim();

  
  if (!validateEmail(email.value)) {
        email.style.border = '2px solid red';
        return;
  } else {
        email.style.border = "";
  }

  if (!validatePhone(tel.value)) {
        tel.style.border = '2px solid red';
        return;
  } else {
        tel.style.border = "";
  }


  const worker = document.createElement('div');
  worker.className = "worker-card";

  worker.dataset.img = img;
  worker.dataset.nom = nom;
  worker.dataset.role = role;
  worker.dataset.email = email;
  worker.dataset.tel = tel;
  worker.dataset.exp = exp;
  worker.dataset.local = local;

  worker.innerHTML = `
      
      <button class="x">x</button>
      <div class= "photo-name">
      <img src="${img || ''}" class="photo">
      <div class = "name-role">
      <p class="name" ><strong>${nom}</strong></p><br>
      <p class="name">__ ${role}</p>
      </div>
      </div>
      
  `;

 

worker.querySelector(".x").addEventListener("click", (e) => {
  e.stopPropagation(); 
  worker.remove();     
});

 
  

  
  worker.addEventListener('click', () => {
    document.getElementById("fiche_img").src = worker.dataset.img || "";

    document.getElementById('fiche_nom').textContent   = worker.dataset.nom;
    document.getElementById('fiche_role').textContent  = worker.dataset.role;
    document.getElementById('fiche_email').textContent = worker.dataset.email;
    document.getElementById('fiche_tel').textContent   = worker.dataset.tel;
    document.getElementById('fiche_exp').textContent   = worker.dataset.exp;
    document.getElementById('fiche_local').textContent = worker.dataset.local;

    fiche.style.display = 'flex';
  });

 



  staffList.appendChild(worker);

  
  document.querySelectorAll('#formulaire input, #formulaire select')
    .forEach(i => i.value = "");

  formulaire.style.display = 'none';

  closeFiche.addEventListener("click", () => {
    fiche.style.display = "none";
  });
});




document.querySelectorAll(".card").forEach(card => {
  const btn = card.querySelector(".btn-add");
  const assing = card.querySelector(".assing");
  const assignList = card.querySelector(".assign-list");
  const closeAssign = card.querySelector(".closeAssign");

  btn.addEventListener("click", () => {
    assignList.innerHTML = "";

    const workers = document.querySelectorAll(".worker-card");
    if(workers.length === 0){
      assignList.innerHTML = "<p>Aucun employé disponible.</p>";
    } else {
      workers.forEach(w => {


        const role = w.dataset.role;
        const salle = card.id;
        let autorise = false;

    if (role === "Manager") {
          autorise = true;
        } 
      else if (role === "Réceptionniste") {
      autorise = !(salle === "serveurs" || salle === "sécurité" || salle === "archives");
       } 
      else if (role === "Technicien IT") {
      autorise = !(salle === "Réception" || salle === "sécurité" || salle === "serveurs" );
      } 
      else if (role === "Agent de sécurité") {
      autorise = !(salle === "Réception" || salle === "serveurs");
      } 
      else if (role === "Nettoyage") {
      autorise = (salle !== "archives");
      } 
      else {
      const sallesNonAutorise = ["Réception", "serveurs", "sécurité"];
      autorise = !sallesNonAutorise.includes(salle);
      }

      if (!autorise) return;



        const div = document.createElement("div");
        div.className = "worker-option";
        div.textContent = w.dataset.nom + " - " + w.dataset.role;

        div.addEventListener("click", () => {
        const assignedWorker = document.createElement("div");
        const buttonanullworker = document.createElement("button");
        buttonanullworker.textContent = "x";
        buttonanullworker.className = "anullworker";
        assignedWorker.className = "assigned-worker";                                       
        assignedWorker.textContent = w.dataset.nom + " - " + w.dataset.role;

        assignedWorker.appendChild(buttonanullworker);
        card.appendChild(assignedWorker);


        w.remove();
            
        
        buttonanullworker.addEventListener("click", () => {
          assignedWorker.remove();
          
          staffList.appendChild(w);
        });
        
            
    
        assing.style.display = "none";

  

       });


        assignList.appendChild(div);
      });
    }

    assing.style.display = "block";
  });

  closeAssign.addEventListener("click", () => {
    assing.style.display = "none";
  });


  function rougeRooms() {
    document.querySelectorAll(".card").forEach(card => {
        const salleId = card.id;

        
        const sallesNeutres = ["conference", "personnel"];

        if (sallesNeutres.includes(salleId)) {
            card.classList.remove("rouge");
            return;
        }

        
        const assigned = card.querySelectorAll(".assigned-worker");
        if (assigned.length === 0) {
            card.classList.add("rouge");
        } else {
            card.classList.remove("rouge");
        }
    });
}

setInterval(rougeRooms, 1000);

  








});
