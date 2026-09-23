let allEvents = [];

async function loadEvents() {

    const tableBody = document.getElementById("eventsTableBody");

    try {

        const response = await fetch(
            `${API_BASE_URL}/api/events`
        );

        if (!response.ok) {
            throw new Error("Failed to load events");
        }

        const data = await response.json();

        allEvents = Array.isArray(data)
            ? data
            : (data.events || []);

        displayEvents(allEvents);

    } catch (error) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="7">
                    Backend not connected yet.
                </td>
            </tr>
        `;

        console.log(error);
    }
}


function displayEvents(events) {

    const tableBody =
        document.getElementById("eventsTableBody");

    if (events.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="7">
                    No security events found.
                </td>
            </tr>
        `;

        return;
    }

    tableBody.innerHTML = events.map(event => {

        const severity =
            String(event.severity || "LOW").toUpperCase();

        return `
            <tr>

                <td>${event.timestamp || "-"}</td>

                <td>${event.event || event.message || "-"}</td>

                <td>${event.username || "-"}</td>

                <td>${event.ip || event.ip_address || "-"}</td>

                <td>${event.classification || "-"}</td>

                <td class="severity-${severity.toLowerCase()}">
                    ${severity}
                </td>

                <td>${event.status || "-"}</td>

            </tr>
        `;

    }).join("");
}


function filterEvents(type) {

    if (type === "ALL") {

        displayEvents(allEvents);
        return;

    }

    const filtered = allEvents.filter(event => {

        const classification =
            String(event.classification || "")
            .toUpperCase();

        const severity =
            String(event.severity || "")
            .toUpperCase();

        if (type === "HIGH") {
            return severity === "HIGH" ||
                   severity === "CRITICAL";
        }

        return classification === type;
    });

    displayEvents(filtered);
}


function logout() {

    window.location.href = "login.html";

}


loadEvents();