/* eslint-disable */
/**
 * This file was automatically generated by @algorandfoundation/algokit-client-generator.
 * DO NOT MODIFY IT BY HAND.
 * requires: @algorandfoundation/algokit-utils: ^2
 */
import * as algokit from '@algorandfoundation/algokit-utils'
import type {
  ABIAppCallArg,
  AppCallTransactionResult,
  AppCallTransactionResultOfType,
  AppCompilationResult,
  AppReference,
  AppState,
  CoreAppCallArgs,
  RawAppCallArgs,
  TealTemplateParams,
} from '@algorandfoundation/algokit-utils/types/app'
import type {
  AppClientCallCoreParams,
  AppClientCompilationParams,
  AppClientDeployCoreParams,
  AppDetails,
  ApplicationClient,
} from '@algorandfoundation/algokit-utils/types/app-client'
import type { AppSpec } from '@algorandfoundation/algokit-utils/types/app-spec'
import type { SendTransactionResult, TransactionToSign, SendTransactionFrom, SendTransactionParams } from '@algorandfoundation/algokit-utils/types/transaction'
import type { ABIResult, TransactionWithSigner } from 'algosdk'
import { Algodv2, OnApplicationComplete, Transaction, AtomicTransactionComposer, modelsv2 } from 'algosdk'
export const APP_SPEC: AppSpec = {
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
}

/**
 * Defines an onCompletionAction of 'no_op'
 */
export type OnCompleteNoOp =  { onCompleteAction?: 'no_op' | OnApplicationComplete.NoOpOC }
/**
 * Defines an onCompletionAction of 'opt_in'
 */
export type OnCompleteOptIn =  { onCompleteAction: 'opt_in' | OnApplicationComplete.OptInOC }
/**
 * Defines an onCompletionAction of 'close_out'
 */
export type OnCompleteCloseOut =  { onCompleteAction: 'close_out' | OnApplicationComplete.CloseOutOC }
/**
 * Defines an onCompletionAction of 'delete_application'
 */
export type OnCompleteDelApp =  { onCompleteAction: 'delete_application' | OnApplicationComplete.DeleteApplicationOC }
/**
 * Defines an onCompletionAction of 'update_application'
 */
export type OnCompleteUpdApp =  { onCompleteAction: 'update_application' | OnApplicationComplete.UpdateApplicationOC }
/**
 * A state record containing a single unsigned integer
 */
export type IntegerState = {
  /**
   * Gets the state value as a BigInt.
   */
  asBigInt(): bigint
  /**
   * Gets the state value as a number.
   */
  asNumber(): number
}
/**
 * A state record containing binary data
 */
export type BinaryState = {
  /**
   * Gets the state value as a Uint8Array
   */
  asByteArray(): Uint8Array
  /**
   * Gets the state value as a string
   */
  asString(): string
}

export type AppCreateCallTransactionResult = AppCallTransactionResult & Partial<AppCompilationResult> & AppReference
export type AppUpdateCallTransactionResult = AppCallTransactionResult & Partial<AppCompilationResult>

export type AppClientComposeCallCoreParams = Omit<AppClientCallCoreParams, 'sendParams'> & {
  sendParams?: Omit<SendTransactionParams, 'skipSending' | 'atc' | 'skipWaiting' | 'maxRoundsToWaitForConfirmation' | 'populateAppCallResources'>
}
export type AppClientComposeExecuteParams = Pick<SendTransactionParams, 'skipWaiting' | 'maxRoundsToWaitForConfirmation' | 'populateAppCallResources' | 'suppressLog'>

/**
 * Defines the types of available calls and state of the TicTacToeSinglePlayer smart contract.
 */
export type TicTacToeSinglePlayer = {
  /**
   * Maps method signatures / names to their argument and return types.
   */
  methods:
    & Record<'hello(string)string' | 'hello', {
      argsObj: {
        name: string
      }
      argsTuple: [name: string]
      returns: string
    }>
    & Record<'play_action_logic(uint64)string' | 'play_action_logic', {
      argsObj: {
        position_index: bigint | number
      }
      argsTuple: [position_index: bigint | number]
      returns: string
    }>
    & Record<'money_refund_logic()void' | 'money_refund_logic', {
      argsObj: {
      }
      argsTuple: []
      returns: void
    }>
  /**
   * Defines the shape of the global and local state of the application.
   */
  state: {
    global: {
      'bet_amount'?: IntegerState
      'board_state'?: BinaryState
      'game_status'?: IntegerState
      'player_o_index'?: IntegerState
      'player_o_state'?: IntegerState
      'player_x_state'?: IntegerState
    }
  }
}
/**
 * Defines the possible abi call signatures
 */
