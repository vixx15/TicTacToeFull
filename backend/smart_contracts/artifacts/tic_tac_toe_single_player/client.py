# flake8: noqa
# fmt: off
# mypy: disable-error-code="no-any-return, no-untyped-call"
# This file was automatically generated by algokit-client-generator.
# DO NOT MODIFY IT BY HAND.
# requires: algokit-utils@^1.2.0
import base64
import dataclasses
import decimal
import typing
from abc import ABC, abstractmethod

import algokit_utils
import algosdk
from algosdk.atomic_transaction_composer import (
    AtomicTransactionComposer,
    AtomicTransactionResponse,
    SimulateAtomicTransactionResponse,
    TransactionSigner,
    TransactionWithSigner
)

_APP_SPEC_JSON = r"""{
    "hints": {
        "hello(string)string": {
            "call_config": {
                "no_op": "CALL"
            }
        },
        "play_action_logic(uint64)string": {
            "call_config": {
                "no_op": "CALL"
            }
        },
        "money_refund_logic()void": {
            "call_config": {
                "no_op": "CALL"
            }
        }
    },
    "source": {
        "approval": "I3ByYWdtYSB2ZXJzaW9uIDgKaW50Y2Jsb2NrIDAgMSA1MTEgMiA0NDggMjkyIDE0NiAyNzMKYnl0ZWNibG9jayAweDYyNmY2MTcyNjQ1ZjczNzQ2MTc0NjUgMHg2NzYxNmQ2NTVmNzM3NDYxNzQ3NTczIDB4NzA2YzYxNzk2NTcyNWY2ZjVmNzM3NDYxNzQ2NSAweDcwNmM2MTc5NjU3MjVmNzg1ZjczNzQ2MTc0NjUgMHggMHg3MDZjNjE3OTY1NzI1ZjZmNWY2OTZlNjQ2NTc4IDB4NjI2NTc0NWY2MTZkNmY3NTZlNzQgMHgxNTFmN2M3NQp0eG4gTnVtQXBwQXJncwppbnRjXzAgLy8gMAo9PQpibnogbWFpbl9sOAp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweDAyYmVjZTExIC8vICJoZWxsbyhzdHJpbmcpc3RyaW5nIgo9PQpibnogbWFpbl9sNwp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweDhlYzQ1YzIyIC8vICJwbGF5X2FjdGlvbl9sb2dpYyh1aW50NjQpc3RyaW5nIgo9PQpibnogbWFpbl9sNgp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweDdiM2U3MTMwIC8vICJtb25leV9yZWZ1bmRfbG9naWMoKXZvaWQiCj09CmJueiBtYWluX2w1CmVycgptYWluX2w1Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydApjYWxsc3ViIG1vbmV5cmVmdW5kbG9naWNjYXN0ZXJfMTIKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDY6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CmNhbGxzdWIgcGxheWFjdGlvbmxvZ2ljY2FzdGVyXzExCmludGNfMSAvLyAxCnJldHVybgptYWluX2w3Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydApjYWxsc3ViIGhlbGxvY2FzdGVyXzEwCmludGNfMSAvLyAxCnJldHVybgptYWluX2w4Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CmJueiBtYWluX2wxMgp0eG4gT25Db21wbGV0aW9uCmludGNfMSAvLyBPcHRJbgo9PQpibnogbWFpbl9sMTEKZXJyCm1haW5fbDExOgp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQphc3NlcnQKY2FsbHN1YiBvcHRpbl8yCmludGNfMSAvLyAxCnJldHVybgptYWluX2wxMjoKdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKPT0KYXNzZXJ0CmNhbGxzdWIgY3JlYXRlXzEKaW50Y18xIC8vIDEKcmV0dXJuCgovLyBoZWxsbwpoZWxsb18wOgpwcm90byAxIDEKYnl0ZWMgNCAvLyAiIgpwdXNoYnl0ZXMgMHg0ODY1NmM2YzZmMmMyMCAvLyAiSGVsbG8sICIKZnJhbWVfZGlnIC0xCmV4dHJhY3QgMiAwCmNvbmNhdApmcmFtZV9idXJ5IDAKZnJhbWVfZGlnIDAKbGVuCml0b2IKZXh0cmFjdCA2IDAKZnJhbWVfZGlnIDAKY29uY2F0CmZyYW1lX2J1cnkgMApyZXRzdWIKCi8vIGNyZWF0ZQpjcmVhdGVfMToKcHJvdG8gMCAwCmJ5dGVjIDYgLy8gImJldF9hbW91bnQiCnB1c2hpbnQgMTAwMDAwMCAvLyAxMDAwMDAwCmFwcF9nbG9iYWxfcHV0CmJ5dGVjXzAgLy8gImJvYXJkX3N0YXRlIgpieXRlYyA0IC8vICIiCmFwcF9nbG9iYWxfcHV0CmJ5dGVjXzEgLy8gImdhbWVfc3RhdHVzIgppbnRjXzAgLy8gMAphcHBfZ2xvYmFsX3B1dApieXRlYyA1IC8vICJwbGF5ZXJfb19pbmRleCIKaW50Y18wIC8vIDAKYXBwX2dsb2JhbF9wdXQKYnl0ZWNfMiAvLyAicGxheWVyX29fc3RhdGUiCmludGNfMCAvLyAwCmFwcF9nbG9iYWxfcHV0CmJ5dGVjXzMgLy8gInBsYXllcl94X3N0YXRlIgppbnRjXzAgLy8gMAphcHBfZ2xvYmFsX3B1dApyZXRzdWIKCi8vIG9wdF9pbgpvcHRpbl8yOgpwcm90byAwIDAKaW50Y18xIC8vIDEKcmV0dXJuCgovLyBoYXNfcGxheWVyX3dvbgpoYXNwbGF5ZXJ3b25fMzoKcHJvdG8gMSAxCmZyYW1lX2RpZyAtMQppbnRjIDQgLy8gNDQ4CiYKaW50YyA0IC8vIDQ0OAo9PQpmcmFtZV9kaWcgLTEKcHVzaGludCA1NiAvLyA1NgomCnB1c2hpbnQgNTYgLy8gNTYKPT0KfHwKZnJhbWVfZGlnIC0xCnB1c2hpbnQgNyAvLyA3CiYKcHVzaGludCA3IC8vIDcKPT0KfHwKZnJhbWVfZGlnIC0xCmludGMgNSAvLyAyOTIKJgppbnRjIDUgLy8gMjkyCj09Cnx8CmZyYW1lX2RpZyAtMQppbnRjIDYgLy8gMTQ2CiYKaW50YyA2IC8vIDE0Ngo9PQp8fApmcmFtZV9kaWcgLTEKcHVzaGludCA3MyAvLyA3MwomCnB1c2hpbnQgNzMgLy8gNzMKPT0KfHwKZnJhbWVfZGlnIC0xCmludGMgNyAvLyAyNzMKJgppbnRjIDcgLy8gMjczCj09Cnx8CmZyYW1lX2RpZyAtMQpwdXNoaW50IDg0IC8vIDg0CiYKcHVzaGludCA4NCAvLyA4NAo9PQp8fApibnogaGFzcGxheWVyd29uXzNfbDIKaW50Y18wIC8vIDAKYiBoYXNwbGF5ZXJ3b25fM19sMwpoYXNwbGF5ZXJ3b25fM19sMjoKaW50Y18xIC8vIDEKaGFzcGxheWVyd29uXzNfbDM6CnJldHN1YgoKLy8gaXNfdGllCmlzdGllXzQ6CnByb3RvIDAgMQppbnRjXzIgLy8gNTExCmJ5dGVjXzMgLy8gInBsYXllcl94X3N0YXRlIgphcHBfZ2xvYmFsX2dldApieXRlY18yIC8vICJwbGF5ZXJfb19zdGF0ZSIKYXBwX2dsb2JhbF9nZXQKfAo9PQpyZXRzdWIKCi8vIGF2YWlsYWJsZV9wb3NpdGlvbnMKYXZhaWxhYmxlcG9zaXRpb25zXzU6CnByb3RvIDIgMQpmcmFtZV9kaWcgLTIKZnJhbWVfZGlnIC0xCnwKaW50Y18yIC8vIDUxMQomCmludGNfMiAvLyA1MTEKXgpyZXRzdWIKCi8vIHNlbGVjdF9wb3NpdGlvbl9mb3JfbwpzZWxlY3Rwb3NpdGlvbmZvcm9fNjoKcHJvdG8gMSAxCmludGNfMCAvLyAwCnN0b3JlIDAKc2VsZWN0cG9zaXRpb25mb3JvXzZfbDE6CmxvYWQgMApwdXNoaW50IDkgLy8gOQo8CmJ6IHNlbGVjdHBvc2l0aW9uZm9yb182X2w1CmZyYW1lX2RpZyAtMQpsb2FkIDAKZ2V0Yml0CmludGNfMSAvLyAxCj09CmJueiBzZWxlY3Rwb3NpdGlvbmZvcm9fNl9sNApsb2FkIDAKaW50Y18xIC8vIDEKKwpzdG9yZSAwCmIgc2VsZWN0cG9zaXRpb25mb3JvXzZfbDEKc2VsZWN0cG9zaXRpb25mb3JvXzZfbDQ6CmJ5dGVjIDUgLy8gInBsYXllcl9vX2luZGV4Igpsb2FkIDAKYXBwX2dsb2JhbF9wdXQKc2VsZWN0cG9zaXRpb25mb3JvXzZfbDU6CmJ5dGVjIDUgLy8gInBsYXllcl9vX2luZGV4IgphcHBfZ2xvYmFsX2dldApyZXRzdWIKCi8vIHBsYXlfYWN0aW9uX2xvZ2ljCnBsYXlhY3Rpb25sb2dpY183Ogpwcm90byAxIDEKYnl0ZWMgNCAvLyAiIgpmcmFtZV9kaWcgLTEKaW50Y18wIC8vIDAKPj0KYXNzZXJ0CmZyYW1lX2RpZyAtMQpwdXNoaW50IDggLy8gOAo8PQphc3NlcnQKYnl0ZWNfMSAvLyAiZ2FtZV9zdGF0dXMiCmFwcF9nbG9iYWxfZ2V0CmludGNfMCAvLyAwCj09CmFzc2VydApieXRlY18zIC8vICJwbGF5ZXJfeF9zdGF0ZSIKYXBwX2dsb2JhbF9nZXQKaW50Y18xIC8vIDEKZnJhbWVfZGlnIC0xCnNobAomCmludGNfMCAvLyAwCj09CmJ5dGVjXzIgLy8gInBsYXllcl9vX3N0YXRlIgphcHBfZ2xvYmFsX2dldAppbnRjXzEgLy8gMQpmcmFtZV9kaWcgLTEKc2hsCiYKaW50Y18wIC8vIDAKPT0KJiYKYXNzZXJ0CmJ5dGVjXzMgLy8gInBsYXllcl94X3N0YXRlIgpieXRlY18zIC8vICJwbGF5ZXJfeF9zdGF0ZSIKYXBwX2dsb2JhbF9nZXQKaW50Y18xIC8vIDEKZnJhbWVfZGlnIC0xCnNobAp8CmFwcF9nbG9iYWxfcHV0CmJ5dGVjXzMgLy8gInBsYXllcl94X3N0YXRlIgphcHBfZ2xvYmFsX2dldApjYWxsc3ViIGhhc3BsYXllcndvbl8zCmJueiBwbGF5YWN0aW9ubG9naWNfN19sMTUKcGxheWFjdGlvbmxvZ2ljXzdfbDE6CmNhbGxzdWIgaXN0aWVfNApibnogcGxheWFjdGlvbmxvZ2ljXzdfbDE0CmJ5dGVjXzEgLy8gImdhbWVfc3RhdHVzIgphcHBfZ2xvYmFsX2dldAppbnRjXzAgLy8gMAo9PQpibnogcGxheWFjdGlvbmxvZ2ljXzdfbDEyCnBsYXlhY3Rpb25sb2dpY183X2wzOgpjYWxsc3ViIGdldEJvYXJkU3RhdGVfOQpieXRlY18xIC8vICJnYW1lX3N0YXR1cyIKYXBwX2dsb2JhbF9nZXQKaW50Y18wIC8vIDAKPT0KYm56IHBsYXlhY3Rpb25sb2dpY183X2wxMQpieXRlY18xIC8vICJnYW1lX3N0YXR1cyIKYXBwX2dsb2JhbF9nZXQKaW50Y18xIC8vIDEKPT0KYm56IHBsYXlhY3Rpb25sb2dpY183X2wxMApieXRlY18xIC8vICJnYW1lX3N0YXR1cyIKYXBwX2dsb2JhbF9nZXQKaW50Y18zIC8vIDIKPT0KYm56IHBsYXlhY3Rpb25sb2dpY183X2w5CmJ5dGVjXzEgLy8gImdhbWVfc3RhdHVzIgphcHBfZ2xvYmFsX2dldApwdXNoaW50IDMgLy8gMwo9PQpibnogcGxheWFjdGlvbmxvZ2ljXzdfbDgKZXJyCnBsYXlhY3Rpb25sb2dpY183X2w4OgpwdXNoYnl0ZXMgMHgwMDA5NDk3NDczMjA2MTIwNzQ2OTY1IC8vIDB4MDAwOTQ5NzQ3MzIwNjEyMDc0Njk2NQpmcmFtZV9idXJ5IDAKYiBwbGF5YWN0aW9ubG9naWNfN19sMTYKcGxheWFjdGlvbmxvZ2ljXzdfbDk6CnB1c2hieXRlcyAweDAwMTc1OTZmNzUyMDY4NjE3NjY1MjA2YzZmNzM3NDIwNzQ2ODY1MjA2NzYxNmQ2NTIxIC8vIDB4MDAxNzU5NmY3NTIwNjg2MTc2NjUyMDZjNmY3Mzc0MjA3NDY4NjUyMDY3NjE2ZDY1MjEKZnJhbWVfYnVyeSAwCmIgcGxheWFjdGlvbmxvZ2ljXzdfbDE2CnBsYXlhY3Rpb25sb2dpY183X2wxMDoKcHVzaGJ5dGVzIDB4MDAyMzU5NmY3NTIwNjg2MTc2NjUyMDczNzU2MzYzNjM2NTczNjY3NTZjNmM3OTIwNzc2ZjZlMjA3NDY4NjUyMDY3NjE2ZDY1MjEgLy8gMHgwMDIzNTk2Zjc1MjA2ODYxNzY2NTIwNzM3NTYzNjM2MzY1NzM2Njc1NmM2Yzc5MjA3NzZmNmUyMDc0Njg2NTIwNjc2MTZkNjUyMQpmcmFtZV9idXJ5IDAKYiBwbGF5YWN0aW9ubG9naWNfN19sMTYKcGxheWFjdGlvbmxvZ2ljXzdfbDExOgpieXRlY18wIC8vICJib2FyZF9zdGF0ZSIKYXBwX2dsb2JhbF9nZXQKZnJhbWVfYnVyeSAwCmZyYW1lX2RpZyAwCmxlbgppdG9iCmV4dHJhY3QgNiAwCmZyYW1lX2RpZyAwCmNvbmNhdApmcmFtZV9idXJ5IDAKYiBwbGF5YWN0aW9ubG9naWNfN19sMTYKcGxheWFjdGlvbmxvZ2ljXzdfbDEyOgpieXRlY18yIC8vICJwbGF5ZXJfb19zdGF0ZSIKYnl0ZWNfMiAvLyAicGxheWVyX29fc3RhdGUiCmFwcF9nbG9iYWxfZ2V0CmludGNfMSAvLyAxCmJ5dGVjXzMgLy8gInBsYXllcl94X3N0YXRlIgphcHBfZ2xvYmFsX2dldApieXRlY18yIC8vICJwbGF5ZXJfb19zdGF0ZSIKYXBwX2dsb2JhbF9nZXQKY2FsbHN1YiBhdmFpbGFibGVwb3NpdGlvbnNfNQpjYWxsc3ViIHNlbGVjdHBvc2l0aW9uZm9yb182CnNobAp8CmFwcF9nbG9iYWxfcHV0CmJ5dGVjXzIgLy8gInBsYXllcl9vX3N0YXRlIgphcHBfZ2xvYmFsX2dldApjYWxsc3ViIGhhc3BsYXllcndvbl8zCmJ6IHBsYXlhY3Rpb25sb2dpY183X2wzCmJ5dGVjXzEgLy8gImdhbWVfc3RhdHVzIgppbnRjXzMgLy8gMgphcHBfZ2xvYmFsX3B1dApiIHBsYXlhY3Rpb25sb2dpY183X2wzCnBsYXlhY3Rpb25sb2dpY183X2wxNDoKYnl0ZWNfMSAvLyAiZ2FtZV9zdGF0dXMiCnB1c2hpbnQgMyAvLyAzCmFwcF9nbG9iYWxfcHV0CmIgcGxheWFjdGlvbmxvZ2ljXzdfbDMKcGxheWFjdGlvbmxvZ2ljXzdfbDE1OgpieXRlY18xIC8vICJnYW1lX3N0YXR1cyIKaW50Y18xIC8vIDEKYXBwX2dsb2JhbF9wdXQKYiBwbGF5YWN0aW9ubG9naWNfN19sMQpwbGF5YWN0aW9ubG9naWNfN19sMTY6CnJldHN1YgoKLy8gbW9uZXlfcmVmdW5kX2xvZ2ljCm1vbmV5cmVmdW5kbG9naWNfODoKcHJvdG8gMCAwCmJ5dGVjXzEgLy8gImdhbWVfc3RhdHVzIgphcHBfZ2xvYmFsX2dldAppbnRjXzEgLy8gMQo9PQphc3NlcnQKaXR4bl9iZWdpbgppbnRjXzEgLy8gcGF5Cml0eG5fZmllbGQgVHlwZUVudW0KdHhuIFNlbmRlcgppdHhuX2ZpZWxkIFJlY2VpdmVyCmJ5dGVjIDYgLy8gImJldF9hbW91bnQiCmFwcF9nbG9iYWxfZ2V0Cml0eG5fZmllbGQgQW1vdW50Cml0eG5fc3VibWl0CmludGNfMSAvLyAxCnJldHVybgoKLy8gZ2V0Qm9hcmRTdGF0ZQpnZXRCb2FyZFN0YXRlXzk6CnByb3RvIDAgMApieXRlY18wIC8vICJib2FyZF9zdGF0ZSIKYnl0ZWMgNCAvLyAiIgphcHBfZ2xvYmFsX3B1dAppbnRjXzAgLy8gMApzdG9yZSAxCmdldEJvYXJkU3RhdGVfOV9sMToKbG9hZCAxCnB1c2hpbnQgOSAvLyA5CjwKYnogZ2V0Qm9hcmRTdGF0ZV85X2wxMApieXRlY18zIC8vICJwbGF5ZXJfeF9zdGF0ZSIKYXBwX2dsb2JhbF9nZXQKbG9hZCAxCmdldGJpdAppbnRjXzEgLy8gMQo9PQpibnogZ2V0Qm9hcmRTdGF0ZV85X2w5CmJ5dGVjXzIgLy8gInBsYXllcl9vX3N0YXRlIgphcHBfZ2xvYmFsX2dldApsb2FkIDEKZ2V0Yml0CmludGNfMSAvLyAxCj09CmJueiBnZXRCb2FyZFN0YXRlXzlfbDgKYnl0ZWNfMCAvLyAiYm9hcmRfc3RhdGUiCmJ5dGVjXzAgLy8gImJvYXJkX3N0YXRlIgphcHBfZ2xvYmFsX2dldApwdXNoYnl0ZXMgMHgyZCAvLyAiLSIKY29uY2F0CmFwcF9nbG9iYWxfcHV0CmdldEJvYXJkU3RhdGVfOV9sNToKbG9hZCAxCmludGNfMyAvLyAyCj09CmxvYWQgMQpwdXNoaW50IDUgLy8gNQo9PQp8fApsb2FkIDEKcHVzaGludCA4IC8vIDgKPT0KfHwKYm56IGdldEJvYXJkU3RhdGVfOV9sNwpnZXRCb2FyZFN0YXRlXzlfbDY6CmxvYWQgMQppbnRjXzEgLy8gMQorCnN0b3JlIDEKYiBnZXRCb2FyZFN0YXRlXzlfbDEKZ2V0Qm9hcmRTdGF0ZV85X2w3OgpieXRlY18wIC8vICJib2FyZF9zdGF0ZSIKYnl0ZWNfMCAvLyAiYm9hcmRfc3RhdGUiCmFwcF9nbG9iYWxfZ2V0CnB1c2hieXRlcyAweDBhIC8vICJcbiIKY29uY2F0CmFwcF9nbG9iYWxfcHV0CmIgZ2V0Qm9hcmRTdGF0ZV85X2w2CmdldEJvYXJkU3RhdGVfOV9sODoKYnl0ZWNfMCAvLyAiYm9hcmRfc3RhdGUiCmJ5dGVjXzAgLy8gImJvYXJkX3N0YXRlIgphcHBfZ2xvYmFsX2dldApwdXNoYnl0ZXMgMHg0ZiAvLyAiTyIKY29uY2F0CmFwcF9nbG9iYWxfcHV0CmIgZ2V0Qm9hcmRTdGF0ZV85X2w1CmdldEJvYXJkU3RhdGVfOV9sOToKYnl0ZWNfMCAvLyAiYm9hcmRfc3RhdGUiCmJ5dGVjXzAgLy8gImJvYXJkX3N0YXRlIgphcHBfZ2xvYmFsX2dldApwdXNoYnl0ZXMgMHg1OCAvLyAiWCIKY29uY2F0CmFwcF9nbG9iYWxfcHV0CmIgZ2V0Qm9hcmRTdGF0ZV85X2w1CmdldEJvYXJkU3RhdGVfOV9sMTA6CnJldHN1YgoKLy8gaGVsbG9fY2FzdGVyCmhlbGxvY2FzdGVyXzEwOgpwcm90byAwIDAKYnl0ZWMgNCAvLyAiIgpkdXAKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQpmcmFtZV9idXJ5IDEKZnJhbWVfZGlnIDEKY2FsbHN1YiBoZWxsb18wCmZyYW1lX2J1cnkgMApieXRlYyA3IC8vIDB4MTUxZjdjNzUKZnJhbWVfZGlnIDAKY29uY2F0CmxvZwpyZXRzdWIKCi8vIHBsYXlfYWN0aW9uX2xvZ2ljX2Nhc3RlcgpwbGF5YWN0aW9ubG9naWNjYXN0ZXJfMTE6CnByb3RvIDAgMApieXRlYyA0IC8vICIiCmludGNfMCAvLyAwCnR4bmEgQXBwbGljYXRpb25BcmdzIDEKYnRvaQpmcmFtZV9idXJ5IDEKZnJhbWVfZGlnIDEKY2FsbHN1YiBwbGF5YWN0aW9ubG9naWNfNwpmcmFtZV9idXJ5IDAKYnl0ZWMgNyAvLyAweDE1MWY3Yzc1CmZyYW1lX2RpZyAwCmNvbmNhdApsb2cKcmV0c3ViCgovLyBtb25leV9yZWZ1bmRfbG9naWNfY2FzdGVyCm1vbmV5cmVmdW5kbG9naWNjYXN0ZXJfMTI6CnByb3RvIDAgMApjYWxsc3ViIG1vbmV5cmVmdW5kbG9naWNfOApyZXRzdWI=",
        "clear": "I3ByYWdtYSB2ZXJzaW9uIDgKcHVzaGludCAwIC8vIDAKcmV0dXJu"
    },
    "state": {
        "global": {
            "num_byte_slices": 1,
            "num_uints": 5
        },
        "local": {
            "num_byte_slices": 0,
            "num_uints": 0
        }
    },
    "schema": {
        "global": {
            "declared": {
                "bet_amount": {
                    "type": "uint64",
                    "key": "bet_amount",
                    "descr": ""
                },
                "board_state": {
                    "type": "bytes",
                    "key": "board_state",
                    "descr": ""
                },
                "game_status": {
                    "type": "uint64",
                    "key": "game_status",
                    "descr": ""
                },
                "player_o_index": {
                    "type": "uint64",
                    "key": "player_o_index",
                    "descr": ""
                },
                "player_o_state": {
                    "type": "uint64",
                    "key": "player_o_state",
                    "descr": ""
                },
                "player_x_state": {
                    "type": "uint64",
                    "key": "player_x_state",
                    "descr": ""
                }
            },
            "reserved": {}
        },
        "local": {
            "declared": {},
            "reserved": {}
        }
    },
    "contract": {
        "name": "tic_tac_toe_single_player",
        "methods": [
            {
                "name": "hello",
                "args": [
                    {
                        "type": "string",
                        "name": "name"
                    }
                ],
                "returns": {
                    "type": "string"
                }
            },
            {
                "name": "play_action_logic",
                "args": [
                    {
                        "type": "uint64",
                        "name": "position_index"
                    }
                ],
                "returns": {
                    "type": "string"
                }
            },
            {
                "name": "money_refund_logic",
                "args": [],
                "returns": {
                    "type": "void"
                }
            }
        ],
        "networks": {}
    },
    "bare_call_config": {
        "no_op": "CREATE",
        "opt_in": "CALL"
    }
}"""
APP_SPEC = algokit_utils.ApplicationSpecification.from_json(_APP_SPEC_JSON)
_TReturn = typing.TypeVar("_TReturn")


