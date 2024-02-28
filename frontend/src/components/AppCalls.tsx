import * as algokit from '@algorandfoundation/algokit-utils'
import { AppDetails } from '@algorandfoundation/algokit-utils/types/app-client'
import { useWallet } from '@txnlab/use-wallet'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { TicTacToeSinglePlayerClient } from '../contracts/tic_tac_toe_single_player'
import { getAlgodConfigFromViteEnvironment, getIndexerConfigFromViteEnvironment } from '../utils/network/getAlgoClientConfigs'

interface AppCallsInterface {
  openModal: boolean
  setModalState: (value: boolean) => void
  onDeployClick: () => Promise<string>
  playMove: (position: number) => Promise<string>
  getAppState: () => Promise<void>
}

const AppCalls = ({ openModal, setModalState, onDeployClick, playMove, getAppState }: AppCallsInterface) => {
  /* const [loading, setLoading] = useState<boolean>(false)
   const [contractInput, setContractInput] = useState<string>('')

   const algodConfig = getAlgodConfigFromViteEnvironment()
   const algodClient = algokit.getAlgoClient({
     server: algodConfig.server,
     port: algodConfig.port,
     token: algodConfig.token,
   })

   const indexerConfig = getIndexerConfigFromViteEnvironment()
   const indexer = algokit.getAlgoIndexerClient({
     server: indexerConfig.server,
     port: indexerConfig.port,
     token: indexerConfig.token,
   })
   const { signer, activeAddress } = useWallet()
   const [contractDeployed, setContractDeployed] = useState<boolean>(false);
 */

  const [loading, setLoading] = useState<boolean>(false)
  const [contractInput, setContractInput] = useState<number>(0)
  const [contractDeployed, setContractDeployed] = useState<boolean>(false)
  const [appClient, setAppClient] = useState<TicTacToeSinglePlayerClient | null>(null) // Store appClient in state

  const { signer, activeAddress } = useWallet()
  const algodConfig = getAlgodConfigFromViteEnvironment()
  const indexerConfig = getIndexerConfigFromViteEnvironment()

  function generateUniqueName(baseName: string): string {
    const timestamp = Date.now()
    return `${baseName}_${timestamp}`
  }

  // Initialize appClient once activeAddress is available
  useEffect(() => {
    if (activeAddress) {
      const indexer = algokit.getAlgoIndexerClient({
        server: indexerConfig.server,
        port: indexerConfig.port,
        token: indexerConfig.token,
      })
      //NAME GENERIRSEMO DA SE NE BI STALNO VEZIVALI ZA ISTI ID VEC POSTOJECE APALIAKCIJE
      const appDetails: AppDetails = {
        resolveBy: 'creatorAndName',
        name: generateUniqueName('ttt'),
        sender: { signer, addr: activeAddress },
        creatorAddress: activeAddress,
        findExistingUsing: indexer,
      }
      const algodClient = algokit.getAlgoClient({
        server: algodConfig.server,
        port: algodConfig.port,
        token: algodConfig.token,
      })

      const newAppClient = new TicTacToeSinglePlayerClient(appDetails, algodClient)
      setAppClient(newAppClient)
    }
  }, [activeAddress]) // Dependency on activeAddress ensures appClient is re-initialized if the address changes

  const { enqueueSnackbar } = useSnackbar()

  const handleDeployClick = async () => {
    try {
      const response = await onDeployClick()
      enqueueSnackbar(`Message: ${response}`, { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(`Deployment failed: ${error.message}`, { variant: 'error' })
    }
  }

  const getApplicationState = async () => {
    await getAppState()
  }

  const handlePlayerMove = async () => {
    const response = await playMove(contractInput)
      .then((response) => {
        enqueueSnackbar(`Response from the contract: ${response}`, { variant: 'success' })
        getApplicationState()
      })
      .catch((e: Error) => {
        enqueueSnackbar(`Error calling the contract: ${e.message}`, { variant: 'error' })
      })
      .finally(() => {
        setLoading(false)
      })

    return response
  }

  /*
    const deployContract = async () => {

      if (!appClient) return;
      setLoading(true);

      const deployParams = {
        onSchemaBreak: 'append',
        onUpdate: 'append',
      };

      await appClient.deploy(deployParams).then(() => {
        enqueueSnackbar(`Contract deployed successfully`, { variant: 'success' });
        setContractDeployed(true); // Update deployment status
      }).catch((e: Error) => {
        enqueueSnackbar(`Error deploying the contract: ${e.message}`, { variant: 'error' });
      }).finally(() => {
        setLoading(false);
      });
    };
  */
  const callHelloFunction = async () => {
    if (!contractDeployed || !appClient) {
      enqueueSnackbar('Please deploy the contract first.', { variant: 'warning' })
      return
    }
    setLoading(true)

    // Assuming appClient is initialized and available. If not, you might need to initialize
    // it similarly to how it's done in the deployContract function.
    const response = await appClient
      .playActionLogic({ position_index: contractInput })
      .then((response) => {
        enqueueSnackbar(`Response from the contract: ${response?.return} ${response.transaction.txID.toString}`, { variant: 'success' })
      })
      .catch((e: Error) => {
        enqueueSnackbar(`Error calling the contract: ${e.message}`, { variant: 'error' })
      })
      .finally(() => {
        setLoading(false)
      })

    return response // Depending on your use case, you might want to return the response
  }

  const sendAppCall = async () => {
    setLoading(true)
    /*
        const appDetails = {
          resolveBy: 'creatorAndName',
          sender: { signer, addr: activeAddress } as TransactionSignerAccount,
          creatorAddress: activeAddress,
          findExistingUsing: indexer,
        } as AppDetails

        const appClient = new TicTacToeSinglePlayerClient(appDetails, algodClient)
    */
    // Please note, in typical production scenarios,
    // you wouldn't want to use deploy directly from your frontend.
    // Instead, you would deploy your contract on your backend and reference it by id.
    // Given the simplicity of the starter contract, we are deploying it on the frontend
    // for demonstration purposes.
    const deployParams = {
      onSchemaBreak: 'append',
      onUpdate: 'append',
    }
    await appClient.deploy(deployParams).catch((e: Error) => {
      enqueueSnackbar(`Error deploying the contract: ${e.message}`, { variant: 'error' })
      setLoading(false)
      return
    })

    const response = await appClient.hello({ name: contractInput }).catch((e: Error) => {
      enqueueSnackbar(`Error calling the contract: ${e.message}`, { variant: 'error' })
      setLoading(false)
      return
    })

    enqueueSnackbar(`Response from the contract: ${response?.return}`, { variant: 'success' })
    setLoading(false)
  }

  return (
    <dialog id="appcalls_modal" className={`modal ${openModal ? 'modal-open' : ''} bg-slate-200`}>
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Interact with your Algorand smart contract</h3>
        <br />
        <input
          type="text"
          placeholder="Provide input to hello function"
          className="input input-bordered w-full"
          value={contractInput}
          onChange={(e) => setContractInput(parseInt(e.target.value, 10))}
        />
        <div className="modal-action">
          <button className="btn" onClick={() => setModalState(!openModal)}>
            Close
          </button>
          <button className={`btn ${loading && 'loading'}`} onClick={handleDeployClick} disabled={loading || contractDeployed}>
            Deploy Contract
          </button>
          <button className={`btn ${loading && 'loading'}`} onClick={handlePlayerMove} disabled={loading}>
            Send Application Call
          </button>
        </div>
      </form>
    </dialog>
  )
}

export default AppCalls
