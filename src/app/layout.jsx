
import "./globals.css";
import Provider from "./provider";

export const metadata = {
  title: "drugboard.ai",
  description: "AI Assitant App for Science People",
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
