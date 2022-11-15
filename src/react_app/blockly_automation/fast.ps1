cls
$Process = Start-Process "npm" -ArgumentList "run build" -NoNewWindow
$MyProcess.PriorityClass = [System.Diagnostics.ProcessPriorityClass]::High