export type TicTacToeSinglePlayerSig = keyof TicTacToeSinglePlayer['methods']
/**
 * Defines an object containing all relevant parameters for a single call to the contract. Where TSignature is undefined, a bare call is made
 */
export type TypedCallParams<TSignature extends TicTacToeSinglePlayerSig | undefined> = {
  method: TSignature
  methodArgs: TSignature extends undefined ? undefined : Array<ABIAppCallArg | undefined>
} & AppClientCallCoreParams & CoreAppCallArgs
/**
 * Defines the arguments required for a bare call
 */
export type BareCallArgs = Omit<RawAppCallArgs, keyof CoreAppCallArgs>
/**
 * Maps a method signature from the TicTacToeSinglePlayer smart contract to the method's arguments in either tuple of struct form
 */
export type MethodArgs<TSignature extends TicTacToeSinglePlayerSig> = TicTacToeSinglePlayer['methods'][TSignature]['argsObj' | 'argsTuple']
/**
 * Maps a method signature from the TicTacToeSinglePlayer smart contract to the method's return type
 */
export type MethodReturn<TSignature extends TicTacToeSinglePlayerSig> = TicTacToeSinglePlayer['methods'][TSignature]['returns']

/**
 * A factory for available 'create' calls
 */
export type TicTacToeSinglePlayerCreateCalls = (typeof TicTacToeSinglePlayerCallFactory)['create']
/**
 * Defines supported create methods for this smart contract
 */
export type TicTacToeSinglePlayerCreateCallParams =
  | (TypedCallParams<undefined> & (OnCompleteNoOp))
/**
 * Defines arguments required for the deploy method.
 */
export type TicTacToeSinglePlayerDeployArgs = {
  deployTimeParams?: TealTemplateParams
  /**
   * A delegate which takes a create call factory and returns the create call params for this smart contract
   */
  createCall?: (callFactory: TicTacToeSinglePlayerCreateCalls) => TicTacToeSinglePlayerCreateCallParams
}


/**
 * Exposes methods for constructing all available smart contract calls
 */
export abstract class TicTacToeSinglePlayerCallFactory {
  /**
   * Gets available create call factories
   */
  static get create() {
    return {
      /**
       * Constructs a create call for the tic_tac_toe_single_player smart contract using a bare call
       *
       * @param params Any parameters for the call
       * @returns A TypedCallParams object for the call
       */
      bare(params: BareCallArgs & AppClientCallCoreParams & CoreAppCallArgs & AppClientCompilationParams & (OnCompleteNoOp) = {}) {
        return {
          method: undefined,
          methodArgs: undefined,
          ...params,
        }
      },
    }
  }

  /**
   * Gets available optIn call factories
   */
  static get optIn() {
    return {
      /**
       * Constructs an opt in call for the tic_tac_toe_single_player smart contract using a bare call
       *
       * @param params Any parameters for the call
       * @returns A TypedCallParams object for the call
       */
      bare(params: BareCallArgs & AppClientCallCoreParams & CoreAppCallArgs = {}) {
        return {
          method: undefined,
          methodArgs: undefined,
          ...params,
        }
      },
    }
  }

  /**
   * Constructs a no op call for the hello(string)string ABI method
   *
   * @param args Any args for the contract call
   * @param params Any additional parameters for the call
   * @returns A TypedCallParams object for the call
   */
  static hello(args: MethodArgs<'hello(string)string'>, params: AppClientCallCoreParams & CoreAppCallArgs) {
    return {
      method: 'hello(string)string' as const,
      methodArgs: Array.isArray(args) ? args : [args.name],
      ...params,
    }
  }
  /**
   * Constructs a no op call for the play_action_logic(uint64)string ABI method
   *
   * @param args Any args for the contract call
   * @param params Any additional parameters for the call
   * @returns A TypedCallParams object for the call
   */
  static playActionLogic(args: MethodArgs<'play_action_logic(uint64)string'>, params: AppClientCallCoreParams & CoreAppCallArgs) {
    return {
      method: 'play_action_logic(uint64)string' as const,
      methodArgs: Array.isArray(args) ? args : [args.position_index],
      ...params,
    }
  }
  /**
   * Constructs a no op call for the money_refund_logic()void ABI method
   *
   * @param args Any args for the contract call
   * @param params Any additional parameters for the call
   * @returns A TypedCallParams object for the call
   */
  static moneyRefundLogic(args: MethodArgs<'money_refund_logic()void'>, params: AppClientCallCoreParams & CoreAppCallArgs) {
    return {
      method: 'money_refund_logic()void' as const,
      methodArgs: Array.isArray(args) ? args : [],
      ...params,
    }
  }
}

