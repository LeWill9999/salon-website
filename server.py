#!/usr/bin/env python3
"""
Simple HTTP Server for testing the salon website locally.
Run this script and access the website at http://localhost:8000
"""

import http.server
import socketserver
import os
import webbrowser

# Set the port for the server
PORT = 8000

# Change to the directory containing the website files
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# Create a simple HTTP server
Handler = http.server.SimpleHTTPRequestHandler
httpd = socketserver.TCPServer(("", PORT), Handler)

print(f"Server started at http://localhost:{PORT}")
print("Press Ctrl+C to stop the server")

# Open the website in the default browser
webbrowser.open(f"http://localhost:{PORT}")

# Start the server
try:
    httpd.serve_forever()
except KeyboardInterrupt:
    print("\nServer stopped.")
    httpd.server_close()