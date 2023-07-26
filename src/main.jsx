
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from './Home'
import { DataProvider } from './Provider/DataProvider';

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="max-w-screen-xl mx-auto">
    <DataProvider>
      <Home />
    </DataProvider>
  </div>
);
