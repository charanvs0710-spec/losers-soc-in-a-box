def generate_report(events, alerts):
    high = sum(1 for alert in alerts if alert.get("severity") == "HIGH")
    medium = sum(1 for alert in alerts if alert.get("severity") == "MEDIUM")
    low = sum(1 for alert in alerts if alert.get("severity") == "LOW")

    return {
        "total_events": len(events),
        "total_alerts": len(alerts),
        "high_alerts": high,
        "medium_alerts": medium,
        "low_alerts": low,
        "status": "THREATS_DETECTED" if alerts else "NO_THREATS_DETECTED"
    }