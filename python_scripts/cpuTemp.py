import clr, os, sys

def init_Monitor() :
    clr.AddReference(os.path.abspath(os.path.join(os.path.dirname( __file__),'..' ))+ R'\additional_resources\OpenHardwareMonitorLib.dll')
    from OpenHardwareMonitor import Hardware
    hw = Hardware.Computer()
    hw.CPUEnabled = True
    hw.Open()
    return hw


data = init_Monitor()
response = ""

for i in data.Hardware:
    for sensor in i.Sensors:
        if sensor.Name == "CPU Total":
            response += str(int(sensor.Value))
        if sensor.Name == "CPU Package" and str(sensor.SensorType) == "Temperature":
            response += "|" + str(int(sensor.Value))

print(response)
sys.stdout.flush()