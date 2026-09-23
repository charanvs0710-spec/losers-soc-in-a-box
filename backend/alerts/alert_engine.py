def create_alert(alert_type, severity, username, ip, reason):
    return {
        "type": alert_type,
        "severity": severity,
        "username": username,
        "ip": ip,
        "reason": reason
    }