/**
 * A client to make calls to the tic_tac_toe_single_player smart contract
 */
export class TicTacToeSinglePlayerClient {
  /**
   * The underlying `ApplicationClient` for when you want to have more flexibility
   */
  public readonly appClient: ApplicationClient

  private readonly sender: SendTransactionFrom | undefined

  /**
   * Creates a new instance of `TicTacToeSinglePlayerClient`
   *
   * @param appDetails appDetails The details to identify the app to deploy
   * @param algod An algod client instance
   */
  constructor(appDetails: AppDetails, private algod: Algodv2) {
    this.sender = appDetails.sender
    this.appClient = algokit.getAppClient({
      ...appDetails,
      app: APP_SPEC
    }, algod)
  }

  /**
   * Checks for decode errors on the AppCallTransactionResult and maps the return value to the specified generic type
   *
   * @param result The AppCallTransactionResult to be mapped
   * @param returnValueFormatter An optional delegate to format the return value if required
   * @returns The smart contract response with an updated return value
   */
  protected mapReturnValue<TReturn, TResult extends AppCallTransactionResult = AppCallTransactionResult>(result: AppCallTransactionResult, returnValueFormatter?: (value: any) => TReturn): AppCallTransactionResultOfType<TReturn> & TResult {
    if(result.return?.decodeError) {
      throw result.return.decodeError
    }
    const returnValue = result.return?.returnValue !== undefined && returnValueFormatter !== undefined
      ? returnValueFormatter(result.return.returnValue)
      : result.return?.returnValue as TReturn | undefined
      return { ...result, return: returnValue } as AppCallTransactionResultOfType<TReturn> & TResult
  }

  /**
   * Calls the ABI method with the matching signature using an onCompletion code of NO_OP
   *
   * @param typedCallParams An object containing the method signature, args, and any other relevant parameters
   * @param returnValueFormatter An optional delegate which when provided will be used to map non-undefined return values to the target type
   * @returns The result of the smart contract call
   */
  public async call<TSignature extends keyof TicTacToeSinglePlayer['methods']>(typedCallParams: TypedCallParams<TSignature>, returnValueFormatter?: (value: any) => MethodReturn<TSignature>) {
    return this.mapReturnValue<MethodReturn<TSignature>>(await this.appClient.call(typedCallParams), returnValueFormatter)
  }

  /**
   * Idempotently deploys the tic_tac_toe_single_player smart contract.
   *
   * @param params The arguments for the contract calls and any additional parameters for the call
   * @returns The deployment result
   */
  public deploy(params: TicTacToeSinglePlayerDeployArgs & AppClientDeployCoreParams = {}): ReturnType<ApplicationClient['deploy']> {
    const createArgs = params.createCall?.(TicTacToeSinglePlayerCallFactory.create)
    return this.appClient.deploy({
      ...params,
      createArgs,
      createOnCompleteAction: createArgs?.onCompleteAction,
    })
  }

  /**
   * Gets available create methods
   */
  public get create() {
    const $this = this
    return {
      /**
       * Creates a new instance of the tic_tac_toe_single_player smart contract using a bare call.
       *
       * @param args The arguments for the bare call
       * @returns The create result
       */
      async bare(args: BareCallArgs & AppClientCallCoreParams & AppClientCompilationParams & CoreAppCallArgs & (OnCompleteNoOp) = {}) {
        return $this.mapReturnValue<undefined, AppCreateCallTransactionResult>(await $this.appClient.create(args))
      },
    }
  }

  /**
   * Gets available optIn methods
   */
  public get optIn() {
    const $this = this
    return {
      /**
       * Opts the user into an existing instance of the tic_tac_toe_single_player smart contract using a bare call.
       *
       * @param args The arguments for the bare call
       * @returns The optIn result
       */
      async bare(args: BareCallArgs & AppClientCallCoreParams & CoreAppCallArgs = {}) {
        return $this.mapReturnValue<undefined>(await $this.appClient.optIn(args))
      },
    }
  }

  /**
   * Makes a clear_state call to an existing instance of the tic_tac_toe_single_player smart contract.
   *
   * @param args The arguments for the bare call
   * @returns The clear_state result
   */
  public clearState(args: BareCallArgs & AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.appClient.clearState(args)
  }

