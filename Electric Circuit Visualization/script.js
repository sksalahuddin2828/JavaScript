document.addEventListener("DOMContentLoaded", function () {
    const currentSlider = document.getElementById("current-slider");
    const resistanceSlider = document.getElementById("resistance-slider");
    const visualization = document.getElementById("visualization");

    function updateVisualization() {
        const current = parseFloat(currentSlider.value);
        const resistance = parseFloat(resistanceSlider.value);
        const voltage = current * resistance;

        const data = [
            {
                type: "surface",
                z: [[voltage]],
                colorscale: "Viridis",
            },
        ];

        const layout = {
            title: "Voltage as a Function of Current and Resistance",
            scene: {
                xaxis_title: "Current (A)",
                yaxis_title: "Resistance (Ω)",
                zaxis_title: "Voltage (V)",
            },
        };

        Plotly.newPlot(visualization, data, layout);
    }

    currentSlider.addEventListener("input", updateVisualization);
    resistanceSlider.addEventListener("input", updateVisualization);

    // Initial visualization update
    updateVisualization();
});
