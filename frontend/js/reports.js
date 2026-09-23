async function loadReports() {

    try {

        const response = await fetch(
            `${API_BASE_URL}/api/reports`
        );

        if (!response.ok) {
            throw new Error("Failed to load reports");
        }

        const data = await response.json();

        document.getElementById("totalEvents").textContent =
            data.total_events ?? 0;

        document.getElementById("normalEvents").textContent =
            data.normal_events ?? 0;

        document.getElementById("suspiciousEvents").textContent =
            data.suspicious_events ?? 0;

        document.getElementById("totalAlerts").textContent =
            data.total_alerts ?? 0;

        document.getElementById("highAlerts").textContent =
            data.high_severity_alerts ?? 0;

        document.getElementById("criticalAlerts").textContent =
            data.critical_alerts ?? 0;

        showDetectionSummary(data);
        showIncidentHistory(data);

    } catch (error) {

        console.log("Reports API not connected yet.");

        document.getElementById("detectionSummary").textContent =
            "Backend not connected yet.";

        document.getElementById("incidentHistory").textContent =
            "Backend not connected yet.";
    }
}


function showDetectionSummary(data) {

    const container =
        document.getElementById("detectionSummary");

    container.innerHTML = `
        <div class="report-item">
            Total Events: ${data.total_events ?? 0}
        </div>

        <div class="report-item">
            Suspicious Events: ${data.suspicious_events ?? 0}
        </div>

        <div class="report-item">
            Total Alerts: ${data.total_alerts ?? 0}
        </div>
    `;
}


function showIncidentHistory(data) {

    const container =
        document.getElementById("incidentHistory");

    const incidents = data.incident_history || [];

    if (incidents.length === 0) {

        container.innerHTML =
            `<div class="report-item">
                No incidents available.
            </div>`;

        return;
    }

    container.innerHTML = incidents.map(incident => `
        <div class="report-item">
            ${incident.timestamp || "-"}
            — ${incident.type || "Security Incident"}
            — ${incident.severity || "UNKNOWN"}
        </div>
    `).join("");
}


function logout() {

    window.location.href = "login.html";

}


document
    .getElementById("generateReport")
    .addEventListener("click", function () {

        window.print();

    });


loadReports();