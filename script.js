// File Metadata Extraction
document.getElementById("fileInput").addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (file) {
      const metadata = `Name: ${file.name} <br> Size: ${file.size} bytes <br> Type: ${file.type} <br> Last Modified: ${new Date(file.lastModified)}`;
      document.getElementById("fileMetadata").innerHTML = metadata;
      updatePollChart(file.type); // Update poll chart with file type
    }
  });
  
  // File Integrity Checks (Hashing)
  document.getElementById("fileHashInput").addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const hash = CryptoJS.SHA256(CryptoJS.enc.Latin1.parse(event.target.result)).toString();
        document.getElementById("fileHash").innerHTML = `SHA256 Hash: ${hash}`;
      };
      reader.readAsBinaryString(file);
    }
  });
  
  // Log Analysis (Simple Keyword Search Example)
  function analyzeLogs() {
    const logs = document.getElementById("logInput").value;
    const keyword = "error"; // Basic example: looking for the word "error"
    const count = (logs.match(new RegExp(keyword, "gi")) || []).length;
    document.getElementById("logResults").innerHTML = `Found "${keyword}" ${count} times`;
  }
  
  // Poll Chart to track File Types
  let fileTypeCounts = {
    "image": 0,
    "text": 0,
    "application": 0,
    "other": 0
  };
  
  function updatePollChart(fileType) {
    if (fileType.includes("image")) {
      fileTypeCounts.image++;
    } else if (fileType.includes("text")) {
      fileTypeCounts.text++;
    } else if (fileType.includes("application")) {
      fileTypeCounts.application++;
    } else {
      fileTypeCounts.other++;
    }
    
    const ctx = document.getElementById('pollChart').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Images', 'Text', 'Applications', 'Other'],
        datasets: [{
          label: 'File Type Distribution',
          data: [fileTypeCounts.image, fileTypeCounts.text, fileTypeCounts.application, fileTypeCounts.other],
          backgroundColor: ['#ff7e5f', '#feb47b', '#ffb6c1', '#ffadad'],
        }]
      },
      options: {
        responsive: true
      }
    });
  }
  
  // Generate Report (PDF)
  function generateReport() {
    const doc = new jsPDF();
    doc.text("Digital Forensics Report", 20, 20);
    doc.text("File Metadata: " + document.getElementById("fileMetadata").innerHTML, 20, 40);
    doc.text("File Hash: " + document.getElementById("fileHash").innerHTML, 20, 60);
    doc.text("Log Analysis Results: " + document.getElementById("logResults").innerHTML, 20, 80);
    doc.save("forensics_report.pdf");
  }
  