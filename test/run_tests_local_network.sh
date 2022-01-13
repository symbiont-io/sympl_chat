#!/usr/bin/env bash

set -eo pipefail

echo "--- Contracts Test Workflow"
source ./env.sh

sym local-network start --nodes 4

pip3 install --upgrade pip
pip3 install symbiont-io.pytest-assembly

DEFAULT_NETWORK_CONFIG="$HOME/.symbiont/assembly-dev/dev-network/default/network-config.json"
pytest ../test/chat_8_3_0_0_model_test.py --connection-file "$DEFAULT_NETWORK_CONFIG" --contract-path ../ --baseline -p no:pytest-mp
pytest ../test/chat_8_3_0_0_coverage_test.py --connection-file "$DEFAULT_NETWORK_CONFIG" --contract-path ../ --baseline -p no:pytest-mp
pytest ../test/chat_8_3_0_0_demo_test.py --connection-file "$DEFAULT_NETWORK_CONFIG" --contract-path ../ --baseline -p no:pytest-mp
pytest ../test/chat_8_3_0_0_events_test.py --connection-file "$DEFAULT_NETWORK_CONFIG" --contract-path ../ --baseline -p no:pytest-mp
