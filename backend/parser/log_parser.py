import json


def parse_log_file(file_path):
    """Read and validate a JSON log file."""

    try:
        with open(file_path, "r", encoding="utf-8") as file:
            logs = json.load(file)

        if not isinstance(logs, list):
            raise ValueError("Log file must contain a list of events.")

        parsed_events = []

        for log in logs:
            required_fields = ["timestamp", "event", "username", "ip"]

            if not all(field in log for field in required_fields):
                continue

            event = {
                "timestamp": log["timestamp"],
                "event": log["event"],
                "username": log["username"],
                "ip": log["ip"]
            }

            parsed_events.append(event)

        return parsed_events

    except FileNotFoundError:
        print(f"Log file not found: {file_path}")
        return []

    except json.JSONDecodeError:
        print("Invalid JSON format.")
        return []

    except ValueError as error:
        print(f"Invalid log data: {error}")
        return []
    if __name__ == "__main__":
     file_path = "../../sample_logs/normal.json"

    events = parse_log_file(file_path)

    print("Parsed Events:")
    for event in events:
        print(event)