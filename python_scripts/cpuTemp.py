import wmi
import sys
w = wmi.WMI(namespace="root\OpenHardwareMonitor")
temperature_infos = w.Sensor()
for sensor in temperature_infos:
    if sensor.SensorType==u'Temperature':
     if sensor.Name==u'CPU Package':
            print(sensor.Value)
            sys.stdout.flush()