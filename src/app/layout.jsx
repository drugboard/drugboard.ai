import "./globals.css";
import Provider from "./provider";

export const metadata = {
  title: "Scientific Collaboration ✨ Connection · drugboard.ai",
  description: "AI Assitant App for Science People",
  icons: {
    icon: [
      { rel: 'icon', type: 'image/svg+xml', url: '/favicon.svg' },
    ]
  }
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
            {children}
        </Provider>
      </body>
    </html>
  );
}
