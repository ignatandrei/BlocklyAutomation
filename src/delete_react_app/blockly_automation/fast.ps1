cls
$Process = Start-Process "npm" -ArgumentList "run build" -NoNewWindow
# $Process.PriorityClass = [System.Diagnostics.ProcessPriorityClass]::High