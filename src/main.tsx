import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { mainnet } from "viem/chains";
import App from "./App";
import "./index.css";
import { AuthProvider, setSdkConfig } from "@qubitronlabs/crypto-wallet";
import { BrowserRouter } from "react-router-dom";

setSdkConfig({
	networkId: import.meta.env.VITE_NETWORK_ID,
	wsUrl: import.meta.env.VITE_WS_URL,
	wsKey: import.meta.env.VITE_WS_KEY,
	apiKey: import.meta.env.VITE_API_KEY,
	jwtType: import.meta.env.VITE_JWT_TYPE,
	apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
	allowanceAddress: import.meta.env.VITE_ALLOWANCE_ADDRESS,
	dynamicEnvironmentId: import.meta.env.VITE_DYNAMIC_ENVIRONMENT_ID,
	features: {
		enableNetworkStateSync: true,
		enableTokenStateSync: true,
		enableTransactionStateSync: true,
		enableWebSocketStateSync: true,
	},
});

const config = createConfig({
	chains: [mainnet],
	multiInjectedProviderDiscovery: false,
	transports: {
		[mainnet.id]: http(),
	},
});

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<DynamicContextProvider
				theme="auto"
				settings={{
					environmentId: import.meta.env.VITE_DYNAMIC_ENVIRONMENT_ID,
					walletConnectors: [EthereumWalletConnectors],
				}}
			>
				<WagmiProvider config={config}>
					<QueryClientProvider client={queryClient}>
						<DynamicWagmiConnector>
							<AuthProvider>
								<App />
							</AuthProvider>
						</DynamicWagmiConnector>
					</QueryClientProvider>
				</WagmiProvider>
			</DynamicContextProvider>
		</BrowserRouter>
	</StrictMode>
);
