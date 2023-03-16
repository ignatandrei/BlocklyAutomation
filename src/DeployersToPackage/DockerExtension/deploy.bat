echo find version
docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t ignatandrei/blockly-automation:0.0.7 --push .