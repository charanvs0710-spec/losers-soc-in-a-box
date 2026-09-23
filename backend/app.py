from flask import Flask, jsonify, request

from detection.brute_force import detect_brute_force
from detection.suspicious_login import detect_suspicious_login
from analysis.classification import classify_event
from analysis.report import generate_report


app = Flask(__name__)


@app.route("/api/analyze", methods=["POST"])
def analyze_logs():
    data = request.get_json()

    if not data or "logs" not in data:
        return jsonify({
            "status": "error",
            "message": "No logs provided"
        }), 400

    events = data["logs"]

    if not isinstance(events, list):
        return jsonify({
            "status": "error",
            "message": "logs must be a list"
        }), 400

    # Detect brute-force activity
    alerts = detect_brute_force(events)

    # Detect suspicious logins
    for event in events:
        suspicious_alert = detect_suspicious_login(event)

        if suspicious_alert:
            alerts.append(suspicious_alert)

    # Classify every event
    results = []

    for event in events:
        event_alerts = [
            alert for alert in alerts
            if alert.get("username") == event.get("username")
            and alert.get("ip") == event.get("ip")
        ]

        classification = classify_event(event, event_alerts)

        results.append({
            "event": event,
            "classification": classification
        })

    # Generate security report
    report = generate_report(events, alerts)

    # Final API response
    return jsonify({
        "status": "success",
        "summary": {
            "total_events": len(events),
            "suspicious_events": len(alerts)
        },
        "report": report,
        "alerts": alerts,
        "events": results
    })


if __name__ == "__main__":
    app.run(debug=False)