class Hangman {
  constructor() {
    this.keyboardLetters = [..."aąbcćdeęfghijklłmnńoóprsśtuwyzźż"];

    this.passwordsArray = [
      {
        category: "film",
        password: "gwiezdne wojny",
      },
      {
        category: "rzecz",
        password: "samochód",
      },
      {
        category: "rzecz",
        password: "monitor",
      },
      {
        category: "rzecz",
        password: "telefon",
      },
      {
        category: "film",
        password: "harry potter",
      },
      {
        category: "film",
        password: "wpiderman",
      },
      {
        category: "serial",
        password: "wiedźmin",
      },
      {
        category: "serial",
        password: "dom z papieru",
      },
    ];

    this.passwordValue = null;
    this.password = null;
    this.passwordCategory = "";

    this.parts = null;
    this.partIndex = 0;
    this.keyboard = null;
    this.letterBtns = null;
    this.resultBox = null;
    this.resultInfo = null;
    this.playAgainBtn = null;
    this.infoAboutPassword = null;
    this.category = null;

    this.UiSelectors = {
      parts: "[data-parts]",
      keyboard: "[data-keyboard]",
      password: "[data-password]",
      letterBtns: "[data-letterBtn]",
      resultBox: "[data-resultBox]",
      resultInfo: "[data-info]",
      playAgainBtn: "[data-playAgainBtn]",
      infoAboutPassword: "[data-infoAboutPassword]",
      category: "[data-category]",
    };
  }

  initializeHangman() {
    this.parts = document.querySelectorAll(this.UiSelectors.parts);
    this.keyboard = document.querySelector(this.UiSelectors.keyboard);
    this.password = document.querySelector(this.UiSelectors.password);
    this.category = document.querySelector(this.UiSelectors.category);
    this.resultBox = document.querySelector(this.UiSelectors.resultBox);
    this.resultInfo = document.querySelector(this.UiSelectors.resultInfo);
    this.playAgainBtn = document.querySelector(this.UiSelectors.playAgainBtn);
    this.infoAboutPassword = document.querySelector(
      this.UiSelectors.infoAboutPassword
    );

    this.createKeyboardButtons();
    this.createPassword();
    this.addEventListenerForBtns();

    this.playAgainBtn.addEventListener("click", () => this.playAgain());
  }

  createKeyboardButtons() {
    this.keyboardLetters.forEach((letter) =>
      this.keyboard.insertAdjacentHTML(
        "beforeend",
        `<button class='letterBtn' data-letterBtn value=${letter}>${letter}</button>`
      )
    );
  }

  drawPassword() {
    const index = Math.floor(Math.random() * this.passwordsArray.length);
    const password = this.passwordsArray[index];
    this.passwordValue = password.password;
    this.category.textContent = `Kategoria : ${password.category}`;
  }

  createPassword() {
    this.drawPassword();
    this.password.textContent = "";
    for (const letter of this.passwordValue) {
      if (letter !== " ") {
        this.password.textContent += "_";
      } else {
        this.password.textContent += "-";
      }
    }
  }

  addEventListenerForBtns() {
    this.letterBtns = document.querySelectorAll(this.UiSelectors.letterBtns);

    this.letterBtns.forEach((btn) =>
      btn.addEventListener("click", (e) => this.getBtnValue(e))
    );
  }

  getBtnValue(e) {
    e.target.disabled = true;

    if (this.passwordValue.indexOf(e.target.value) > -1) {
      const password = this.passwordValue;
      const passwordPlace = [...this.password.textContent];
      const indexes = [];
      for (let i = 0; i < password.length; i++) {
        if (password[i] === e.target.value) indexes.push(i);
      }

      indexes.forEach((mojIndex) => (passwordPlace[mojIndex] = e.target.value));

      this.password.textContent = passwordPlace.join("");
      if (!this.password.textContent.includes("_")) {
        this.showInfoWinGame();
      }
    } else {
      if (this.partIndex === this.parts.length) {
        return;
      }
      if (this.partIndex === this.parts.length - 1) {
        this.showInfoLostGame();
      }
      this.showBodyParts();
      this.partIndex++;
    }
  }

  showBodyParts() {
    this.parts[this.partIndex].classList.add("showBodyPart");
  }

  showInfoLostGame() {
    this.resultBox.classList.add("showResultWrapper");
    this.resultInfo.classList = "info";
    this.resultInfo.classList.add("red");
    this.resultInfo.textContent = "Przegrałeś";
    this.infoAboutPassword.classList.add("showInfoAboutPassword");
    this.infoAboutPassword.textContent = `Hasło to: ${this.passwordValue}`;
  }

  showInfoWinGame() {
    this.infoAboutPassword.classList.remove("showInfoAboutPassword");
    this.resultBox.classList.add("showResultWrapper");
    this.resultInfo.classList = "info";
    this.resultInfo.classList.add("green");
    this.resultInfo.textContent = "Wygrałeś";
  }

  playAgain() {
    this.parts.forEach((part) => part.classList.remove("showBodyPart"));
    this.resultBox.classList.remove("showResultWrapper");
    this.letterBtns.forEach((btn) => (btn.disabled = false));
    this.partIndex = 0;
    this.createPassword();
  }
}
