// src/components/Home.tsx
import { useWallet } from '@txnlab/use-wallet'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import AppCalls from './components/AppCalls'
import { Board } from './components/Board'
import ConnectWallet from './components/ConnectWallet'
import Transact from './components/Transact'
import { WinnerModal } from './components/WinnerModal'
import AlgorandService, { TicTacToeGameState } from './utils/AlgorandService'

interface HomeProps { }

const Home: React.FC<HomeProps> = () => {
  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false)
  const [openDemoModal, setOpenDemoModal] = useState<boolean>(false)
  const [appCallsDemoModal, setAppCallsDemoModal] = useState<boolean>(false)
  const { activeAddress, signer } = useWallet()
  const { enqueueSnackbar } = useSnackbar()
  const [gameState, setGameState] = useState<TicTacToeGameState | null>(null)
  useEffect(() => {
    console.log('Active address has changed:', activeAddress)
  }, [activeAddress]) // Dependency array includes activeAddress, so the effect runs when it changes
  /*
  useEffect(() => {
    console.log('UE UE UE')
    if (activeAddress && signer) {
      // AlgorandService.initializeAppClient(activeAddress, signer)
    }
  }, [activeAddress, signer])
*/
  const [newGame, setNewGame] = useState<boolean>(false)
  const [squares, setSquares] = useState<Array<any>>(Array(9).fill(null))
  const [winner, setWinner] = useState<string>('')
  const [draw, setDraw] = useState<boolean>(false)
  useEffect(() => {
    if (gameState?.playerXState !== undefined && gameState.playerOState !== undefined) {
      setSquares(getBoardSquares(gameState?.playerXState, gameState?.playerOState))
    }
  }, [gameState?.playerXState])
  useEffect(() => {
    if (gameState?.gameStatus !== undefined) {
      if (gameState.gameStatus == 1) {
        setWinner('X')
      } else if (gameState.gameStatus == 2) {
        setWinner('O')
      } else if (gameState.gameStatus == 3) {
        setDraw(true)
      }
    }
  }, [gameState?.playerXState])

  function handlePlayer(i: number) {
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    playMove(i)
  }

  function handleRestartGame() {
    setSquares(Array(9).fill(null))
  }
  function handleNewGame() {
    setGameState(null)
    setSquares(Array(9).fill(null))
  }

  function handleQuitGame() {
    setSquares(Array(9).fill(null))
    setNewGame(false)
  }

  function getBoardSquares(playerXState: number, playerOState: number): Array<string | null> {
    const squares = Array<string | null>(9).fill(null)

    for (let i = 0; i < 9; i++) {
      // Check if the bit at position i is set for player X
      if ((playerXState & (1 << i)) !== 0) {
        squares[i] = 'X'
      }
      // Check if the bit at position i is set for player O
      else if ((playerOState & (1 << i)) !== 0) {
        squares[i] = 'O'
      }
    }

    return squares
  }

  function calculateWinner(squares: Array<any>) {
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (let i = 0; i < winningPatterns.length; i++) {
      const [a, b, c] = winningPatterns[i]

      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  const toggleWalletModal = () => {
    setOpenWalletModal(!openWalletModal)
  }

  const toggleDemoModal = () => {
    setOpenDemoModal(!openDemoModal)
  }

  const toggleAppCallsModal = () => {
    setAppCallsDemoModal(!appCallsDemoModal)
  }

  const handleDeployClick = async () => {
    try {
      const deployParams = {
        onSchemaBreak: 'append',
        onUpdate: 'append',
      }
      const response = await AlgorandService.deployContract(deployParams, activeAddress, signer)
      getApplicationState()
      enqueueSnackbar(`Message: ${response}`, { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(`Deployment failed: ${error.message}`, { variant: 'error' })
    }
  }

  const handlePrize = async () => {
    try {
      const response = await AlgorandService.payWinner(activeAddress, signer)
      enqueueSnackbar(`Message: ${response}`, { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(`Transaction failed: ${error.message}`, { variant: 'error' })
    }
  }

  const getApplicationState = async (): Promise<void> => {
    const state = await AlgorandService.getApplicationState()
    setGameState(state)
  }

  const playMove = async (positionIndex: number): Promise<boolean> => {
    const response = await AlgorandService.playActionLogic(positionIndex)
      .then((response) => {
        enqueueSnackbar(`Response from the contract: ${response}`, { variant: 'success' })
        getApplicationState()
        return true
      })
      .catch((e: Error) => {
        enqueueSnackbar(`Error calling the contract: ${e.message}`, { variant: 'error' })
        return false
      })
      .finally(() => {
        //setLoading(false)
      })
    return false
  }

  return (
    <div className="hero min-h-screen bg-teal-400">
      <div className="hero-content text-center rounded-lg p-6 max-w-md bg-white mx-auto">
        <div className="max-w-md">
          <div className="grid">
            <div className="flex min-h-screen bg-[#192a32] flex-col items-center py-2">
              <title>Tic-Tic-Toe Game</title>
              <link rel="icon" href="/favicon.ico" />

              <h1 className="text-4xl md:text-6xl font-extrabold mt-4 text-[#30c4bd] ">
                Tic <span className="text-[#f3b236]">Tac </span> Toe
              </h1>

              {
                /*!newGame ? (
                <ChoosePlayer handleNewGame={handleNewGame} handlePlayerX={handlePlayerX} handlePlayerO={handlePlayerO} />
              ) :*/ gameState?.gameStatus !== undefined && (
                  <Board winner={winner} squares={squares} handlePlayer={handlePlayer} handleRestartGame={handleRestartGame} />
                )
              }
              {gameState?.gameStatus !== undefined && gameState?.gameStatus !== 0 && (
                <WinnerModal winnerNumber={gameState?.gameStatus} handleQuitGame={handleQuitGame} handleNewGame={handleNewGame} />
              )}
            </div>

            <div className="divider" />
            <button data-test-id="connect-wallet" className="btn m-2" onClick={toggleWalletModal}>
              Wallet Connection
            </button>

            {activeAddress && (
              <button data-test-id="transactions-demo" className="btn m-2" onClick={toggleDemoModal}>
                Transactions Demo
              </button>
            )}

            {winner && (
              <button data-test-id="connect-wallet" className="btn m-2" onClick={handlePrize}>
                Collect Prize
              </button>
            )}
            {activeAddress && (
              <button data-test-id="appcalls-demo" className="btn m-2" onClick={toggleAppCallsModal}>
                Contract Interactions Demo
              </button>
            )}

            {activeAddress && (
              <button data-test-id="appcalls-demo" className="btn m-2" onClick={handleDeployClick}>
                Deploy
              </button>
            )}
          </div>

          <ConnectWallet openModal={openWalletModal} closeModal={toggleWalletModal} />
          <Transact openModal={openDemoModal} setModalState={setOpenDemoModal} />
          <AppCalls
            openModal={appCallsDemoModal}
            setModalState={setAppCallsDemoModal}
            onDeployClick={handleDeployClick}
            playMove={playMove}
            getAppState={getApplicationState}
          />
        </div>
      </div>
    </div>
  )
}

export default Home
