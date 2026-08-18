#!/usr/bin/env python3
import http.server
import socketserver
import webbrowser
import os

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

print(f"\n=======================================================")
print(f" MS Big Data Interactive Learning Platform Live Server")
print(f" Serving locally at: http://localhost:{PORT}")
print(f"=======================================================\n")

try:
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("Press Ctrl+C to stop the server.")
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\nServer stopped.")
