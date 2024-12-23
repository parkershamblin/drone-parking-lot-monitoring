// Simulate monitoring data
const parkingCanvas = document.getElementById("parkingCanvas");
const logList = document.getElementById("logList");
const ctx = parkingCanvas.getContext("2d");

// Set canvas dimensions for responsive design
function resizeCanvas() {
  const container = document.querySelector("#monitoring");
  parkingCanvas.width = container.offsetWidth;
  parkingCanvas.height = 0.5 * container.offsetWidth; // Adjust height based on width for aspect ratio
}

// Example parking lot layout
const parkingSpots = [
  { x: 50, y: 50, width: 200, height: 500, occupied: false },
  { x: 350, y: 50, width: 200, height: 500, occupied: true },
  { x: 650, y: 50, width: 200, height: 500, occupied: false },
];

// Draw the parking lot
function drawParkingLot() {
  ctx.clearRect(0, 0, parkingCanvas.width, parkingCanvas.height);

  parkingSpots.forEach((spot, index) => {
    ctx.fillStyle = spot.occupied ? "red" : "green";
    ctx.fillRect(spot.x, spot.y, spot.width, spot.height);
    ctx.strokeRect(spot.x, spot.y, spot.width, spot.height);

    // Set font size and style
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";

    // Align text
    ctx.textAlign = "center"; // Horizontal alignment: center of the rectangle
    ctx.textBaseline = "middle"; // Vertical alignment: center of the rectangle

    // Draw text at the center of the spot
    const textX = spot.x + spot.width / 2; // Center horizontally
    const textY = spot.y + spot.height / 2; // Center vertically
    ctx.fillText(`Spot ${index + 1}`, textX, textY);
  });
}

// Simulate drone updates
function updateParkingStatus() {
  const spotIndex = Math.floor(Math.random() * parkingSpots.length);
  parkingSpots[spotIndex].occupied = !parkingSpots[spotIndex].occupied;

  // Add to log
  const logItem = document.createElement("li");
  logItem.textContent = `Spot ${spotIndex + 1} is now ${
    parkingSpots[spotIndex].occupied ? "occupied" : "free"
  }`;
  logList.prepend(logItem);

  drawParkingLot();
}

// Initial canvas resizing and draw
resizeCanvas();
drawParkingLot();

// Simulate updates every 3 seconds
setInterval(updateParkingStatus, 3000);

// Resize canvas on window resize for responsive design
window.addEventListener("resize", resizeCanvas);