class _ArgsBase(ABC, typing.Generic[_TReturn]):
    @staticmethod
    @abstractmethod
    def method() -> str:
        ...


_TArgs = typing.TypeVar("_TArgs", bound=_ArgsBase[typing.Any])


@dataclasses.dataclass(kw_only=True)
class _TArgsHolder(typing.Generic[_TArgs]):
    args: _TArgs


def _filter_none(value: dict | typing.Any) -> dict | typing.Any:
    if isinstance(value, dict):
        return {k: _filter_none(v) for k, v in value.items() if v is not None}
    return value


def _as_dict(data: typing.Any, *, convert_all: bool = True) -> dict[str, typing.Any]:
    if data is None:
        return {}
    if not dataclasses.is_dataclass(data):
        raise TypeError(f"{data} must be a dataclass")
    if convert_all:
        result = dataclasses.asdict(data)
    else:
        result = {f.name: getattr(data, f.name) for f in dataclasses.fields(data)}
    return _filter_none(result)


def _convert_transaction_parameters(
    transaction_parameters: algokit_utils.TransactionParameters | None,
) -> algokit_utils.TransactionParametersDict:
    return typing.cast(algokit_utils.TransactionParametersDict, _as_dict(transaction_parameters))


def _convert_call_transaction_parameters(
    transaction_parameters: algokit_utils.TransactionParameters | None,
) -> algokit_utils.OnCompleteCallParametersDict:
    return typing.cast(algokit_utils.OnCompleteCallParametersDict, _as_dict(transaction_parameters))