  /**
   * Calls the hello(string)string ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The result of the call
   */
  public hello(args: MethodArgs<'hello(string)string'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.call(TicTacToeSinglePlayerCallFactory.hello(args, params))
  }

  /**
   * Calls the play_action_logic(uint64)string ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The result of the call
   */
  public playActionLogic(args: MethodArgs<'play_action_logic(uint64)string'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.call(TicTacToeSinglePlayerCallFactory.playActionLogic(args, params))
  }

  /**
   * Calls the money_refund_logic()void ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The result of the call
   */
  public moneyRefundLogic(args: MethodArgs<'money_refund_logic()void'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.call(TicTacToeSinglePlayerCallFactory.moneyRefundLogic(args, params))
  }

  /**
   * Extracts a binary state value out of an AppState dictionary
   *
   * @param state The state dictionary containing the state value
   * @param key The key of the state value
   * @returns A BinaryState instance containing the state value, or undefined if the key was not found
   */
  private static getBinaryState(state: AppState, key: string): BinaryState | undefined {
    const value = state[key]
    if (!value) return undefined
    if (!('valueRaw' in value))
      throw new Error(`Failed to parse state value for ${key}; received an int when expected a byte array`)
    return {
      asString(): string {
        return value.value
      },
      asByteArray(): Uint8Array {
        return value.valueRaw
      }
    }
  }

  /**
   * Extracts a integer state value out of an AppState dictionary
   *
   * @param state The state dictionary containing the state value
   * @param key The key of the state value
   * @returns An IntegerState instance containing the state value, or undefined if the key was not found
   */
  private static getIntegerState(state: AppState, key: string): IntegerState | undefined {
    const value = state[key]
    if (!value) return undefined
    if ('valueRaw' in value)
      throw new Error(`Failed to parse state value for ${key}; received a byte array when expected a number`)
    return {
      asBigInt() {
        return typeof value.value === 'bigint' ? value.value : BigInt(value.value)
      },
      asNumber(): number {
        return typeof value.value === 'bigint' ? Number(value.value) : value.value
      },
    }
  }

  /**
   * Returns the smart contract's global state wrapped in a strongly typed accessor with options to format the stored value
   */
  public async getGlobalState(): Promise<TicTacToeSinglePlayer['state']['global']> {
    const state = await this.appClient.getGlobalState()
    return {
      get bet_amount() {
        return TicTacToeSinglePlayerClient.getIntegerState(state, 'bet_amount')
      },
      get board_state() {
        return TicTacToeSinglePlayerClient.getBinaryState(state, 'board_state')
      },
      get game_status() {
        return TicTacToeSinglePlayerClient.getIntegerState(state, 'game_status')
      },
      get player_o_index() {
        return TicTacToeSinglePlayerClient.getIntegerState(state, 'player_o_index')
      },
      get player_o_state() {
        return TicTacToeSinglePlayerClient.getIntegerState(state, 'player_o_state')
      },
      get player_x_state() {
        return TicTacToeSinglePlayerClient.getIntegerState(state, 'player_x_state')
      },
    }
  }

