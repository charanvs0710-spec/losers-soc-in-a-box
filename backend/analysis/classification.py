def classify_event(event, alerts):
    if alerts:
        return "MALICIOUS"

    if event.get("event") == "LOGIN_FAILED":
        return "SUSPICIOUS"

    return "NORMAL"