def _convert_create_transaction_parameters(
    transaction_parameters: algokit_utils.TransactionParameters | None,
    on_complete: algokit_utils.OnCompleteActionName,
) -> algokit_utils.CreateCallParametersDict:
    result = typing.cast(algokit_utils.CreateCallParametersDict, _as_dict(transaction_parameters))
    on_complete_enum = on_complete.replace("_", " ").title().replace(" ", "") + "OC"
    result["on_complete"] = getattr(algosdk.transaction.OnComplete, on_complete_enum)
    return result


def _convert_deploy_args(
    deploy_args: algokit_utils.DeployCallArgs | None,
) -> algokit_utils.ABICreateCallArgsDict | None:
    if deploy_args is None:
        return None

    deploy_args_dict = typing.cast(algokit_utils.ABICreateCallArgsDict, _as_dict(deploy_args))
    if isinstance(deploy_args, _TArgsHolder):
        deploy_args_dict["args"] = _as_dict(deploy_args.args)
        deploy_args_dict["method"] = deploy_args.args.method()

    return deploy_args_dict


@dataclasses.dataclass(kw_only=True)
class HelloArgs(_ArgsBase[str]):
    name: str

    @staticmethod
    def method() -> str:
        return "hello(string)string"


@dataclasses.dataclass(kw_only=True)
class PlayActionLogicArgs(_ArgsBase[str]):
    position_index: int

    @staticmethod
    def method() -> str:
        return "play_action_logic(uint64)string"


