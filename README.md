# Chat smart contract

<a href="https://portal.symbiont.io/sdk_docs/docs/intro"><img src="https://img.shields.io/badge/Assembly-6.0.0-orange"/></a>
<a href="https://portal.symbiont.io/sdk_docs/docs/intro"><img src="https://img.shields.io/badge/Assembly%20SDK-4.0.0-blue"/></a>

## Introduction

This smart contract repository is a sample "Chat" `SymPL` contract. Hereby included are:

- the smart contract `chat.sympl`
- the contract definition `contract.yaml`
- A thorough suite of tests to validate the smart contract in various ways

## Model

### Roles

- Member

### Channel topology

Members includes a role when key is shared via send key operation

- Room channel
  - Owners: Owners
  - Members: Members
  - Dependecies: N/A

#### Security Policy of Channel

- `owners` are Channel Owners (added using `cvm.add_owner`)
- `members` have the Channel Key (received using `cvm.send_key`)
- Keys get rotated using `cvm.rotate_key` when an `owner` of a `room` removes someone from the room.

### Actions

All `Actions` are write operations on `Channel` that can be done only by `Role`

| Action           | Channel | Role    |
|------------------|---------|---------|
| Create Room      | Room    | Any     |
| Delete Room      | Room    | Owner   |
| Restore Room     | Room    | Owner   |
| Invite to Room   | Room    | Owner   |
| Send Message     | Room    | Member  |
| Remove from Room | Room    | Owner   |
| Promote to Owner | Room    | Owner   |
| Demote Owner     | Room    | Owner   |

' The member cannot remove itself from the room
' An owner can, however, demote itself

### Events

All API clients with access to a node containing a `Channel` member have access to `Event Schema` data

| Channel | Event Schema        | Schema Details          |
|---------|---------------------|-------------------------|
| Room    | CreateRoomEvent     | Room                    |
| Room   | DeleteRoomEvent     | Room                    |  
| Room   | RestoreRoomEvent    | Room                    |
| Room   | InviteToRoomEvent   | Room, inviter, invitee  |
| Room    | RemoveFromRoomEvent | Room, remover, removee  |
| Room   | SendMessageEvent    | Room, message           |
| Room   | DeleteRoomEvent     | Room                    |
| Room    | PromoteOwnerEvent   | Room, promoter, promotee|
| Room    | DemoteOwnerEvent    | Room, demoter, demotee  |

## Tests structure

The Chat contract is equipped with a thorough set of tests:

- chat_model_test performs model testing against chat_model
- coverage_test performs basic interface regression testing
- demo_test tests a plausible customer demo
- spec_test stress tests the contract
- events_test tests the event system

## Contributing

Anyone is welcome to contribute to this repository, be it in the form of features, bug fixes, documentation or additional
tests.
Please create a branch of your own and submit for merge via merge request. A codeowner will be assigned your merge request
and provide feedback/merge it.

## Running tests

Requirements:

- Install the [pytest plugin](https://iportal.symbiont.io/sdk_docs/docs/testing/index/index.html)
- Have a local-network running (we recommend using `sym` to get a mock network up and running quickly)

Steps:

- Change directory to the root of this repository
- Run the following command:

```shell
pytest test/<test file name>.py --network-config="$(sym local-network info | jq -r .network_config)" --contract-path=./
```

There are also two property tests and a stress test, which can be run by passing `--proptests` to the pytest command, but these will take a long time (>15 minutes) to run.
