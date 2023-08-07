class QuadraticEquationSolver {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    // Method to solve using factoring
    solveByFactoring() {
        // Factor the quadratic equation
        const factors = this.factorQuadratic();
        if (!factors) {
            return "Cannot be factored";
        }

        // Solve for x
        const solutions = factors.map(factor => -factor / this.a);
        return solutions;
    }

    // Method to solve using completing the square
    solveByCompletingSquare() {
        // Complete the square
        const completedSquare = this.completeSquare();
        if (!completedSquare) {
            return "Cannot be solved using completing the square method";
        }

        // Solve for x
        const solutions = completedSquare.map(x => Math.sqrt(x));
        return solutions;
    }

    // Method to solve using the quadratic formula
    solveByQuadraticFormula() {
        const discriminant = Math.pow(this.b, 2) - 4 * this.a * this.c;
        if (discriminant < 0) {
            return "No real solutions";
        }

        const root1 = (-this.b + Math.sqrt(discriminant)) / (2 * this.a);
        const root2 = (-this.b - Math.sqrt(discriminant)) / (2 * this.a);
        return [root1, root2];
    }

    // Helper method to factor the quadratic equation
    factorQuadratic() {
        // Implement your factoring logic here
        // Return an array of factors
    }

    // Helper method to complete the square
    completeSquare() {
        // Implement your completing the square logic here
        // Return an array of solutions
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("toggle-solver");
    const solverContainer = document.querySelector(".tools");
    createSolverContent();

    function createSolverContent() {
        solverContainer.innerHTML = `
            <div>
                <label for="coeff-a">Coefficient a:</label>
                <input type="number" id="coeff-a">
            </div>
            <div>
                <label for="coeff-b">Coefficient b:</label>
                <input type="number" id="coeff-b">
            </div>
            <div>
                <label for="coeff-c">Coefficient c:</label>
                <input type="number" id="coeff-c">
            </div>
            <button id="solve-button">Solve</button>
        
            <div class="solutions">
                <h3>Solutions:</h3>
                <p id="factoring-solution">Factoring: </p>
                <p id="completing-square-solution">Completing the Square: </p>
                <p id="quadratic-formula-solution">Quadratic Formula: </p>
            </div>
            
            <div class="steps">
                <h3>Steps:</h3>
                <div id="factoring-steps"></div>
                <div id="completing-square-steps"></div>
                <div id="quadratic-formula-steps"></div>
            </div>
        `;

        const solveButton = document.getElementById("solve-button");
        const factoringSolution = document.getElementById("factoring-solution");
        const completingSquareSolution = document.getElementById("completing-square-solution");
        const quadraticFormulaSolution = document.getElementById("quadratic-formula-solution");

        const factoringSteps = document.getElementById("factoring-steps");
        const completingSquareSteps = document.getElementById("completing-square-steps");
        const quadraticFormulaSteps = document.getElementById("quadratic-formula-steps");

        solveButton.addEventListener("click", () => {
            const a = parseFloat(document.getElementById("coeff-a").value);
            const b = parseFloat(document.getElementById("coeff-b").value);
            const c = parseFloat(document.getElementById("coeff-c").value);

            const solver = new QuadraticEquationSolver(a, b, c);

            const solutionsFactoring = solver.solveByFactoring();
            const solutionsCompletingSquare = solver.solveByCompletingSquare();
            const solutionsQuadraticFormula = solver.solveByQuadraticFormula();

            factoringSolution.textContent = "Factoring: " + solutionsFactoring;
            completingSquareSolution.textContent = "Completing the Square: " + solutionsCompletingSquare;
            quadraticFormulaSolution.textContent = "Quadratic Formula: " + solutionsQuadraticFormula;

            // Display steps for Quadratic Formula
            const quadraticFormulaSteps = document.getElementById("quadratic-formula-steps");
            const d = Math.pow(b, 2) - 4 * a * c;
            // Step 1: Identify coefficients
            const step1 = document.createElement("p");
            step1.innerHTML =katex.renderToString(`${a}x^2 + ${b}x + ${c} = 0`, { throwOnError: false }) +  "<br>Step 1. Identify " + katex.renderToString(`(a, b)`, { throwOnError: false })
                + " and " + katex.renderToString(`(c)`, { throwOnError: false }) + " on comparing with " + katex.renderToString(`(ax^2 + bx + c = 0)`, { throwOnError: false });
            quadraticFormulaSteps.appendChild(step1);

            const step1a = document.createElement("p");
            step1a.innerHTML = katex.renderToString(`a = ${a}, b = ${b}, c = ${c}`, { throwOnError: false });
            quadraticFormulaSteps.appendChild(step1a);

            // Step 2: Calculate Discriminant
            const step2 = document.createElement("p");
            step2.innerHTML = "<br>Step 2. Calculate Discriminant: &nbsp;" + katex.renderToString(`(d = b^2 - 4ac)`, { throwOnError: false });
            quadraticFormulaSteps.appendChild(step2);

            const step2a = document.createElement("p");
            step2a.innerHTML = katex.renderToString(`d = ${b}^2 - 4 \\cdot ${a} \\cdot ${c}`, { throwOnError: false }) + "<br>" +katex.renderToString(`d = ${Math.pow(b,2)} -  ${4 * a *c}`, { throwOnError: false }) + "<br>"+  katex.renderToString(`d = ${d}`, { throwOnError: false });
            quadraticFormulaSteps.appendChild(step2a);

            // Check Discriminant and Display Message
            const step3 = document.createElement("p");
            if (d > 0) {
                step3.innerHTML = "<br>Step 3. Since " + katex.renderToString(`(d > 0)`, { throwOnError: false }) + ", roots are real and different.";
            } else if (d === 0) {
                step3.innerHTML = "<br>Step 3. Since " + katex.renderToString(`(d = 0)`, { throwOnError: false }) + ", roots are real and same.";
            } else {
                step3.innerHTML = "<br>Step 3. Since " + katex.renderToString(`(d < 0)`, { throwOnError: false }) + ", roots are not real.";
            }
            quadraticFormulaSteps.appendChild(step3);

            // Display Steps for Real Roots
            if (d >= 0) {
                const step4 = document.createElement("p");
                step4.innerHTML = "<br>Step 4. Formula: &nbsp;" + katex.renderToString(`(x = \\frac{-b \\pm \\sqrt{d}}{2a})`, { throwOnError: false });
                quadraticFormulaSteps.appendChild(step4);

                const step5 = document.createElement("p");
                step5.innerHTML = '<br>Substitute the values: &nbsp;' + katex.renderToString(`(x = \\frac{-${b} \\pm \\sqrt{${d}}}{2 \\cdot ${a}})`, { throwOnError: false });
                quadraticFormulaSteps.appendChild(step5);

                const step6 = document.createElement("p");
                step6.innerHTML = '<br>' + katex.renderToString(`(x = \\frac{-${b} + \\sqrt{${d}}}{${2 * a}} \\text{ or } x = \\frac{-${b} - \\sqrt{${d}}}{${2 * a}})`, { throwOnError: false });
                quadraticFormulaSteps.appendChild(step6);

                const step7 = document.createElement("p");
                step7.innerHTML = '<br>' + katex.renderToString(`(x = ${(-b + Math.sqrt(d)) / (2 * a)} \\text{ or } x = ${(-b - Math.sqrt(d)) / (2 * a)})`, { throwOnError: false });
                quadraticFormulaSteps.appendChild(step7);
            }


        });
    }
});