@dataclasses.dataclass(kw_only=True)
class MoneyRefundLogicArgs(_ArgsBase[None]):
    @staticmethod
    def method() -> str:
        return "money_refund_logic()void"


class ByteReader:
    def __init__(self, data: bytes):
        self._data = data

    @property
    def as_bytes(self) -> bytes:
        return self._data

    @property
    def as_str(self) -> str:
        return self._data.decode("utf8")

    @property
    def as_base64(self) -> str:
        return base64.b64encode(self._data).decode("utf8")

    @property
    def as_hex(self) -> str:
        return self._data.hex()


class GlobalState:
    def __init__(self, data: dict[bytes, bytes | int]):
        self.bet_amount = typing.cast(int, data.get(b"bet_amount"))
        self.board_state = ByteReader(typing.cast(bytes, data.get(b"board_state")))
        self.game_status = typing.cast(int, data.get(b"game_status"))
        self.player_o_index = typing.cast(int, data.get(b"player_o_index"))
        self.player_o_state = typing.cast(int, data.get(b"player_o_state"))
        self.player_x_state = typing.cast(int, data.get(b"player_x_state"))


class Composer:

    def __init__(self, app_client: algokit_utils.ApplicationClient, atc: AtomicTransactionComposer):
        self.app_client = app_client
        self.atc = atc

    def build(self) -> AtomicTransactionComposer:
        return self.atc

    def simulate(self) -> SimulateAtomicTransactionResponse:
        result = self.atc.simulate(self.app_client.algod_client)
        return result

    def execute(self) -> AtomicTransactionResponse:
        return self.app_client.execute_atc(self.atc)

    def hello(
        self,
        *,
        name: str,
        transaction_parameters: algokit_utils.TransactionParameters | None = None,
    ) -> "Composer":
        """Adds a call to `hello(string)string` ABI method
        
        :param str name: The `name` ABI parameter
        :param algokit_utils.TransactionParameters transaction_parameters: (optional) Additional transaction parameters
        :returns Composer: This Composer instance"""

        args = HelloArgs(
            name=name,
        )
        self.app_client.compose_call(
            self.atc,
            call_abi_method=args.method(),
            transaction_parameters=_convert_call_transaction_parameters(transaction_parameters),
            **_as_dict(args, convert_all=True),
        )
        return self

    def play_action_logic(
        self,
        *,
        position_index: int,
        transaction_parameters: algokit_utils.TransactionParameters | None = None,
    ) -> "Composer":
        """Adds a call to `play_action_logic(uint64)string` ABI method
        
        :param int position_index: The `position_index` ABI parameter
        :param algokit_utils.TransactionParameters transaction_parameters: (optional) Additional transaction parameters
        :returns Composer: This Composer instance"""

        args = PlayActionLogicArgs(
            position_index=position_index,
        )
        self.app_client.compose_call(
            self.atc,
            call_abi_method=args.method(),
            transaction_parameters=_convert_call_transaction_parameters(transaction_parameters),
            **_as_dict(args, convert_all=True),
        )
        return self

    def money_refund_logic(
        self,
        *,
        transaction_parameters: algokit_utils.TransactionParameters | None = None,
    ) -> "Composer":
        """Adds a call to `money_refund_logic()void` ABI method
        
        :param algokit_utils.TransactionParameters transaction_parameters: (optional) Additional transaction parameters
        :returns Composer: This Composer instance"""

        args = MoneyRefundLogicArgs()
        self.app_client.compose_call(
            self.atc,
            call_abi_method=args.method(),
            transaction_parameters=_convert_call_transaction_parameters(transaction_parameters),
            **_as_dict(args, convert_all=True),
        )
        return self

    def create_bare(
        self,
        *,
        on_complete: typing.Literal["no_op"] = "no_op",
        transaction_parameters: algokit_utils.CreateTransactionParameters | None = None,
    ) -> "Composer":
        """Adds a call to create an application using the no_op bare method
        
        :param typing.Literal[no_op] on_complete: On completion type to use
        :param algokit_utils.CreateTransactionParameters transaction_parameters: (optional) Additional transaction parameters
        :returns Composer: This Composer instance"""

        self.app_client.compose_create(
            self.atc,
            call_abi_method=False,
            transaction_parameters=_convert_create_transaction_parameters(transaction_parameters, on_complete),
        )
        return self

    def opt_in_bare(
        self,
        *,
        transaction_parameters: algokit_utils.TransactionParameters | None = None,
    ) -> "Composer":
        """Adds a calls to the opt_in bare method
        
        :param algokit_utils.TransactionParameters transaction_parameters: (optional) Additional transaction parameters
        :returns Composer: This Composer instance"""

        self.app_client.compose_opt_in(
            self.atc,
            call_abi_method=False,
            transaction_parameters=_convert_transaction_parameters(transaction_parameters),
        )
        return self

    def clear_state(
        self,
        transaction_parameters: algokit_utils.TransactionParameters | None = None,
        app_args: list[bytes] | None = None,
    ) -> "Composer":
        """Adds a call to the application with on completion set to ClearState
    
        :param algokit_utils.TransactionParameters transaction_parameters: (optional) Additional transaction parameters
        :param list[bytes] | None app_args: (optional) Application args to pass"""
    
        self.app_client.compose_clear_state(self.atc, _convert_transaction_parameters(transaction_parameters), app_args)
        return self


