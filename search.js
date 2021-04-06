function searchPage() {
  let input, cards, filter;
  input = document.getElementById("page-search");
  cards = document.getElementsByClassName("card");
  filter = input.value.toUpperCase();

  for (let i = 0; i < cards.length; i++) {
    if (cards[i].textContent.toUpperCase().indexOf(filter) > -1) {
      cards[i].classList.remove("hidden");
    } else {
      cards[i].classList.add("hidden");
    }
  }
}
