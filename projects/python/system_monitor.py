import psutil
import time
import json
from datetime import datetime
from flask import Flask, render_template, jsonify

app = Flask(__name__)

class SystemMonitor:
    def __init__(self):
        self.data_history = []
    
    def get_system_info(self):
        """Collect current system information"""
        cpu_percent = psutil.cpu_percent(interval=1)
        memory = psutil.virtual_memory()
        disk = psutil.disk_usage('/')
        network = psutil.net_io_counters()
        
        system_info = {
            'timestamp': datetime.now().isoformat(),
            'cpu_percent': cpu_percent,
            'memory_percent': memory.percent,
            'memory_used_gb': round(memory.used / (1024**3), 2),
            'memory_total_gb': round(memory.total / (1024**3), 2),
            'disk_percent': disk.percent,
            'disk_used_gb': round(disk.used / (1024**3), 2),
            'disk_total_gb': round(disk.total / (1024**3), 2),
            'network_sent_mb': round(network.bytes_sent / (1024**2), 2),
            'network_recv_mb': round(network.bytes_recv / (1024**2), 2)
        }
        
        return system_info
    
    def log_system_data(self):
        """Log system data to history"""
        data = self.get_system_info()
        self.data_history.append(data)
        
        # Keep only last 100 entries
        if len(self.data_history) > 100:
            self.data_history.pop(0)
        
        return data
    
    def get_alerts(self, data):
        """Check for system alerts"""
        alerts = []
        
        if data['cpu_percent'] > 80:
            alerts.append(f"High CPU usage: {data['cpu_percent']}%")
        
        if data['memory_percent'] > 85:
            alerts.append(f"High memory usage: {data['memory_percent']}%")
        
        if data['disk_percent'] > 90:
            alerts.append(f"Low disk space: {data['disk_percent']}% used")
        
        return alerts

# Initialize monitor
monitor = SystemMonitor()

@app.route('/')
def dashboard():
    return '''
    <!DOCTYPE html>
    <html>
    <head>
        <title>System Monitor Dashboard</title>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .metrics { display: flex; gap: 20px; margin-bottom: 20px; }
            .metric { background: #f0f0f0; padding: 15px; border-radius: 5px; flex: 1; }
            .alerts { background: #ffebee; padding: 10px; border-radius: 5px; margin-bottom: 20px; }
            .chart-container { width: 400px; height: 200px; margin: 20px; }
        </style>
    </head>
    <body>
        <h1>System Monitor Dashboard</h1>
        <div id="alerts" class="alerts"></div>
        <div class="metrics">
            <div class="metric">
                <h3>CPU Usage</h3>
                <div id="cpu">Loading...</div>
            </div>
            <div class="metric">
                <h3>Memory Usage</h3>
                <div id="memory">Loading...</div>
            </div>
            <div class="metric">
                <h3>Disk Usage</h3>
                <div id="disk">Loading...</div>
            </div>
        </div>
        
        <script>
            function updateDashboard() {
                fetch('/api/system-data')
                    .then(response => response.json())
                    .then(data => {
                        document.getElementById('cpu').innerHTML = data.cpu_percent + '%';
                        document.getElementById('memory').innerHTML = 
                            data.memory_percent + '% (' + data.memory_used_gb + '/' + data.memory_total_gb + ' GB)';
                        document.getElementById('disk').innerHTML = 
                            data.disk_percent + '% (' + data.disk_used_gb + '/' + data.disk_total_gb + ' GB)';
                        
                        const alertsDiv = document.getElementById('alerts');
                        if (data.alerts.length > 0) {
                            alertsDiv.innerHTML = '<strong>Alerts:</strong> ' + data.alerts.join(', ');
                            alertsDiv.style.display = 'block';
                        } else {
                            alertsDiv.style.display = 'none';
                        }
                    });
            }
            
            // Update every 5 seconds
            setInterval(updateDashboard, 5000);
            updateDashboard();
        </script>
    </body>
    </html>
    '''

@app.route('/api/system-data')
def get_system_data():
    data = monitor.log_system_data()
    alerts = monitor.get_alerts(data)
    data['alerts'] = alerts
    return jsonify(data)

@app.route('/api/history')
def get_history():
    return jsonify(monitor.data_history)

if __name__ == '__main__':
    print("Starting System Monitor Dashboard...")
    print("Access the dashboard at: http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)