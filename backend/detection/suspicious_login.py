def detect_suspicious_login(event):
    if event.get("event") != "LOGIN_SUCCESS":
        return None

    if event.get("suspicious") is True:
        return {
            "type": "SUSPICIOUS_LOGIN",
            "severity": "MEDIUM",
            "username": event.get("username"),
            "ip": event.get("ip"),
            "reason": "Login marked as suspicious"
        }

    return None