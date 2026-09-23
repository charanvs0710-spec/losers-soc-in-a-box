async function loadDashboard() {

    try {

        const response = await fetch(
            `${API_BASE_URL}/api/dashboard`
        );

        if (!response.ok) {
            throw new Error("Failed to load dashboard");
        }

        const data = await response.json();

        document.getElementById("totalEvents").textContent =
            data.total_events ?? 0;

        document.getElementById("suspiciousEvents").textContent =
            data.suspicious_events ?? 0;

        document.getElementById("activeAlerts").textContent =
            data.active_alerts ?? 0;

        document.getElementById("highAlerts").textContent =
            data.high_critical_alerts ?? 0;

    } catch (error) {

        console.log("Dashboard API not connected yet.");

    }
}


function logout() {

    window.location.href = "login.html";

}


loadDashboard();