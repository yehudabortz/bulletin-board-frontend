function searchPage() {
  let input, cardTitles, filter;
  input = document.getElementById("page-search");
  cardTitles = document.getElementsByClassName("card-title");
  filter = input.value.toUpperCase();

  for (let i = 0; i < cardTitles.length; i++) {
    if (cardTitles[i].textContent.toUpperCase().indexOf(filter) > -1) {
      cardTitles[i].parentElement.classList.remove("hidden");
    } else {
      cardTitles[i].parentElement.classList.add("hidden");
    }
  }
}
