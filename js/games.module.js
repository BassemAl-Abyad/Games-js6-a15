import { Details } from "./details.module.js";
import { Ui } from "./ui.module.js";

export class Games {
  constructor() {
    this.ui = new Ui();
    this.initMenu();
    this.getGames("mmorpg");
  }

  initMenu() {
    document.querySelectorAll(".menu a").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const active = document.querySelector(".menu .active");
        if (active) active.classList.remove("active");
        e.currentTarget.classList.add("active");
        this.getGames(e.currentTarget.dataset.category);
      });
    });
  }

  async getGames(category) {
    const loading = document.querySelector(".loading");
    loading.classList.remove("d-none");

    try {
      const response = await fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${encodeURIComponent(
          category
        )}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "a3c1361f4amsh5491458e640a873p10876djsn35b3e1b4a1ed",
            "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      this.ui.displayDataGame(data);
      this.attachCardEvents();
    } catch (error) {
      console.error("Failed to fetch games:", error);
    } finally {
      loading.classList.add("d-none");
    }
  }

  attachCardEvents() {
    document.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("click", () => {
        this.showDetails(card.dataset.id);
      });
    });
  }

  showDetails(idGame) {
    new Details(idGame);
    document.querySelector(".games").classList.add("d-none");
    document.querySelector(".details").classList.remove("d-none");
  }
}
