async function loadAlerts() {

    const tableBody =
        document.getElementById("alertsTableBody");

    try {

        const response = await fetch(
            `${API_BASE_URL}/api/alerts`
        );

        if (!response.ok) {
            throw new Error("Failed to load alerts");
        }

        const data = await response.json();

        const alerts = Array.isArray(data)
            ? data
            : (data.alerts || []);

        displayAlerts(alerts);

    } catch (error) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="8">
                    Backend not connected yet.
                </td>
            </tr>
        `;

        console.log(error);
    }
}


function displayAlerts(alerts) {

    const tableBody =
        document.getElementById("alertsTableBody");

    if (alerts.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="8">
                    No security alerts found.
                </td>
            </tr>
        `;

        return;
    }

    tableBody.innerHTML = alerts.map(alert => {

        const severity =
            String(alert.severity || "LOW").toUpperCase();

        return `
            <tr>

                <td>${alert.id || "-"}</td>

                <td>${alert.alert_type || alert.type || "-"}</td>

                <td class="severity-${severity.toLowerCase()}">
                    ${severity}
                </td>

                <td>${alert.username || "-"}</td>

                <td>${alert.ip || alert.ip_address || "-"}</td>

                <td>${alert.reason || "-"}</td>

                <td>${alert.timestamp || "-"}</td>

                <td>${alert.status || "-"}</td>

            </tr>
        `;

    }).join("");
}


function logout() {

    window.location.href = "login.html";

}


loadAlerts();