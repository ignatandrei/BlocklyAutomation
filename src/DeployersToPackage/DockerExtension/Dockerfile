FROM scratch

LABEL org.opencontainers.image.title="Blockly Automation" \
    org.opencontainers.image.description="A extension that displays lowCode with Blockly for any Docker command" \
    org.opencontainers.image.vendor="Andrei Ignat" \
    com.docker.desktop.extension.api.version=">= 0.2.0" \
    com.docker.desktop.extension.icon="https://github.com/ignatandrei/BlocklyAutomation/wiki/imgs/logoBADocker.png" \
    com.docker.extension.screenshots='[{"alt":"Load Demos", "url":"https://raw.githubusercontent.com/wiki/ignatandrei/BlocklyAutomation/imgs/DockerExtension/LoadBlocks.png"}, {"alt":"start containers", "url":"https://raw.githubusercontent.com/wiki/ignatandrei/BlocklyAutomation/imgs/DockerExtension/StartContainers.png"}]' \
    com.docker.extension.detailed-description="<h1>Description</h1><p>You can automate pretty much every docker command. Press Execute to see in action and LoadBlocks for more examples.</p>" \
    com.docker.extension.publisher-url="https://github.com/ignatandrei/blocklyautomation" \
    com.docker.extension.additional-urls='[{"title":"Main Page","url":"https://github.com/ignatandrei/BlocklyAutomation/wiki/DockerExtension"}]' \
    com.docker.extension.changelog="<ul><li>first version</li></ul>" \
    com.docker.extension.categories="development,testing-tools"
    
COPY ui ./ui
COPY metadata.json .