class TicTacToeSinglePlayerClient:
    """A class for interacting with the tic_tac_toe_single_player app providing high productivity and
    strongly typed methods to deploy and call the app"""

    @typing.overload
    def __init__(
        self,
        algod_client: algosdk.v2client.algod.AlgodClient,
        *,
        app_id: int = 0,
        signer: TransactionSigner | algokit_utils.Account | None = None,
        sender: str | None = None,
        suggested_params: algosdk.transaction.SuggestedParams | None = None,
        template_values: algokit_utils.TemplateValueMapping | None = None,
        app_name: str | None = None,
    ) -> None:
        ...

    @typing.overload
    def __init__(
        self,
        algod_client: algosdk.v2client.algod.AlgodClient,
        *,
        creator: str | algokit_utils.Account,
        indexer_client: algosdk.v2client.indexer.IndexerClient | None = None,
        existing_deployments: algokit_utils.AppLookup | None = None,
        signer: TransactionSigner | algokit_utils.Account | None = None,
        sender: str | None = None,
        suggested_params: algosdk.transaction.SuggestedParams | None = None,
        template_values: algokit_utils.TemplateValueMapping | None = None,
        app_name: str | None = None,
    ) -> None:
        ...

    def __init__(
        self,
        algod_client: algosdk.v2client.algod.AlgodClient,
        *,
        creator: str | algokit_utils.Account | None = None,
        indexer_client: algosdk.v2client.indexer.IndexerClient | None = None,
        existing_deployments: algokit_utils.AppLookup | None = None,
        app_id: int = 0,
        signer: TransactionSigner | algokit_utils.Account | None = None,
        sender: str | None = None,
        suggested_params: algosdk.transaction.SuggestedParams | None = None,
        template_values: algokit_utils.TemplateValueMapping | None = None,
        app_name: str | None = None,
    ) -> None:
        """
        TicTacToeSinglePlayerClient can be created with an app_id to interact with an existing application, alternatively
        it can be created with a creator and indexer_client specified to find existing applications by name and creator.
        
        :param AlgodClient algod_client: AlgoSDK algod client
        :param int app_id: The app_id of an existing application, to instead find the application by creator and name
        use the creator and indexer_client parameters
        :param str | Account creator: The address or Account of the app creator to resolve the app_id
        :param IndexerClient indexer_client: AlgoSDK indexer client, only required if deploying or finding app_id by
        creator and app name
        :param AppLookup existing_deployments:
        :param TransactionSigner | Account signer: Account or signer to use to sign transactions, if not specified and
        creator was passed as an Account will use that.
        :param str sender: Address to use as the sender for all transactions, will use the address associated with the
        signer if not specified.
        :param TemplateValueMapping template_values: Values to use for TMPL_* template variables, dictionary keys should
        *NOT* include the TMPL_ prefix
        :param str | None app_name: Name of application to use when deploying, defaults to name defined on the
        Application Specification
            """

        self.app_spec = APP_SPEC
        
        # calling full __init__ signature, so ignoring mypy warning about overloads
        self.app_client = algokit_utils.ApplicationClient(  # type: ignore[call-overload, misc]
            algod_client=algod_client,
            app_spec=self.app_spec,
            app_id=app_id,
            creator=creator,
            indexer_client=indexer_client,
            existing_deployments=existing_deployments,
            signer=signer,
            sender=sender,
            suggested_params=suggested_params,
            template_values=template_values,
            app_name=app_name,
        )

    @property
    def algod_client(self) -> algosdk.v2client.algod.AlgodClient:
        return self.app_client.algod_client

    @property
    def app_id(self) -> int:
        return self.app_client.app_id

    @app_id.setter
    def app_id(self, value: int) -> None:
        self.app_client.app_id = value

    @property
    def app_address(self) -> str:
        return self.app_client.app_address

    @property
    def sender(self) -> str | None:
        return self.app_client.sender

    @sender.setter
    def sender(self, value: str) -> None:
        self.app_client.sender = value

    @property
    def signer(self) -> TransactionSigner | None:
        return self.app_client.signer

    @signer.setter
    def signer(self, value: TransactionSigner) -> None:
        self.app_client.signer = value

    @property
    def suggested_params(self) -> algosdk.transaction.SuggestedParams | None:
        return self.app_client.suggested_params

    @suggested_params.setter
    def suggested_params(self, value: algosdk.transaction.SuggestedParams | None) -> None:
        self.app_client.suggested_params = value

    def get_global_state(self) -> GlobalState:
        """Returns the application's global state wrapped in a strongly typed class with options to format the stored value"""

        state = typing.cast(dict[bytes, bytes | int], self.app_client.get_global_state(raw=True))
        return GlobalState(state)

    def hello(
        self,
        *,
        name: str,
        transaction_parameters: algokit_utils.TransactionParameters | None = None,
    ) -> algokit_utils.ABITransactionResponse[str]:
        """Calls `hello(string)string` ABI method
        
        :param str name: The `name` ABI parameter
        :param algokit_utils.TransactionParameters transaction_parameters: (optional) Additional transaction parameters
        :returns algokit_utils.ABITransactionResponse[str]: The result of the transaction"""

        args = HelloArgs(
            name=name,
        )
        result = self.app_client.call(
            call_abi_method=args.method(),
            transaction_parameters=_convert_call_transaction_parameters(transaction_parameters),
            **_as_dict(args, convert_all=True),
        )
        return result

    def play_action_logic(
        self,
        *,
        position_index: int,
        transaction_parameters: algokit_utils.TransactionParameters | None = None,
    ) -> algokit_utils.ABITransactionResponse[str]:
        """Calls `play_action_logic(uint64)string` ABI method
        
        :param int position_index: The `position_index` ABI parameter
        :param algokit_utils.TransactionParameters transaction_parameters: (optional) Additional transaction parameters
        :returns algokit_utils.ABITransactionResponse[str]: The result of the transaction"""

        args = PlayActionLogicArgs(
            position_index=position_index,
        )
        result = self.app_client.call(
            call_abi_method=args.method(),
            transaction_parameters=_convert_call_transaction_parameters(transaction_parameters),
            **_as_dict(args, convert_all=True),
        )
        return result

    def money_refund_logic(
        self,
        *,
        transaction_parameters: algokit_utils.TransactionParameters | None = None,
    ) -> algokit_utils.ABITransactionResponse[None]:
        """Calls `money_refund_logic()void` ABI method
        
        :param algokit_utils.TransactionParameters transaction_parameters: (optional) Additional transaction parameters
        :returns algokit_utils.ABITransactionResponse[None]: The result of the transaction"""

        args = MoneyRefundLogicArgs()
        result = self.app_client.call(
            call_abi_method=args.method(),
            transaction_parameters=_convert_call_transaction_parameters(transaction_parameters),
            **_as_dict(args, convert_all=True),
        )
        return result

    def create_bare(
        self,
        *,
        on_complete: typing.Literal["no_op"] = "no_op",
        transaction_parameters: algokit_utils.CreateTransactionParameters | None = None,
    ) -> algokit_utils.TransactionResponse:
        """Creates an application using the no_op bare method
        
        :param typing.Literal[no_op] on_complete: On completion type to use
        :param algokit_utils.CreateTransactionParameters transaction_parameters: (optional) Additional transaction parameters
        :returns algokit_utils.TransactionResponse: The result of the transaction"""

        result = self.app_client.create(
            call_abi_method=False,
            transaction_parameters=_convert_create_transaction_parameters(transaction_parameters, on_complete),
        )
        return result

    def opt_in_bare(
        self,
        *,
        transaction_parameters: algokit_utils.TransactionParameters | None = None,
    ) -> algokit_utils.TransactionResponse:
        """Calls the opt_in bare method
        
        :param algokit_utils.TransactionParameters transaction_parameters: (optional) Additional transaction parameters
        :returns algokit_utils.TransactionResponse: The result of the transaction"""

        result = self.app_client.opt_in(
            call_abi_method=False,
            transaction_parameters=_convert_transaction_parameters(transaction_parameters),
        )
        return result

    def clear_state(
        self,
        transaction_parameters: algokit_utils.TransactionParameters | None = None,
        app_args: list[bytes] | None = None,
    ) -> algokit_utils.TransactionResponse:
        """Calls the application with on completion set to ClearState
    
        :param algokit_utils.TransactionParameters transaction_parameters: (optional) Additional transaction parameters
        :param list[bytes] | None app_args: (optional) Application args to pass
        :returns algokit_utils.TransactionResponse: The result of the transaction"""
    
        return self.app_client.clear_state(_convert_transaction_parameters(transaction_parameters), app_args)

    def deploy(
        self,
        version: str | None = None,
        *,
        signer: TransactionSigner | None = None,
        sender: str | None = None,
        allow_update: bool | None = None,
        allow_delete: bool | None = None,
        on_update: algokit_utils.OnUpdate = algokit_utils.OnUpdate.Fail,
        on_schema_break: algokit_utils.OnSchemaBreak = algokit_utils.OnSchemaBreak.Fail,
        template_values: algokit_utils.TemplateValueMapping | None = None,
        create_args: algokit_utils.DeployCallArgs | None = None,
        update_args: algokit_utils.DeployCallArgs | None = None,
        delete_args: algokit_utils.DeployCallArgs | None = None,
    ) -> algokit_utils.DeployResponse:
        """Deploy an application and update client to reference it.
        
        Idempotently deploy (create, update/delete if changed) an app against the given name via the given creator
        account, including deploy-time template placeholder substitutions.
        To understand the architecture decisions behind this functionality please see
        <https://github.com/algorandfoundation/algokit-cli/blob/main/docs/architecture-decisions/2023-01-12_smart-contract-deployment.md>
        
        ```{note}
        If there is a breaking state schema change to an existing app (and `on_schema_break` is set to
        'ReplaceApp' the existing app will be deleted and re-created.
        ```
        
        ```{note}
        If there is an update (different TEAL code) to an existing app (and `on_update` is set to 'ReplaceApp')
        the existing app will be deleted and re-created.
        ```
        
        :param str version: version to use when creating or updating app, if None version will be auto incremented
        :param algosdk.atomic_transaction_composer.TransactionSigner signer: signer to use when deploying app
        , if None uses self.signer
        :param str sender: sender address to use when deploying app, if None uses self.sender
        :param bool allow_delete: Used to set the `TMPL_DELETABLE` template variable to conditionally control if an app
        can be deleted
        :param bool allow_update: Used to set the `TMPL_UPDATABLE` template variable to conditionally control if an app
        can be updated
        :param OnUpdate on_update: Determines what action to take if an application update is required
        :param OnSchemaBreak on_schema_break: Determines what action to take if an application schema requirements
        has increased beyond the current allocation
        :param dict[str, int|str|bytes] template_values: Values to use for `TMPL_*` template variables, dictionary keys
        should *NOT* include the TMPL_ prefix
        :param algokit_utils.DeployCallArgs | None create_args: Arguments used when creating an application
        :param algokit_utils.DeployCallArgs | None update_args: Arguments used when updating an application
        :param algokit_utils.DeployCallArgs | None delete_args: Arguments used when deleting an application
        :return DeployResponse: details action taken and relevant transactions
        :raises DeploymentError: If the deployment failed"""

        return self.app_client.deploy(
            version,
            signer=signer,
            sender=sender,
            allow_update=allow_update,
            allow_delete=allow_delete,
            on_update=on_update,
            on_schema_break=on_schema_break,
            template_values=template_values,
            create_args=_convert_deploy_args(create_args),
            update_args=_convert_deploy_args(update_args),
            delete_args=_convert_deploy_args(delete_args),
        )

    def compose(self, atc: AtomicTransactionComposer | None = None) -> Composer:
        return Composer(self.app_client, atc or AtomicTransactionComposer())
