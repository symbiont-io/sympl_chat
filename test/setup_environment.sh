#!/usr/bin/env bash

set -eo pipefail

# shellcheck source=./env.sh
source ./env.sh
echo "--- Setting up symenv"
curl https://raw.githubusercontent.com/symbiont-io/symenv/main/install.sh | bash

# SDK is installed, installing version
source ./env.sh
symenv install v2.0.2