  public compose(): TicTacToeSinglePlayerComposer {
    const client = this
    const atc = new AtomicTransactionComposer()
    let promiseChain:Promise<unknown> = Promise.resolve()
    const resultMappers: Array<undefined | ((x: any) => any)> = []
    return {
      hello(args: MethodArgs<'hello(string)string'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.hello(args, {...params, sendParams: {...params?.sendParams, skipSending: true, atc}}))
        resultMappers.push(undefined)
        return this
      },
      playActionLogic(args: MethodArgs<'play_action_logic(uint64)string'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.playActionLogic(args, {...params, sendParams: {...params?.sendParams, skipSending: true, atc}}))
        resultMappers.push(undefined)
        return this
      },
      moneyRefundLogic(args: MethodArgs<'money_refund_logic()void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.moneyRefundLogic(args, {...params, sendParams: {...params?.sendParams, skipSending: true, atc}}))
        resultMappers.push(undefined)
        return this
      },
      get optIn() {
        const $this = this
        return {
          bare(args?: BareCallArgs & AppClientComposeCallCoreParams & CoreAppCallArgs) {
            promiseChain = promiseChain.then(() => client.optIn.bare({...args, sendParams: {...args?.sendParams, skipSending: true, atc}}))
            resultMappers.push(undefined)
            return $this
          },
        }
      },
      clearState(args?: BareCallArgs & AppClientComposeCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.clearState({...args, sendParams: {...args?.sendParams, skipSending: true, atc}}))
        resultMappers.push(undefined)
        return this
      },
      addTransaction(txn: TransactionWithSigner | TransactionToSign | Transaction | Promise<SendTransactionResult>, defaultSender?: SendTransactionFrom) {
        promiseChain = promiseChain.then(async () => atc.addTransaction(await algokit.getTransactionWithSigner(txn, defaultSender ?? client.sender)))
        return this
      },
      async atc() {
        await promiseChain
        return atc
      },
      async simulate(options?: SimulateOptions) {
        await promiseChain
        const result = await atc.simulate(client.algod, new modelsv2.SimulateRequest({ txnGroups: [], ...options }))
        return {
          ...result,
          returns: result.methodResults?.map((val, i) => resultMappers[i] !== undefined ? resultMappers[i]!(val.returnValue) : val.returnValue)
        }
      },
      async execute(sendParams?: AppClientComposeExecuteParams) {
        await promiseChain
        const result = await algokit.sendAtomicTransactionComposer({ atc, sendParams }, client.algod)
        return {
          ...result,
          returns: result.returns?.map((val, i) => resultMappers[i] !== undefined ? resultMappers[i]!(val.returnValue) : val.returnValue)
        }
      }
    } as unknown as TicTacToeSinglePlayerComposer
  }
}
export type TicTacToeSinglePlayerComposer<TReturns extends [...any[]] = []> = {
  /**
   * Calls the hello(string)string ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  hello(args: MethodArgs<'hello(string)string'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs): TicTacToeSinglePlayerComposer<[...TReturns, MethodReturn<'hello(string)string'>]>

  /**
   * Calls the play_action_logic(uint64)string ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  playActionLogic(args: MethodArgs<'play_action_logic(uint64)string'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs): TicTacToeSinglePlayerComposer<[...TReturns, MethodReturn<'play_action_logic(uint64)string'>]>

  /**
   * Calls the money_refund_logic()void ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  moneyRefundLogic(args: MethodArgs<'money_refund_logic()void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs): TicTacToeSinglePlayerComposer<[...TReturns, MethodReturn<'money_refund_logic()void'>]>

  /**
   * Gets available optIn methods
   */
  readonly optIn: {
    /**
     * Opts the user into an existing instance of the tic_tac_toe_single_player smart contract using a bare call.
     *
     * @param args The arguments for the bare call
     * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
     */
    bare(args?: BareCallArgs & AppClientComposeCallCoreParams & CoreAppCallArgs): TicTacToeSinglePlayerComposer<[...TReturns, undefined]>
  }

  /**
   * Makes a clear_state call to an existing instance of the tic_tac_toe_single_player smart contract.
   *
   * @param args The arguments for the bare call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  clearState(args?: BareCallArgs & AppClientComposeCallCoreParams & CoreAppCallArgs): TicTacToeSinglePlayerComposer<[...TReturns, undefined]>

  /**
   * Adds a transaction to the composer
   *
   * @param txn One of: A TransactionWithSigner object (returned as is), a TransactionToSign object (signer is obtained from the signer property), a Transaction object (signer is extracted from the defaultSender parameter), an async SendTransactionResult returned by one of algokit utils helpers (signer is obtained from the defaultSender parameter)
   * @param defaultSender The default sender to be used to obtain a signer where the object provided to the transaction parameter does not include a signer.
   */
  addTransaction(txn: TransactionWithSigner | TransactionToSign | Transaction | Promise<SendTransactionResult>, defaultSender?: SendTransactionFrom): TicTacToeSinglePlayerComposer<TReturns>
  /**
   * Returns the underlying AtomicTransactionComposer instance
   */
  atc(): Promise<AtomicTransactionComposer>
  /**
   * Simulates the transaction group and returns the result
   */
  simulate(options?: SimulateOptions): Promise<TicTacToeSinglePlayerComposerSimulateResult<TReturns>>
  /**
   * Executes the transaction group and returns the results
   */
  execute(sendParams?: AppClientComposeExecuteParams): Promise<TicTacToeSinglePlayerComposerResults<TReturns>>
}
export type SimulateOptions = Omit<ConstructorParameters<typeof modelsv2.SimulateRequest>[0], 'txnGroups'>
export type TicTacToeSinglePlayerComposerSimulateResult<TReturns extends [...any[]]> = {
  returns: TReturns
  methodResults: ABIResult[]
  simulateResponse: modelsv2.SimulateResponse
}
export type TicTacToeSinglePlayerComposerResults<TReturns extends [...any[]]> = {
  returns: TReturns
  groupId: string
  txIds: string[]
  transactions: Transaction[]
}