import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import "./App.css";
import {
	DepositPanel,
	SwapPanel,
	TransactionModal,
	WithdrawPanel,
	// useTransactionModal,
} from "@qubitronlabs/crypto-wallet";


function App() {
	// const { openModal } = useTransactionModal();
	const { primaryWallet } = useDynamicContext();
	return (
		   <div className="min-h-screen bg-[#18181b] flex flex-col items-center justify-center py-8">
			   <DynamicWidget />
			   {primaryWallet && (
				   <>
					   <TransactionModal />
					   <div className="flex flex-row gap-8 mt-8">
						   <DepositPanel />
						   <WithdrawPanel />
					   </div>
					   <div className="flex flex-row gap-8 mt-8">
						   <SwapPanel />
					   </div>
				   </>
			   )}
		   </div>
	);
}

export default App;
