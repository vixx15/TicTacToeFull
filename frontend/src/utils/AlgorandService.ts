import * as algokit from '@algorandfoundation/algokit-utils'
import { AppDetails } from '@algorandfoundation/algokit-utils/types/app-client'
import { Algodv2, Indexer } from 'algosdk'
import { TicTacToeSinglePlayerClient } from '../contracts/tic_tac_toe_single_player'
import { getAlgodConfigFromViteEnvironment, getIndexerConfigFromViteEnvironment } from './network/getAlgoClientConfigs'

export interface TicTacToeGameState {
  playerXState: number
  playerOState: number
  boardState: string // Assuming this will be decoded to a string representation of the board
  playerOIndex: number
  betAmount: number
  gameStatus: number // Consider using an enum for readability, e.g., { 0: 'NotStarted', 1: 'InProgress', 2: 'Finished' }
}

interface DeployParams {
  // Define according to your contract's deployment parameters
  onSchemaBreak: string
  onUpdate: string
}

interface GlobalStateSchema {
  key: string
  value: {
    type: number // Or a more specific enum/type based on the SDK documentation
    bytes?: string
    uint?: number
  }
}

interface ApplicationInfoResponse {
  params: {
    'global-state'?: GlobalStateSchema[]
  }
}

class AlgorandService {
  private algodClient: Algodv2
  private indexer: Indexer
  private appClient: TicTacToeSinglePlayerClient | null = null
  private appId: number = 0

  constructor() {
    const algodConfig = getAlgodConfigFromViteEnvironment()
    this.algodClient = algokit.getAlgoClient({
      server: algodConfig.server,
      port: algodConfig.port,
      token: algodConfig.token,
    }) as Algodv2

    const indexerConfig = getIndexerConfigFromViteEnvironment()
    this.indexer = algokit.getAlgoIndexerClient({
      server: indexerConfig.server,
      port: indexerConfig.port,
      token: indexerConfig.token,
    }) as Indexer
  }

  public async initializeAppClient(activeAddress: string, signer: any): Promise<void> {
    // Adjust the parameters and types as necessary
    const appDetails: AppDetails = {
      resolveBy: 'creatorAndName',
      name: this.generateUniqueName('TicTacToe'),
      sender: { signer, addr: activeAddress },
      creatorAddress: activeAddress,
      findExistingUsing: this.indexer,
    }
    this.appClient = new TicTacToeSinglePlayerClient(appDetails, this.algodClient)
  }

  private generateUniqueName(baseName: string): string {
    const timestamp = Date.now()
    return `${baseName}_${timestamp}`
  }

  public async deployContract(deployParams: DeployParams): Promise<string> {
    if (!this.appClient) throw new Error('appClient is not initialized')
    try {
      await this.appClient.deploy(deployParams).then((response) => {
        this.appId = Number(response.appId)
        console.log(`Contract deployed successfully with appId:${this.appId}`)
        return `Contract deployed successfully with appId:${this.appId}`
      })
    } catch (error) {
      throw new Error(`Error deploying the contract: ${error.message}`)
    }

    return 'Error occured while deploying!'
  }

  public async playActionLogic(positionIndex: number): Promise<any> {
    if (!this.appClient) throw new Error('appClient is not initialized')
    try {
      const response = await this.appClient.playActionLogic({ position_index: positionIndex })
      return response.return
    } catch (error) {
      throw new Error(`Error calling the contract: ${error.message}`)
    }
  }

  public async getApplicationState(): Promise<TicTacToeGameState> {
    if (this.appId === 0) {
      throw new Error('App is not deployed yet!')
    }

    try {
      const appInfo = await this.algodClient.getApplicationByID(this.appId).do()
      const stateData: Partial<TicTacToeGameState> = {} // Use Partial<> since we'll be populating it dynamically

      appInfo.params['global-state'].forEach((state) => {
        const key = decodeBase64(state.key)
        const value = state.value.type === 2 ? state.value.uint : decodeBase64(state.value.bytes)

        switch (key) {
          case 'player_x_state':
            stateData.playerXState = value as number
            break
          case 'player_o_state':
            stateData.playerOState = value as number
            break
          case 'board_state':
            stateData.boardState = value as string
            break
          case 'player_o_index':
            stateData.playerOIndex = value as number
            break
          case 'bet_amount':
            stateData.betAmount = value as number
            break
          case 'game_status':
            stateData.gameStatus = value as number
            break
          // Add cases for other state variables as needed
        }
      })

      return stateData as TicTacToeGameState // Cast to TicTacToeGameState since we know all fields should be populated
    } catch (e: unknown) {
      console.error('Error retrieving application state:', e.message)
      throw e
    }
  }
}

// Utility function for decoding base64
function decodeBase64(base64String: string): string {
  if (typeof Buffer !== 'undefined') {
    // For Node.js
    return Buffer.from(base64String, 'base64').toString()
  } else {
    // For browsers
    return atob(base64String)
  }
}

export default new AlgorandService()
