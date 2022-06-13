import clr, os, sys

def init_Monitor() :
    clr.AddReference(os.path.abspath(os.path.join(os.path.dirname( __file__),'..' ))+ R'\additional_resources\OpenHardwareMonitorLib.dll')
    from OpenHardwareMonitor import Hardware
    hw = Hardware.Computer()
    hw.CPUEnabled = True
    hw.Open()
    return hw


data = init_Monitor()


for i in data.Hardware:
    for sensor in i.Sensors:
        if sensor.Name == "CPU Package" and str(sensor.SensorType) == "Temperature":
            print(sensor.Value)
            sys.stdout.flush()