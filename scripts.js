// Add row functionality
function addRow(date, destination, transportation, notes) {
  event.preventDefault(); // Prevent form from submitting normally

  // Create new row and cells
  var row = document.createElement("tr");
  var dateCell = document.createElement("td");
  var destinationCell = document.createElement("td");
  var transportationCell = document.createElement("td");
  var notesCell = document.createElement("td");
  var actionCell = document.createElement("td"); // Create cell for actions

  // Set cell values
  dateCell.textContent = date;
  destinationCell.textContent = destination;
  transportationCell.textContent = transportation;
  notesCell.textContent = notes;
  actionCell.innerHTML = '<button class="remove-btn">Remove</button>'; // Add remove button

  // Add cells to row
  row.appendChild(dateCell);
  row.appendChild(destinationCell);
  row.appendChild(transportationCell);
  row.appendChild(notesCell);
  row.appendChild(actionCell); // Add action cell to row

  // Add row to table body
  var scheduleBody = document.getElementById("schedule-body");
  scheduleBody.appendChild(row);

  // Clear input fields
  document.getElementById("date-input").value = "";
  document.getElementById("destination-input").value = "";
  document.getElementById("transportation-input").value = "";
  document.getElementById("notes-input").value = "";

  // Add event listener to remove button
  actionCell.querySelector('.remove-btn').addEventListener('click', function() {
      removeRow(row);
  });
}

// Remove row functionality
function removeRow(row) {
  row.remove();
}

// Remove all rows functionality
function removeAllRows() {
  var scheduleBody = document.getElementById("schedule-body");
  scheduleBody.innerHTML = ""; // Remove all rows
}

// Add row to table on form submit
document.getElementById("add-row-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission
  var date = document.getElementById("date-input").value;
  var destination = document.getElementById("destination-input").value;
  var transportation = document.getElementById("transportation-input").value;
  var notes = document.getElementById("notes-input").value;
  addRow(date, destination, transportation, notes);
});

// Add event listener for removing all rows
document.getElementById("remove-all-btn").addEventListener("click", function() {
  removeAllRows();
});
