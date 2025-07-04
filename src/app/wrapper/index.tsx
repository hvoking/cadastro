// App imports
import './styles.scss';

// Context imports
import { ContextProvider } from 'context';

export const Wrapper = ({ children }: any) => {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);

	window.addEventListener('resize', () => {
	  let vh = window.innerHeight * 0.01;
	  document.documentElement.style.setProperty('--vh', `${vh}px`);
	});

	return (
		<ContextProvider>
			<div className="App">
				{children}
			</div>
		</ContextProvider>
	)
}