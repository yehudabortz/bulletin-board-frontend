class Board {
  constructor(name, id, items = []) {
    this.name = name;
    this.id = id;
    this.items = items;
  }

  generateCardsOnPageLoad() {
    if (dropdownList.children) {
      try {
        let bulletinId = dropdownList.options[dropdownList.selectedIndex].value;
        this.fetchAndAppendBoards(bulletinId);
      } catch {
        console.log("No Bulletins Exists Yet");
      }
    }
  }

  fetchResourceData(resource, id = this.id) {
    return fetch(`${apiEndPoint}/${resource}/${id}`).then((res) => res.json());
  }

  fetchAndAppendBoards(id) {
    removeAllChildNodes(cardWrap);
    this.fetchResourceData("bulletins", id).then((bulletin) => {
      try {
        bulletin.boards.forEach((board) => {
          this.appendBoard(board);
        });
      } catch {
        console.log("This bulletin does not have any cards yet.");
      }
    });
  }

  appendBoard(board = this) {
    let card = new Card(board.name, board.id, board.items);
    card.appendCard(board);
  }

  removeBoard(board = this) {
    let boardElement = document.getElementById(`card-${board.id}`);
    boardElement.remove();
  }

  static deleteBoard() {
    const boardIdToDelete = parseInt(this.id.split("-")[1], 10);
    let configObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    fetch(`${apiEndPoint}/boards/${boardIdToDelete}`, configObj)
      .then((res) => res.json())
      .then((data) => {
        let boardInstance = new Board();
        boardInstance.removeBoard(data);
      })
      .catch((error) => console.log(error.message));
  }

  static submitNewBoardItem() {
    let newItemForm = document.querySelector("#new-item-form");
    let cardId = parseInt(newItemForm.getAttribute("data-card-id"), 10);
    let itemTitle = newItemForm.elements["title"].value;
    let itemBody = newItemForm.elements["body"].value;

    newItemForm.reset();
    let formData = { title: itemTitle, body: itemBody, board_id: cardId };
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    };

    fetch(`${apiEndPoint}/items`, configObj)
      .then((res) => res.json())
      .then(() => {
        let boardInstance = new Board();
        boardInstance.fetchAndAppendBoards(currentBulletin().value);
      })
      .catch((error) => console.log(error.message));
  }

  static editBoardTitle() {
    let boardTitle = event.target.elements["name"].value;
    let cardId = parseInt(event.target.getAttribute("data-card-id"), 10);
    event.target.reset();
    let formData = {
      board: {
        name: boardTitle,
      },
    };
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    };
    fetch(`${apiEndPoint}/boards/${cardId}`, configObj)
      .then((res) => res.json())
      .then(() => {
        let newBoardInstance = new Board();
        newBoardInstance.generateCardsOnPageLoad();
      });
  }
}
