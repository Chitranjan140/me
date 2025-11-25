import os
import subprocess
import platform
import socket
import getpass
from datetime import datetime

class ITHelpdeskAutomation:
    def __init__(self):
        self.system_info = self.get_system_info()
        self.log_file = "helpdesk_log.txt"
    
    def get_system_info(self):
        """Gather basic system information"""
        return {
            'os': platform.system(),
            'os_version': platform.version(),
            'machine': platform.machine(),
            'processor': platform.processor(),
            'hostname': socket.gethostname(),
            'username': getpass.getuser(),
            'timestamp': datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
    
    def log_action(self, action, result):
        """Log actions to file"""
        with open(self.log_file, 'a') as f:
            f.write(f"[{datetime.now()}] {action}: {result}\n")
    
    def check_disk_space(self):
        """Check available disk space"""
        try:
            if platform.system() == "Windows":
                result = subprocess.run(['dir', 'C:\\'], capture_output=True, text=True, shell=True)
            else:
                result = subprocess.run(['df', '-h'], capture_output=True, text=True)
            
            self.log_action("Disk Space Check", "Completed successfully")
            return result.stdout
        except Exception as e:
            self.log_action("Disk Space Check", f"Error: {str(e)}")
            return f"Error checking disk space: {str(e)}"
    
    def check_network_connectivity(self, host="8.8.8.8"):
        """Test network connectivity"""
        try:
            if platform.system() == "Windows":
                result = subprocess.run(['ping', '-n', '4', host], capture_output=True, text=True)
            else:
                result = subprocess.run(['ping', '-c', '4', host], capture_output=True, text=True)
            
            success = result.returncode == 0
            self.log_action("Network Connectivity Test", f"Success: {success}")
            return {
                'success': success,
                'output': result.stdout,
                'host': host
            }
        except Exception as e:
            self.log_action("Network Connectivity Test", f"Error: {str(e)}")
            return {'success': False, 'error': str(e)}
    
    def get_running_processes(self):
        """Get list of running processes"""
        try:
            if platform.system() == "Windows":
                result = subprocess.run(['tasklist'], capture_output=True, text=True)
            else:
                result = subprocess.run(['ps', 'aux'], capture_output=True, text=True)
            
            self.log_action("Process List", "Retrieved successfully")
            return result.stdout
        except Exception as e:
            self.log_action("Process List", f"Error: {str(e)}")
            return f"Error getting processes: {str(e)}"
    
    def check_system_resources(self):
        """Check CPU and memory usage"""
        try:
            import psutil
            
            cpu_percent = psutil.cpu_percent(interval=1)
            memory = psutil.virtual_memory()
            
            resource_info = {
                'cpu_usage': f"{cpu_percent}%",
                'memory_usage': f"{memory.percent}%",
                'memory_available': f"{memory.available / (1024**3):.2f} GB",
                'memory_total': f"{memory.total / (1024**3):.2f} GB"
            }
            
            self.log_action("System Resources Check", "Completed successfully")
            return resource_info
        except ImportError:
            return "psutil module not installed. Run: pip install psutil"
        except Exception as e:
            self.log_action("System Resources Check", f"Error: {str(e)}")
            return f"Error checking resources: {str(e)}"
    
    def clear_temp_files(self):
        """Clear temporary files (Windows only)"""
        if platform.system() != "Windows":
            return "This function is Windows-specific"
        
        try:
            temp_dirs = [
                os.path.expandvars(r'%TEMP%'),
                os.path.expandvars(r'%WINDIR%\Temp')
            ]
            
            files_deleted = 0
            for temp_dir in temp_dirs:
                if os.path.exists(temp_dir):
                    for file in os.listdir(temp_dir):
                        try:
                            file_path = os.path.join(temp_dir, file)
                            if os.path.isfile(file_path):
                                os.remove(file_path)
                                files_deleted += 1
                        except:
                            continue
            
            result = f"Deleted {files_deleted} temporary files"
            self.log_action("Temp Files Cleanup", result)
            return result
        except Exception as e:
            self.log_action("Temp Files Cleanup", f"Error: {str(e)}")
            return f"Error clearing temp files: {str(e)}"
    
    def generate_system_report(self):
        """Generate comprehensive system report"""
        report = []
        report.append("=== IT HELPDESK SYSTEM REPORT ===")
        report.append(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        report.append("")
        
        # System Information
        report.append("SYSTEM INFORMATION:")
        for key, value in self.system_info.items():
            report.append(f"  {key.title()}: {value}")
        report.append("")
        
        # Disk Space
        report.append("DISK SPACE:")
        disk_info = self.check_disk_space()
        report.append(disk_info)
        report.append("")
        
        # Network Test
        report.append("NETWORK CONNECTIVITY:")
        network_test = self.check_network_connectivity()
        if network_test['success']:
            report.append("  Status: CONNECTED")
        else:
            report.append("  Status: DISCONNECTED")
        report.append("")
        
        # System Resources
        report.append("SYSTEM RESOURCES:")
        resources = self.check_system_resources()
        if isinstance(resources, dict):
            for key, value in resources.items():
                report.append(f"  {key.replace('_', ' ').title()}: {value}")
        else:
            report.append(f"  {resources}")
        
        return "\n".join(report)

def main():
    """Main function to run helpdesk automation"""
    helpdesk = ITHelpdeskAutomation()
    
    while True:
        print("\n=== IT HELPDESK AUTOMATION TOOL ===")
        print("1. Check Disk Space")
        print("2. Test Network Connectivity")
        print("3. View Running Processes")
        print("4. Check System Resources")
        print("5. Clear Temporary Files")
        print("6. Generate System Report")
        print("7. Exit")
        
        choice = input("\nSelect an option (1-7): ").strip()
        
        if choice == '1':
            print("\nChecking disk space...")
            print(helpdesk.check_disk_space())
        
        elif choice == '2':
            host = input("Enter host to ping (default: 8.8.8.8): ").strip() or "8.8.8.8"
            print(f"\nTesting connectivity to {host}...")
            result = helpdesk.check_network_connectivity(host)
            if result['success']:
                print("✓ Network connectivity is working")
            else:
                print("✗ Network connectivity failed")
        
        elif choice == '3':
            print("\nRetrieving running processes...")
            print(helpdesk.get_running_processes())
        
        elif choice == '4':
            print("\nChecking system resources...")
            resources = helpdesk.check_system_resources()
            if isinstance(resources, dict):
                for key, value in resources.items():
                    print(f"{key.replace('_', ' ').title()}: {value}")
            else:
                print(resources)
        
        elif choice == '5':
            print("\nClearing temporary files...")
            print(helpdesk.clear_temp_files())
        
        elif choice == '6':
            print("\nGenerating system report...")
            report = helpdesk.generate_system_report()
            print(report)
            
            # Save report to file
            with open(f"system_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt", 'w') as f:
                f.write(report)
            print("\nReport saved to file.")
        
        elif choice == '7':
            print("Goodbye!")
            break
        
        else:
            print("Invalid option. Please try again.")

if __name__ == "__main__":
    main()