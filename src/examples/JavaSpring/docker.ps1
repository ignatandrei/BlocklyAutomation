cls
docker container rm -f container_java_blockly
docker image rm java_blockly
docker build --tag java_blockly . 
docker run -d -p 8080:8080 --name container_java_blockly java_blockly 
# http://localhost:8080