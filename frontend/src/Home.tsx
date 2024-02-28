// src/components/Home.tsx
import { useWallet } from '@txnlab/use-wallet'
import React, { useEffect, useState } from 'react'
import AppCalls from './components/AppCalls'
import { Board } from './components/Board'
import { ChoosePlayer } from './components/ChoosePlayer'
import ConnectWallet from './components/ConnectWallet'
import Transact from './components/Transact'
import { WinnerModal } from './components/WinnerModal'
import AlgorandService from './utils/AlgorandService'

interface HomeProps { }

const Home: React.FC<HomeProps> = () => {
  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false)
  const [openDemoModal, setOpenDemoModal] = useState<boolean>(false)
  const [appCallsDemoModal, setAppCallsDemoModal] = useState<boolean>(false)
  const { activeAddress, signer } = useWallet()

  useEffect(() => {
    console.log('Active address has changed:', activeAddress)
  }, [activeAddress]) // Dependency array includes activeAddress, so the effect runs when it changes

  useEffect(() => {
    if (activeAddress && signer) {
      AlgorandService.initializeAppClient(activeAddress, signer)
    }
  }, [activeAddress, signer])

  const [isX, setIsX] = useState<boolean>(true)
  const [newGame, setNewGame] = useState<boolean>(false)
  const [squares, setSquares] = useState<Array<any>>(Array(9).fill(null))
  const [winner, setWinner] = useState<string>('')

  function handlePlayerX() {
    setIsX(true)
  }

  function handlePlayerO() {
    setIsX(false)
  }

  function handlePlayer(i: number) {
    if (calculateWinner(squares) || squares[i]) {
      return
    }

    squares[i] = isX ? 'X' : 'O'
    setSquares(squares)
    setIsX(!isX)
  }

  function handleRestartGame() {
    setIsX(true)
    setSquares(Array(9).fill(null))
  }
  function handleNewGame() {
    setIsX(true)
    setSquares(Array(9).fill(null))
    setNewGame(true)
  }

  function handleQuitGame() {
    setIsX(true)
    setSquares(Array(9).fill(null))
    setNewGame(false)
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

  const handleDeployClick = async (): Promise<void> => {
    try {
      const deployParams = {
        onSchemaBreak: 'append',
        onUpdate: 'append',
      }
      await AlgorandService.deployContract(deployParams)
    } catch (error) {
      throw error
    }
  }

  const playMove = async (positionIndex: number): Promise<string> => {
    const response = await AlgorandService.playActionLogic(positionIndex)
    return response
  }

  return (
    <div className="hero min-h-screen bg-teal-400">
      <div className="hero-content text-center rounded-lg p-6 max-w-md bg-white mx-auto">
        <div className="max-w-md">
          <h1 className="text-4xl">
            Welcome to <div className="font-bold">AlgoKit 🙂</div>
          </h1>
          <p className="py-6">
            This starter has been generated using official AlgoKit React template. Refer to the resource below for next steps.
          </p>

          <div className="grid">
            <a
              data-test-id="getting-started"
              className="btn btn-primary m-2"
              target="_blank"
              href="https://github.com/algorandfoundation/algokit-cli"
            >
              Getting started
            </a>

            <div className="flex min-h-screen bg-[#192a32] flex-col items-center py-2">
              <title>Tic-Tic-Toe Game</title>
              <link rel="icon" href="/favicon.ico" />

              <h1 className="text-4xl md:text-6xl font-extrabold mt-4 text-[#30c4bd] ">
                Tic <span className="text-[#f3b236]">Tac </span> Toe
              </h1>

              {!newGame ? (
                <ChoosePlayer handleNewGame={handleNewGame} handlePlayerX={handlePlayerX} handlePlayerO={handlePlayerO} />
              ) : (
                <Board winner={winner} playerX={isX} squares={squares} handlePlayer={handlePlayer} handleRestartGame={handleRestartGame} />
              )}
              {winner && <WinnerModal winner={winner} handleQuitGame={handleQuitGame} handleNewGame={handleNewGame} />}
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

            {activeAddress && (
              <button data-test-id="appcalls-demo" className="btn m-2" onClick={toggleAppCallsModal}>
                Contract Interactions Demo
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
          />
        </div>
      </div>
    </div>
  )
}

export default Home
