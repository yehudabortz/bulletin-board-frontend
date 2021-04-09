const dropdownList = document.getElementById("dropdown-bulletin-list");
const cardWrap = document.querySelector("#card-wrap");
// const apiEndPoint = "http://localhost:3000";
const apiEndPoint = "https://bulletin-board-backend.herokuapp.com";
//
window.addEventListener("DOMContentLoaded", () => {
  createBulletins();
  addDropdownOptionEventListener();
  newBulletinLinkClick();
  newBoardLinkClick();
  Bulletin.deleteBulletin();
});

function currentBulletin() {
  return dropdownList.options[dropdownList.selectedIndex];
}

function fetchAllBulletinData() {
  return fetch(`${apiEndPoint}/bulletins`).then((res) => res.json());
}

function createBulletins() {
  fetchAllBulletinData().then((bulletins) => {
    bulletins.forEach((bulletin) => {
      let newB = new Bulletin(bulletin.name, bulletin.id, bulletin.baords);
      newB.appendBulletinsToList();
    });
    Bulletin.generateFirstLoadedBulletin();
  });
}

function addDropdownOptionEventListener() {
  document.addEventListener("input", function (event) {
    if (event.target.type === "select-one") {
      let newBoard = new Board();
      newBoard.fetchAndAppendBoards(event.target.value);
    }
  });
}

function newBulletinLinkClick() {
  let newBulletinModal = document.getElementById("new-bulletin-modal");
  let newBulletinLink = document.getElementById("new-bulletin");
  newBulletinLink.addEventListener("click", modalPopup.bind(newBulletinModal));
}

function newBoardLinkClick() {
  let newBoardModal = document.getElementById("new-board-modal");
  let newBoardLink = document.getElementById("new-board");
  newBoardLink.addEventListener("click", modalPopup.bind(newBoardModal));
}

function submitNewBulletin() {
  let form = event.target;
  let bulletinName = form.elements["name"].value;
  form.reset();

  try {
    formData = { name: bulletinName, bulletin_id: currentBulletin().value };
  } catch {
    formData = { name: bulletinName };
  }

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formData),
  };

  if (event.target.id === "new-bulletin-form") {
    makeNewBulletinRequest(configObj);
  } else if (event.target.id === "new-board-form") {
    makeNewBoardRequest(configObj);
  }
}

function makeNewBulletinRequest(configObj) {
  return fetch(`${apiEndPoint}/bulletins`, configObj)
    .then((res) => res.json())
    .then((data) => {
      let bulletinInstance = new Bulletin(data.name, data.id);
      let boardInstance = new Board(data.id);

      bulletinInstance.appendBulletinsToList();
      bulletinInstance.assignSelectOptionToNew();

      boardInstance.fetchAndAppendBoards(data.id);
    })
    .catch((error) => alert(error.message));
}

function makeNewBoardRequest(configObj) {
  return fetch(`${apiEndPoint}/boards`, configObj)
    .then((res) => res.json())
    .then((data) => {
      let boardInstance = new Board(data.name, data.id);
      boardInstance.appendBoard();
    })
    .catch((error) => console.log(error.message));
}

function modalPopup() {
  let screenContent = document.querySelector(".screen-content");
  screenContent.classList.remove("hidden");

  let idSplit = event.target.id.split("-");
  let cardId = idSplit[idSplit.length - 1];

  if (this.id.includes("modal", 0)) {
    let modalForm;
    for (let tag of this.children) {
      if (tag.tagName === "FORM") modalForm = tag;
    }
    modalForm.setAttribute("data-card-id", cardId);
    fillInFormData(modalForm, cardId);
    console.log(this);
  }

  this.classList.remove("hidden");
  modalHideEvent(this, screenContent);
}

function fillInFormData(form, cardId) {
  id = parseInt(cardId, 10);
  let newBoardInstance = new Board();
  newBoardInstance.fetchResourceData("boards", cardId).then((data) => {
    try {
      form.elements["name"].value = data.name;
    } catch {
      console.log("Unable to assign value to board.");
    }
  });
}

function modalHideEvent(mod) {
  let screenContent = document.querySelector(".screen-content");
  let exButtons = document.querySelectorAll(".icon.ex");

  function removeModal() {
    if (mod) mod.classList.add("hidden");
    screenContent.classList.add("hidden");
  }

  for (let exBtn of exButtons) {
    exBtn.addEventListener("click", removeModal);
  }
  screenContent.addEventListener("click", removeModal);
  document.addEventListener("submit", removeModal);
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function opacityAnimateIn(element) {
  element.animate([{ opacity: 0 }, { opacity: 1, easing: "ease-out" }], 500);
}
