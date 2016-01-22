#!/bin/sh
filelist=`ls ~/apache-tomcat-7.0.61/webapps/stp-web-5.0.0/tmp/*.jar`
if [ -z "$filelist" ]
then
    echo "No patch to install"
    exit 0;
fi

# 获取进程号
pid=$(ps aux | grep "thomas@notty" | awk '{print $2}' | sort -n | head -n 1)

cd ~/apache-tomcat-7.0.61/bin
./shutdown.sh
sleep 5
echo

# remove old jars
cd ~/apache-tomcat-7.0.61/webapps/stp-web-5.0.0/WEB-INF/lib
echo "remove files:"
echo "remove files:" >> ../../tmp/ctrl.log
ls stp-web*.jar
echo `ls stp-web*.jar` >> ../../tmp/ctrl.log
ls sup-account-client*.jar
echo `ls sup-account-client*.jar` >> ../../tmp/ctrl.log
ls sup-activity-client*.jar
echo `ls sup-activity-client*.jar` >> ../../tmp/ctrl.log
ls sup-base-client*.jar
echo `ls sup-base-client*.jar` >> ../../tmp/ctrl.log
ls sup-blog-client*.jar
echo `ls sup-blog-client*.jar` >> ../../tmp/ctrl.log
ls sup-session-client*.jar
echo `ls sup-session-client*.jar` >> ../../tmp/ctrl.log
ls sup-msg-client*.jar
echo `ls sup-msg-client*.jar` >> ../../tmp/ctrl.log
rm stp-web*.jar
rm sup-account-client*.jar
rm sup-activity-client*.jar
rm sup-base-client*.jar
rm sup-blog-client*.jar
rm sup-session-client*.jar
rm sup-msg-client*.jar
echo

# add new jars
echo "move files from ../../tmp to lib:"
echo "move files from ../../tmp to lib:" >> ../../tmp/ctrl.log
ls ../../tmp/*.jar
filelist=`ls ../../tmp/*.jar`
for file in $filelist
do
    echo $file >> ../../tmp/ctrl.log
done
mv ../../tmp/*.jar .
echo

cd ~/apache-tomcat-7.0.61/bin
./startup.sh
sleep 3
echo

# 延迟3秒后执行kill命令，关闭ssh进程，延迟时间可以根据调用的命令不同调整
sleep 3 && kill ${pid} && echo "ssh command is complete" 

exit 0