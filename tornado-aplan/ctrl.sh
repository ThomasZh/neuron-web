#!/bin/sh
# 
# start/stop the Service
#   
# do some init here
# 
case "$1" in
'restart')

    # first Stopping the Service
    PID=`sed -n 1p pidfile`  #get pid from file
    if [ ! -z "$PID" ] ; then
#        ./crntb-adm.sh uninstall
        echo "Stopping neuron-tornado-aplan service, begin killing ${PID}"
        kill ${PID} >/dev/null 2>&1
        sleep 2
        echo "Stop: "`date` >> ./log/ctrl.log
    fi

    # second Starting the Service   
    cmd=`ps -e|grep $PID`    #get process with the given pid   
    if [ "$PID" != "" ] ; then
        echo "Starting neuron-tornado-aplan service..."  
        nohup python main.py -log_file_prefix=./log/aplan.log &
        echo $! > pidfile    #record process id to file
        echo 'Startup neuron-tornado-aplan service success!'
#        ./crntb-adm.sh install
        echo "Start: "`date` >> ./log/ctrl.log
    fi
    ;;

'stop')
    # Stopping the Service
    PID=`sed -n 1p pidfile`  #get pid from pidfile
    if [ ! -z "$PID" ] ; then
#        ./crntb-adm.sh uninstall
        echo "Stopping neuron-tornado-aplan service, begin killing ${PID}"
        kill ${PID} >/dev/null 2>&1
        echo "Stop: "`date` >> ./log/ctrl.log
    fi
    ;;

*)
    echo "Unmarkable usage: $0 {restart | stop}"
    ;;
esac
