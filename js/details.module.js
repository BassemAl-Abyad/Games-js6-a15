import { Ui } from "./ui.module.js";

export class Details {
  constructor(id) {
    this.ui = new Ui();
    this.initCloseButton();
    this.getDetails(id);
  }

  initCloseButton() {
    const btnClose = document.getElementById("btnClose");
    if (btnClose) {
      btnClose.addEventListener("click", () => {
        document.querySelector(".games")?.classList.remove("d-none");
        document.querySelector(".details")?.classList.add("d-none");
      });
    }
  }

  async getDetails(idGames) {
    const loading = document.querySelector(".loading");
    loading?.classList.remove("d-none");

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${idGames}`,
        options
      );
      const data = await response.json();
      this.ui.displayDetails(data);
    } catch (err) {
      console.error(err);
    } finally {
      loading?.classList.add("d-none");
    }
  }
}
