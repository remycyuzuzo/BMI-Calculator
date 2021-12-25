(function () {
  // get html elements
  const form = document.querySelector("#form-1");
  const weightMetricEl = document.querySelector("#mass-metric");
  const heightMetricEl = document.querySelector("#height-metric");
  const weightEl = document.querySelector("#weight");
  const heightEl = document.querySelector("#height");
  const resultsEl = document.querySelector("#results");

  /**
   * @class UI
   * @classdesc This class will deal with the DOM, displaying the results on the html page
   */
  class UI {
    static writeBMI(bmi, status) {
      this.resultsEl.innerHTML = `
        <div>
          <h1>${bmi}</h1>
          <h2>${status}</h2>
        </div>
      `;
    }
  }

  /**
   * @class Calculate
   * @classdesc this class contains calculation codes
   */
  class Calculate {
    calculateBMI() {
      let bmi = this.weight / this.height ** 2;

      if (bmi >= 0 && bmi < 18) status = "under weight";
      else if (bmi >= 18 && bmi < 24) status = "normal";
      else if (bmi >= 24 && bmi < 29) status = "overweight";
      else if (bmi >= 29 && bmi <= 35) status = "obese";

      return {
        result: bmi,
        status: status,
      };
    }

    convertToMeters() {
      if (this.heightMetric === "m") return;
      else if (this.heightMetric === "cm") this.height /= 100;
      else if (this.heightMetric === "inches") this.height *= 1600;
      else if (this.heightMetric === "feets") this.height *= 6.7;
    }
    convertToKg() {
      if (this.weightMetric === "kg") return;
      else if (this.weightMetric === "g") this.weight *= 1000;
      else if (this.weightMetric === "lbs") this.weight *= 6.5;
    }
  }
  const calc = new Calculate();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (
      isNaN(weightEl.value) ||
      isNaN(heightEl.value) ||
      heightEl.value === "" ||
      weightEl.value === ""
    ) {
      console.log("one value is not ok");
      return;
    }
    calc.weight = weightEl.value;
    calc.height = heightEl.value;
    calc.weightMetric = weightMetricEl.value;
    calc.heightMetric = heightMetricEl.value;

    calc.convertToKg();
    calc.convertToMeters();

    let bmi = calc.calculateBMI();

    UI.resultsEl = resultsEl;
    UI.writeBMI(bmi.result, bmi.status);
  });
})();
