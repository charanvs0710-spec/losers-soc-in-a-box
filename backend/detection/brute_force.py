from collections import defaultdict

from alerts.alert_engine import create_alert


def detect_brute_force(events, threshold=3):
    failed_attempts = defaultdict(int)
    alerts = []

    for event in events:
        if event.get("event") == "LOGIN_FAILED":
            key = (event.get("username"), event.get("ip"))
            failed_attempts[key] += 1

            if failed_attempts[key] == threshold:
                alerts.append(
                    create_alert(
                        "BRUTE_FORCE",
                        "HIGH",
                        event.get("username"),
                        event.get("ip"),
                        f"{threshold} consecutive failed login attempts"
                    )
                )

    return alerts