FROM scratch

LABEL org.opencontainers.image.title="Blockly Automation for Docker" \
    org.opencontainers.image.description="A extension that displays lowCode with Blockly for any Docker command" \
    org.opencontainers.image.vendor="Andrei Ignat" \
    com.docker.desktop.extension.api.version=">= 0.2.0" \
    com.docker.desktop.extension.icon="https://github.com/ignatandrei/BlocklyAutomation/wiki/imgs/logoBADocker.png" \
    com.docker.extension.screenshots='[{"alt":"hello world light mode", "url":"https://docker-extension-screenshots.s3.amazonaws.com/minimal-frontend/hello-world-light.png"}, {"alt":"hello world dark mode", "url":"https://docker-extension-screenshots.s3.amazonaws.com/minimal-frontend/hello-world-dark.png"}]' \
    com.docker.extension.detailed-description="<h1>Description</h1><p>You can automate pretty much every docker command. Press Execute to see in action and LoadBlocks for more examples.</p>" \
    com.docker.extension.publisher-url="https://github.com/ignatandrei/blocklyautomation" \
    com.docker.extension.additional-urls='[{"title":"SDK Documentation","url":"https://docs.docker.com/desktop/extensions-sdk"}]' \
    com.docker.extension.changelog="<ul><li>Added metadata to provide more information about the extension.</li></ul>"

COPY ui ./ui
COPY metadata.json .
