import '@styles/globals.css'
import { ReactNode } from 'react';
import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
    title: "Promptopia",
    description: "Discover and share AI prompts"
}

interface RootLayoutProps {
    children: ReactNode;
}

const RootLayout = ({ children} : RootLayoutProps) => {
  return (
    <html lang='en'>
        <body>
            <Provider>
                <div className="main">
                    <div className="gradient"/>
                </div>

                <main className='app'>
                    <Nav />
                    {children}
                </main>
            </Provider>
        </body> 
    </html>
  )
}

export default RootLayout 